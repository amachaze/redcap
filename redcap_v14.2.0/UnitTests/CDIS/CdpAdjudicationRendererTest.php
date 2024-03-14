<?php

use PHPUnit\Framework\TestCase;
use Vanderbilt\REDCap\Classes\Fhir\ClinicalDataPull\AdjudicationTableRenderer;

class CdpAdjudicationRendererTest extends TestCase
{

	public function testRender() {
		$rawData = file_get_contents(__DIR__.'/exampleData.json');
		$data = json_decode($rawData, $assoc=true);
		$project = new Project(69);
		$record = 1;
		$renderer = new AdjudicationTableRenderer($project, $record);
		$renderer->render($data);
	}
}

