<?php
namespace Vanderbilt\REDCap\Classes\BreakTheGlass;

use DateTime;
use Exception;
use SplObserver;
use Vanderbilt\REDCap\Classes\Fhir\FhirEhr;
use Vanderbilt\REDCap\Classes\Fhir\FhirClient;
use Vanderbilt\REDCap\Classes\Fhir\FhirCategory;
use Vanderbilt\REDCap\Classes\DTOs\REDCapConfigDTO;
use Vanderbilt\REDCap\Classes\DTOs\REDCapProjectDTO;
use Vanderbilt\REDCap\Classes\Fhir\FhirSystem\FhirSystem;
use Vanderbilt\REDCap\Classes\Utility\FileCache\FileCache;
use Vanderbilt\REDCap\Classes\BreakTheGlass\DTOs\AcceptDTO;
use Vanderbilt\REDCap\Classes\BreakTheGlass\DTOs\ResultDTO;
use Vanderbilt\REDCap\Classes\Fhir\Facades\FhirClientFacade;
use Vanderbilt\REDCap\Classes\Fhir\Resources\Shared\Patient;
use Vanderbilt\REDCap\Classes\Fhir\Endpoints\AbstractEndpoint;
use Vanderbilt\REDCap\Classes\Fhir\Resources\AbstractResource;
use Vanderbilt\REDCap\Classes\Fhir\TokenManager\FhirTokenManager;
use Vanderbilt\REDCap\Classes\BreakTheGlass\DTOs\ProtectedPatientDTO;
use Vanderbilt\REDCap\Classes\Fhir\Resources\Shared\OperationOutcome;

class GlassBreaker implements SplObserver
{
    /**
     * authorization modes (REDCap setting)
     * 
     * disabled: Break the glass is disabled 
     * enabled: Use an OAuth2 access token and the standard FHIR base URL
     */
    const AUTHORIZATION_MODE_DISABLED = 'disabled';
    const AUTHORIZATION_MODE_ENABLED = 'enabled';

    /**
     *
     * @var FhirSystem
     */
    private $fhirSystem;

    private $userID;

    private $ehrUSER;

    /**
     *
     * @var REDCapConfigDTO
     */
    private $redcapConfig;


    /**
     * the API class
     *
     * @var API
     */
    public $api;

    /**
     *
     * @param FhirSystem $fhirSystem
     * @param integer $userID
     */
    public function __construct(FhirSystem $fhirSystem, $userID)
    {
        $this->fhirSystem = $fhirSystem;
        $this->userID = $userID;
        $this->ehrUSER = $this->getEhrMappedUsername($userID);
        
        $this->redcapConfig = $config = REDCapConfigDTO::fromDB();
        $fhirBaseUrl = $fhirSystem->getFhirBaseUrl();
        $epicClientID = $config->fhir_client_id;
        $this->api = new API($fhirBaseUrl, $epicClientID);
    }


    /**
     * provide settings for the forntend app
     *
     * @return void
     */
    public function getSettings() {
        $settings = [
            'initialize' => $this->initialize(),
            'ehrUser' => $this->ehrUSER,
            'userTypes' => BreakTheGlassTypes::userTypes(),
            'userType' => $this->redcapConfig->fhir_break_the_glass_ehr_usertype,
        ];
        return $settings;
    }

    /**
     * return if the Glass Breaker is enabled in the system
     *
     * @return boolean
     */
    public static function isSystemEnabled()
    {
        $config = REDCapConfigDTO::fromDB();
        $enabled = $config->fhir_break_the_glass_enabled ?? '';
        return strcasecmp($enabled, self::AUTHORIZATION_MODE_ENABLED)===0;
    }

    /**
     * check if break the glass can be enabled
     * in a project
     *
     * @return boolean
     */
    public static function isAvailable($project_id)
    {
        if(!isinteger($project_id)) return false;
        if(!self::isSystemEnabled()) return false;
        // continue only if the project is FHIR enabled
        if(!FhirEhr::isFhirEnabledInProject($project_id)) return false;
        return true;
    }
    
    public static function isEnabled($project_id)
    {
        if(!self::isSystemEnabled()) return false;
        $projectConfig = REDCapProjectDTO::fromProjectID($project_id);
        return $projectConfig->break_the_glass_enabled==1;
    }

    /**
     * getter for the authorization mode
     *
     * @return string
     */
    private function getAccessToken()
    {
        $token_manager = new FhirTokenManager($this->fhirSystem, $this->userID);
        $access_token = $token_manager->getAccessToken();
        return $access_token;
    }

    /**
     * get the initialize data from the EHR system
     * data is cached to minimize calls
     *
     * @return array
     */
    public function initialize() {
        $fhirBaseUrl = $this->fhirSystem->getFhirBaseUrl();
        $fileCache = new FileCache(__CLASS__);
        $key = "initialize_$fhirBaseUrl";
        $cached = $fileCache->get($key);
        if($cached) {
            $decoded = json_decode($cached, true);
            if($decoded) return $decoded;
            else $fileCache->delete($key); // delete data since cannot be decoded
        }
        $accessToken = $this->getAccessToken();
        if($accessToken===false) return;
        $response = $this->api->initialize($accessToken);
        $fileCache->set($key, json_encode($response), 60*60); // save to cache
        return $response;
    }

    public function accept($project_id, $mrns, $params) {
        $acceptOne = function($acceptDTO) {
            $accessToken = $this->getAccessToken();
            return $this->api->accept($accessToken, $acceptDTO);
        };
        /**
         * @param AcceptDTO $acceptDTO
         */
        $checkParams = function($acceptDTO) {
            $errors = [];
            if(empty($acceptDTO->FhirBTGToken)) $errors[] = "a FHIR bgt token is required";
            if(empty($acceptDTO->UserID)) $errors[] = "a EHR user is required";
            if(empty($acceptDTO->UserIDType)) $errors[] = "a EHR user type is required";
            if(!empty($errors)) {
                $errorMessage = sprintf("Errors: %s", implode("\n ", $errors));
                throw new Exception($errorMessage, 400);
            }
        };
        
        $results = [];
        
        $list = $this->getProtectedMrnList($project_id);
        foreach($mrns as $mrn) {
            try {
                $patientDTO = $list[$mrn] ?? false;
                if(!$patientDTO) {
                    // an MRN must be registered in the cache with an associated FHIR btg token
                    $results[] = new ResultDTO([
                        'mrn' => $mrn,
                        'status' => ResultDTO::STATUS_SKIPPED,
                        'details' => 'the provided MRN was not found in the cache',
                    ]);
                    continue;
                }
                if($patientDTO->isExpired()) {
                    // try to get a fresh token
                    $fhirBtgToken = $this->refreshBTGToken($project_id, $this->userID, $patientDTO);
                    $patientDTO->fhirBtgToken = $fhirBtgToken;
                }
                $acceptDTO = AcceptDTO::fromArray($params);
                $acceptDTO->FhirBTGToken = $patientDTO->fhirBtgToken;
                $acceptDTO->UserID = $this->ehrUSER;
                $acceptDTO->UserIDType = strtoupper($this->redcapConfig->fhir_break_the_glass_ehr_usertype);
                
                $checkParams($acceptDTO);

                $response = $acceptOne($acceptDTO);
                $result = new ResultDTO([
                    'mrn' => $mrn,
                    'status' => ResultDTO::STATUS_ACCEPTED,
                    'details' => $response,
                ]);
                $results[] = $result;
                // remove only on success
                $this->removeProtectedPatient($project_id, $mrn);
            } catch (\Throwable $th) {
                $results[] = new ResultDTO([
                    'mrn' => $mrn,
                    'status' => ResultDTO::STATUS_NOT_ACCEPTED,
                    'details' => $th->getMessage(),
                ]);
            }finally {
            }
        }
        return $results;
    }

    /**
     *
     * @param ProtectedPatientDTO $patientDTO
     * @return string the refreshed BTG token
     */
    private function refreshBTGToken($project_id, $user_id, $patientDTO)
    {
        $fhirSystem = FhirSystem::fromProjectId($project_id);
        $fhirClient = FhirClientFacade::getInstance($fhirSystem, $project_id, $$user_id);
        $mrn = $patientDTO->mrn;
        $patient_id = $fhirClient->getPatientID($mrn);
        if($patient_id===false) throw new Exception("Cannot retrieve the patient ID form MRN '$mrn'", 404);
        
        $request = $fhirClient->makeRequest(FhirCategory::DEMOGRAPHICS, $patient_id, AbstractEndpoint::INTERACTION_READ);
        $response = $fhirClient->sendRequest($request);
        $resource = $response->resource;
        if(is_null($resource)) throw new Exception("No resurce was returned by the EHR system '$mrn'", 404);
        if($resource instanceof Patient) throw new Exception("Break the glass is not necessary: accesss to patient is granted.", 400);
        ; // nothing to refresh, access is granted
        if(!($resource instanceof OperationOutcome)) throw new Exception("Cannot process the resource provided by the EHR system: expected OperationOutcome, but received ".get_class($resource), 400);
        
        $fhirBtgToken = $resource->getFhirBgtToken();
        if(!$fhirBtgToken) throw new Exception("No BTG token was found in the response; cannot proceed", 400);
        // save the updated data
        $this->storeProtectedPatient($project_id, $mrn, $fhirBtgToken);
        // retrieve the updated data
        return $fhirBtgToken;
    }

    /**
     * react to notifications (from the FHIR client)
     *
     * @param SplSubject $subject
     * @param string $event
     * @param mixed $data
     * @return void
     */
    public function update($subject, $event = null, $data = null): void
    {
        if(!($subject instanceof FhirClient)) return;

        switch ($event) {
            case FhirClient::NOTIFICATION_ENTRY_RECEIVED:
                /** @var AbstractResource $resource */
                $resource = $data;
                if( !($resource instanceof OperationOutcome) ) break;

                $mrn = $subject->getMrn();
                $project_id = $subject->getProjectID();
                $fhirBtgToken = $resource->getFhirBgtToken();
                if(!$fhirBtgToken) break;
                $this->storeProtectedPatient($project_id, $mrn, $fhirBtgToken);
                break;
            default:
                # code...
                break;
        }
    }

    /**
     * Get a list of MRNs from the basket.
     * The list is stored in the session
     * and is seeded with recently blocked MRNs
     * coming from the FHIR logs table.
     * For each MRN we check if "break the glass" has been already used (check for empty status).
     *
     * @param integer $project_id
     * @return ProtectedPatientDTO[]
     */
    public function getProtectedMrnList($project_id)
    {
        $fileCache = $this->getCache($project_id);
        $encryptedList = $fileCache->get('list');
        if($encryptedList) {
            /** @var ProtectedPatientDTO[] $list */
            $list = unserialize(decrypt($encryptedList), ['allowed_classes'=>[ProtectedPatientDTO::class, DateTime::class]]);
        } else $list = [];
        /* foreach ($list as $mrn => $protectedPatient) {
            
        } */
        return $list;
    }

    /**
     * return a protected patient matching the specified MRN
     *
     * @param integer $project_id
     * @param string $mrn
     * @return ProtectedPatientDTO|null
     */
    public function getStoredPatient($project_id, $mrn) {
        $list = $this->getProtectedMrnList($project_id);
        foreach ($list as $entry) {
            if($entry->mrn===$mrn) return $entry;
        }
        return;
    }

    /**
     * remove a protected patient from the cached list
     *
     * @param int $project_id
     * @param string $mrn
     * @return void
     */
    public function removeProtectedPatient($project_id, $mrn) {
        $list = $this->getProtectedMrnList($project_id, $this->userID);
        $existing = @$list[$mrn] ?? false;
        if(!$existing) return; // nothing to remove
        unset($list[$mrn]);
        $this->saveProtectedList($project_id, $list);
    }

    public function storeProtectedPatient($project_id, $mrn, $fhirBtgToken=null) {
        $protectedPatient = new ProtectedPatientDTO([
            'mrn' => $mrn,
            'timestamp' => new DateTime(),
            'fhirBtgToken' => $fhirBtgToken,
        ]);
        
        $list = $this->getProtectedMrnList($project_id, $this->userID);
        $existing = @$list[$mrn] ?? false;
        if($existing && $existing->fhirBtgToken) {
            // check if already cached with the same fhirBtgToken
            if($existing->fhirBtgToken == $protectedPatient->fhirBtgToken) return; 
        };
        // add if not existing or rewrite if existing and without a fhirBtgToken
        $list[$mrn] = $protectedPatient;
        // save the updated list
        $this->saveProtectedList($project_id, $list);
    }

    /**
     * persist the list to cache
     *
     * @param int $project_id
     * @param array $list
     * @return void
     */
    private function saveProtectedList($project_id, $list=[]) {
        $ttl = 60*60*24; // store the list for 1 day
        $fileCache = $this->getCache($project_id, $this->userID);
        $fileCache->set('list', encrypt(serialize($list)), $ttl);
    }

    private function getCache($project_id) {
        return new FileCache(__CLASS__."$project_id-$this->userID");
    }

    /**
     * Query table to get REDCap username from passed EHR username
     *
     * @param string $userid
     * @return string
     */
    private function getEhrMappedUsername($userid)
    {
        $ehrID = $this->fhirSystem->getEhrId();
        if(!$ehrID) return false;

        $sql = 
            "SELECT ehr_username
            FROM redcap_ehr_user_map
            WHERE ehr_id = ?
            AND redcap_userid = ?
            LIMIT 1";
        $params = [$ehrID, $userid];
        $result = db_query($sql, $params);
        if(!$result) return false;
        if($result && $row = db_fetch_assoc($result)) return $row['ehr_username'];
    }
}
