<?php

namespace Vanderbilt\REDCap\Classes\Fhir;

use System;
use Exception;
use Vanderbilt\REDCap\Classes\Fhir\Endpoints\FhirRequest;
use Vanderbilt\REDCap\Classes\Fhir\FhirSystem\FhirSystem;
use Vanderbilt\REDCap\Classes\Fhir\TokenManager\FhirToken;
use Vanderbilt\REDCap\Classes\Fhir\Resources\AbstractResource;

final class FhirClientResponse {
    /**
     * status for data fetched without HTTP errors
     */
    const STATUS_OK = 200;

    /**
     * @var integer
     */
    public $status = self::STATUS_OK;

    /**
     * @var FhirToken
     */
    public $token;

    /**
     * @var FhirRequest
     */
    public $request;

    /**
     * @var integer
     */
    public $user_id;

    /**
     * @var string
     */
    public $access_token;

    /**
     * @var integer
     */
    public $project_id;

    /**
     * @var array
     */
    public $mapping;

    /**
     * @var string
     */
    public $timestamp;

    /**
     * @var array
     */
    public $entries = [];

    /**
     * @var string
     */
    public $fhir_id;

    /**
     * @var string
     */
    public $resource_type;

    /**
     * @var AbstractResource
     */
    public $resource = null;

    /**
     * @var string
     */
    private $mrn = null;

    /**
     * @var Exception
     */
    public $error = null;

    /**
     *
     * @var FhirSystem
     */
    private $fhirSystem;

    /**
     *
     * @param FhirSystem $fhirSystem
     * @param FhirRequest $request
     * @param int $project_id
     * @param int $user_id
     */
    public function __construct(FhirSystem $fhirSystem, $request, $project_id, $user_id)
    {
        $this->fhirSystem = $fhirSystem;
        $this->setRequest($request);
        $this->project_id = $project_id;
        $this->user_id = $user_id; // set the user ID
        $this->updateTimestamp();
    }


    public function updateTimestamp()
    {
        $this->timestamp = date_create()->format('Y-m-d H:i');
    }

    /**
     *
     * @param FhirRequest $request
     * @return void
     */
    public function setRequest(FhirRequest $request)
    {
        if($request instanceof FhirRequest) {
            $this->request = $request;
            $this->fhir_id = $request->extractIdentifier();

            $resource_type = $request->getResourceName($this->fhirSystem->getFhirBaseUrl());
            if($resource_type) $this->resource_type = $resource_type;
            else $this->resource_type = $request->getURL();
        }else {
            $this->request = $this->fhir_id = $this->resource_type = null;
        }
    }

    public function setResourceType($type) {
        $this->resource_type = $type;
    }

    /**
     *
     * @param FhirToken $token
     * @param string $user_id
     * @return void
     */
    public function setToken(FhirToken $token)
    {
        if($token instanceof FhirToken) {
            $this->token = $token;
            $this->user_id = $token->token_owner; // override the user IDand use the one associated with the token
            $this->access_token = $token->access_token;
        }else {
            $this->token = $this->access_token = null;
        }
    }

    /**
     *
     * @param AbstractResource $resource
     * @return void
     */
    public function setResource($resource) {
        $this->resource = $resource;
    }

    /**
     *
     * @param string $mrn
     * @return void
     */
    public function setMrn($mrn) {
        $this->mrn = strval($mrn);
    }

    /**
     *
     * @return string MRN
     */
    public function getMrn() {
        return $this->mrn;
    }

    /**
     *
     * @param Exception $resource
     * @return void
     */
    public function setError($error) {
        $this->error = $error;
    }

    public function hasError()
    {
        return $this->error instanceof Exception;
    }
}