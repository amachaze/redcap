<?php

namespace Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\States;

use HttpClient;
use Vanderbilt\REDCap\Classes\Traits\CanDecodeJWT;
use Vanderbilt\REDCap\Classes\DTOs\REDCapConfigDTO;
use Vanderbilt\REDCap\Classes\Fhir\FhirSystem\FhirSystem;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\FhirLauncher;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\DTOs\OpenIdDTO;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\DTOs\SessionDTO;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\DTOs\AccessTokenResponseDTO;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\DTOs\ConformanceStatementDTO;

/**
 * try to perform auto login using the FHIR user
 * - extract the fhirUser (if not already available)
 * - if the user is not logged in and the fhirUser is mapped in the redcap database,
 * 	then perform autologin
 * 
 * if a patient IS NOT provided, then we are in 'standalone launch context':
 * the launcher will redirect to the previous page (if available)
 * 
 * if a patient IS provided, then we are in 'EHR launch' context:
 * the launcher will transition to the PortalState
 */
class TryAutoLoginState extends State
{
	use CanDecodeJWT;

	/**
	 * the key where the logged in username is stored in the PHP session
	 */
	const SESSION_USERNAME_KEY = 'username';

	public function run() {
		$state = $_GET['state'] ?? '';
		$session = $this->context->getSession();

		$this->context->log("checking if user already logged in");
		$user = $this->getCurrentUser($session);
		if($user) $this->redirectToNextState($session); // move to next state if already authenticated
		
		$this->context->log("no user currently logged-in; trying auto-login");

		$session->fhirUser = $fhirUser = $this->getFhirUser($session); // check if the user is available somewhere in the session
		if(!$fhirUser) {
			$this->context->log("FHIR user is NOT available; extract the available FHIR users and add them to the session");
			// FHIR user is not available; try to get it from the OprnID token
			$this->extractFhirUserFromOpenId($session);
			// try to assign the FHIR user again after the extraction
			if($extractedFhirUser = $session->fhirUser) {
				$this->context->log("FHIR user was extracted using the openID data");
				$fhirUser = $extractedFhirUser;
			}else {
				$this->context->log("FHIR user could not be extracted using the openID data");
				$this->redirectToNextState($session);
			}
		}

		if($fhirUser) {
			$this->context->log("FHIR user is available; attempting auto-login");
			$user = $this->tryAutoLogin($session);	
		}
		
		if($user==false) {
			$this->context->log("cannot auto login: no FHIR user in the session or no mapping data available");
		}else {
			$this->context->log("auto-logged in as '$user'");
		}

		
		// redirect to EHR user mapping page
		$this->redirectToNextState($session);
	}

	/**
	 * check on the main PHP session if a user is logged in
	 *
	 * @param SessionDTO $session
	 */
	public function getCurrentUser($session) {
		return $session->user;
	}

	/**
	 * get a FHIR user from the session or from
	 * the data available in the AccessTokenResponseDTO
	 *
	 * @param SessionDTO $session
	 * @return string|false 
	 */
	public function getFhirUser($session) {
		$fhirUserAvailable = $session->fhirUser==true;
		if($fhirUserAvailable) return $session->fhirUser; // fhirUser already available in the session
		$accessTokenDTO = $session->accessToken ?? null;
		if(!is_object($accessTokenDTO) ) return false;
		$username = $accessTokenDTO->username ?? null;
		if($username) {
			// username provided during launch from EHR (Cerner)
			$fhirUser = trim(rawurldecode(urldecode($username)));
			return $fhirUser;
		}

		return false;
	}

	/**
	 * redirect to the next state based on the data available in the
	 * session and the launch type
	 *
	 * @param SessionDTO $session
	 * @return void
	 */
	public function redirectToNextState($session) {
		$state = @$session->state;
		$URL = $this->context->getRedirectUrl();
		$params = ['state' => $state, FhirLauncher::FLAG_STORE_TOKEN=>1];
		$query = http_build_query($params);
		$this->context->log("redirecting to store token state");
		HttpClient::redirect("$URL?$query", true, 302);
	}

	/**
	 * try to perform autologin
	 *
	 * @param SessionDTO $session
	 * @return string|false
	 */
	public function tryAutoLogin($session) {
		$user = $this->checkAutoLogin($session->fhirUser);
		if($user) $session->user = $user; // add the user to the session
		return $user;
	}

	/**
	 * attempt to autologin the user
	 *
	 * @param string $fhirUser
	 * @return void
	 */
	public function checkAutoLogin($fhirUser)
	{
		$fhirUser = trim($fhirUser);
		if(empty($fhirUser)) return false;
		// See if this user is mapped in the db table
		if($redcapUsername = $this->getMappedUsernameFromFhirUser($fhirUser))
		{
			// Perform auto-login
			require_once APP_PATH_DOCROOT . 'Libraries/PEAR/Auth.php';
			\Authentication::autoLogin($redcapUsername);
			return $redcapUsername;
		}
		return false;
	}

	/**
	 * Query table to get REDCap username from passed EHR username
	 *
	 * @param string $ehr_user
	 * @return string
	 */
	private function getMappedUsernameFromFhirUser($ehr_user)
	{
		$fhirSystem = $this->context->getFhirSystem();
		if(!$fhirSystem instanceof FhirSystem) return false;
		$ehrID = $fhirSystem->getEhrId();
		$queryString = "SELECT i.username
						FROM redcap_ehr_user_map m, redcap_user_information i
						WHERE ehr_id = ?
						AND i.ui_id = m.redcap_userid
						AND m.ehr_username = ?
						LIMIT 1";
		$result = db_query($queryString, [$ehrID, $ehr_user]);
		if(!$result) return false;
		if($row = db_fetch_assoc($result)) return $row['username'];
	}

	/**
	 * extract the FHIR user from the access token payload.
	 * 
	 * Cerner, in a launch from EHR, provide the
	 * FHIR user as 'username' in the payload.
	 * 
	 * if the openid scope is specified, then decode the 
	 * JWT id_token and extract the fhirUser parameter
	 *
	 * @param SessionDTO $session
	 * @return array
	 */
	public function extractFhirUserFromOpenId(SessionDTO $session) {
		$accessTokenDto = $session->accessToken;
		if(!($accessTokenDto instanceof AccessTokenResponseDTO)) return;
		$openIdDTO = $accessTokenDto->getDecodedIdToken();
		$fhirSystem = $this->context->getFhirSystem();
		if(!$fhirSystem) return;
		$fhirBaseURL = $fhirSystem->getFhirBaseUrl();
		$conformanceStatement = $this->context->getConformanceStatement($fhirBaseURL);
		$publisher = $conformanceStatement->getPublisher();
		if(strtolower($publisher)===ConformanceStatementDTO::PUBLISHER_CERNER) {
			$sub = $openIdDTO->sub ?? null;
			if($sub) $session->fhirUser = $sub;
		}
		$access_token = $accessTokenDto->access_token ?? '';
		$session->fhirUsers = $this->getPractitioner($openIdDTO, $access_token);
		if(count($session->fhirUsers)===1) $session->fhirUser = reset($session->fhirUsers);
	}

	/**
	 * fetch data about the practitioner
	 * 
	 * if the fhirUser parameter is not a full URL, then compose the URL using iss and fhirUser
	 * 
	 * @param OpenIdDTO $openIdDTO
	 * @param string $accessToken
	 * @return array associative array with system=>value
	 */
	public function getPractitioner($openIdDTO, $accessToken) {
		$removeTrailingSlashes = function($string) {
			return preg_replace('/\/*$/', '',$string);
		};
		try {
			$URL = $fhirUser = @$openIdDTO->fhirUser;
			
			if(!$this->validateURL($URL)) {
				// URL not valid; try to build a valid one
				// @$openIdDTO->fhirUser could be a partial URL and must be fixed
				$fhirSystem = $this->context->getFhirSystem();
				$fhirBaseURL = $removeTrailingSlashes($fhirSystem->getFhirBaseUrl());

				$iss = $removeTrailingSlashes($openIdDTO->iss ?? '');
				if($fhirUser) $URL = $iss.'/'.$fhirUser; // order is important here, and fhirUser should have precedence (Smart Health IT)
				else if($sub = $openIdDTO->sub) $URL = "{$fhirBaseURL}/practitioner/{$sub}"; // compose the practitioner URL (Epic)
			} 
			if(!$this->validateURL($URL)) return []; // URL still not valid; exit

			$practitioner = $this->context->getFhirData($URL, $accessToken);
			$identifiersData = $practitioner['identifier'] ?? [];
			$identifiers = [];
			$index = null;
			foreach ($identifiersData as $data) {
				$type = $data['type']['text'] ?? null;
				$system = $data['system'] ?? null;
				// index could be: type, system, or an incremental number
				if(isset($type)) $index = $type;
				else if(isset($system)) $index = $system;
				else $index = is_numeric($index) ? $index+1 : 0;
				$value = $data['value'] ?? null;
				if(!$value) continue;
				$identifiers[$index] = trim(rawurldecode(urldecode($value)));
			}
			return $identifiers;
		} catch (\Throwable $th) {
			// fail silently
			return [];
		}
	}

	/**
	 * Undocumented function
	 *
	 * @param string $URL
	 * @return bool
	 */
	private function validateURL($URL) {
		return filter_var($URL, FILTER_VALIDATE_URL);
	}

	

}