<?php
namespace Vanderbilt\REDCap\Classes\Fhir\FhirMetadata\Decorators;

/**
 * decorator made specifically for CDP projects
 */
class FhirMetadataCdpDecorator extends FhirMetadataAbstractDecorator
{

  /**
   * apply decorator and get a new list
   *
   * @param array $list
   * @return array
   */
  public function getList()
  {
    $metadata_array = $this->fhirMetadata->getList();

    // these will be disabled (still visible)
    $disabledResources = [
      ['key'=>'smart-data', 'reason' => '`SmartData` elements are not available for `Clinical Data Pull` projects.'],
      // ['key'=>'encounters-list', 'reason' => '`Encounter` elements are not available for `Clinical Data Pull` projects.'],
      // ['key'=>'coverage-list', 'reason' => '`Coverage` elements are not available for `Clinical Data Pull` projects.'],
      // ['key'=>'device-list', 'reason' => '`Device` elements are not available for `Clinical Data Pull` projects.'],
      // ['key'=>'immunizations-list', 'reason' => '`Immunization` elements are not available for `Clinical Data Pull` projects.'],
      // ['key'=>'procedure-list', 'reason' => '`Procedure` elements are not available for `Clinical Data Pull` projects.'],
      ['key'=>'appointment-scheduled-procedures-list', 'reason' => '`Scheduled Procedure` elements are not available for `Clinical Data Pull` projects.'],
      ['key'=>'appointment-appointments-list', 'reason' => '`Appointment` elements are not available for `Clinical Data Pull` projects.'],
    ];
    foreach ($disabledResources as $disabledResource) {
      $key = $disabledResource['key'];
      $reason = $disabledResource['reason'];
      $this->disableKey($key, $reason, $metadata_array);
    }

    // these will be deleted
    $hiddenResources = [];
    foreach ($hiddenResources as $hiddenResource) {
      $this->hideKey($hiddenResource, $metadata_array);
    }

    return $metadata_array;
  }
}