<?php

namespace Vanderbilt\REDCap\Classes\Fhir;

use Vanderbilt\REDCap\Classes\Fhir\DataMart\DataMart;
use Vanderbilt\REDCap\Classes\Fhir\FhirSystem\FhirSystem;
use Vanderbilt\REDCap\Classes\Fhir\TokenManager\FhirToken;
use Vanderbilt\REDCap\Classes\Fhir\TokenManager\FhirTokenManager;

class FhirEhr
{	
	// Other FHIR-related settings
	private static $fhirRedirectPage = 'ehr.php';
	public $ehrUIID = null;
	public $fhirPatient = null; // Current patient
	public $fhirAccessToken = null; // Current FHIR access token
	public $fhirResourceErrors = array();

	/**
	 * Standard Standalone Launch authentication flow
	 */
	const AUTHENTICATION_FLOW_STANDARD = 'standalone_launch';
	/**
	 * OAuth2 client credentials authentication flow (cerner only)
	 */
	const AUTHENTICATION_FLOW_CLIENT_CREDENTIALS = 'client_credentials';

	
	// Construct
	public function __construct()
	{
		// Start the session if not started
		\Session::init();
		// Initialization check to ensure we have all we need
		$this->initCheck();
	}

	public static function getUserID()
	{
		if ($GLOBALS['auth_meth_global'] == 'none') {
			$_SESSION['username'] = 'site_admin';
		}
		\Session::init();
		if (!isset($_SESSION['username'])) return;
		if(!defined("USERID")) define("USERID", strtolower($_SESSION['username']));
		$user_id = \User::getUIIDByUsername(USERID);
		/* $user_info = (object)\User::getUserInfo($id=USERID);
		$user_id = $user_info->ui_id; */
		return $user_id;
	}
	
	
	// Query table to determine if REDCap username has been allowlisted for DDP on FHIR
	public static function isDdpUserAllowlistedForFhir($ehrID, $username)
	{		
		$sql = "SELECT 1 FROM redcap_ehr_user_map m, redcap_user_information i
				WHERE ehr_id = ?
				AND i.ui_id = m.redcap_userid
				AND i.username = ?";
		$params = [$ehrID, $username];
		$q = db_query($sql, $params);
		return (db_num_rows($q) > 0);
	}
	
	/**
	 * Query table to determine if REDCap username has been allowlisted for Data Mart project creation rights.
	 * Super users are allowed by default.
	 * 
	 */
	public static function isDdpUserAllowlistedForDataMart($username)
	{		
		$sql = "SELECT 1 FROM redcap_user_information WHERE username = '".db_escape($username)."'
				AND (super_user = 1 OR fhir_data_mart_create_project = 1)";
		$q = db_query($sql);
		return (db_num_rows($q) > 0);
	}
	
	// Obtain the FHIR redirect URL for this external module (assumes that page=index is the main launching page)
	public static function getFhirRedirectUrl()
	{
		return APP_PATH_WEBROOT_FULL . self::$fhirRedirectPage;
	}
	
	
	// Initialization check to ensure we have all we need
	private function initCheck()
	{
		$errors = array();
		if (empty($GLOBALS['fhir_client_id'])) {
			$errors[] = "Missing the FHIR client_id! Please add value to module configuration.";
		}
		if (empty($GLOBALS['fhir_endpoint_base_url'])) {
			$errors[] = "Missing the FHIR endpoint base URL! Please add value to module configuration.";
		}
		if (!empty($errors)) {
			throw new \Exception("<br>- ".implode("<br>- ", $errors));
		}	
	}

	/**
	 * check if a project has EHR servvices enabled
	 *
	 * @param integer $project_id
	 * @return boolean
	 */
	public static function isFhirEnabledInProject($project_id)
	{
		$project = new \Project($project_id);
		$realtime_webservice_enabled = $project->project['realtime_webservice_enabled'];
		$realtime_webservice_type = $project->project['realtime_webservice_type'];
		$datamart_enabled = DataMart::isEnabledInSystem() && DataMart::isEnabled($project_id);
		return ( $datamart_enabled==true || ($realtime_webservice_enabled==true && $realtime_webservice_type=='FHIR') );
	}

	/**
	 * render the menu for the FHIR tools
	 *
	 * @param string $menu_id
	 * @param boolean $collapsed 
	 * @return string
	 */
	public static function renderFhirLaunchModal()
	{
		global $project_id, $lang;
		
		// get token 
		$user_id = FhirEhr::getUserID();
		$fhirSystem = FhirSystem::fromProjectId($project_id);
		$tokenManager = new FhirTokenManager($fhirSystem, $user_id);
		$token = $tokenManager->getToken();
		$token_found = $token instanceof FhirToken;
		$token_valid =  $token_found and $token->isValid();

		// exit if the token is valid
		if($token_valid) return;

		$data = array(
			'lang' => $lang,
			'ehr_system_name' => strip_tags($fhirSystem->getEhrName()),
			'ehr_id' => $fhirSystem->getEhrId(),
			'app_path_webroot' => APP_PATH_WEBROOT,
		);
		$modal = \Renderer::run('ehr.launch_modal', $data);
		return $modal;
	}
	

	/**
	 * check if clinical data interoperability services are enabled
	 * at the system-level in REDCap
	 *
	 * @return boolean
	 */
	public static function isCdisEnabledInSystem()
	{
		global $realtime_webservice_global_enabled, $fhir_ddp_enabled, $fhir_data_mart_create_project;
		
		$cdp_custom_enabled = boolval($realtime_webservice_global_enabled);
		$cdp_enabled = boolval($fhir_ddp_enabled);
		$data_mart_enabled = boolval($fhir_data_mart_create_project);
		return $cdp_custom_enabled || $cdp_enabled || $data_mart_enabled;
	}
	
}
