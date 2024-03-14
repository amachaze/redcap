<?php

namespace Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\States;

use Exception;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\DTOs\SessionDTO;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\FhirRenderer;

class DebugState extends State
{

	public function run() {
		$renderer = FhirRenderer::engine();
		$html = $renderer->run('debug', []);
		print($html);
	}

}