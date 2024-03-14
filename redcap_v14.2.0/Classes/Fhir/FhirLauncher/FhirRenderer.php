<?php

namespace Vanderbilt\REDCap\Classes\Fhir\FhirLauncher;

use System;
use Language;
use eftec\bladeone\BladeOne;
use Vanderbilt\REDCap\Classes\DTOs\REDCapConfigDTO;

class FhirRenderer
{

	/**
	 *
	 * @var BladeOne
	 */
	private $engine;

	/**
	 *
	 * @var FhirRenderer
	 */
	private static $instance;

	public function __construct() {
		$config = REDCapConfigDTO::fromArray(System::getConfigVals());
		$languageGlobal = $config->language_global;
        $lang = Language::getLanguage($languageGlobal);
        
		// set some shared variables for the render engine
		$this->engine = \Renderer::getBlade(__DIR__.'/templates');
		$this->engine->share('SUPER_USER', defined('SUPER_USER') ? SUPER_USER : false );
		$this->engine->share('APP_PATH_DOCROOT', APP_PATH_DOCROOT);
		$this->engine->share('TEMPLATES_DIR', __DIR__.'/templates');
		$this->engine->share('APP_PATH_WEBROOT_FULL', APP_PATH_WEBROOT_FULL);
		$this->engine->share('APP_PATH_IMAGES', APP_PATH_IMAGES);
		$this->engine->share('APP_PATH_CSS', APP_PATH_CSS);
		$this->engine->share('APP_PATH_JS', APP_PATH_JS);
		$this->engine->share('APP_PATH_WEBROOT', APP_PATH_WEBROOT);
		$this->engine->share('APP_PATH_WEBROOT_PARENT', APP_PATH_WEBROOT_PARENT);
		$this->engine->share('APP_PATH_WEBPACK', APP_PATH_WEBPACK);
		$this->engine->share('REDCAP_VERSION', REDCAP_VERSION);
		$this->engine->share('redirectURL', APP_PATH_WEBROOT_FULL.FhirLauncher::REDIRECT_PAGE);
		$this->engine->share('redcapConfig', $config);
		
		$this->engine->share('redcap_csrf_token', $this->getCsrfToken());
		$this->engine->share('lang', $lang);
	}

	/**
	 * get an existing CSRF token
	 * or generate a new one
	 *
	 * @return string
	 */
	private function getCsrfToken() {
		$csrfToken = System::getCsrfToken();
		if(!$csrfToken) $csrfToken = System::generateCsrfToken();
		return $csrfToken ?? '';
	}

	public static function engine() {
		if(!self::$instance) self::$instance = new self();
		return self::$instance->engine;
	}
	
}