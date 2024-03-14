<?php

namespace Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\States;

use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\FhirLauncher;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\FhirRenderer;
use Vanderbilt\REDCap\Classes\Fhir\FhirSystem\FhirSystem;

class ReadyState extends State
{

	public function run() {
		$standaloneLaunchURL = FhirLauncher::getStandaloneLaunchURL();
		$this->context->log("FHIR launcher is ready");
		$renderer = FhirRenderer::engine();
		$ehrSystems = FhirSystem::getEhrSystems();
		// $ehrSystems = [reset($ehrSystems)]; // force only one system for testing purposes
		$html = $renderer->run('standalone_launch', compact('standaloneLaunchURL', 'ehrSystems'));
		// $html .= $debug = $renderer->run('partials.debug', ['session' => $this->context->getSession()]);
		print($html);
	}

}