<?php
namespace Vanderbilt\REDCap\Classes\Fhir\Endpoints\R4;

use Vanderbilt\REDCap\Classes\Fhir\Endpoints\AbstractEndpoint;
use Vanderbilt\REDCap\Classes\Fhir\Endpoints\EndpointIdentifier;

class ConditionInfection extends AbstractEndpoint
{

  const CATEGORY = 'infection';

  public function getResourceIdentifier()
  {
    return EndpointIdentifier::CONDITION;
  }

  public function getSearchRequest($params=[])
  {
    $params['category'] = self::CATEGORY;
    return parent::getSearchRequest($params);
  }

}