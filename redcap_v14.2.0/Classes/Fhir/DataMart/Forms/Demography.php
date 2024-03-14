<?php
namespace Vanderbilt\REDCap\Classes\Fhir\DataMart\Forms;

class Demography extends Form
{
    protected $form_name = 'demography';
    // FHIR data => for fields
    protected $data_mapping = [
        'fhir_id' => 'patient_fhir_id',
        'id' => 'mrn',
        'address-city' => 'address_city',
        'address-district' => 'address_district',
        'address-country' => 'address_country',
        'address-postalCode' => 'address_postalcode',
        'address-state' => 'address_state',
        'address-line' => 'address_line',
        'birthDate' => 'dob',
        'name-given' => 'first_name',
        'name-family' => 'last_name',
        'phone-home' => 'phone_home',
        'phone-mobile' => 'phone_mobile',
        'gender' => 'sex',
        'legal-sex' => 'legal_sex',
        'sex-for-clinical-use' => 'sex_for_clinical_use',
        'ethnicity' => 'ethnicity',
        'race' => 'race',
        'preferred-language' => 'preferred_language',
        'deceasedBoolean' => 'is_deceased',
        'deceasedDateTime' => 'deceased_date_time',
        'email' => 'email',
        'email-2' => 'email_2',
        'email-3' => 'email_3',
        'general-practitioner' => 'general_practitioner',
        'managing-organization' => 'managing_organization',
    ];

    protected $uniquenessFields = [
        'dob',
        'first_name',
        'last_name',
        'sex',
        'ethnicity',
        'race',
    ];

}