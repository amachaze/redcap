<?php
namespace Vanderbilt\REDCap\Classes\Fhir\Resources\Shared;

use Vanderbilt\REDCap\Classes\Fhir\Resources\AbstractResource;

class Patient extends AbstractResource
{

  public function getFhirID()
  {
    return strval($this->scraper()->id); // strval equals calling ->join(' ')
  }

  public function getIdentifier($system='')
  {
    return $this->scraper()
      ->identifier
      ->where('system', '=', $system)
      ->value
      ->join(' ');
  }

  public function getIdentifiers()
  {
    return $this->scraper()
      ->identifier
      ->getData();
  }
  
  public function getNameGiven($index=0)
  {
    return $this->scraper()
      ->name
      ->where('use', '=', 'official')
      ->given
      ->join(' ');
  }
  
  public function getNameFamily($index=0)
  {
    return $this->scraper()
      ->name
      ->where('use', '=', 'official')
      ->family
      ->join(' ');
  }
  
  public function getBirthDate()
  {
    return $this->scraper()
      ->birthDate
      ->join(' ');
  }
  
  public function getGenderCode()
  {
    $valueCodeableConcept = $this->scraper()
      ->extension
      ->where('url', 'like', 'birth-?sex$')
      ->valueCodeableConcept
      ->coding->code->join();
    
    if(!empty($valueCodeableConcept)) return $valueCodeableConcept;

    $valueCode = $this->scraper()
      ->extension
      ->where('url', 'like', 'birth-?sex$')
      ->valueCode->join(' ');

    return $valueCode;
  }

  public function getGenderText()
  {
    $valueCodeableConcept = $this->scraper()
      ->extension
      ->where('url', 'like', 'birth-?sex$')
      ->valueCodeableConcept
      ->coding->display->join();
    if(!(empty($valueCodeableConcept))) return $valueCodeableConcept;

    $gender = $this->scraper()
      ->gender
      ->join(' ');
      return $gender;
  }

  public function getGender()
  {
    $getCode = function($value) {
      $gender_mapping = [
        'female' => 'F',
        'male' => 'M',
        'f' => 'F',
        'm' => 'M',
        'unknown' => 'UNK',
        'unk' => 'UNK',
      ];
      $code = $gender_mapping[strtolower($value)] ?? 'UNK';
      return $code;
    };
    $genderCode = $this->getGenderCode();
    if($genderCode) return $genderCode;
    $genderText = $this->getGenderText();
    $code = $getCode($genderText);
    return $code;
  }

  public function getLegalSex() {
    return $this->scraper()
      ->extension
      ->where('url', 'like', 'legal-sex$')
      ->valueCodeableConcept
      ->coding->display->join();
  }

  public function getSexForClinicalUse() {
    return $this->scraper()
      ->extension
      ->where('url', 'like', 'sex-for-clinical-use$')
      ->valueCodeableConcept
      ->coding->display->join();
  }
  
  public function getRaceCode($index=0)
  {
    $data = $this->scraper()
      ->extension
      ->where('url', 'like', 'race$')
      ->any('=', 'code'); // select any 'code' child
    return $data[$index]->join(''); // only get one race
  }

  public function getEthnicityCode()
  {
    return $this->scraper()
      ->extension
      ->where('url', 'like', 'ethnicity$')
      ->any('=', 'code')->join('');
  }
  
  public function getAddressLine()
  {
    $address = $this->scraper()
      ->address
      ->where('use', '=', 'home')
      ->line->join(' ');
    if (!$address) {
      $address= $this->scraper()
        ->address
        ->line->join(' ');
    }
    return $address;
  }

  public function getAddressDistrict()
  {
    $address = $this->scraper()
      ->address
      ->where('use', '=', 'home')
      ->district->join('');
    if (!$address) {
      $address= $this->scraper()
        ->address
        ->district->join('');
    }
    return $address;
  }
  
  public function getAddressCity()
  {
    $address = $this->scraper()
      ->address
      ->where('use', '=', 'home')
      ->city->join('');
    if (!$address) {
      $address= $this->scraper()
        ->address
        ->city->join('');
    }
    return $address;
  }
  
  public function getAddressState()
  {
    $address = $this->scraper()
      ->address
      ->where('use', '=', 'home')
      ->state->join('');
    if (!$address) {
      $address= $this->scraper()
        ->address
        ->state->join('');
    }
    return $address;
  }
  
  public function getAddressPostalCode()
  {
    $address = $this->scraper()
      ->address
      ->where('use', '=', 'home')
      ->postalCode->join('');
    if (!$address) {
      $address= $this->scraper()
        ->address
        ->postalCode->join('');
    }
    return $address;
  }
  
  public function getAddressCountry()
  {
    $address = $this->scraper()
      ->address
      ->where('use', '=', 'home')
      ->country->join('');
    if (!$address) {
      $address= $this->scraper()
        ->address
        ->country->join('');
    }
    return $address;
  }
  
  public function getPhoneHome($index=0)
  {
    return $this->scraper()
      ->telecom
      ->where('system', '=', 'phone')
      ->where('use', '=', 'home')
      ->value[$index]->join('');
  }
  
  public function getPhoneMobile($index=0)
  {
    return $this->scraper()
      ->telecom
      ->where('system', '=', 'phone')
      ->where('use', '=', 'mobile')
      ->value[$index]->join('');
  }
  
  /**
   * return 0 or 1, as expected by a radio in REDCap
   *
   * @return 0|1
   */
  public function isDeceased() 
  {
    $deceasedDateTime = $this->getDeceasedDateTime();
    if(!empty($deceasedDateTime)) return 1;
    return $this->getDeceasedBoolean();
  }

  /**
   * return 0 or 1, as expected by a radio in REDCap
   *
   * @return 0|1
   */
  public function getDeceasedBoolean()
  {
    $deceased = $this->scraper()->deceasedBoolean->join('');
    $booleanValue = filter_var($deceased, FILTER_VALIDATE_BOOLEAN);
    return $booleanValue ? 1 : 0;
  }
  
  public function getDeceasedDateTime()
  {
    return $this->scraper()->deceasedDateTime->join('');
  }
  
  public function getPreferredLanguage()
  {
    return $this->scraper()
      ->communication
      ->where('preferred', '=', true)
      ->language->text->join('');
  }
  
  public function getEmail($index=0)
  {
    return $this->scraper()
      ->telecom
      ->where('system', '=', 'email')
      ->value[$index]->join('');
  }

  /**
   * list of general practitioners, semicolon separated
   *
   * @return string
   */
  public function getGeneralPractitioner() {
    return $this->scraper()->generalPractitioner->display->join('; ');
  }

  public function getManagingOrganization()
  {
    return $this->scraper()->managingOrganization->display->join('');
  }

  /**
   * get a callable based on a mapping field
   *
   * @param string $field
   * @return callable
   */
  public function getCallable($field)
  {
    switch ($field) {
      case 'fhir_id':
        $callable = function() { return $this->getFhirID(); };
        break;
      case 'name-given':
        $callable = function() { return $this->getNameGiven(); };
        break;
      case 'name-family':
        $callable = function() { return $this->getNameFamily(); };
        break;
      case 'birthDate':
        $callable = function() { return $this->getBirthDate(); };
        break;
      case 'gender':
        $callable = function() { return $this->getGender(); };
        break;
      case 'gender-code':
        $callable = function() { return $this->getGenderCode(); };
        break;
      case 'gender-text':
        $callable = function() { return $this->getGenderText(); };
        break;
      case 'legal-sex':
        $callable = function() { return $this->getLegalSex(); };
        break;
      case 'sex-for-clinical-use':
        $callable = function() { return $this->getSexForClinicalUse(); };
        break;
      case 'race':
        $callable = function() { return $this->getRaceCode(0); };
        break;
      case 'ethnicity':
        $callable = function() { return $this->getEthnicityCode(); };
        break;
      case 'address-line':
        $callable = function() { return $this->getAddressLine(); };
        break;
      case 'address-city':
        $callable = function() { return $this->getAddressCity(); };
        break;
      case 'address-state':
        $callable = function() { return $this->getAddressState(); };
        break;
      case 'address-postalCode':
        $callable = function() { return $this->getAddressPostalCode(); };
        break;
      case 'address-country':
        $callable = function() { return $this->getAddressCountry(); };
        break;
      case 'phone-home':
        $callable = function() { return $this->getPhoneHome(); };
        break;
      case 'phone-home-2':
        $callable = function() { return $this->getPhoneHome(1); };
        break;
      case 'phone-home-3':
        $callable = function() { return $this->getPhoneHome(2); };
        break;
      case 'phone-mobile':
        $callable = function() { return $this->getPhoneMobile(); };
        break;
      case 'phone-mobile-2':
        $callable = function() { return $this->getPhoneMobile(1); };
        break;
      case 'phone-mobile-3':
        $callable = function() { return $this->getPhoneMobile(2); };
        break;
      case 'deceasedBoolean':
        $callable = function() { return intval($this->isDeceased()); };
        break;
      case 'deceasedDateTime':
        $callable = function() { return $this->getDeceasedDateTime(); };
        break;
      case 'preferred-language':
        $callable = function() { return $this->getPreferredLanguage(); };
        break;
      case 'email':
        $callable = function() { return $this->getEmail(); };
        break;
      case 'email-2':
        $callable = function() { return $this->getEmail(1); };
        break;
      case 'email-3':
        $callable = function() { return $this->getEmail(2); };
        break;
      case 'managing-organization':
        $callable = function() { return $this->getManagingOrganization(); };
        break;
      case 'general-practitioner':
        $callable = function() { return $this->getGeneralPractitioner(); };
        break;
      default:
        $callable =function() { return ''; };
        break;
      }
      return $callable;
  }

  public function getData()
  {
    $data = [
      'fhir_id'               =>  $this->getFhirID(),
      'name-given'            =>  $this->getNameGiven(),
      'name-family'           =>  $this->getNameFamily(),
      'birthDate'             =>  $this->getBirthDate(),
      'gender'                =>  $this->getGender(),
      'gender-code'           =>  $this->getGenderCode(),
      'gender-text'           =>  $this->getGenderText(),
      'legal-sex'             => $this->getLegalSex(),
      'sex-for-clinical-use'  => $this->getSexForClinicalUse(),
      'race'                  =>  $this->getRaceCode(0),
      'ethnicity'             =>  $this->getEthnicityCode(),
      'address-line'          =>  $this->getAddressLine(),
      'address-district'      =>  $this->getAddressDistrict(),
      'address-city'          =>  $this->getAddressCity(),
      'address-state'         =>  $this->getAddressState(),
      'address-postalCode'    =>  $this->getAddressPostalCode(),
      'address-country'       =>  $this->getAddressCountry(),
      'phone-home'            =>  $this->getPhoneHome(),
      'phone-home-2'          =>  $this->getPhoneHome(1),
      'phone-home-3'          =>  $this->getPhoneHome(2),
      'phone-mobile'          =>  $this->getPhoneMobile(),
      'phone-mobile-2'        =>  $this->getPhoneMobile(1),
      'phone-mobile-3'        =>  $this->getPhoneMobile(2),
      'general-practitioner' =>  $this->getGeneralPractitioner(),
      'managing-organization' =>  $this->getManagingOrganization(),
      'deceasedBoolean'       =>  intval($this->isDeceased()), // cast to int
      'deceasedBooleanRaw'    =>  $this->getDeceasedBoolean(), // cast to int
      'deceasedDateTime'      =>  $this->getDeceasedDateTime(),
      'preferred-language'    =>  $this->getPreferredLanguage(),
      'email'                 =>  $this->getEmail(),
      'email-2'               =>  $this->getEmail(1),
      'email-3'               =>  $this->getEmail(2),
    ];
    return $data;
  }
  
}