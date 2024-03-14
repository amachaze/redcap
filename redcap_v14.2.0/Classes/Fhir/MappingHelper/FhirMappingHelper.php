<?php
namespace Vanderbilt\REDCap\Classes\Fhir\MappingHelper;

use User;
use Exception;
use UserRights;
use DynamicDataPull;
use Vanderbilt\REDCap\Classes\Fhir\DataMart\DataMart;
use Vanderbilt\REDCap\Classes\Fhir\FhirSystem\FhirSystem;
use Vanderbilt\REDCap\Classes\Fhir\Facades\FhirClientFacade;
use Vanderbilt\REDCap\Classes\Fhir\DataMart\DataMartRevision;
use Vanderbilt\REDCap\Classes\Fhir\Endpoints\AbstractEndpoint;
use Vanderbilt\REDCap\Classes\Fhir\Resources\AbstractResource;
use Vanderbilt\REDCap\Classes\Fhir\MappingHelper\EndpointOptionsVisitor;
use Vanderbilt\REDCap\Classes\Fhir\FhirMetadata\Decorators\FhirMetadataAbstractDecorator;
use Vanderbilt\REDCap\Classes\Fhir\FhirMetadata\Decorators\FhirMetadataMappingHelperDecorator;

class FhirMappingHelper
{
    const PROJECT_TYPE_DATAMART = 'datamart';
    const PROJECT_TYPE_CDP = 'cdp';

    private $project_id;
    private $user_id;
    private $metadataSource; // cached metadata source
    /**
     *
     * @param integer $project_id
     * @param integer $user_id
     */
    public function __construct($project_id, $user_id)
    {
        $this->project_id = $project_id;
        $this->user_id = $user_id;
    }

    /**
     * @return integer
     */
    public function getProjectId()
    {
        return $this->project_id;
    }

    /**
     * @return integer
     */
    public function getUserId()
    {
        return $this->user_id;
    }

    /**
     * print the link button pointing to the Mapping Helper page
     *
     * @param integer $project_id
     * @return void
     */
    public static function printLink($project_id)
    {
        $link = self::getLink($project_id);
        $html = sprintf('<a class="btn btn-primaryrc btn-xs" style="color:#fff !important;" href="%s">Mapping Helper</a>', $link);

        print $html;
    }

    /**
     * print the link button pointing to the Mapping Helper page
     *
     * @param integer $project_id
     * @return void
     */
    public static function getLink($project_id)
    {
        $parseUrl = function($URL) {
            $parts = parse_url($URL);
            $scheme = $parts['scheme'] ?? '';
            $host = $parts['host'] ?? '';
            $base = sprintf("%s://%s",$scheme, $host);
            return $base;
        };
        $root = $parseUrl(APP_PATH_WEBROOT_FULL);
        $version_dir = APP_PATH_WEBROOT;
        $url = $root.$version_dir."index.php?pid={$project_id}&route=FhirMappingHelperController:index";
        $double_slashes_regexp = "#(?<!https:)(?<!http:)\/\/#";
        $link = preg_replace($double_slashes_regexp, '/', $url);
        return $link;
    }

    /**
     *
     * @param Project $project
     * @return DataMartRevision|false
     */
    public function getDatamartRevision($project)
    {
        $datamart_enabled = boolval($project->project['datamart_enabled']);
        if(!$datamart_enabled) return false;
        $active_revision = DataMartRevision::getActive($project->project_id);
        return $active_revision;
    }

    public function getClinicalDataPullMapping()
    {
        $query_string = sprintf(
            'SELECT * FROM redcap_ddp_mapping
            WHERE project_id = %u', $this->project_id
        );
        $result = db_query($query_string);
        $mapping = array();
        while($row = db_fetch_assoc($result))
        {
            $mapping[] = $row;
        }
        return $mapping;
    }

    public function getNextResource($fhir_category = null) {
        $categories = [
            'Patient',
            'Immunization',
            'Allergy Intolerance',
            'Encounter',
            'Condition',
            'Core Characteristics',
            'Medications',
            'Laboratory',
            'Vital Signs',
            'Social History',
            'Adverse Event',
        ];
        $index = array_search($fhir_category, $categories) ?? -1;
        $nextIndex = intval($index) + 1;
        $nextCategory = $categories[$nextIndex] ?? null;
        return $nextCategory;
    }

    /**
     * Undocumented function
     *
     * @param string $fhir_category
     * @param string $mrn
     * @param array $options
     * @return FhirResource
     */
    public function getResourceByMrn($fhir_category, $mrn, $options=[])
    {
        /** 
         * create an error with a reference to all previous errors
         * @param Exception[] $errors
         */
        $combineErrors = function($errors) {
            $last = current($errors);
            while($next = next($errors)) {
                $last = new Exception($next->getMessage(), $next->getCode(), $last);
            }
            return $last;
        };
        $fhirSystem = FhirSystem::fromProjectId($this->project_id);
        $fhirClient = FhirClientFacade::getInstance($fhirSystem, $this->project_id, $this->user_id);
        
        $patient_id = $fhirClient->getPatientID($mrn);
        if(!$patient_id) throw new \Exception("Patient ID not found", 404);

        
        $endpoint_factory = $fhirClient->getEndpointFactory();
        $endpoint = $endpoint_factory->makeEndpoint($fhir_category);
        if(!($endpoint instanceof AbstractEndpoint)) {
            throw new \Exception(sprintf('No endpoint available for the category %s', $fhir_category), 1);
        };
        $options_visitor = new EndpointOptionsVisitor($patient_id, $options, $fhirClient);
        $params = $endpoint->accept($options_visitor);
        $request = $endpoint->getSearchRequest($params);
        
        $response = [];
        if($request) {
            $clientResponse = $fhirClient->sendRequest($request);
            if($fhirClient->hasErrors()) {
                $combinedErrors = $combineErrors($fhirClient->getErrors());
                throw $combinedErrors;
            }
            $resource = $clientResponse->resource;
            // $fhir_code = $fhirClient->getFhirVersionManager()->getFhirCode();
            $resource_visitor = new ResourceVisitor($this);
            $data = $resource->accept($resource_visitor);
            $response['data'] = $data;
            $response['metadata'] = $resource->getMetadata();
        }
        return $response;
    }

    /**
     *
     * @param string $relative_url
     * @param string $method
     * @param array $options
     * @return AbstractResource
     */
    public function getCustomFhirResource($relative_url, $method='GET', $options=[] )
    {   
        $fhirSystem = FhirSystem::fromProjectId($this->project_id);
        $fhir_client = FhirClientFacade::getInstance($fhirSystem, $this->project_id, $this->user_id);
        $queryOptions = ['query'=>$options];
        $fhir_request = $fhir_client->getFhirRequest($relative_url, $method, $queryOptions);
        $clientResponse = $fhir_client->sendRequest($fhir_request);
        $resource = $clientResponse->resource;
        if(is_null($resource) && $clientResponse->hasError()) throw $clientResponse->error;
        $resource = $clientResponse->resource;
        return $resource;
    }

    /**
     * check if a user can use the mapping helper in a specific project
     *
     * @param int $user_id
     * @param int $project_id
     * @return boolean
     */
    public static function availableToUser($user_id, $project_id) {
        $canCreateDataMartRevisions = function($project_id) {
            $project = new \Project($project_id);
            $projectInfo = $project->project;
            $datamart_allow_create_revision = $projectInfo['datamart_allow_create_revision'] ?? 0;
            return boolval($datamart_allow_create_revision);
        };
        $hasMappingPrivileges = function($username, $project_id) {
            $user_rights = UserRights::getPrivileges($project_id, $username)[$project_id][$username] ?? [];
            $realtime_webservice_mapping = $user_rights['realtime_webservice_mapping'] ?? 0;
            return boolval($realtime_webservice_mapping);
        };
        $hasCreateDatamartProjectsPrivileges = function($userInfo) {
            $canCreateDataMartProject = $userInfo['fhir_data_mart_create_project'] ?? 0;
            return boolval($canCreateDataMartProject);
        };

        $userInfo = User::getUserInfoByUiid($user_id);
        
        $superUser = boolval($userInfo['super_user'] ?? 0);
        $hasMappingPrivileges = $hasMappingPrivileges(($userInfo['username'] ?? ''), $project_id);
        $canCreateDataMartRevisions = $canCreateDataMartRevisions($project_id);
        $canCreateDatamartProjects = $hasCreateDatamartProjectsPrivileges($userInfo);
        return $superUser || $hasMappingPrivileges || $canCreateDataMartRevisions || $canCreateDatamartProjects;
    }

    function getAvailableCategoriesFromMetadata() {
        $metadataSource = $this->getMetadataSource();
        $uniqueCategories = array_unique(array_column($metadataSource, 'category'));
        $nonEmpty = array_filter($uniqueCategories, function($category) {
            if(!is_string($category)) return false;
            return trim($category) !== '';
        });
        return array_values($nonEmpty); // reset indexes
    }

    function getMetadataSource() {
        $getProjectTypeMetadataSource = function() {
            $projectType = $this->getProjectType();
            if($projectType === self::PROJECT_TYPE_CDP) {
                $ddp = new \DynamicDataPull($this->project_id, 'FHIR');
                return $ddp->getFhirMetadataSource($this->project_id);
            } else if($projectType === self::PROJECT_TYPE_DATAMART) {
                $datamart = new DataMart($this->user_id);
                return $datamart->getFhirMetadataSource($this->project_id);
            }
        };
        if(is_null($this->metadataSource)) {
            // cache in private variable
            $metadataSource = $getProjectTypeMetadataSource();
            if($metadataSource instanceof FhirMetadataAbstractDecorator) {
                $metadataSource = new FhirMetadataMappingHelperDecorator($metadataSource, $this->project_id);
                $this->metadataSource = $metadataSource->getList();
            }else {
                $this->metadataSource = [];
            }
        }
        return $this->metadataSource;
    }

    function getProjectType() {
        $project = new \Project($this->project_id);
        $datamartEnabled = $project->project['datamart_enabled'] ?? null;
        if($datamartEnabled === '1') return self::PROJECT_TYPE_DATAMART;
        $fhirEnabled = $project->project['realtime_webservice_type'] ?? null;
        if($fhirEnabled !== 'FHIR' ) return;
        return self::PROJECT_TYPE_CDP;
    }

    /**
     * get mapped fields if the project is a CDP or CDM
     *
     * @return array
     */
    function getProjectMappingData() {
        $fields = [];
        $projectType = $this->getProjectType();
        if($projectType === self::PROJECT_TYPE_DATAMART) {
            $datamart_active_revision = DataMartRevision::getActive($this->project_id);
            $fields = $datamart_active_revision->fields ?? [];
            return $fields;
        }else if ($projectType === self::PROJECT_TYPE_CDP) {
            $cdp_mapping = $this->getClinicalDataPullMapping($this->project_id);
            $fields = array_column($cdp_mapping, 'external_source_field_name');
        }
        return $fields;
    }


    /**
     * get a list of codes that are available in REDCap, but not used
     *
     * @return void
     */
    public function getBlocklistedCodes()
    {
        $list = array();
        // Vital signs
        $list[] = new BlocklistCode('8716-3','too generic');
        return $list;
    }
}