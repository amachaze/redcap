<?php
namespace Vanderbilt\REDCap\Classes\Fhir\Logs;

use Logging;
use SplObserver;
use ReflectionClass;
use Vanderbilt\REDCap\Classes\Fhir\FhirClient;
use Vanderbilt\REDCap\Classes\Fhir\FhirClientResponse;

class FhirLogger implements SplObserver
{

    /**
     * date format as used in the database
     */
    const DATE_FORMAT = "Y-m-d\TH:i:s\Z";

    /**
     * table where the logs are stored
     *
     * @var string
     */
    const TABLE_NAME = 'redcap_ehr_fhir_logs';


    /**
     * status for data fetched without HTTP errors
     */
    const STATUS_OK = 200;


    const ENV_CRON = 'CRON';
    const ENV_USER = 'USER';
    /**
     * wheter it is a cron job or a real user activity
     *
     * @var string
     */
    private $environment;


    /**
     * create a FHIR log
     *
     */
    public function __construct()
    {
        $this->environment = defined('CRON') ? self::ENV_CRON : self::ENV_USER;
    }

    static function getClassShortname($object) {
        if(!is_object($object)) return null;
        $reflect = new ReflectionClass($object);
        return $reflect->getShortName();
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
        $args = func_get_args();
        if($subject instanceof FhirClient) $this->updateFhirClient(...$args);
    }



    /**
     *
     * @param FhirClient $subject
     * @param string $event
     * @param mixed $data
     * @return void
     */
    public function updateFhirClient($subject, $event = null, $data = null): void
    {
        switch ($event) {
            case FhirClient::NOTIFICATION_RESOURCE_RECEIVED:
                /** @var FhirClientResponse $response */
                $response = $data;
                try {
                    $this->log([
                        'user_id' => $response->user_id,
                        'fhir_id' => $response->fhir_id, // not null
                        'mrn' => $response->getMrn(), // not null
                        'project_id' => $response->project_id,
                        'resource_type' => $response->resource_type,
                        'status' => $response->status, // not null
                        'environment' => $this->environment,
                        'ehr_id' => $subject->getFhirSystem()->getEhrId(),
                        'created_at' => $response->timestamp,
                    ]);
                } catch (\Throwable $th) {
                    $subject->addError($th);
                }
                break;
            default:
                break;
        }
    }

    /**
     * get an instance of the log
     *
     * @param integer $id ID of the log on the database
     * @return FhirLogger
     */
    public static function get($id)
    {
        $query_string = sprintf(
            "SELECT * FROM %s
            WHERE id=%u", self::TABLE_NAME, $id
        );
        $result = db_query($query_string);
        $instance = null;
        if($result && $row=db_fetch_assoc($result)) $instance = new FhirLogEntry($row);
        return $instance;
    }

    /**
     * get all logs occourred after a specified date
     * useful to find out when data has been pulled for a user
     *
     * @param \DateTime $date_time
     * @param integer $project_id
     * @param integer $user_id
     * @param string $mrn
     * @return FhirLogger[]
     */
    public static function getLogsAfterDate($date_time, $project_id, $user_id=null, $mrn=null)
    {
        // convert datetime to string
        if(is_a($date_time, \DateTime::class)) $date_time = $date_time->format(self::DATE_FORMAT);
        $query_string = sprintf(
            "SELECT * FROM %s
            WHERE created_at>='%s'
            AND project_id=%u",
            self::TABLE_NAME,
            db_real_escape_string($date_time),
            db_real_escape_string($project_id)
        );
        // select only specified MRN if provided
        if($user_id) $query_string .= sprintf(" AND user_id=%u", db_real_escape_string($user_id));
        if($mrn) $query_string .= sprintf(" AND mrn='%s'", db_real_escape_string($mrn));
        $query_string .= " ORDER BY created_at DESC";
        $result = db_query($query_string);
        $list = [];
        while ($row=db_fetch_assoc($result)) {
            $list[] = new FhirLogEntry($row);
        }
        return $list;
    }

    /**
     * get logs based on some criteria
     * multiple criterias can be specified
     *
     * @param array $criteria ["`key`='value'", "`key`<'value'", ...]
     * @return array
     */
    public static function getLogs($criteria, $start=0, $offset=100)
    {
        $wheres = implode(" AND ", $criteria);
        if(empty($wheres)) $wheres = 1;
        $query_string = sprintf(
            "SELECT * FROM `%s` WHERE %s
            ORDER BY `created_at` DESC
            LIMIT %u, %u",
            self::TABLE_NAME, $wheres,
            $start, $offset
        );
        $result = db_query($query_string);
        $results = [];
        while($row=db_fetch_assoc($result)) $results[] = $row;
        return $results;
    }

    /**
     * store a log on the database
     *
     * @param array $params
     * @return bool
     */
    public function log($params)
    {
        $getPreparedQuery = function($queryString, $params) {
            $escaped_params = array_map(function($param) {
                return db_real_escape_string($param);
            }, $params);
            $fullQuery = vsprintf(str_replace('?', "'%s'", $queryString), $escaped_params);
            return $fullQuery;
        };
        
        $queryString = sprintf(
            "INSERT INTO %s (`user_id`, `fhir_id`, `mrn`, `project_id`, `resource_type`, `status`, `environment`, `created_at`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)", self::TABLE_NAME
        );
        $queryParams = [
            $params['user_id'] ?? '',
            $params['fhir_id'] ?? '',
            $params['mrn'] ?? '',
            $params['project_id'] ?? null,
            $params['resource_type'] ?? '',
            $params['status'] ?? '',
            $params['environment'] ?? '',
            $params['created_at'] ?? '',
        ];
        try {
            $user_id = $params['user_id'] ?? 0;
            if($user_id===0) throw new \Exception("Error: no user ID available", 1);
            $result = db_query($queryString, $queryParams);
            $insertID = db_insert_id();
            if($insertID===0) throw new \Exception("Error saving FHIR logs on the database", 1);
            return $insertID;
        } catch (\Throwable $th) {
            $errorMessage = "Error saving FHIR logs on the database: " . $th->getMessage();
            if($dbError = db_error()) $errorMessage .= " - $dbError";
            throw new \Exception($errorMessage, 400, $th);
            // Logging::logEvent($queryString, self::TABLE_NAME, $event='ERROR', $identifier=$projectID, $display=json_encode($queryParams, JSON_PRETTY_PRINT), $errorMessage);
        }
    }


}