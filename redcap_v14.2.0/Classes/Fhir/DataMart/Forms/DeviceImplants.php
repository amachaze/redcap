<?php
namespace Vanderbilt\REDCap\Classes\Fhir\DataMart\Forms;

class DeviceImplants extends Form
{

    protected $form_name = 'device_implants';

    // FHIR data => for fields
    protected $data_mapping = [
        'status' => 'coverage_status',
        'period_start' => 'coverage_period_start',
        'period_end' => 'coverage_period_end',
    ];

    /**
     * keys check if the data in the instance is similar
     * to the one provided
     *
     * @var array $keys
     */
    protected $uniquenessFields = ['coverage_status', 'period_start', 'period_end'];

}