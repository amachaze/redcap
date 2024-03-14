<?php

use PHPUnit\Framework\TestCase;
use Vanderbilt\REDCap\Classes\Email\DynamicVariablesParser;
use Vanderbilt\REDCap\Classes\Email\EmailScheduler;


class EmailSchedulerTest extends TestCase
{
	public function setUp(): void
	{
	}


	public function _testParseDynamicVariables() {
		$emailSubject = 'this is a test';
		$emailContents = "<p>you have been selected by [redcap_institution] for a reward. it will be sent to [first_name] [last_name] [email]</p>
		<p>last login: [last_login]
		redcap_institution: [redcap_institution]
		redcap_url: [redcap_url]
		first_name: [first_name]
		last_name: [last_name]
		username: [username]
		email: [email]
		last_login: [last_login]
		</p>";
		$emailScheduler = new EmailScheduler('delacqf', 'francesco.delacqua@vumc.org');
		$message = $emailScheduler->initMessage($emailSubject, $emailContents);
		$message->setTo('francesco.delacqua@vumc.org');
		$parser = new DynamicVariablesParser();
		$parsed = $parser->parse($message);
		$messageBody = $message->getBody();
		$this->assertTrue($parsed !== $messageBody);
	}

	public function _testMessageWithNoPlaceholders() {
		$emailSubject = 'this is a test';
		$emailContents = "this is a test";
		$emailScheduler = new EmailScheduler('delacqf', 'francesco.delacqua@vumc.org');
		$message = $emailScheduler->initMessage($emailSubject, $emailContents);
		$message->setTo('francesco.delacqua@vumc.org');
		$parser = new DynamicVariablesParser();
		$parsed = $parser->parse($message);
		$messageBody = $message->getBody();
		$this->assertTrue($parsed === $messageBody);
	}

	public function _testMessageWithFirstNamePlaceholder() {
		$emailSubject = 'this is a test';
		$emailContents = "this is a test for [first_name]";
		$emailScheduler = new EmailScheduler('delacqf', 'francesco.delacqua@vumc.org');
		$message = $emailScheduler->initMessage($emailSubject, $emailContents);
		$message->setTo('francesco.delacqua@vumc.org');
		$parser = new DynamicVariablesParser();
		$parsed = $parser->parse($message);
		$this->assertTrue($parsed === 'this is a test for Francesco');
	}




	
}

