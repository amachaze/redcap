<?php

namespace Vanderbilt\REDCap\Classes\MyCap;

use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\Promis;
use Vanderbilt\REDCap\Classes\ProjectDesigner;
use RCView;

class Task
{
    const AMSLERGRID = '.AmslerGrid';
    const AUDIO = '.Audio';
    const DBHLTONEAUDIOMETRY = '.DbhlToneAudiometry';
    const FITNESSCHECK = '.FitnessCheck';
    /** Custom task. Display all fields as a form */
    const FORM = '.Form';
    const HOLEPEG = '.HolePeg';
    /** PROMIS computer adaptive test from REDCap Shared Library */
    const PROMIS = '.PROMIS';
    const PSAT = '.PSAT';
    /** Custom task. Display all fields as individual qustions */
    const QUESTIONNAIRE = '.Questionnaire';
    const RANGEOFMOTION = '.RangeOfMotion';
    const REACTIONTIME = '.ReactionTime';
    const SHORTWALK = '.ShortWalk';
    const SPATIALSPANMEMORY = '.SpatialSpanMemory';
    const SPEECHINNOISE = '.SpeechInNoise';
    const SPEECHRECOGNITION = '.SpeechRecognition';
    const STROOP = '.Stroop';
    const TIMEDWALK = '.TimedWalk';
    const TONEAUDIOMETRY = '.ToneAudiometry';
    const TOWEROFHANOI = '.TowerOfHanoi';
    const TRAILMAKING = '.TrailMaking';
    const TWOFINGERTAPPINGINTERVAL = '.TwoFingerTappingInterval';
    /** Custom active task for Alex Gelbard */
    const VUMCAUDIORECORDING = '.VumcAudioRecording';
    const VUMCCONTRACTIONTIMER = '.VumcContractionTimer';

    const TYPE_CONTRACTIONTIMER = '.ContractionTimer';
    const TYPE_DATELINE = '.DateLine';
    const TYPE_PERCENTCOMPLETE = '.Percent';

    public static $typeEnum = [
        self::TYPE_CONTRACTIONTIMER,
        self::TYPE_DATELINE,
        self::TYPE_PERCENTCOMPLETE
    ];

    /** Task Schedule vars */

    const ENDS_NEVER = '.Never';
    const ENDS_AFTERCOUNT = '.AfterCountOccurrences';
    const ENDS_AFTERDAYS = '.AfterNDays';
    const ENDS_ONDATE = '.OnDate';

    const FREQ_DAILY = '.Daily';
    const FREQ_MONTHLY = '.Monthly';
    const FREQ_WEEKLY = '.Weekly';

    const TYPE_FIXED = '.Fixed';
    const TYPE_INFINITE = '.Infinite';
    const TYPE_ONETIME = '.OneTime';
    const TYPE_REPEATING = '.Repeating';

    const RELATIVETO_JOINDATE = '.JoinDate';
    const RELATIVETO_ZERODATE = '.ZeroDate';

    public static $requiredAnnotations = [
        Annotation::TASK_UUID,
        Annotation::TASK_STARTDATE,
        Annotation::TASK_ENDDATE,
        Annotation::TASK_SCHEDULEDATE,
        Annotation::TASK_STATUS,
        Annotation::TASK_SUPPLEMENTALDATA,
        Annotation::TASK_SERIALIZEDRESULT
    ];
     /**
     * Returns human readable string for the given format
     *
     * @param string $format
     * @return string
     */
    public static function toString($format)
    {
        switch ($format) {
            case self::FORM:
                $retVal = 'Form';
                break;
            case self::QUESTIONNAIRE:
                $retVal = 'Questionnaire';
                break;
            default:
                $retVal = 'Invalid Format';
                break;
        }
        return $retVal;
    }

    /**
     * Get all fields of form having specific data type
     *
     * @param string $field_type
     * @param string $form
     * @return array
     */
    public static function getDataTypeBasedFieldsList($field_type, $form)
    {
        global $Proj, $lang;
        $fields[''] = '-- '.$lang['random_02'].' --';

        switch ($field_type) {
            case 'date':
                $fields_pre = \Form::getFieldDropdownOptions(true, false, false, false, array('date', 'date_ymd', 'date_mdy', 'date_dmy'), false, false);
                break;

            case 'time':
                $fields_pre = \Form::getFieldDropdownOptions(true, false, false, false, array('time', 'time_hh_mm_ss'), false, false);
                break;

            case 'numeric':
                $fields_pre = \Form::getFieldDropdownOptions(true, false, false, false, array('int', 'float'), false, false);
                break;
        }

        foreach ($fields_pre as $this_field=>$this_label) {
            $this_form_label = strip_tags($lang['alerts_243']." \"".$Proj->forms[$Proj->metadata[$this_field]['form_name']]['menu']."\"");
            $this_form = $Proj->metadata[$this_field]['form_name'];
            $this_label = preg_replace('/'.$this_field.'/', "[$this_field]", $this_label, 1);
            list ($this_label2, $this_label1) = explode(" ", $this_label, 2);
            if ($this_form == $form) {
                if ($Proj->longitudinal) {
                    foreach ($Proj->eventsForms as $this_event_id=>$these_forms) {
                        if (in_array($this_form, $these_forms)) {
                            if (!isset($datetime_fields[$this_form_label]["[$this_field]"])) {
                                $fields["[$this_field]"] = "$this_label1 " . $lang['alerts_237'] . " - $this_label2";
                            }
                            $this_event_name = $Proj->getUniqueEventNames($this_event_id);
                            $fields["[$this_event_name][$this_field]"] = "$this_label1 (".$Proj->eventInfo[$this_event_id]['name_ext'].") - $this_label2";
                        }
                    }
                } else {
                    $fields["[$this_field]"] = "$this_label1 $this_label2";
                }
            }
        }
        return $fields;
    }

    /**
     * Get days listing of week
     *
     * @return array
     */
    public static function getDaysOfWeekList() {
        global $lang;
        return 	array("1"=>$lang['global_99'], "2"=>$lang['global_100'], "3"=>$lang['global_101'],
            "4"=>$lang['global_102'], "5"=>$lang['global_103'], "6"=>$lang['global_104'],
            "7"=>$lang['global_105']);
    }

    /**
     * Display friendly string of task schedule description
     *
     * @param int $taskId
     * @return string
     */
    public static function displayTaskSchedule($taskId)
    {
        global $Proj, $lang;
        $retVal = "";
        if ($Proj->longitudinal) {
            $schedules = self::getTaskSchedules($taskId);
            if (!empty($schedules)) {
                $total = count($schedules);
                $i = 0;
                foreach ($schedules as $eventId) {
                    $i++;
                    $retVal .= '<span style="color:#800000;font-size:11px; font-weight: bold;">'.$Proj->eventInfo[$eventId]['name_ext'].'</span><br><i>'.$lang['mycap_mobile_app_717'].' <b>'.$Proj->eventInfo[$eventId]['day_offset'].'</b> '.$lang['mycap_mobile_app_718'].'</i>';
                    if ($i != $total)   $retVal .= '<hr style="border-bottom:1px dashed #aaa; margin-top:1%; margin-bottom:1%; width: 100%;" />';
                }
            }
        } else {
            $sql = "SELECT schedule_type, schedule_frequency, schedule_interval_week, schedule_days_of_the_week, schedule_interval_month,
                        schedule_days_of_the_month, schedule_days_fixed, schedule_relative_offset, schedule_ends, schedule_end_count, schedule_end_after_days, schedule_end_date
                FROM 
                    redcap_mycap_tasks
                WHERE 
                    task_id='".(int)$taskId."'
                LIMIT 1";
            $result = db_query($sql);
            $details = db_fetch_assoc($result);
            db_free_result($result);

            if ($details['schedule_type'] == self::TYPE_ONETIME) {
                $retVal = 'One time';
            } elseif ($details['schedule_type'] == self::TYPE_INFINITE) {
                $retVal = 'Infinite';
            } elseif ($details['schedule_type'] == self::TYPE_REPEATING) {
                $retVal = 'Repeats';

                if ($details['schedule_frequency'] == self::FREQ_DAILY) {
                    $retVal .= ' daily';
                } elseif ($details['schedule_frequency'] == self::FREQ_WEEKLY) {
                    if (is_numeric($details['schedule_interval_week'])) {
                        if ($details['schedule_interval_week'] == 1) {
                            $retVal .= ' every week';
                        } elseif ($details['schedule_interval_week'] > 1) {
                            $retVal .= ' every ' . $details['schedule_interval_week'] . ' weeks';
                        }

                        if (strlen($details['schedule_days_of_the_week'])) {
                            $dayInts = explode(',', $details['schedule_days_of_the_week']);
                            $daysOfWeek = self::getDaysOfWeekList();
                            if (count($dayInts)) {
                                foreach ($dayInts as $day) {
                                    $dayStrings[] = $daysOfWeek[$day];
                                }
                                $retVal .= ' on ' . implode(', ', $dayStrings);
                            }
                        }
                    }
                } elseif ($details['schedule_frequency'] == self::FREQ_MONTHLY) {
                    if (is_numeric($details['schedule_interval_month'])) {
                        if ($details['schedule_interval_month'] == 1) {
                            $retVal .= ' every month';
                        } elseif ($details['schedule_interval_month'] > 1) {
                            $retVal .= ' every ' . $details['schedule_interval_month'] . ' months';
                        }

                        if (strlen($details['schedule_days_of_the_month'])) {
                            $dayInts = explode(',', $details['schedule_days_of_the_month']);
                            if (count($dayInts)) {
                                foreach ($dayInts as $day) {
                                    if (substr($day, -1) == 1 && $day != 11)  $dayStrings[] = $day."st"; // check if last digit is 1 exa. 1,21,31
                                    elseif(substr($day, -1) == 2 && $day != 12) $dayStrings[] = $day."nd"; // check if last digit is 2 exa. 2,22
                                    elseif(substr($day, -1) == 3 && $day != 13) $dayStrings[] = $day."rd"; // check if last digit is 3 exa. 3,23
                                    else $dayStrings[] = $day."th";
                                }
                                $retVal .= ' on ' . implode(', ', $dayStrings);
                            }
                        }
                    }
                }
            } elseif ($details['schedule_type'] == self::TYPE_FIXED) {
                $retVal = 'Fixed';
            } else {
                $retVal = 'Invalid schedule';
            }
        }

        return $retVal;
    }

    /**
     * Returns list of all mycap task settings
     *
     * @param integer $projectId
     * @param integer $taskId
     *
     * @return array
     */
    public static function getAllTasksSettings($projectId, $taskId = null)
    {
        global $Proj;

        $sql = "SELECT * FROM redcap_mycap_tasks WHERE project_id = $projectId";
        if (is_numeric($taskId)) $sql .= " AND task_id = $taskId";

        $q = db_query($sql);
        $tasks = array();
		$tasks_order = array();
        while ($row = db_fetch_assoc($q))
        {
            // Add task information
            foreach ($row as $key=>$value)
            {
                if ($key != 'project_id' && $key != 'task_id') {
                    // Remove any HTML from task title
                    if ($key == 'task_title') $value = label_decode($value);

                    // Add to array
                    $tasks[$row['task_id']][$key] = $value;
                }
            }
            // Make sure tasks are in form order
            $tasks_order[$row['task_id']] = $Proj->forms[$row['form_name']]['form_number'];
        }
        // Make sure tasks are in form order
        asort($tasks_order);
        $tasks_ordered = array();
        foreach ($tasks_order as $this_task_id=>$order) {
            $tasks_ordered[$this_task_id] = $tasks[$this_task_id];
        }
        // Return array of task(s) attributes
        if ($taskId == null) {
            return $tasks_ordered;
        } else {
            return $tasks_ordered[$taskId];
        }
        return $tasks_ordered;
    }

    /**
     * Merges PROMIS battery instruments with the instrument list from the REDCap online designer. Intent is to
     * determine which instruments belong to the same battery (group) and in which position each instrument falls
     * within the battery. Returns a structure:
     * [
     *   'promis_instrument_a' => BatteryInstrument(
     *     'batteryPosition' = 1,
     *     'instrumentPosition' = 1,
     *     'title' = 'PROMIS Instrument A'
     *   ],
     *   'promis_instrument_b' => BatteryInstrument(
     *     'batteryPosition' = 1,
     *     'instrumentPosition' = 2,
     *     'title' = 'PROMIS Instrument B'
     *   ],
     *   'another_instrument_x' => BatteryInstrument(
     *     'batteryPosition' = 2,
     *     'instrumentPosition' = 1,
     *     'title' = 'Another instrument X'
     *   ],
     * ]
     *
     * @param $pid
     * @param array $instruments This is an array of instruments ordered as they appear in the Online Designer
     * @return \REDCapExt\Promis\BatteryInstrument[]
     */
    public static function batteryInstrumentPositions()
    {
        global $Proj;
        $instruments = $Proj->forms;

        $batteryInstruments = PromisApi::batteryInstruments();
        if (!count($batteryInstruments)) {
            return [];
        }

        $identifierKeyMap = [];
        foreach ($batteryInstruments as $instrument) {
            $identifierKeyMap[$instrument['form_name']] = $instrument['promis_battery_key'];
        }

        $retVal = [];
        $batteryPosition = [];
        $instrumentPosition = [];
        foreach ($instruments as $identifier => $form) {
            if (!array_key_exists($identifier, $identifierKeyMap)) {
                continue;
            }
            $batteryKey = $identifierKeyMap[$identifier];
            if (!in_array($batteryKey, $batteryPosition)) {
                $batteryPosition[] = $batteryKey;
            }
            if (!array_key_exists($batteryKey, $instrumentPosition)) {
                $instrumentPosition[$batteryKey] = 0;
            }
            $instrumentPosition[$batteryKey] += 1;
            $retVal[$identifier]['batteryPosition'] = array_search($batteryKey, $batteryPosition) + 1;
            $retVal[$identifier]['instrumentPosition'] = $instrumentPosition[$batteryKey];
            $retVal[$identifier]['title'] = $form['menu'];
        }
        return $retVal;
    }

    /**
     * Returns list of all issues if instrument is from unsupported PROMIS instruments list
     *
     * @param string $instrument
     *
     * @return array
     */
    public static function getUnsupportedPromisInstrumentsIssues($instrument) {
        global $Proj;
        $key = \PROMIS::getPromisKey($instrument);
        $issues = array();
        if (in_array($key, Promis::unsupportedPromisInstruments())) {
            $issues[] = "The instrument \"".$Proj->forms[$instrument]['menu']."\" is a health measure that is not currently supported by MyCap.";
        }
        return $issues;
    }

    /**
     * Erase the sync issues for a record/instance or record/form/instance (if a user deletes all the data for a form)
     *
     * @param integer $project_id
     * @param string $record
     * @param string $instance
     *
     * @return void
     */
    public static function eraseMyCapSyncIssues($project_id, $record, $instance=1)
    {
        $uuids = self::getUUIDFieldValue($project_id, $record, $instance);
        // Remove MyCap Sync issues
        if (!empty($uuids)) {
            $sql = "DELETE FROM redcap_mycap_syncissues WHERE uuid IN ('".implode("', '", $uuids)."')";
            db_query($sql);
        }
    }

    /**
     * Check if instruments contains any error
     *
     * @param string $form
     * @param integer $projectId
     *
     * @return array
     */
    public static function checkErrors($form, $projectId)
    {
		global $lang;
        $Proj = new \Project($projectId);
		$errors = [];
        $warnings = [];

		// Error if this instrument contains the randomization field
		if ($GLOBALS['randomization'] && \Randomization::setupStatus($projectId)) {
			$randAttr = \Randomization::getRandomizationAttributes($projectId);
			$randomization_form = $Proj->metadata[$randAttr['targetField']]['form_name'];
			if ($form == $randomization_form) {
				$errors[] = $lang['mycap_mobile_app_690'];
			}
		}

		if (empty($errors)) {
            $currentDictionary = \REDCap::getDataDictionary(
                $projectId,
                'array',
                false,
                array(),
                $form
            );

            $instrumentDictionary = self::splitDictionaryByInstrument($currentDictionary);
            $dictionary = self::joinDictionaryInstruments($instrumentDictionary);

            $dataDictionary = self::convertFlatMetadataToDDarray($dictionary);

            list ($errors, $warnings, $dataDictionary) = \MetaData::error_checking($dataDictionary, false, false, true, ($form != $Proj->firstForm));

            // Ignore Randamization error as this is already handled
            unset($errors[30]);
        }
        return array($errors, $warnings);
    }

    /**
     * Split Dictionary By Instrument
     *
     * @param array $dictionary
     *
     * @return array
     */
    private static function splitDictionaryByInstrument($dictionary)
    {
        $split = [];
        foreach ($dictionary as $fieldName => $field) {
            $split[$field['form_name']][$fieldName] = $field;
        }
        return $split;
    }

    /**
     * Join Dictionary Instruments
     *
     * @param array $splitDictionary
     *
     * @return array
     */
    private static function joinDictionaryInstruments($splitDictionary)
    {
        $join = [];
        foreach ($splitDictionary as $instrument => $fields) {
            $join = array_merge($join, $fields);
        }
        return $join;
    }

    /**
     * Convert a flat item-based metadata array into Data Dictionary array with specific Excel-cell-named keys-subkeys (e.g. A1)
     *
     * @param array $data
     *
     * @return array
     */
    public static function convertFlatMetadataToDDarray($data)
    {
        $csv_cols = \MetaData::getCsvColNames();
        $dd_array = array();
        $r = 1; // Start with 1 so that the record ID field gets row 2 position (assumes headers in row 1)

        foreach($data as $row)
        {
            ++$r;
            $row_keys = array_keys($row);

            foreach($csv_cols as $n => $l)
            {
                if(!isset($dd_array[$l]))
                {
                    $dd_array[$l] = array();
                }

                $dd_array[$l][$r] = $row[$row_keys[$n-1]];
            }
        }
        return $dd_array;
    }

    /**
     * Get list of missing annotations required for MyCap
     *
     * @param string $form
     *
     * @return array
     */
    public static function getMissingAnnotationList($form)
    {
        global $draft_mode;
        $fields = \MetaData::getDataDictionary('array', false, array(), array($form), false, $draft_mode);

        $requiredAnnotations = self::$requiredAnnotations;
        foreach ($fields as $field) {
            if (count($requiredAnnotations) === 0) {
                break;
            }
            foreach ($requiredAnnotations as $idx => $annotation) {
                if (strpos(
                        $field['field_annotation'],
                        $annotation
                    ) !== false) {
                    unset($requiredAnnotations[$idx]);
                    continue 2;
                }
            }
        }
        return $requiredAnnotations;
    }

    /**
     * Get Error text for missing annotations required for MyCap
     *
     * @param array $missingAnnotations
     *
     * @return string
     */
    public static function getMissingAnnotationErrorText($missingAnnotations)
    {
        global $lang;

        $errorText = '';
        if (count($missingAnnotations) > 0) {
            foreach ($missingAnnotations as $annotation) {
                $list[] = $annotation;
            }
            $errorText = $lang['mycap_mobile_app_703']."<br>".$lang['mycap_mobile_app_704']." ";
            if (!empty($list)) $errorText .= "<code><b>".implode(", ", $list)."</b></code>";
        }

        return $errorText;
    }

    /**
     * Get Error text for missing annotations required for MyCap
     *
     * @param array $missingAnnotations
     *
     * @return string
     */
    public static function getMissingAnnotationErrorTextForAll($forms)
    {
        global $lang, $Proj;
        $errorText = '';
        if (count($forms) > 0) {
            $errorText = $lang['mycap_mobile_app_703']."<br>".$lang['mycap_mobile_app_698']." ";
            $errorText .= '<ul>';
            foreach ($forms as $form) {
                $errorText .= '<li style="padding-top: 5px;"><code>'.$Proj->forms[$form]['menu'].'</code></li>';
            }
            $errorText .= '</ul>';
        }

        return $errorText;
    }

    /**
     * Fix Missing annotations issues for instrument
     *
     * @param array $missingAnnotations
     * @param string $form
     *
     * @return void
     */
    public static function fixMissingAnnotationsIssues($missingAnnotations, $form)
    {
        global $draft_mode, $status;
        if ($draft_mode != '1' && $status > 0)  return;

        $fieldsArr = self::getFormFields($missingAnnotations);
        if (count($fieldsArr) > 0) {
            global $Proj, $status;
            if ($status > 0) {
                $Proj->loadMetadataTemp();
            } else {
                $Proj->loadMetadata();
            }
            $projectDesigner = new ProjectDesigner($Proj);

            foreach ($fieldsArr as $field) {
                $field['field_name'] = ActiveTask::getNewFieldName($field['field_name']);
                $projectDesigner->createField($form, $field);
                if ($field['field_annotation'] == Annotation::TASK_UUID) {
                    $section_header_field = array('field_label' => 'MyCap App Fields - Do Not Modify',
                                                'field_type' => 'section_header');
                    $projectDesigner->createField($form, $section_header_field, $field['field_name'], true);
                }
            }
        }
    }

    /**
     * Get list of form fields to add Missing annotations fields for instrument
     *
     * @param array $missingAnnotations
     *
     * @return array
     */
    public static function getFormFields($missingAnnotations) {
        $hide_on_survey_annotation = " @HIDDEN-SURVEY";
        foreach ($missingAnnotations as $annotation) {
            switch ($annotation) {
                case Annotation::TASK_UUID:
                    $fieldArr[] = array('field_name' => 'uuid',
                                        'field_label' => 'UUID',
                                        'field_type' => 'text',
                                        'field_annotation' => Annotation::TASK_UUID.$hide_on_survey_annotation);
                    break;
                case Annotation::TASK_STARTDATE:
                    $fieldArr[] = array('field_name' => 'startdate',
                                        'field_label' => 'Start Date',
                                        'field_type' => 'text',
                                        'field_annotation' => Annotation::TASK_STARTDATE.$hide_on_survey_annotation);
                    break;
                case Annotation::TASK_ENDDATE:
                    $fieldArr[] = array('field_name' => 'enddate',
                                        'field_label' => 'End Date',
                                        'field_type' => 'text',
                                        'field_annotation' => Annotation::TASK_ENDDATE.$hide_on_survey_annotation);
                    break;
                case Annotation::TASK_SCHEDULEDATE:
                    $fieldArr[] = array('field_name' => 'scheduledate',
                                        'field_label' => 'Schedule Date',
                                        'field_type' => 'text',
                                        'field_annotation' => Annotation::TASK_SCHEDULEDATE.$hide_on_survey_annotation);
                    break;
                case Annotation::TASK_STATUS:
                    $choices = "0, Deleted \\n 1, Completed \\n 2, Incomplete";
                    $fieldArr[] = array('field_name' => 'status',
                                        'field_label' => 'Status',
                                        'field_type' => 'select',
                                        'element_enum' => $choices,
                                        'field_annotation' => Annotation::TASK_STATUS.$hide_on_survey_annotation);
                    break;
                case Annotation::TASK_SUPPLEMENTALDATA:
                    $fieldArr[] = array('field_name' => 'supplementaldata',
                                        'field_label' => 'Supplemental Data (JSON)',
                                        'field_type' => 'textarea',
                                        'field_annotation' => Annotation::TASK_SUPPLEMENTALDATA.$hide_on_survey_annotation);
                    break;
                case Annotation::TASK_SERIALIZEDRESULT:
                    $fieldArr[] = array('field_name' => 'serializedresult',
                                        'field_label' => 'Serialized Result',
                                        'field_type' => 'file',
                                        'field_annotation' => Annotation::TASK_SERIALIZEDRESULT.$hide_on_survey_annotation);
                    break;
            }
        }
        return $fieldArr;
    }

    /**
     * Returns all values of fields having annotation set to "@MC-TASK-UUID"
     *
     * @param integer $projectId
     * @param string $record
     * @param integer $instanceNum
     *
     * @return array
     */
    public static function getUUIDFieldValue($projectId, $record, $instanceNum = '') {
        $dictionary = \REDCap::getDataDictionary($projectId, 'array', false, true);

        foreach ($dictionary as $field => $fieldDetails) {
            if (strpos($fieldDetails['field_annotation'], Annotation::TASK_UUID) !== false) {
                $map[$field] = $fieldDetails['field_annotation'];
            }
        }
        $data = \REDCap::getData(
            $projectId,
            'array',
            array($record)
        );
        $uuid = array();
        foreach ($data as $record=>&$event_data)
        {
            foreach (array_keys($event_data) as $event_id)
            {
                if ($event_id == 'repeat_instances') {
                    $eventNormalized = $event_data['repeat_instances'];
                } else {
                    $eventNormalized = array();
                    $eventNormalized[$event_id][""][0] = $event_data[$event_id];
                }
                foreach ($eventNormalized as $event_id=>&$data1)
                {
                    foreach ($data1 as $repeat_instrument=>&$data2)
                    {
                        foreach ($data2 as $instance=>&$data3)
                        {
                            if ($instanceNum != '') {
                                if ($instanceNum == $instance) {
                                    foreach ($data3 as $field=>$value)
                                    {
                                        if (array_key_exists($field, $map) && $value != '') {
                                            $uuid[] = $value;
                                        }
                                    }
                                }
                            } else {
                                foreach ($data3 as $field=>$value)
                                {
                                    if (isset($map) && is_array($map) && $value != '' && array_key_exists($field, $map)) {
                                        $uuid[] = $value;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            unset($data[$record], $event_data, $data1, $data2, $data3);
        }
        return $uuid;
    }

    /**
     * Returns all MyCap Task errors for selected instrument
     *
     * @param string $form
     *
     * @return array
     */
    public static function getMyCapTaskErrors($form = '') {
        global $Proj, $myCapProj, $lang;
        $errors = array();
        if ($form == '') {
            foreach ($Proj->forms as $form => $attr) {
                if ($myCapProj->tasks[$form]['enabled_for_mycap'] == 1) {
                    $missingAnnotations = self::getMissingAnnotationList($form);
                    if (!empty($missingAnnotations)) {
                        $missingAnnotationsForms[] = $form;
                    }
                    if (!$Proj->longitudinal && !$Proj->isRepeatingForm($Proj->firstEventId, $form)) {
                        $errorRepeatingForms[] = $form;
                    }

                    if ($Proj->longitudinal) {
                        $schedules = Task::getTaskSchedules($myCapProj->tasks[$form]['task_id']);
                        $formsRepeating[$form] = self::getRepeatingFormErrors($form, $schedules);
                        $eventsRepeating[$form] = self::getRepeatingEventErrors($form, $schedules);
                    }

                }
            }
            if (!empty($missingAnnotationsForms)) {
                $errors[] = self::getMissingAnnotationErrorTextForAll($missingAnnotationsForms);
            }
            if ($Proj->longitudinal) {
                $errorText = "";
                if (!empty($formsRepeating)) {
                    $errorText .= self::getRepeatingFormsErrorsText($formsRepeating);
                }
                if ($errorText != '') {
                    $errors[] = $lang['mycap_mobile_app_711'].$errorText;
                }

                $errorText = "";
                if (!empty($eventsRepeating)) {
                    $errorText .= self::getRepeatingEventsErrorsText($eventsRepeating);
                }
                if ($errorText != '') {
                    $errors[] = $lang['mycap_mobile_app_735'].$errorText;
                }
            }

            if (!empty($errorRepeatingForms)) {
                $errorText = $lang['mycap_mobile_app_699'];
                $errorText .= '<ul>';
                foreach ($errorRepeatingForms as $form) {
                    $errorText .= '<li style="padding-top: 5px;"><code>'.$Proj->forms[$form]['menu'].'</code></li>';
                }
                $errorText .= '</ul>';
                if (!empty($list)) $errorText .= "<code><b>".implode(", ", $list)."</b></code>";
                $errors[] = $errorText;
            }


            if (!empty($errorNonRepeatingEvent)) {
                $errorText = $lang['mycap_mobile_app_736']." ".$lang['mycap_mobile_app_737'];
                $errorText .= '<ul>';
                foreach ($errorNonRepeatingEvent as $error) {
                    $errorText .= '<li style="padding-top: 5px;">'.$error.'</li>';
                }
                $errorText .= '</ul>';
                $errors[] = $errorText;
            }
        } else {
            $missingAnnotations = self::getMissingAnnotationList($form);

            if (!empty($missingAnnotations)) {
                $missingAnnotationsError = self::getMissingAnnotationErrorText($missingAnnotations);
                $errors[] = $missingAnnotationsError;
            }
            if ($Proj->longitudinal) {
                $schedules = Task::getTaskSchedules($myCapProj->tasks[$form]['task_id']);
                foreach ($schedules as $eventId) {
                    if ($Proj->isRepeatingForm($eventId, $form)) {
                        $events[] = $Proj->eventInfo[$eventId]['name_ext'];
                    }
                    if ($Proj->isRepeatingEvent($eventId)) {
                        $repeatingEvents[] = $Proj->eventInfo[$eventId]['name_ext'];
                    }
                }
                if (!empty($events)) {
                    $errors[] = $lang['mycap_mobile_app_719']." <code>".implode(", ", $events)."</code>";
                }
                if (!empty($repeatingEvents)) {
                    $errors[] = $lang['mycap_mobile_app_720']." <code>".implode(", ", $repeatingEvents)."</code>";
                }
            } else {
                if (!$Proj->isRepeatingForm($Proj->firstEventId, $form)) {
                    $errors[] = $lang['mycap_mobile_app_588'];
                }
            }
        }

        return $errors;
    }

    /**
     * Returns all MyCap Task errors for selected instrument those can not be fixed by button click
     *
     * @param string $form
     *
     * @return array
     */
    public static function getMyCapTaskNonFixableErrors($form = '') {
        global $Proj, $myCapProj, $lang;
        $errors = array();
        if ($Proj->longitudinal) {
            if ($form == '') {
                foreach ($Proj->forms as $form => $attr) {
                    if ($myCapProj->tasks[$form]['enabled_for_mycap'] == 1) {
                        $instrumentFields = Task::getListExcludingMyCapFields($form);
                        if (empty($instrumentFields)) {
                            $error_details['no_fields'][] = $form;
                        }
                        $eventsList = self::getEventsList($form);
                        if (empty($eventsList)) {
                            $error_details['designate_instrument'][] = $form;
                        } else {
                            $eventsSchedules = self::getTaskSchedules($myCapProj->tasks[$form]['task_id']);
                            if (empty($eventsSchedules)) {
                                $error_details['enable_atleast_one_event'][] = $form;

                            }
                        }
                    }
                }
                $errorText = '';
                if (!empty($error_details['no_fields'])) {
                    $errorText .= $lang['mycap_mobile_app_734'];
                    $errorText .= '<ul>';
                    foreach ($error_details['no_fields'] as $form) {
                        $errorText .= '<li style="padding-top: 5px;"><code>'.$Proj->forms[$form]['menu'].'</code></li>';
                    }
                    $errorText .= '</ul>';
                }

                if (!empty($error_details['designate_instrument'])) {
                    $errorText .= $lang['mycap_mobile_app_710'];
                    $errorText .= '<ul>';
                    foreach ($error_details['designate_instrument'] as $form) {
                        $errorText .= '<li style="padding-top: 5px;"><code>'.$Proj->forms[$form]['menu'].'</code></li>';
                    }
                    $errorText .= '</ul>';
                }
                if (!empty($error_details['enable_atleast_one_event'])) {
                    $errorText .= $lang['mycap_mobile_app_779'];
                    $errorText .= '<ul>';
                    foreach ($error_details['enable_atleast_one_event'] as $form) {
                        $errorText .= '<li style="padding-top: 5px;"><code>'.$Proj->forms[$form]['menu'].'</code></li>';
                    }
                    $errorText .= '</ul>';
                }
                if (!empty($errorText)) {
                    $errors[] = $errorText;
                }
            } else {
                $instrumentFields = Task::getListExcludingMyCapFields($form);
                if (empty($instrumentFields)) {
                    $errors[] = $lang['mycap_mobile_app_734'];
                }
                $eventsList = self::getEventsList($form);
                if (empty($eventsList)) {
                    $errors[] = $lang['mycap_mobile_app_710'];
                } else {
                    $eventsSchedules = self::getTaskSchedules($myCapProj->tasks[$form]['task_id']);
                    if (empty($eventsSchedules)) {
                        $errors[] = (PAGE == 'MyCap/edit_task.php') ? $lang['mycap_mobile_app_779'] : $lang['mycap_mobile_app_802'];
                    }
                }
            }
        } else {
            // For Non-longitudinal projects
            if ($form == '') {
                foreach ($Proj->forms as $form => $attr) {
                    if ($myCapProj->tasks[$form]['enabled_for_mycap'] == 1) {
                        $instrumentFields = Task::getListExcludingMyCapFields($form);
                        if (empty($instrumentFields)) {
                            $error_details['no_fields'][] = $form;
                        }
                    }
                }
                $errorText = '';
                if (!empty($error_details['no_fields'])) {
                    $errorText .= $lang['mycap_mobile_app_734'];
                    $errorText .= '<ul>';
                    foreach ($error_details['no_fields'] as $form) {
                        $errorText .= '<li style="padding-top: 5px;"><code>'.$Proj->forms[$form]['menu'].'</code></li>';
                    }
                    $errorText .= '</ul>';
                }
                if (!empty($errorText)) {
                    $errors[] = $errorText;
                }
            } else {
                $instrumentFields = Task::getListExcludingMyCapFields($form);
                if (empty($instrumentFields)) {
                    $errors[] = $lang['mycap_mobile_app_734'];
                }
            }
        }
        return $errors;
    }
    /**
     * Fix all MyCap Task errors for selected instrument
     *
     * @param string $form
     *
     * @return void
     */
    public static function fixMyCapTaskErrors($form) {
        global $Proj;
        if ($form == '') {
            foreach ($Proj->forms as $form => $attr) {
                $missingAnnotations = self::getMissingAnnotationList($form);
                if (count($missingAnnotations) > 0) {
                    self::fixMissingAnnotationsIssues($missingAnnotations, $form);
                }
                if ($Proj->longitudinal) {
                    self::fixNonRepeatingFormIssues($form);
                } else {
                    if (!$Proj->isRepeatingForm($Proj->firstEventId, $form)) {
                        // Make this form as repeatable with default eventId as project is classic
                        $sql = "INSERT INTO redcap_events_repeat (event_id, form_name) 
                                VALUES ({$Proj->firstEventId}, '" . db_escape($form) . "')";
                        db_query($sql);
                    }
                }
            }
        } else {
            $missingAnnotations = self::getMissingAnnotationList($form);
            if (count($missingAnnotations) > 0) {
                self::fixMissingAnnotationsIssues($missingAnnotations, $form);
            }
            if ($Proj->longitudinal) {
                self::fixNonRepeatingFormIssues($form);
            } else if (!$Proj->isRepeatingForm($Proj->firstEventId, $form)) {
                // Make this form as repeatable with default eventId as project is classic
                $sql = "INSERT INTO redcap_events_repeat (event_id, form_name) 
                    VALUES ({$Proj->firstEventId}, '" . db_escape($form) . "')";
                db_query($sql);
            }
        }

    }

    /**
     * Remove extra spaces from comma seperated string (Exa. Fixed Schedule 1,  7 should return as 1,7)
     *
     * @param string $string
     *
     * @return string
     */
    public static function removeSpaces($string) {
        $arr = explode(",", $string);
        foreach ($arr as $value) {
            $trimedArr[] = trim($value);
        }
        return implode(",", $trimedArr);
    }

    /**
     * Get list of events that utilizes form
     *
     * @param string $form
     *
     * @return array
     */
    public static function getEventsList($form) {
        global $Proj;
        $events = array();
        foreach ($Proj->eventsForms as $this_event_id=>$these_forms) {
            foreach ($these_forms as $this_form) {
                if ($this_form == $form) {
                    $events[] = $this_event_id;
                }
            }
        }
        return $events;
    }

    /**
     * Get all schedules relative to each event that utilizes form
     *
     * @param integer $taskId
     *
     * @return array
     */
    public static function getTaskSchedules($taskId = '') {
        $sql = "SELECT event_id FROM redcap_mycap_tasks_schedules WHERE task_id='".(int)$taskId."' ORDER BY event_id";
        $q = db_query($sql);
        $scheduleList = array();
        while ($row = db_fetch_assoc($q))
        {
            $scheduleList[] = $row['event_id'];
        }
        return $scheduleList;
    }

    /**
     * Returns all MyCap Task warnings + errors for fix issues popup and publish config popup
     *
     * @param string $page
     * @param string $section   fix|publish
     *
     * @return string
     */
    public static function listMyCapTasksIssues($page = '', $section = 'fix') {
        global $lang;
        $taskErrors = self::getMyCapTaskErrors($page);
        $taskNonFixableErrors = self::getMyCapTaskNonFixableErrors($page);
        $data['count'] = count($taskErrors);
        $html = '';
        if (!empty($taskNonFixableErrors)) {
            $html .= '<div class="red" id="div_errors_list" '.(($section == 'publish') ? 'style="display:none;"' : "").'><i class="fa fa-circle-exclamation" style="color: red;"></i> <b>'.$lang['global_109'].'</b> ';
            foreach ($taskNonFixableErrors as $error) {
                $html .= $error;
            }
            $html .= '</div>';
        }

        if (!empty($taskErrors)) {
            $html .= '<div class="yellow" id="div_warnings_list" style="margin-top: 15px;'.(($section == 'publish') ? 'display:none;' : '').'"><i class="fa fa-warning" style="color:darkorange;"></i> <b>'.$lang['mycap_mobile_app_721'].'</b> ';
            $html .= (($_GET['page'] != '') ? $lang['mycap_mobile_app_589'] : $lang['mycap_mobile_app_701']);
            $html .= '<ul>';
            foreach ($taskErrors as $error) {
                $html .= '<li style="padding-top: 5px;">'.$error.'</li>';
            }
            $html .= '</ul>';
            if ($section == 'fix') {
                $html .= '<button onclick="fixMyCapIssues(\''.$_GET['page'].'\')" class="btn btn-xs btn-rcgreen" id="fixBtn" style="font-size:13px;margin-right:30px;text-align: right;">
			                                <i class="fas fa-check"></i> '.$lang['mycap_mobile_app_722'].'</button>';
            }

            $html .= '</div>';
        }
        return $html;
    }

    /**
     * Make instrument for event non-repeating :: LONGITUDINAL PROJECTS
     *
     * @param integer $eventId
     * @param string $form
     *
     * @return void
     */
    public static function makeFormNonRepeating($eventId, $form) {
        global $Proj;
        if ($Proj->isRepeatingForm($eventId, $form)) {
            // Make this form as non-repeatable with eventId as project is longitudinal
            $sql_delete = "DELETE FROM redcap_events_repeat WHERE event_id = '".$eventId."' AND form_name = '".$form."'";
            db_query($sql_delete);
        }
    }

    /**
     * Make event as non-repeating :: LONGITUDINAL PROJECTS
     *
     * @param integer $eventId
     *
     * @return void
     */
    public static function makeEventNonRepeating($eventId) {
        global $Proj;
        if ($Proj->isRepeatingEvent($eventId)) {
            // Make this event as non-repeatable with eventId as project is longitudinal
            $sql_delete = "DELETE FROM redcap_events_repeat WHERE event_id = '".$eventId."'";
            db_query($sql_delete);
        }
    }

    /**
     * Returns all errors - if instrument is repeatable for selected events
     *
     * @param string $form
     *
     * @return array
     */
    public static function getRepeatingFormErrors($form, $schedules) {
        global $Proj;
        $events = array();

        foreach ($schedules as $eventId) {
            if ($Proj->isRepeatingForm($eventId, $form)) {
                $events[] = $Proj->eventInfo[$eventId]['name_ext'];
            }
        }
        return $events;
    }
    /**
     * Returns all errors - if instrument is repeatable for selected events
     *
     * @param string $form
     *
     * @return array
     */
    public static function getRepeatingEventErrors($form, $schedules) {
        global $Proj;
        $events = array();

        foreach ($schedules as $eventId) {
             if ($Proj->isRepeatingEvent($eventId)) {
                 $events[] = $Proj->eventInfo[$eventId]['name_ext'];
            }
        }
        return $events;
    }

    /**
     * Fix all errors - if instrument is repeatable for selected events, make it non-repeatable :: LONGITUDINAL PROJECTS
     *
     * @param string $form
     *
     * @return void
     */
    public static function fixNonRepeatingFormIssues($form) {
        global $myCapProj, $Proj;
        $schedules = self::getTaskSchedules($myCapProj->tasks[$form]['task_id']);
        foreach ($schedules as $eventId) {
            if ($Proj->isRepeatingForm($eventId, $form)) {
                self::makeFormNonRepeating($eventId, $form);
            } else if ($Proj->isRepeatingEvent($eventId)) {
                self::makeEventNonRepeating($eventId);
            }
        }
    }

    /**
     * Fix all errors - if instrument is repeatable for selected events, make it non-repeatable :: LONGITUDINAL PROJECTS
     *
     * @param string $form
     *
     * @return void
     */
    public static function checkFormEventsBindingError($events = array()) {
        global $lang;
        $error_message = "";
        if (empty($events)) {
            $error_message = RCView::div(array('class'=>'yellow','style'=>'padding:10px;'),
                RCView::div(array('style'=>'font-weight:bold;'),
                    RCView::img(array('src'=>'exclamation_orange.png')) .
                    $lang['mycap_mobile_app_723']
                ) .
                RCView::div(array('style'=>'padding-top:5px;'),
                    $lang['mycap_mobile_app_816']
                ).
                RCView::div(array('style'=>'padding-top:15px;'),
                    "<a href='" . APP_PATH_WEBROOT . "Design/designate_forms.php?pid=".PROJECT_ID."&page_edit=".$_GET['page']."' style='text-decoration:underline;'>{$lang['global_28']}</a>"
                )
            );
        }
        return $error_message;
    }

    /**
     * Get form-event binding utilized in MyCap task setup for project :: LONGITUDINAL PROJECTS
     *
     * @param integer $projectId
     *
     * @return array
     */
    public static function getFormEventsBindings() {
        global $Proj, $myCapProj;
        $binding = array();
        foreach ($Proj->forms as $form => $attr) {
            if ($myCapProj->tasks[$form]['enabled_for_mycap'] == 1) {
                $eventsSchedules = self::getTaskSchedules($myCapProj->tasks[$form]['task_id']);
                if (!empty($eventsSchedules)) {
                    foreach ($eventsSchedules as $eventId) {
                        $binding[$form][] = $eventId;
                    }
                }
            }
        }
        return $binding;
    }

    /**
     * Returns all errors text - if instrument is repeatable :: LONGITUDINAL PROJECTS
     *
     * @param array $formsRepeating
     *
     * @return array
     */
    public static function getRepeatingFormsErrorsText($formsRepeating) {
        global $Proj, $lang;
        $errorText = $list = "";
        foreach ($formsRepeating as $form => $events) {
            if (!empty($events)) {
                $list .= '<li style="padding-top: 5px;">'.$lang['mycap_mobile_app_712'].' "'.$Proj->forms[$form]['menu'].'" '.$lang['mycap_mobile_app_713'].' <code>'.implode(", ", $events).'</code>';
            }
        }
        if ($list != '') {
            $errorText .= '<ul>'.$list.'</ul>';
        }
        return $errorText;
    }

    /**
     * Returns all errors text - if event is repeatable :: LONGITUDINAL PROJECTS
     *
     * @param array $repeatingFormsEventsErr
     *
     * @return array
     */
    public static function getRepeatingEventsErrorsText($eventsRepeating) {
        $errorText = "";
        $events = array();

        foreach ($eventsRepeating as $form => $eventArr) {
            foreach ($eventArr as $event) {
                $events[] = $event;
            }
        }
        $events = array_unique($events);
        if (!empty($events)) {
            $errorText .= '<ul>';
            foreach ($events as $event) {
                $errorText .= '<li style="padding-top: 5px;"><code>'.$event.'</code>';
            }
            $errorText .= '</ul>';
        }
        return $errorText;
    }

    /**
     * Returns all fields (Excluding fields having MyCap annotations)
     *
     * @param string $instrument
     *
     * @return array
     */
    public static function getListExcludingMyCapFields($instrument) {
        $output = array();
        $instrumentFields = \REDCap::getDataDictionary('array', false, true, $instrument);
        foreach ($instrumentFields as $field) {
            $found = array();
            foreach (self::$requiredAnnotations as $annotation) {
                if (strpos(trim($field['field_annotation']), $annotation) !== false) {
                    $found[] = $annotation;
                }
            }
            if(empty($found)) {
                $output[] = $field;
            }
        }
        return $output;
    }

    /**
     * Returns CSV contents for all MyCap task schedules of projects
     *
     * @return string
     */
    public static function csvTaskSchedulesDownload() {
        global $Proj, $myCapProj;
        foreach ($myCapProj->tasks as $task) {
            $task_ids[] = $task['task_id'];
        }
        $result = [];
        $sql = "SELECT task_id, form_name, task_title, question_format, card_display, x_date_field, x_time_field, y_numeric_field,
                            allow_retro_completion, allow_save_complete_later, include_instruction_step, include_completion_step, instruction_step_title,
                            instruction_step_content, completion_step_title, completion_step_content, schedule_relative_to, schedule_type, schedule_frequency,
                            schedule_interval_week, schedule_days_of_the_week, schedule_interval_month, schedule_days_of_the_month, schedule_days_fixed, schedule_relative_offset,
                            schedule_ends, schedule_end_count, schedule_end_after_days, schedule_end_date 
                FROM redcap_mycap_tasks 
                WHERE project_id = ?";

        $q = db_query($sql, [PROJECT_ID]);
        while ($row = db_fetch_assoc($q)) {
            $taskErrors = self::getMyCapTaskNonFixableErrors($row['form_name']);
            // Ignore tasks having non-fixable errors
            if (empty($taskErrors)) {
                if ($Proj->longitudinal) {
                    $output = $row;
                    $schedules = self::getTaskSchedules($row['task_id']);
                    $scheduleStr = '';
                    if (!empty($schedules)) {
                        $total = count($schedules);
                        $i = 0;
                        foreach ($schedules as $eventId) {
                            $i++;
                            $scheduleStr .= $Proj->eventInfo[$eventId]['name_ext'].' : '.RCView::tt('mycap_mobile_app_717').' '.$Proj->eventInfo[$eventId]['day_offset'].' '.RCView::tt('mycap_mobile_app_718');
                            if ($i != $total)   $scheduleStr .= ' | ';
                        }
                    }
                    $output['schedules'] = strip_tags($scheduleStr);
                    unset($output['task_id'], $output['schedule_type'], $output['schedule_frequency'], $output['schedule_interval_week'],
                        $output['schedule_days_of_the_week'], $output['schedule_interval_month'], $output['schedule_days_of_the_month'],
                        $output['schedule_days_fixed'], $output['schedule_relative_offset'], $output['schedule_ends'], $output['schedule_end_count'],
                        $output['schedule_end_after_days'], $output['schedule_end_date']);
                    $result[$row['form_name']][] = $output;
                } else {
                    unset($row['task_id']);
                    $result[$row['form_name']][] = $row;
                }
                // Make sure tasks are in form order
                $tasks_order[$row['form_name']] = $Proj->forms[$row['form_name']]['form_number'];
            }
        }
        asort($tasks_order);
        $tasks2 = array();
        foreach ($tasks_order as $this_form=>$order) {
            $tasks2[] = $result[$this_form][0];
        }
        $tasks = $tasks2;
        $content = arrayToCsv($tasks);

        return $content;
    }
}
