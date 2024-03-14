<?php
namespace Vanderbilt\REDCap\Classes\Email;

use Exception;
use PhpMyAdmin\Language;
use PHPUnit\Event\Telemetry\System;
use Vanderbilt\REDCap\Classes\Email\PlaceholderReplacers\EmailReplacer;
use Vanderbilt\REDCap\Classes\Email\PlaceholderReplacers\LastNameReplacer;
use Vanderbilt\REDCap\Classes\Email\PlaceholderReplacers\UsernameReplacer;
use Vanderbilt\REDCap\Classes\Email\PlaceholderReplacers\FirstNameReplacer;
use Vanderbilt\REDCap\Classes\Email\PlaceholderReplacers\LastLoginReplacer;
use Vanderbilt\REDCap\Classes\Email\PlaceholderReplacers\RedcapUrlReplacer;
use Vanderbilt\REDCap\Classes\Email\PlaceholderReplacers\RedcapInstitutionReplacer;

class  EmailUsers
{

    const PAGE_START = 1;
    const PER_PAGE = 50;

    private $username;

    public function __construct($username)
    {
        $this->username = $username;
    }

    public function getSettings()
    {
        $systemSettings = \System::getConfigVals();
        $languageGlobal = @$systemSettings['language_global'];
        
        $lang = \Language::getLanguage($languageGlobal);
        $user = $this->getUserEmails();
        $settings = $this->getSystemSettings();
        $variables = $this->getVariables();
        return compact('lang', 'user', 'settings', 'variables');
    }

    /**
     * provide a list of variables that can be injected in the message
     *
     * @return array
     */
    public function getVariables() {
        return [
            'REDCap' => [
                RedcapInstitutionReplacer::token()    => 'institution',
                RedcapUrlReplacer::token()            => 'URL',
            ],
            'user' => [
                FirstNameReplacer::token()            => 'first name',
                LastNameReplacer::token()             => 'last name',
                UsernameReplacer::token()             => 'username',
                EmailReplacer::token()                => 'email',
                LastLoginReplacer::token()            => 'last login',
            ],
        ];
    }
    
    function getSystemSettings()
    {
        $systemSettings = \System::getConfigVals();

        $cdisEnabled = function() use($systemSettings) {
            $fhir_ddp_enabled = boolval(@$systemSettings['fhir_ddp_enabled']);
            $fhir_data_mart_create_project = boolval(@$systemSettings['fhir_data_mart_create_project']);
            $cdis_enabled = ($fhir_ddp_enabled || $fhir_data_mart_create_project);
            return $cdis_enabled;
        };

        $userMessagingEnabled = boolval(@$systemSettings['user_messaging_enabled']);

        $settings = [
            'cdis_enabled' => $cdisEnabled(),
            'user_messaging_enabled' => $userMessagingEnabled,
            'authentication_method' => $authentication_method = @$systemSettings['auth_meth_global'],
            // check if LDAP is enabled (or the Australian Access Federation)
            'ldap_enabled' => preg_match('/(ldap_table)|(^aaf)/i', $authentication_method)===1,
        ];
        return $settings;
    }

    function getUserEmails() {
        $queryString = "SELECT username, user_email, user_email2, user_email3 FROM redcap_user_information WHERE username = ?";
        $result = db_query($queryString, [$this->username]);
        $user = [
            'username' => '',
            'emails' => [],
        ];
        if($result && ($row = db_fetch_assoc($result))) {
            $user['username'] = @$row['username'];
            if(@$row['user_email']) $user['emails'][] = @$row['user_email'];
            if(@$row['user_email2']) $user['emails'][] = @$row['user_email2'];
            if(@$row['user_email3']) $user['emails'][] = @$row['user_email3'];
        }
        return $user;
        
    }

    public function getUsers($page=1, $perPage=50, $words=[])
    {
        $page = intval($page);
        $perPage = intval($perPage);

        $start = ($page-1) * $perPage;

        $users = $this->aggregateUsersInfo($start, $perPage, $words, $metadata);

        $metadata = $this->getMetadata($perPage);
        $totalPages = intval($metadata['total_pages'] ?? 0);
        $metadata['partial_count'] = count($users);
        $metadata['page'] = $page;
        $metadata['next_page'] = $page < $totalPages ? $page+1 : null;

        return [
            "metadata" => $metadata,
            'data' => $users,
        ];
    }

    public function getMetadata($perPage=50) {
        $getTotalPages = function($total, $perPage) {
            if($perPage === 0) return $total;
            return ceil($total / $perPage);
        };
        return [
            'count' => $total = $this->getTotal(),
            'total_pages' => $totalPages = $getTotalPages($total, $perPage),
        ];
    }

    function getTotal() {
        // first get the unfiltered total
        $totalResult = db_query("SELECT COUNT(1) AS total FROM redcap_user_information");
        if(!$totalResult) throw new Exception("Cannot determine total number of users", 400);
        $row = db_fetch_array($totalResult);
        return intval($row['total']);
    }

    function dbFetchAssocAll($result) {
		$rows = [];
		while($row = db_fetch_assoc($result)) {
			$rows[] = $row;
		}
		return $rows;
	}
    

    private function aggregateUsersInfo($start=0, $limit=0, $words=[], &$metadata=null)
    {
        // helper function to add a filter using words on selected columns
        $makeFilter = function($totalWords=0) {
            $filterableColumns = ['username','user_firstname','user_lastname','user_email'];
            $joinedFilterable = implode(', ', $filterableColumns);
            $unitSeparator = chr(31);
            $filters =  array_fill(0, $totalWords, "CONCAT_WS('$unitSeparator', $joinedFilterable) LIKE ?");
            return implode(PHP_EOL."OR ", $filters);
        };
        $result = $this->getUsersInformation($start, $limit, $words);
		$users = [];
		$usernames = [];
		$ui_ids = [];
		while($row = db_fetch_assoc($result)) {
			// $users[] = array_sanitize_utf8($row); // maybe sanitize UTF8?
			$users[] = $row;
			if(isset($row['username'])) $usernames[] = $row['username'];
			if(isset($row['ui_id'])) $ui_ids[] = $row['ui_id'];
		}
        if(empty($users)) return $users; // no users; stop here

		$tableBasedUsers = $this->dbFetchAssocAll($this->getTableBasedUsers($usernames));
		$usersWithApiToken = $this->dbFetchAssocAll($this->getUsersWithApiToken($usernames));
		$projectOwners = $this->dbFetchAssocAll($this->getProjectOwners($usernames));
		$usersWithMobileAppRights = $this->dbFetchAssocAll($this->getUsersWithMobileAppRights($usernames));
		$cdisUsers = $this->dbFetchAssocAll($this->getCdisUsers($usernames));
		$onlineUsers = $this->dbFetchAssocAll($this->getOnlineUsers($usernames));
		// Index additional groups by username for faster lookup
		$additionalInfo = [
			'table_based_user' => array_column($tableBasedUsers, null, 'username'),
			'has_api_token' => array_column($usersWithApiToken, null, 'username'),
			'is_project_owner' => array_column($projectOwners, null, 'username'),
			'has_mobile_app_rights' => array_column($usersWithMobileAppRights, null, 'username'),
			'cdis_user' => array_column($cdisUsers, null, 'username'),
			'online' => array_column($onlineUsers, null, 'username'),
		];
	
		// Merge user information
		foreach ($users as &$user) {
			$username = $user['username'];
			foreach ($additionalInfo as $infoKey => $infoGroup) {
				$user[$infoKey] = (isset($infoGroup[$username])) ? true : false;
			}
		}
		return $users;
    }

    public function getLogoutWindow() {
        global $autologout_timer;
        return date("Y-m-d H:i:s", mktime(date("H"),date("i")-$autologout_timer,date("s"),date("m"),date("d"),date("Y")));
    }

    function getUsersInformation($start = 0, $limit = 0, $words = []) {
        // Base SQL query
        $sql = "
            SELECT ui_id,
                   username,
                   user_firstname,
                   user_lastname,
                   user_email,
                   user_suspended_time,
                   GREATEST(user_lastactivity, user_lastlogin) AS user_lastactivity
            FROM redcap_user_information
        ";
    
        $params = [];
        $whereClauses = [];
    
        // Filter by words if provided
        if (!empty($words)) {
            foreach ($words as $word) {
                // Create a LIKE condition for each word across multiple columns
                $likeClause = "(username LIKE ? OR user_firstname LIKE ? OR user_lastname LIKE ? OR user_email LIKE ?)";
                $whereClauses[] = $likeClause;
                // Add the word to parameters array for each field it needs to be compared with
                $params = array_merge($params, array_fill(0, 4, '%' . $word . '%'));
            }
        }
    
        // Append WHERE clauses if any
        if (!empty($whereClauses)) {
            $sql .= ' WHERE ' . implode(' AND ', $whereClauses);
        }
    
        // Add LIMIT clause if required
        if ($limit >= 0 && $start >= 0) {
            $sql .= " LIMIT ?, ?";
            $params[] = $start;
            $params[] = $limit;
        }
    
        // Execute the query
        $result = db_query($sql, $params);
    
        return $result;
    }
    

    function getTableBasedUsers($usernames) {
        $placeholders = dbQueryGeneratePlaceholdersForArray($usernames);
        $sql = "
            SELECT i.username
            FROM redcap_user_information i
            JOIN redcap_auth a ON i.username = a.username
            WHERE i.username IN ($placeholders)
        ";
        return db_query($sql, $usernames);
    }
    
    function getUsersWithApiToken($usernames) {
        $placeholders = dbQueryGeneratePlaceholdersForArray($usernames);
        $sql = "
            SELECT ur.username
            FROM redcap_user_rights ur
            WHERE ur.username IN ($placeholders)
            GROUP BY ur.username
            HAVING MAX(IF(ur.api_token IS NOT NULL, 1, 0)) = 1
        ";
        return db_query($sql, $usernames);
    }

    function getProjectOwners($usernames) {
        $placeholders = dbQueryGeneratePlaceholdersForArray($usernames);
        $sql = "
            SELECT ur.username
            FROM redcap_user_rights ur
            JOIN redcap_projects p ON ur.project_id = p.project_id
            WHERE ur.username IN ($placeholders)
            GROUP BY ur.username
            HAVING MAX(IF(((ur.user_rights = 1 OR ur.design = 1) AND p.date_deleted IS NULL AND p.completed_time IS NULL), 1, 0)) = 1
        ";
        return db_query($sql, $usernames);
    }

    function getUsersWithMobileAppRights($usernames) {
        $placeholders = dbQueryGeneratePlaceholdersForArray($usernames);
        $sql = "
            SELECT ur.username
            FROM redcap_user_rights ur
            WHERE ur.username IN ($placeholders)
            GROUP BY ur.username
            HAVING MAX(IF(ur.mobile_app = 1, 1, 0)) = 1
        ";
        return db_query($sql, $usernames);
    }

    function getCdisUsers($usernames) {
        $placeholders = dbQueryGeneratePlaceholdersForArray($usernames);
        $sql = "
            SELECT DISTINCT ui.username,
                            TRUE AS cdis_user
            FROM redcap_user_information ui
            JOIN redcap_user_rights ur ON ur.username = ui.username
            WHERE (ur.realtime_webservice_adjudicate = 1
            OR ui.ui_id IN (SELECT DISTINCT token_owner FROM redcap_ehr_access_tokens))
            AND ui.username IN ($placeholders)
        ";
        return db_query($sql, $usernames);
    }
    
    function getOnlineUsers($usernames) {
        $sinceTimestamp = $this->getLogoutWindow();
        $placeholders = dbQueryGeneratePlaceholdersForArray($usernames);
        $sql = "
            SELECT DISTINCT TRIM(LOWER(user)) AS username,
                            TRUE AS online
            FROM redcap_log_view
            WHERE user IN ($placeholders)
            AND ts >= ?
            AND user != '[survey respondent]'
        ";
        // Append the timestamp to the usernames array for the parameter binding
        $params = array_merge($usernames, [$sinceTimestamp]);
        return db_query($sql, $params);
    }
    
    
    
	
}