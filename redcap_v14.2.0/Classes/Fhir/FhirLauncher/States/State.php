<?php

namespace Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\States;

use ReflectionClass;
use Vanderbilt\REDCap\Classes\Fhir\FhirLauncher\FhirLauncher;

abstract class State implements StateInterface
{

	/**
	 *
	 * @var FhirLauncher
	 */
	protected $context;

	/**
	 *
	 * @param FhirLauncher $context
	 */
	public function __construct($context)
	{
		$this->context = $context;
	}

	public function run() {
		return;
	}

	public function __toString()
	{
		$reflect = new ReflectionClass($this);
		return $reflect->getShortName();
	}

}