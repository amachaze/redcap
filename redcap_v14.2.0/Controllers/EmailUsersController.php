<?php

use Vanderbilt\REDCap\Classes\Email\EmailScheduler;
use Vanderbilt\REDCap\Classes\Email\EmailUsers;

class EmailUsersController extends BaseController
{

    private $username;

    public function __construct()
    {
        parent::__construct();
        $this->username = defined('USERID') ? USERID : null;
    }

    public function getUsers() {
        $page = intval($_GET['_page'] ?? 0);
        $perPage = intval($_GET['_per_page'] ?? 0);
        preg_match_all('/(?<word>[^\s]+)/i',  $_GET['_query'] ?? '', $matches);
        $words = $matches['word'] ?? [];
        $emailUsers = new EmailUsers($this->username);
        $response = $emailUsers->getUsers($page, $perPage, $words);
        $this->printJSON($response);
    }

    public function getSettings() {
        $emailUsers = new EmailUsers($this->username);
        $settings = $emailUsers->getSettings();
        $response = ['data' => $settings];
        $this->printJSON($response);
    }

    public function scheduleEmails() {
        try {
            $post = json_decode(file_get_contents("php://input"), true);
            if(empty(@$post['ui_ids']) || !is_array(@$post['ui_ids'])) exit("0\n1");
            $uiids = @$post['ui_ids'];
            $emailMessage = @$post['message'];
            $emailSubject  = @$post['subject'];
            $userEmail = @$post['from']; // the preferred user email to use for sending
            
            $emailScheduler = new EmailScheduler(USERID, $userEmail);
            $queueKeys = $emailScheduler->scheduleRequest($emailSubject, $emailMessage, $uiids);
            $response = [
                'queueKeys' => $queueKeys,
                'total' => count($uiids),
            ];
            $this->printJSON($response);
        } catch (\Throwable $th) {
            $response = [
                'message' => $th->getMessage(),
                'code' => $code = $th->getCode(),
            ];
            $this->printJSON($response, $code);
        }
    }

    

}