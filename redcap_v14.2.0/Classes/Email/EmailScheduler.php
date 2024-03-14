<?php
namespace Vanderbilt\REDCap\Classes\Email;

use Vanderbilt\REDCap\Classes\Queue\Queue;
use Vanderbilt\REDCap\Classes\Queue\Message;
use Vanderbilt\REDCap\Classes\Traits\CanMakeDateTimeFromInterval;

class  EmailScheduler
{
	use CanMakeDateTimeFromInterval;

	const MAX_EXECUTION_TIME = '30 minutes';
	const MAX_DATA_SIZE_IN_BITS = 512000; // 512000 = 64Kb = max size of a BLOB field in MySQL

	private $username;
	private $userInfo;
	private $senderEmail;

	public function __construct($username, $senderEmail)
	{
		$this->username = $username;
		$this->userInfo = \User::getUserInfo($username);
		$this->setSenderEmail($senderEmail);
	}

	/**
	 * create chunks of emails to be scheduled for sending.
	 * email are stored in a BLOB MySQL field along with additional information.
	 * Since the maximum of data for a BLOB field is 64Kb (512000 bit),
	 * just use half the size to ensure data is never truncated
	 *
	 * @param array $emails
	 * @return array
	 */
	private function getEmailsChunks($emails) {
		$serialized = serialize($emails);
		if (function_exists('mb_strlen')) {
			$size = mb_strlen($serialized, '8bit');
		} else {
			$size = strlen($serialized);
		}
		$maxSize = self::MAX_DATA_SIZE_IN_BITS/8; // divide by 8 (bits, length of strings in bytes) 
		$maxSize = $maxSize/2; // adjust max size to be half the maximum size of the data field
		$chunkSize = $size/$maxSize;
		if($chunkSize<1) return [$emails];
		$totalChunks = ceil($chunkSize);
		$emailsPerBatch = ceil(count($emails)/$totalChunks);
		return array_chunk($emails, $emailsPerBatch);
	}

	/**
	 * process a user request to send messages:
	 * - log data
	 * - schedule email sending
	 *
	 * @param string $emailSubject
	 * @param string $emailMessage
	 * @param array $uiids
	 * @param integer $userEmailNumber
	 * @return Array list of keys of the message queue
	 */
	public function scheduleRequest($emailSubject, $emailMessage, $uiids)
	{
		
		$queueKeys = [];
		$senderEmail = $this->senderEmail;
		$uiids = $this->filterUiids($uiids);
		
		$useremail_list = $this->getEmails($uiids);
		$emailsChunks = $this->getEmailsChunks($useremail_list);
		foreach ($emailsChunks as $emailsChunk) {
			$this->log($senderEmail, $emailSubject, $emailMessage, $emailsChunk);
			$queueKeys[] = $this->setMessageQueue($emailSubject, $emailMessage, $emailsChunk); // start from 0
		}
		return $queueKeys;
	}

	/**
	 * add an entry to the message queue
	 * if the process takes too long, is is stopped and another message queue is scheduled
	 *
	 * @param string $emailSubject
	 * @param string $emailMessage
	 * @param array $useremail_list
	 * @param integer $start // where to start processing the uiids
	 * @return string the key of the queued message
	 */
	public function setMessageQueue($emailSubject, $emailMessage, $useremail_list, $start=0)
	{
		$queue = new Queue();
		$username = $this->username;
		$senderEmail = $this->senderEmail;

		$closure = function() use($username, $senderEmail, $emailSubject, $emailMessage, $useremail_list, $start) {
			
			$emailHelper = new EmailScheduler($username, $senderEmail);
			$emailHelper->processList($emailSubject, $emailMessage, $useremail_list, $start);
			
		};
		$messageKeyPrefix = "{$username}-send-emails_".time();
		$unqueID = uniqid($prefix = $messageKeyPrefix, $more_entropy = true);
		$messageKey = $messageKeyPrefix . $unqueID; // make sure the key is unique
		$queue->addMessage($closure, $messageKey, 'Send email messages');
		return $messageKey;
	}

	/**
	 * process a list of emails.
	 *
	 * @param string $emailSubject
	 * @param string $emailMessage
	 * @param array $useremail_list
	 * @param integer $start
	 * @return array
	 */
	public function processList($emailSubject, $emailMessage, $useremail_list, $start=0) {
		$parser = new DynamicVariablesParser();
		$message = $this->initMessage($emailSubject, $emailMessage);
		$maxTime = $this->getDateTimeFromInterval(EmailScheduler::MAX_EXECUTION_TIME);

		$sentCounter = 0;
		$notSentCounter = 0;

		// process all UI_IDs starting from the $start point; stop if takes too much time
		for ($index=$start; $index < count($useremail_list); $index++) {
			$useremail = $useremail_list[$index];
			$now = new \DateTime();
			$too_much = $now > $maxTime;
			if($too_much) {
				$this->setMessageQueue($emailSubject, $emailMessage, $useremail_list, $index);
				break;
			}
			$clonedMessage = clone $message; // make a copy so it not modified in the loop
			$sent = $this->sendMessage($parser, $clonedMessage, $useremail);
			if($sent==1) $sentCounter++;
			else $notSentCounter++;
		}
		return [
			'sentCounter' => $sentCounter,
			'notSentCounter' => $notSentCounter,
		];
	}

	/**
	 * filter non numeric UI_IDS.
	 * return unique values.
	 *
	 * @param array $list
	 * @return array
	 */
	public function filterUiids($list) {
		$uiids = array_filter($list, 'is_numeric'); // make sure all UI_IDs are numeric
		return array_unique($uiids);
	}
	
	/**
	 * get a list of unique email addresses
	 * using a list of UI_IDs
	 *
	 * @param array $uiids
	 * @return array
	 */
	public function getEmails($uiids) {
		// Get unique list of uiid's
		$placeholders = implode(',', array_fill(0, count($uiids), '?'));
		$sql = "SELECT MIN(ui_id) AS ui_id, user_email
				FROM redcap_user_information WHERE user_email != ''
				AND user_email IS NOT NULL AND ui_id IN ($placeholders) GROUP BY user_email";
		$q = db_query($sql, $uiids);
		$useremail_list = array();
		while ($row = db_fetch_assoc($q))
		{
			if (isEmail($row['user_email'])) {
				$useremail_list[] = $row['user_email'];
			}
		}
		return $useremail_list;
	}

	/**
	 * get a list of the emails associated to the current user
	 *
	 * @return array
	 */
	function getUserEmails() {
		$emails = [];
		if($email1 = @$this->userInfo['user_email']) $emails[] = $email1;
		if($email2 = @$this->userInfo['user_email2']) $emails[] = $email2;
		if($email3 = @$this->userInfo['user_email3']) $emails[] = $email3;
		return $emails;
	}

	/**
	 * a user could have multiple emails associated: user_email, user_email2, etc...
	 * set the preferred email using a number
	 *
	 * @param string $email
	 * @return void
	 */
	function setSenderEmail($email)
	{
		$emails = $this->getUserEmails();
		if (!isEmail($email)) throw new \Exception("Error: the format of the email address '$email' is notinvalid.", 401);
		if(!in_array($email, $emails)) throw new \Exception("Error: the email address '$email' is not associated to the current user.", 401);
		$this->senderEmail = $email;
	}

	/**
	 * log the scheduling request
	 *
	 * @param string $fromEmail
	 * @param string $emailSubject
	 * @param string $emailMessage
	 * @param array $useremail_list
	 * @return void
	 */
	function log($fromEmail, $emailSubject, $emailMessage, $useremail_list) {
		// Get basic values sent
		$emailContents = '<html><body style="font-family:arial,helvetica;">'.decode_filter_tags($emailMessage).'</body></html>';
		$emailSubject  = decode_filter_tags($emailSubject);

			// Logging
		$log_vals = "From: $fromEmail\n"
					. "To: " . implode(", ",$useremail_list) . "\n"
					. "Subject: $emailSubject\n"
					. "Message:\n$emailContents";
		\Logging::logEvent("","","MANAGE","",$log_vals,"Email users");
	}


	/**
	 * init a message but do not send it
	 *
	 * @param string $emailSubject
	 * @param string $emailContents
	 * @return \Message
	 */
	public function initMessage($emailSubject, $emailContents) {
		$senderEmail = $this->senderEmail;
		$emailSubject = decode_filter_tags($emailSubject);
		$emailContents = decode_filter_tags($emailContents);
		// Set up email to be sent
		$message = new \Message();
		$message->setFrom($senderEmail);
		$primaryEmail = @$this->userInfo['user_email'];
		if ($senderEmail==$primaryEmail) {
			$message->setFromName(""); // Add user's secondary and tertiary display name
		} else {
			$firstName = @$this->userInfo['user_firstname'];
			$lastName = @$this->userInfo['user_lastname'];
			$message->setFromName("$firstName $lastName");
		}
		$message->setSubject($emailSubject);
		$message->setBody($emailContents);
		return $message;
	}

	/**
	 * use the UI_ID of a user to get the associated email
	 *
	 * @param int $uiid
	 * @return null|string
	 */
	public function getEmailFromUiid($uiid) {
		$sql = "SELECT user_email FROM redcap_user_information WHERE ui_id = ?";
		$result = db_query($sql, $uiid);
		if(!$result) return;
		if($row = db_fetch_array($result)) return @$row['user_email'];
		return;
	}

	/**
	 * send a message to a list of users
	 *
	 * @param DynamicVariablesParser $parser
	 * @param \Message $message
	 * @param array $user_list
	 * @return int -1 email not valid, 0 not sent, 1 sent
	 */
	public function sendMessage($parser, $message, $email)
	{
		if (!$email) return;
		$message->setTo($email);
		// apply dynamic variables (after to is set!)
		$parsedBody = $parser->parse($message);
		$message->setBody($parsedBody);
		$success = $message->send();
		return intval($success);
	}
}