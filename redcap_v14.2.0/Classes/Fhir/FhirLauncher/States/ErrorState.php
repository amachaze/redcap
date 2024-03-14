<?php

namespace Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\States;

use Exception;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\DTOs\FhirCookieDTO;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\FhirLauncher;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\FhirRenderer;

class ErrorState extends State
{

	public function run() {
		$this->removeCookie();
		
		if($error = $_GET['error'] ?? false) $this->context->addError(new Exception($error, 1));
		if($error_uri = $_GET['error_uri'] ?? false) $this->context->addError(new Exception($error_uri, 1));
		$errors = $this->context->getErrors();
		
		// init template variables
		$logs = [];
		$launchDiagram = null;
		$launchType = null;
		$launchTypeStandalone = FhirLauncher::LAUNCHTYPE_STANDALONE;
		$launchTypeEhr = FhirLauncher::LAUNCHTYPE_EHR;

		$session = $this->context->getSession();
		if($session) {
			$logs = $session->getLogs();
			$launchType = $session->launchType;
			$templatesDir = dirname(__DIR__).'/templates';
			$diagramFileExtension = 'jpg'; // svg or png
			if($launchType===FhirLauncher::LAUNCHTYPE_STANDALONE) $launchDiagram = $templatesDir.'/assets/FHIR launch diagrams-Standalone launch.'.$diagramFileExtension;
			else if ($launchType===FhirLauncher::LAUNCHTYPE_EHR) $launchDiagram = $templatesDir.'/assets/FHIR launch diagrams-EHR launch.'.$diagramFileExtension;

			// destroy the session when an error is encountered (to avoid unwanted autologin, for example)
			$this->context->destroySession();
		}

		$renderer = FhirRenderer::engine();
		$html = $renderer->run('error', compact(
			'errors', 'logs', 'launchDiagram',
			'launchType','launchTypeStandalone','launchTypeEhr'
		));
		print($html);

	}

	/**
	 * remove the FHIR cookie whenever an error is displayed
	 *
	 * @return void
	 */
	function removeCookie() {
		FhirCookieDTO::destroy(FhirLauncher::COOKIE_NAME);
	}

}