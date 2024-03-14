<?php

use PHPUnit\Framework\TestCase;
use Vanderbilt\REDCap\Classes\DTOs\REDCapConfigDTO;
use Vanderbilt\REDCap\Classes\Fhir\ClinicalDataPull\Mapper;
use Vanderbilt\REDCap\Classes\Fhir\FhirSystem\FhirSystem;
use Vanderbilt\REDCap\Classes\Fhir\TokenManager\FhirTokenManager;

class FhirTokenManagerTest extends TestCase
{

	const PATIENT_ID = '1234567890test';
	const ACCESS_TOKEN = '1234567890testaccesstoken123';

	public function testRemoveCachedPatient() {
		$fhirSystem = FhirSystem::getDefault();
		if(!$fhirSystem) return $this->assertTrue(true, 'No FHIR system available; ending test.');
		$ehrID = $fhirSystem->getEhrId();
		$insertQuery = "INSERT INTO `redcap_ehr_access_tokens` (`patient`, `access_token`, `ehr_id`) VALUES (?, ?, ?)";
		$result = db_query($insertQuery, [self::PATIENT_ID, self::ACCESS_TOKEN, $ehrID]);

		$tokenManager = new FhirTokenManager($fhirSystem);
		$removed = $tokenManager->removeCachedPatient(self::PATIENT_ID);
		$this->assertTrue($removed);
	}

	public function testDeleteAccessToken() {
		$fhirSystem = FhirSystem::getDefault();
		if(!$fhirSystem) return $this->assertTrue(true, 'No FHIR system available; ending test.');
		$ehrID = $fhirSystem->getEhrId();
		$insertQuery = "INSERT INTO `redcap_ehr_access_tokens` (`patient`, `access_token`, `ehr_id`) VALUES (?, ?, ?)";
		$result = db_query($insertQuery, [self::PATIENT_ID, self::ACCESS_TOKEN, $ehrID]);

		$tokenManager = new FhirTokenManager($fhirSystem);
		$removed = $tokenManager->deleteAccessToken(self::ACCESS_TOKEN);
		$this->assertTrue($removed);
	}

	public function testCanRefreshToken() {
		$fhirSystem = FhirSystem::getDefault();
		if(!$fhirSystem) return $this->assertTrue(true, 'No FHIR system available; ending test.');
		$userid = 2;
		$tokenManager = new FhirTokenManager($fhirSystem, $userid);
		$token = $tokenManager->getToken();
		if(!$token) return $this->assertTrue(true, 'No token available; ending test.');

		$refreshToken = $token->refresh_token ?? null;
		$tokenInfo = $tokenManager->refreshToken($refreshToken);
		$access_token = $tokenInfo->access_token;
		$expires_in = $tokenInfo->expires_in;
		$this->assertIsString($access_token);
		$this->assertIsNumeric($expires_in);
	}



	
}

