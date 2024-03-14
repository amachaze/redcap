<?php

namespace Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\States;

use HttpClient;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\FhirLauncher;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\FhirRenderer;
use Vanderbilt\REDCap\Classes\Traits\CanCheckCredentials;

class LoginState extends State
{
	use CanCheckCredentials;

	public function run() {
		if($request = $_POST) {
			$username = $request['username'] ?? '';
			$password = $request['password'] ?? '';
			$valid = $this->checkCredentials($username, $password);
			if($valid) {
				// Perform auto-login
				require_once APP_PATH_DOCROOT . 'Libraries/PEAR/Auth.php';
				\Authentication::autoLogin($username);
				$session = $this->context->getSession();
				$session->user = $username;
				$this->redirect();
			}
		}

		$renderer = FhirRenderer::engine();
		$html = $renderer->run('login', []);
		print($html);
	}

	/**
	 * remove the store stoken flag and redirect
	 *
	 * @return void
	 */
	public function redirect() {
		$params = array_filter($_GET, function($key) {
			return $key!=FhirLauncher::FLAG_LOGIN;
		}, ARRAY_FILTER_USE_KEY);
		$query = http_build_query($params);
		$URL = $this->context->getRedirectUrl();
		HttpClient::redirect("$URL?$query", true, 302);
	}

	
}