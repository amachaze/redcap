<?php
namespace Vanderbilt\REDCap\Classes\Fhir\Endpoints\R4;


use Vanderbilt\REDCap\Classes\Fhir\Endpoints\AbstractEndpoint;
use Vanderbilt\REDCap\Classes\Fhir\Endpoints\AbstractEndpointFactory;
use Vanderbilt\REDCap\Classes\Fhir\Endpoints\DSTU2\Condition;
use Vanderbilt\REDCap\Classes\Fhir\FhirCategory;

class EndpointFactory extends AbstractEndpointFactory
{

  /**
   * get an endpoint
   *
   * @param string $category
   * @return AbstractEndpoint
   */
  public function makeEndpoint($category)
  {

    $base_url = $this->getBaseUrl();
    switch ($category) {
      case FhirCategory::ALLERGY_INTOLERANCE:
        $endpoint = new AllergyIntolerance($base_url);
        break;
      case FhirCategory::ADVERSE_EVENT:
        $endpoint = new AdverseEvent($base_url);
        break;
      case FhirCategory::DEMOGRAPHICS:
        $endpoint = new Patient($base_url);
        break;
      case FhirCategory::CONDITION:
        $endpoint = new Condition($base_url);
        break;
      case FhirCategory::CONDITION_PROBLEMS:
        $endpoint = new ConditionProblems($base_url);
        break;
      case FhirCategory::CORE_CHARACTERISTICS:
        $endpoint = new ObservationCoreCharacteristics($base_url);
        break;
      case FhirCategory::SMART_DATA:
        $endpoint = new ObservationSmartData($base_url);
        break;
      case FhirCategory::SOCIAL_HISTORY:
        $endpoint = new ObservationSocialHistory($base_url);
        break;
      case FhirCategory::ENCOUNTER:
        $endpoint = new Encounter($base_url);
        break;
      case FhirCategory::IMMUNIZATION:
        $endpoint = new Immunization($base_url);
        break;
      case FhirCategory::MEDICATIONS:
        $endpoint = new MedicationRequest($base_url);
        break;
      case FhirCategory::LABORATORY:
        $endpoint = new ObservationLabs($base_url);
        break;
      case FhirCategory::VITAL_SIGNS:
        $endpoint = new ObservationVitals($base_url);
        break;
      case FhirCategory::RESEARCH_STUDY:
        $endpoint = new ResearchStudy($base_url);
        break;
      case FhirCategory::DIAGNOSIS:
        $endpoint = new ConditionEncounterDiagnosis($base_url);
        break;
      case FhirCategory::DOCUMENT_REFERENCE_CLINICAL_NOTES:
        $endpoint = new DocumentReferenceClinicalNotes($base_url);
        break;
      case FhirCategory::PROCEDURE:
        $endpoint = new Procedure($base_url);
        break;
      case FhirCategory::CONDITION_DENTAL_FINDING:
        $endpoint = new ConditionDentalFinding($base_url);
        break;
      case FhirCategory::CONDITION_GENOMICS:
        $endpoint = new ConditionGenomics($base_url);
        break;
      case FhirCategory::CONDITION_INFECTION:
        $endpoint = new ConditionInfection($base_url);
        break;
      case FhirCategory::CONDITION_MEDICAL_HISTORY:
        $endpoint = new ConditionMedicalHistory($base_url);
        break;
      case FhirCategory::CONDITION_REASON_FOR_VISIT:
        $endpoint = new ConditionReasonForVisit($base_url);
        break;
      case FhirCategory::COVERAGE:
        $endpoint = new Coverage($base_url);
        break;
      case FhirCategory::DEVICE_IMPLANTS:
        $endpoint = new Device($base_url);
        break;
      case FhirCategory::APPOINTMENT_APPOINTMENTS:
        $endpoint = new AppointmentAppointments($base_url);
        break;
      case FhirCategory::APPOINTMENT_SCHEDULED_SURGERIES:
        $endpoint = new AppointmentScheduledSurgeries($base_url);
        break;
      default:
        $endpoint = null;
        break;
    }
    return $endpoint;
  }

}