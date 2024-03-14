<?php
namespace Vanderbilt\REDCap\Classes\Fhir\ClinicalDataPull;

use Records;
use Logging;
use DateTime;
use DateInterval;
use DynamicDataPull;
use Vanderbilt\REDCap\Classes\DTOs\REDCapConfigDTO;

/**
 * Processes queued clinical data pulls from a FHIR source.
 */
class ClinicalDataPullSeeder {

	/**
	 *
	 * @var REDCapConfigDTO
	 */
	private $config;

	public function __construct()
	{
		$this->config = REDCapConfigDTO::fromDB();
	}

	/**
	 * Retrieves viable projects based on specific criteria related to their activity and webservice configuration.
	 * 
	 * This function first normalizes the inactivity days for two types of webservices: FHIR and CUSTOM. It then
	 * calculates the timestamps for the time limit of inactivity for a project. Using these timestamps, the function
	 * queries the database to find all projects that meet the following criteria: 
	 * - The project is active or in development (status <= 1).
	 * - Real-time webservice is enabled.
	 * - The project is not deleted and not completed.
	 * - The project either has a recent logged event or future dated records.
	 * 
	 * The function updates the passed reference array `$pids` with the IDs of the viable projects and returns an 
	 * associative array of data tables used by these projects.
	 *
	 * @param array|null &$pids Reference to the array that will be populated with the project IDs of viable projects.
	 *                          If an array is passed, it will be overwritten; if `null` is passed, a new array will be created.
	 * @return array An associative array where keys are data table names and values are arrays of project IDs using those data tables.
	 */
	public function getViableProjects(&$pids = null) {
		// normalize value of stop_fetch_inactivity_days for both webservice types (FHIR and CUSTOM)
		$realtime_webservice_stop_fetch_inactivity_days = $this->normalizeInactivityDays($this->config->realtime_webservice_stop_fetch_inactivity_days);
		$fhir_stop_fetch_inactivity_days = $this->normalizeInactivityDays($this->config->fhir_stop_fetch_inactivity_days);

		// Get timestamp of time limit of inactivity for a project
		$xDaysAgo = $this->getFormattedDateDaysAgo($realtime_webservice_stop_fetch_inactivity_days);
		$xDaysAgoFhir = $this->getFormattedDateDaysAgo($fhir_stop_fetch_inactivity_days);

		// get all viable projects
		$sql = "SELECT DISTINCT p.project_id FROM redcap_projects p
				LEFT JOIN redcap_ddp_records r2 ON r2.project_id = p.project_id
				WHERE p.status <= 1 AND p.realtime_webservice_enabled = 1 AND p.date_deleted IS NULL AND p.completed_time IS NULL 
				AND ((p.last_logged_event IS NOT NULL AND p.last_logged_event > 
					IF (p.realtime_webservice_type = ?, ?, ?))
				OR r2.future_date_count > 0)";
		$q = db_query($sql, [DynamicDataPull::WEBSERVICE_TYPE_FHIR, $xDaysAgoFhir, $xDaysAgo]);
		$pids = [];
        $dataTables = [];
		while ($row = db_fetch_assoc($q)) {
			$pid = $row['project_id'];
			$pids[] = $pid;
            // Get all data tables used by the projects $pids
            $thistable = \Records::getDataTable($pid);
            $dataTables[$thistable][] = $pid;
		}
		return $dataTables;
	}

	/**
	 * Retrieves unregistered records from a specified data table that are not present in the `redcap_ddp_records` table.
	 *
	 * This function constructs and executes a SQL query to select records from the provided data table that are associated
	 * with the given project IDs but do not have corresponding entries in the `redcap_ddp_records` table. These records are
	 * considered 'unregistered' as they are not yet tracked in `redcap_ddp_records`. It is useful for identifying new or 
	 * unprocessed data that needs to be registered or processed.
	 *
	 * @param string $dataTable The name of the data table to query.
	 * @param array $projectIds An array of project IDs to filter the query.
	 * @return Generator Yields associative arrays representing each unregistered row fetched from the database.
	 */
	function getUnregisteredRecords(string $dataTable, array $projectIds) {
		$placeholders = dbQueryGeneratePlaceholdersForArray($projectIds);
		
		$sql = "SELECT x.project_id, x.record FROM
				(SELECT DISTINCT d.project_id, d.record FROM $dataTable d WHERE d.project_id IN ($placeholders) ) x
				LEFT JOIN redcap_ddp_records r on x.project_id = r.project_id and x.record = r.record
				WHERE r.record IS NULL";
		$q = db_query($sql, $projectIds);

		while ($row = db_fetch_assoc($q)) {
			yield $row;
		}
	}



	/**
	 * SEED MR_ID'S FOR ALL RECORDS IN ALL PROJECTS UTILIZING RTWS SERVICE (excluding archived/inactive projects)
	 * Returns count of number of records seeded, else FALSE if query failed.
	 * It adds new row for each record into redcap_ddp_records table.
	 */
	public function seedMrIdsAllProjects()
	{
        $dataTables = $this->getViableProjects($pids);
		if (empty($pids)) return 0;
        // Loop through all relevant data tables
		$seeded = 0;
        foreach ($dataTables as $dataTable=>$thesepids)
        {
			$recordGenerator = $this->getUnregisteredRecords($dataTable, $thesepids);
            while ($row = $recordGenerator->current()) {
				$thisProject_id = $row['project_id'] ?? null;
				$thisRecord = $row['record'] ?? null;
				if(!$thisProject_id || !$thisRecord) continue;
                // Add to ddp_records table
                $sql = "INSERT INTO redcap_ddp_records (project_id, record) VALUES ('".db_escape($thisProject_id)."', '".db_escape($thisRecord)."')";
                if (db_query($sql) $seeded++;
				$recordGenerator->next();
            }
        }
		// Return number of records seeded
		return $seeded;
	}


	/**
	 * Retrieves records from a specified data table that have a NULL fetch status in the `redcap_ddp_records` table.
	 *
	 * This function performs a SQL query to find records that meet the following criteria:
	 * - Associated with an active project that has real-time webservice enabled and is not deleted or completed.
	 * - The project's last logged event is more recent than a time interval based on the project's webservice type (FHIR or CUSTOM).
	 * - The record's `updated_at` timestamp is null or older than the corresponding fetch interval time.
	 * - The record has a non-blank value and a NULL `fetch_status`.
	 * - The project has records with future dates or has been modified within a certain number of days (as determined by inactivity days).
	 *
	 * The function targets a specific data table at a time, using dynamic SQL queries based on the realtime webservice type to determine the time intervals for each project.
	 *
	 * @param string $dataTable The name of the data table to query.
	 * @param string $xDaysAgoFhir The calculated past date-time based on the FHIR data fetch interval.
	 * @param string $xDaysAgo The calculated past date-time based on the real-time webservice data fetch interval.
	 * @param string $IntervalTimeFhir The timestamp representing the past time limit for the FHIR data fetch interval.
	 * @param string $intervalTime The timestamp representing the past time limit for the real-time webservice data fetch interval.
	 * @return Generator Yields associative arrays representing each row with a NULL fetch status fetched from the database.
	 */
	function getRecordsWithNullFetchStatus($dataTable, $xDaysAgoFhir, $xDaysAgo, $IntervalTimeFhir, $intervalTime) {
		$sql = "SELECT r.project_id, r.record, r.mr_id, p.realtime_webservice_type FROM
				redcap_projects p, redcap_ddp_mapping m, $dataTable d, redcap_ddp_records r
				WHERE p.status <= 1 AND p.realtime_webservice_enabled = 1 AND p.date_deleted IS NULL AND p.completed_time IS NULL
				AND ((p.last_logged_event IS NOT NULL AND p.last_logged_event > IF (p.realtime_webservice_type = ?, ?, ?) ) 
					OR (SELECT COUNT(1) FROM redcap_ddp_records r2 WHERE r2.project_id = p.project_id AND r2.future_date_count > 0) > 0)
				AND p.project_id = m.project_id AND m.is_record_identifier = 1 AND d.project_id = m.project_id
				AND d.event_id = m.event_id AND d.field_name = m.field_name AND r.project_id = m.project_id
				AND r.record = d.record AND d.value != '' AND r.fetch_status IS NULL
				AND (r.updated_at IS NULL or r.updated_at <= IF (p.realtime_webservice_type = ?, ?, ?) )";
		$q = db_query($sql, [
			DynamicDataPull::WEBSERVICE_TYPE_FHIR, $xDaysAgo, $xDaysAgoFhir,
			DynamicDataPull::WEBSERVICE_TYPE_FHIR, $IntervalTimeFhir, $intervalTime
		]);

		while ($row = db_fetch_assoc($q)) {
			yield $row;
		}
	}

	/**
	 * Updates the fetch status of specified records in the `redcap_ddp_records` table to 'QUEUED'.
	 *
	 * Note: It's crucial that the provided record identifiers are valid and exist in the `redcap_ddp_records` table.
	 * The function will not perform any action for non-existent records.
	 *
	 * @param array $recordsToUpdate An array of record identifiers (e.g., MRIDs) whose fetch status needs to be updated.
	 * @return int The number of records successfully updated in the database.
	 */
	function updateFetchStatusForRecords($recordsToUpdate) {
		$numRecordsUpdated = 0;
		if (!empty($recordsToUpdate)) {
			$placeholders = dbQueryGeneratePlaceholdersForArray($recordsToUpdate);
			$sql = "UPDATE redcap_ddp_records SET fetch_status = 'QUEUED' WHERE mr_id IN ($placeholders)";
			if (db_query($sql, $recordsToUpdate)) {
				$numRecordsUpdated = db_affected_rows();
			}
		}
		return $numRecordsUpdated;
	}

	/**
	 * Retrieves subsets of record MRIDs for processing, based on criteria of recent modifications and exclusion of future-dated records.
	 *
	 * This function processes records from multiple projects in batches. For each batch, it performs two main operations:
	 * 1. Identifies records that have dates in the future.
	 * 2. Excludes these future-dated records from the batch, then identifies records that have been modified within a specific timeframe 
	 *    (defined by 'X days ago').
	 *
	 * The future-dated records are excluded using `array_diff_assoc`, ensuring that only records without future dates are considered for the 
	 * next criteria (recent modifications). The function then yields a unique list of MRIDs for each batch, representing records that are 
	 * candidates for further processing based on recent updates, and excluding those scheduled for future dates.
	 *
	 * @param array $projectMridList An associative array with project IDs as keys and lists of record MRIDs as values.
	 * @param array $projectXDaysAgo An associative array mapping project IDs to their respective 'X days ago' timestamp.
	 * @param int $recordLimitPerLogQuery The maximum number of records per batch for processing.
	 * @return Generator Yields unique arrays of MRIDs for each batch, representing records with recent modifications, excluding future-dated records.
	 */
	function getSubsetOfMridsForProcessing($projectMridList, $projectXDaysAgo, $recordLimitPerLogQuery) {
		foreach ($projectMridList as $thisProjectId => $recordsMrids) {
			$recordsLogQuery = array_chunk($recordsMrids, $recordLimitPerLogQuery, true);

			foreach ($recordsLogQuery as $recordsMridsThisBatch) {
				// Identify records with future dates
				$recordsMridsThisBatchFutureDates = $this->checkRecordsFutureDates($thisProjectId, $recordsMridsThisBatch);

				// Identify records without future dates to reduce query time
				$recordsMridsThisBatchNoFutureDates = array_diff_assoc($recordsMridsThisBatch, $recordsMridsThisBatchFutureDates);

				// Identify records modified in the past X days
				$recordsMridsThisBatchModified = $this->checkRecordsModifiedRecently($thisProjectId, $recordsMridsThisBatchNoFutureDates, $projectXDaysAgo[$thisProjectId]);

				// Combine and yield unique MRIDs
				$mrIdsToQueueThisBatch = array_unique(array_merge($recordsMridsThisBatchModified, $recordsMridsThisBatchFutureDates));
				yield $mrIdsToQueueThisBatch;
			}
		}
	}

	public function getIntervalTimeForWebservice($webservice) {
		$dataFetchInterval = 0;
		switch ($webservice) {
			case DynamicDataPull::WEBSERVICE_TYPE_FHIR:
				$dataFetchInterval = $this->config->fhir_data_fetch_interval;
				break;
			
			case DynamicDataPull::WEBSERVICE_TYPE_CUSTOM:
				$dataFetchInterval = $this->config->realtime_webservice_data_fetch_interval;
				break;
			
			default:
				# code...
				break;
		}
		$normalized = $this->normalizeDataFetchInterval($dataFetchInterval);
		$interval = $this->getPastDateTimeFromInterval($normalized);
		return $interval;
	}

	public function getDaysAgoForWebservice($webservice) {
		$inactivityDays = 0;
		switch ($webservice) {
			case DynamicDataPull::WEBSERVICE_TYPE_FHIR:
				$inactivityDays = $this->config->fhir_stop_fetch_inactivity_days;
				break;
			
			case DynamicDataPull::WEBSERVICE_TYPE_CUSTOM:
				$inactivityDays = $this->config->realtime_webservice_stop_fetch_inactivity_days;
				break;
			
			default:
				# code...
				break;
		}
		$normalized = $this->normalizeInactivityDays($inactivityDays);
		$formatted = $this->getFormattedDateDaysAgo($normalized);
		return $formatted;
	}


	/**
	 * Gathers MRIDs and 'X Days Ago' Timestamps for Records with NULL Fetch Status Across Projects.
	 *
	 * This function iterates through each data table, fetching records that are ready to be queued, and compiles two arrays:
	 * 1. An array mapping project IDs to their respective MRIDs.
	 * 2. An array mapping project IDs to their respective 'X days ago' timestamp based on the webservice type.
	 *
	 * @return array An associative array containing 'project_mrid_list' and 'project_x_days_ago'.
	 */
	public function gatherMRIDsAndTimestampsForNullFetchStatus() {
		$IntervalTimeFhir = $this->getIntervalTimeForWebservice(DynamicDataPull::WEBSERVICE_TYPE_FHIR);
		$xDaysAgoFhir = $this->getDaysAgoForWebservice(DynamicDataPull::WEBSERVICE_TYPE_FHIR);

		$intervalTime = $this->getIntervalTimeForWebservice(DynamicDataPull::WEBSERVICE_TYPE_CUSTOM);
		$xDaysAgo = $this->getDaysAgoForWebservice(DynamicDataPull::WEBSERVICE_TYPE_CUSTOM);

		$project_mrid_list = [];
		$project_x_days_ago = [];
		foreach (Records::getDataTables() as $dataTable) {
			$recordGenerator = $this->getRecordsWithNullFetchStatus($dataTable, $xDaysAgoFhir, $xDaysAgo, $IntervalTimeFhir, $intervalTime);
			while ($row = $recordGenerator->current()) {
				$project_mrid_list[$row['project_id']][$row['record']] = $row['mr_id'];
				if (!isset($project_x_days_ago[$row['project_id']])) {
					$project_x_days_ago[$row['project_id']] = ($row['realtime_webservice_type'] == DynamicDataPull::WEBSERVICE_TYPE_FHIR) ? $xDaysAgoFhir : $xDaysAgo;
				}
				$recordGenerator->next();
			}
		}
		return [$project_mrid_list, $project_x_days_ago];
	}


	/**
	 * SET "QUEUED" FETCH STATUS FOR ALL RECORDS IN ALL PROJECTS UTILIZING RTWS SERVICE (excluding archived/inactive projects)
	 * Returns count of number of records that get queued, else FALSE if query failed.
	 */
	public function setQueuedFetchStatusAllProjects()
	{
		list ($project_mrid_list, $project_x_days_ago) = $this->gatherMRIDsAndTimestampsForNullFetchStatus();

		// Keep count of number of records queued
		$numRecordsQueued = 0;
		$processingRecordsGenerator = $this->getSubsetOfMridsForProcessing($project_mrid_list, $project_x_days_ago, DynamicDataPull::RECORD_LIMIT_PER_LOG_QUERY);
		while ($mr_ids_to_queue_this_batch = $processingRecordsGenerator->current()) {
			$numRecordsQueued += $this->updateFetchStatusForRecords($mr_ids_to_queue_this_batch);
			$processingRecordsGenerator->next();
		}

		// Return number of recrods queued
		return $numRecordsQueued;
	}

	/**
	 * RETURN A LIST OF RECORDS IN THIS BATCH THAT HAVE DATES OF SERVICE THAT EXIST IN THE FUTURE
	 */
	private function checkRecordsFutureDates($this_project_id, $records_mrids=[])
	{
		// Query the ddp_records table using the record names in $records_mrids
		$records_mrids_this_batch_future_dates = array();
		$placeholders = dbQueryGeneratePlaceholdersForArray($records_mrids);
		$sql = "SELECT record FROM redcap_ddp_records WHERE project_id = $this_project_id
				AND record IN ($placeholders)
				AND (future_date_count > 0 OR updated_at IS NULL)";
		$q = db_query($sql, array_keys($records_mrids));
		while ($row = db_fetch_assoc($q)) {
			// Add to array with record as key and mr_id as value
			$records_mrids_this_batch_future_dates[$row['record']] = $records_mrids[$row['record']];
		}
		// Return array of ONLY the records modified in past X days
		return $records_mrids_this_batch_future_dates;
	}

	/**
	 * QUERY LOG TABLE TO DETERMINE IF A LIST OF RECORDS HAVE BEEN MODIFIED IN PAST X DAYS
	 * Returns an array of with record name as array key and mr_id as its corresponding value for
	 * records that HAVE been modified in the past X days (based upon $realtime_webservice_stop_fetch_inactivity_days).
	 */
	private function checkRecordsModifiedRecently($this_project_id, $records_mrids, $x_days_ago)
	{
		// Query the log_event table using the record names in $records_mrids
		$records_mrids_this_batch_modified = array();
		$eventTable = Logging::getLogEventTable($this_project_id);
		$placeholders = dbQueryGeneratePlaceholdersForArray($records_mrids);
		$sql = "SELECT DISTINCT(pk) AS `record` FROM $eventTable
				WHERE project_id = $this_project_id
				AND event IN ('UPDATE', 'INSERT', 'DELETE', 'DOC_UPLOAD', 'DOC_DELETE', 'LOCK_RECORD', 'ESIGNATURE')
				AND ts > '$x_days_ago'
				AND pk IN ($placeholders)";
		$q = db_query($sql, array_keys($records_mrids));
		while ($row = db_fetch_assoc($q)) {
			$record = $row['record'] ?? null;
			if(!$record) continue;
			// Add to array with record as key and mr_id as value
			$records_mrids_this_batch_modified[$record] = $records_mrids[$record];
		}
		// Return array of ONLY the records modified in past X days
		return $records_mrids_this_batch_modified;
	}

	/**
	 *
	 * @param integer $days
	 * @return string
	 */
	private function getFormattedDateDaysAgo($days) {
		$dateDaysAgo = new DateTime();
		// Subtract the interval from the current date
		$dateDaysAgo->sub(new DateInterval("P{$days}D"));
		// Format the date to Y-m-d H:i:s format and print it
		return $dateDaysAgo->format('Y-m-d H:i:s');
	}

	/**
	 * Calculates and returns a date and time that is a certain number of hours in the past from the current time.
	 * 
	 * @param int $intervalInHours The number of hours to go back from the current time.
	 * @return string The date and time in 'Y-m-d H:i:s' format for the calculated past time.
	 *
	 * Usage example:
	 * $hoursAgo = 5;
	 * $pastDateTime = getPastDateTimeFromInterval($hoursAgo);
	 * // $pastDateTime would be the date and time 5 hours ago from now
	 */
	function getPastDateTimeFromInterval($intervalInHours) {
		$dateTime = new DateTime(); // Current date and time
		$interval = new DateInterval("PT{$intervalInHours}H"); // Interval in hours
		$dateTime->sub($interval); // Subtract interval from current date and time

		return $dateTime->format('Y-m-d H:i:s');
	}

	private function normalizeDataFetchInterval($hours) {
		if (!is_numeric($hours) || $hours < 1) $hours = 24;
		return $hours;
	}

	private function normalizeInactivityDays($days) {
		if (!is_numeric($days) || $days < 1) $days = 7;
		return $days;
	}
}
