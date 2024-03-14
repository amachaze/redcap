<?php

namespace Vanderbilt\REDCap\Classes\MyCap;

use RCView;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\AmslerGrid;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\Audio;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\AudioRecording;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\FitnessCheck;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\HolePeg;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\Promis;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\PSAT;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\RangeOfMotion;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\ReactionTime;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\SelfieCapture;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\ShortWalk;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\SpatialSpanMemory;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\SpeechRecognition;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\Stroop;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\TimedWalk;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\ToneAudiometry;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\TowerOfHanoi;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\TrailMaking;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\TwoFingerTappingInterval;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\Arrows;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\FNAMELearning;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\Spelling;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\Sequences;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\FnameTest;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\NumberMatch;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\WordMeaningForm1;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\WordMeaningForm2;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\ShapeColorSorting;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks\ArrangingPictures;
use Vanderbilt\REDCap\Classes\ProjectDesigner;
use Project;

class ActiveTask
{
    const RESEARCHKIT_DOCS_URL = "http://researchkit.org/docs/docs/ActiveTasks/ActiveTasks.html";

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
    const SELFIECAPTURE = '.SelfieCapture';
    const AUDIORECORDING = '.AudioRecording';
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
    const ARROWS = 'MtbArrows';
    const SPELLING = 'MtbSpelling';
    const SEQUENCES = 'MtbSequences';
    const FNAMETEST = 'MtbFNAMETest';
    const NUMBERMATCH = 'MtbNumberMatch';
    const FNAMELEARNING = 'MtbFNAMELearning';
    const WORDMEANING1 = 'MtbWordMeaning1';
    const WORDMEANING2 = 'MtbWordMeaning2';
    const SHAPECOLORSORTING = 'MtbShapeColorSorting';
    const ARRANGINGPICTURES = 'MtbArrangingPictures';
    /**
     * Check if task is active task or not based on task format
     *
     * @param string $task_format
     * @return boolean
     */
    public static function isActiveTask($task_format) {
        return !in_array($task_format, array(self::FORM, self::QUESTIONNAIRE, self::PROMIS));
    }

    /**
     * Check if task is MTB active task or not based on task format
     *
     * @param string $task_format
     * @return boolean
     */
    public static function isMTBActiveTask($task_format) {
        return in_array($task_format, array(self::ARROWS, self::FNAMELEARNING, self::SPELLING, self::SEQUENCES, self::FNAMETEST,
                                            self::NUMBERMATCH, self::WORDMEANING1, self::WORDMEANING2, self::SHAPECOLORSORTING, self::ARRANGINGPICTURES));
    }

    /**
     * Return object for active task to process functions based on task format
     *
     * @param string $format
     * @return object
     */
    public static function getActiveTaskObj($format)
    {
        switch ($format) {
            case self::AMSLERGRID:
                $retObj = new AmslerGrid();
                break;

            case self::AUDIO:
                $retObj = new Audio();
                break;

            case self::AUDIORECORDING:
                $retObj = new AudioRecording();
                break;

            case self::FITNESSCHECK:
                $retObj = new FitnessCheck();
                break;

            case self::HOLEPEG:
                $retObj = new HolePeg();
                break;

            case self::PSAT:
                $retObj = new PSAT();
                break;

            case self::RANGEOFMOTION:
                $retObj = new RangeOfMotion();
                break;

            case self::REACTIONTIME:
                $retObj = new ReactionTime();
                break;

            case self::SELFIECAPTURE:
                $retObj = new SelfieCapture();
                break;

            case self::SHORTWALK:
                $retObj = new ShortWalk();
                break;

            case self::SPATIALSPANMEMORY:
                $retObj = new SpatialSpanMemory();
                break;

            case self::SPEECHRECOGNITION:
                $retObj = new SpeechRecognition();
                break;

            case self::STROOP:
                $retObj = new Stroop();
                break;

            case self::TIMEDWALK:
                $retObj = new TimedWalk();
                break;

            case self::TONEAUDIOMETRY:
                $retObj = new ToneAudiometry();
                break;

            case self::TOWEROFHANOI:
                $retObj = new TowerOfHanoi();
                break;

            case self::TRAILMAKING:
                $retObj = new TrailMaking();
                break;

            case self::TWOFINGERTAPPINGINTERVAL:
                $retObj = new TwoFingerTappingInterval();
                break;

            case self::PROMIS:
                $retObj = new Promis();
                break;

            case self::ARROWS:
                $retObj = new Arrows();
                break;

            case self::SPELLING:
                $retObj = new Spelling();
                break;

            case self::SEQUENCES:
                $retObj = new Sequences();
                break;

            case self::FNAMETEST:
                $retObj = new FnameTest();
                break;

            case self::NUMBERMATCH:
                $retObj = new NumberMatch();
                break;

            case self::FNAMELEARNING:
                $retObj = new FNAMELearning();
                break;

            case self::WORDMEANING1:
                $retObj = new WordMeaningForm1();
                break;

            case self::WORDMEANING2:
                $retObj = new WordMeaningForm2();
                break;

            case self::SHAPECOLORSORTING:
                $retObj = new ShapeColorSorting();
                break;

            case self::ARRANGINGPICTURES:
                $retObj = new ArrangingPictures();
                break;

            default:
                throw new \Exception("Invalid Active Task Format: $format");
        }
        return $retObj;
    }

    /**
     * Create instrument in REDCap application
     *
     * @param string $form_name
     * @return array
     */
    public static function createREDCapForm($form_name) {
        global $Proj;
        $projectDesigner = new ProjectDesigner($Proj);
        $created = $projectDesigner->createForm($form_name);
        return array($created, $projectDesigner->form);
    }

    /**
     * Insert initial default task settings when task is created from active tasks and make it enabled for mycap
     *
     * @param string $form_name
     * @param string $form_label
     * @param string $task_format
     * @param string $extendedConfigAsString
     * @return boolean
     */
    public static function insertDefaultTaskSetting($form_name, $form_label, $task_format, $extendedConfigAsString) {
        $return = false;
        $task_title = $form_label;
        $card_display =  Task::TYPE_PERCENTCOMPLETE;

        // Task Schedule
        $schedule_relative_to = Task::RELATIVETO_JOINDATE;
        $schedule_type = Task::TYPE_INFINITE;
        $schedule_frequency = Task::FREQ_DAILY;
        $schedule_ends = Task::ENDS_NEVER;
        $schedule_relative_offset = 0;

        // Save task info
        $sql = "REPLACE INTO redcap_mycap_tasks (project_id, form_name, task_title, question_format,
			card_display, schedule_relative_to, schedule_type, schedule_frequency, schedule_relative_offset,
			schedule_ends, extended_config_json)
			VALUES (".PROJECT_ID.", '" . db_escape($form_name) . "', '" . db_escape($task_title) . "', '" . db_escape($task_format) . "', 
			'" . db_escape($card_display) . "', '" . db_escape($schedule_relative_to) . "', '" . db_escape($schedule_type) . "', 
			'" . db_escape($schedule_frequency) . "', '" . db_escape($schedule_relative_offset) . "', '" . db_escape($schedule_ends) . "', 
			'" . db_escape($extendedConfigAsString) . "'
        )";

        if (db_query($sql)) {
            $return = true;
            $task_id = db_insert_id();
            // Log the event
            //Logging::logEvent($sql, "redcap_mycap_tasks", "MANAGE", $task_id, "task_id = $task_id", "Set up MyCap Active Task");
        }
        return $return;
    }

    /**
     * Returns human readable string for the given format
     *
     * @param string $format
     * @return string
     */
    public static function toString($format)
    {
        switch ($format) {
            case self::AMSLERGRID:
                $retVal = 'Amsler Grid Active Task';
                break;
            case self::AUDIO:
                $retVal = 'Sustained Phonation Active Task';
                break;
            case self::AUDIORECORDING:
                $retVal = 'Audio Recording';
                break;
            case self::DBHLTONEAUDIOMETRY:
                $retVal = 'dBHL Tone Audiometry Active Task';
                break;
            case self::FITNESSCHECK:
                $retVal = 'Fitness Check Active Task';
                break;
            case self::HOLEPEG:
                $retVal = 'Hole Peg';
                break;
            case self::PROMIS:
                $retVal = 'Health Measure';
                break;
            case self::PSAT:
                $retVal = 'PSAT Active Task';
                break;
            case self::RANGEOFMOTION:
                $retVal = 'Range of Motion Active Task';
                break;
            case self::REACTIONTIME:
                $retVal = 'Reaction Time Active Task';
                break;
            case self::SELFIECAPTURE:
                $retVal = 'Selfie Capture Active Task';
                break;
            case self::SHORTWALK:
                $retVal = 'Short Walk Active Task';
                break;
            case self::SPATIALSPANMEMORY:
                $retVal = 'Spatial Span Memory Test Active Task';
                break;
            case self::SPEECHINNOISE:
                $retVal = 'Speech in Noise Active Task';
                break;
            case self::SPEECHRECOGNITION:
                $retVal = 'Speech Recognition Active Task';
                break;
            case self::STROOP:
                $retVal = 'Stroop Active Task';
                break;
            case self::TIMEDWALK:
                $retVal = 'Timed Walk Active Task';
                break;
            case self::TONEAUDIOMETRY:
                $retVal = 'Tone Audiometry Active Task';
                break;
            case self::TOWEROFHANOI:
                $retVal = 'Tower of Hanoi Active Task';
                break;
            case self::TRAILMAKING:
                $retVal = 'Trail Making Active Task';
                break;
            case self::TWOFINGERTAPPINGINTERVAL:
                $retVal = 'Two Finger Tapping Interval Active Task';
                break;
            case self::VUMCAUDIORECORDING:
                $retVal = 'Audio Recording';
                break;
            case self::VUMCCONTRACTIONTIMER:
                $retVal = 'Contraction Timer';
                break;
            case self::ARROWS:
                $retVal = 'MTB Arrows Active Task';
                break;
            case self::SPELLING:
                $retVal = 'MTB Spelling Active Task';
                break;
            case self::SEQUENCES:
                $retVal = 'MTB Sequences Active Task';
                break;
            case self::FNAMELEARNING:
                $retVal = 'MTB FNAME Learning Active Task';
                break;
            case self::FNAMETEST:
                $retVal = 'MTB Fname Test Active Task';
                break;
            case self::NUMBERMATCH:
                $retVal = 'MTB Number Match Active Task';
                break;
            case self::WORDMEANING1:
                $retVal = 'MTB Word Meaning Form 1 Active Task';
                break;
            case self::WORDMEANING2:
                $retVal = 'MTB Word Meaning Form 2 Active Task';
                break;
            case self::SHAPECOLORSORTING:
                $retVal = 'MTB Shape Color Sorting Active Task';
                break;
            case self::ARRANGINGPICTURES:
                $retVal = 'MTB Arranging Pictures Active Task';
                break;
            default:
                $retVal = 'Invalid Format';
                break;
        }
        return $retVal;
    }

    public static function getHelpURLForTaskFormat($task_format) {
        $allTasks = self::getAllActiveTasks();
        $taskArr = [];
        foreach ($allTasks as $category => $tasks) {
            foreach ($tasks as $task) {
                $taskArr[$task['addHref']] = $task['helpLink'] ?? "";
            }
        }
        return $taskArr[$task_format] ?? "";
    }

    /**
     * Get all active tasks listing
     *
     * @return array
     */
    public static function getAllActiveTasks($third_party_platform = '')
    {
        $tasks['Motor Activities'][] = array(
            'name' => 'Range of Motion',
            'helpLink' => '#range',
            'addHref' => self::RANGEOFMOTION
        );
        $tasks['Motor Activities'][] = array(
            'name' => 'Gait and Balance (Short Walk)',
            'helpLink' => '#gait',
            'addHref' => self::SHORTWALK
        );
        $tasks['Motor Activities'][] = array(
            'name' => 'Tapping Speed',
            'helpLink' => '#tapping',
            'platform' => array('android','apple'),
            'addHref' => self::TWOFINGERTAPPINGINTERVAL
        );

        $tasks['Fitness'][] = array(
            'name' => 'Fitness',
            'helpLink' => '#fitness',
            'addHref' => self::FITNESSCHECK
        );
        $tasks['Fitness'][] = array(
            'name' => 'Timed Walk',
            'helpLink' => '#timed',
            'addHref' => self::TIMEDWALK
        );

        $tasks['Cognition'][] = array(
            'name' => 'Spatial Memory',
            'helpLink' => '#spatial',
            'addHref' => self::SPATIALSPANMEMORY
        );
        $tasks['Cognition'][] = array(
            'name' => 'Stroop',
            'helpLink' => '#stroop',
            'addHref' => self::STROOP
        );
        $tasks['Cognition'][] = array(
            'name' => 'Trail Making Test',
            'helpLink' => '#trail',
            'addHref' => self::TRAILMAKING
        );
        $tasks['Cognition'][] = array(
            'name' => 'Paced Serial Addition Test (PSAT)',
            'helpLink' => '#paced',
            'addHref' => self::PSAT
        );
        $tasks['Cognition'][] = array(
            'name' => 'Tower of Hanoi',
            'helpLink' => '#tower',
            'addHref' => self::TOWEROFHANOI
        );
        $tasks['Cognition'][] = array(
            'name' => 'Reaction Time',
            'warning' => 'Partially implemented. Results are not sent to REDCap.',
            'helpLink' => '#reaction',
            'platform' => array(),
            'addHref' => self::REACTIONTIME,
            'action' => ''
        );

        $tasks['Speech'][] = array(
            'name' => 'Audio Recording',
            'note' => 'Record spoken phrases using the microphone.',
            'platform' => array('android'),
            'addHref' => self::AUDIORECORDING
        );
        $tasks['Speech'][] = array(
            'name' => 'Sustained Phonation',
            'helpLink' => '#sustained',
            'addHref' => self::AUDIO
        );
        $tasks['Speech'][] = array(
            'name' => 'Speech Recognition',
            'warning' => 'Partially implemented. Speech recognition image is not supported.',
            'helpLink' => '#speech_recognition',
            'addHref' => self::SPEECHRECOGNITION,
            'platform' => array(),
            'action' => ''
        );
        $tasks['Speech'][] = array(
            'name' => 'Speech in Noise',
            'warning' => 'Not implemented',
            'helpLink' => '#speech_in_noise',
            'addHref' => self::SPEECHINNOISE,
            'platform' => array(),
            'action' => ''
        );

        $tasks['Hearing'][] = array(
            'name' => 'Environment SPL',
            'warning' => 'Not implemented',
            'helpLink' => 'spl',
            'addHref' => '',
            'platform' => array(),
            'action' => ''
        );
        $tasks['Hearing'][] = array(
            'name' => 'Tone Audiometry',
            'helpLink' => '#tone',
            'addHref' => self::TONEAUDIOMETRY
        );
        $tasks['Hearing'][] = array(
            'name' => 'dBHL Tone Audiometry',
            'warning' => 'Not implemented',
            'helpLink' => '#dBHL',
            'addHref' => self::DBHLTONEAUDIOMETRY,
            'platform' => array(),
            'action' => ''
        );

        $tasks['Hand Dexterity'][] = array(
            'name' => '9-Hole Peg Test',
            'helpLink' => '#nine',
            'addHref' => self::HOLEPEG
        );

        $tasks['Vision'][] = array(
            'name' => 'Amsler Grid',
            'helpLink' => '#amsler',
            'addHref' => self::AMSLERGRID
        );
        $tasks['Vision'][] = array(
            'name' => 'Selfie Capture',
            'note' => 'Capture a selfie using the front facing camera with facial detection',
            'addHref' => self::SELFIECAPTURE,
            'platform' => array('android'),
        );

        // MTB Active tasks listing
        $mtbTasks['Mobile Toolbox Tasks'][] = array(
            'name' => 'Arranging Pictures',
            'note' => '',
            'addHref' => self::ARRANGINGPICTURES
        );
        $mtbTasks['Mobile Toolbox Tasks'][] = array(
            'name' => 'Arrows',
            'note' => '',
            'addHref' => self::ARROWS
        );
        $mtbTasks['Mobile Toolbox Tasks'][] = array(
            'name' => 'FNAME Learning',
            'note' => '',
            'addHref' => self::FNAMELEARNING
        );
        $mtbTasks['Mobile Toolbox Tasks'][] = array(
            'name' => 'Fname Test',
            'note' => '',
            'addHref' => self::FNAMETEST
        );
        $mtbTasks['Mobile Toolbox Tasks'][] = array(
            'name' => 'Number Match',
            'note' => '',
            'addHref' => self::NUMBERMATCH
        );
        $mtbTasks['Mobile Toolbox Tasks'][] = array(
            'name' => 'Sequences',
            'note' => '',
            'addHref' => self::SEQUENCES
        );
        $mtbTasks['Mobile Toolbox Tasks'][] = array(
            'name' => 'Shape Color Sorting',
            'note' => '',
            'addHref' => self::SHAPECOLORSORTING
        );
        $mtbTasks['Mobile Toolbox Tasks'][] = array(
            'name' => 'Spelling',
            'note' => '',
            'addHref' => self::SPELLING
        );
        $mtbTasks['Mobile Toolbox Tasks'][] = array(
            'name' => 'Word Meaning Form 1',
            'note' => '',
            'addHref' => self::WORDMEANING1
        );
        $mtbTasks['Mobile Toolbox Tasks'][] = array(
            'name' => 'Word Meaning Form 2',
            'note' => '',
            'addHref' => self::WORDMEANING2
        );
        return ($third_party_platform == 'mtb' ? $mtbTasks : $tasks);
    }

    /**
     * Return HTML that displays list of active tasks with link and "Add" button
     *
     * @return string
     */
    public static function getActiveTasksListLayout($third_party_platform) {
        global $lang;
        $active_tasks = self::getAllActiveTasks($third_party_platform);

        $html = '';
        foreach ($active_tasks as $this_task_category => $tasks) {
            $row = '';
            foreach ($tasks as $key => $task) {
                if (!isset($task['action'])) {
                    $button = '<button onclick="addNewActiveTask(\''.$task['addHref'].'\', \''.$task['name'].'\')" class="btn btn-xs btn-rcgreen addInstrBtn" style="margin-left:0px;">
                                <i class="fas fa-plus"></i> Add</button>';
                } else {
                    $button = $lang['control_center_149'];
                }

                if (isset($task['platform'])) {
                    $platforms = $task['platform'];
                } else {
                    $platforms = array('apple');
                }
                $supported_platform = array_map(function ($value)
                                        {
                                            return ($value == 'android') ?
                                                '<img width="16" src="'.APP_PATH_IMAGES.'android.png" title="Platform: Android">'
                                                : '<img width="16" src="'.APP_PATH_IMAGES.'apple.png" title="Platform: Apple">';
                                        }, $platforms);
                $supported_platform_icons = implode("",$supported_platform);

                $flutter_supported_platform_icons = '';
                if (!empty($supported_platform)) {
                    $flutter_supported_platform_icons = '<img width="16" src="'.APP_PATH_IMAGES.'android.png" title="Platform: Android">'
                                                        . '<img width="16" src="'.APP_PATH_IMAGES.'apple.png" title="Platform: Apple">';
                }

                // First, build rows for each active task
                $row .= RCView::tr('',
                    RCView::td(array('class' => 'data', 'style' => 'padding:1px 5px;'),
                            RCView::table(array('cellspacing'=>'0','align'=>'center','style'=>'table-layout:fixed;width:100%;'),
                                // Table header
                                RCView::tr('',
                                    RCView::td(array('width' => '90%'),
                                        // Display task name
                                        ((isset($task['helpLink'])) ? '<a target="_blank" style="color: blue;" href="'.self::RESEARCHKIT_DOCS_URL.$task['helpLink'].'"><i class="fas fa-external-link-alt" style="padding-left: 8px;"></i> '.$task['name'].'</a>' : '<span style="padding-left: 8px; font-weight: bold;">'.$task['name'].'</span>').
                                        RCView::br().
                                        // Display Warning
                                        ((isset($task['warning']) && $task['warning'] != '') ?
                                            RCView::span(array('style' => 'color:red;margin-left:8px;font-size:11px;'), "[" . $task['warning'] . "]") : ""
                                        ).
                                        // Display Note
                                        ((isset($task['note']) && $task['note'] != '') ?
                                            RCView::span(array('class' => 'newdbsub', 'style'=>'margin-left:8px;font-size:11px;'), "[" . $task['note'] . "]")
                                         : "")
                                    )
                                )
                            )
                        )  .
                        (($third_party_platform != 'mtb') ? RCView::td(array('class'=>'data', 'style'=>'text-align:center;'),
                            $supported_platform_icons
                        ) : '') .
                        RCView::td(array('class'=>'data', 'style'=>'text-align:center;'),
                            $flutter_supported_platform_icons
                        ) .
                        RCView::td(array('class'=>'data', 'style'=>'text-align:center;font-size:11px;font-weight:bold;'),
                            // Add Button
                            $button
                        )
                    );
            }

            // Build table for this survey
            $html .= 	RCView::table(array('cellspacing'=>'0','class'=>'form_border', 'align'=>'center','style'=>'table-layout:fixed;margin:0 20px 20px 20px;width:97%;'),
                // Table header
                RCView::tr('',
                    RCView::td(array('class'=>'header', 'width'=>'65%', 'style'=>'color:#800000;'),
                        strip_tags($this_task_category)
                    ) .
                    (($third_party_platform != 'mtb') ? RCView::td(array('class'=>'header', 'width'=>'9%', 'style'=>'text-align: center;'),
                        RCView::img(array('src'=>'mycap_classic.jpg', 'width'=>'30'))."<br><span style='color:#800000;font-size:9px; font-weight: normal;'>".RCView::tt('mycap_mobile_app_819')."</span>"
                    ) : '') .
                    RCView::td(array('class'=>'header', 'width'=>'7%', 'style'=>'color:#800000;  text-align: center;'),
                        RCView::img(array('src'=>'mycap_new.png'))."<br><span style='color:#800000;font-size:9px; font-weight: normal;'>".RCView::tt('grid_58')."</span>"
                    ) .
                    RCView::td(array('class'=>'header', 'width'=>'9%', 'style'=>'text-align:center;font-weight:bold;'),
                        $lang['reporting_21']
                    )
                ) .
                // All rows of active tasks
                $row
            );

        }
        return $html;
    }

    /**
     * Return New Field name - check for unique
     *
     * @param string $fieldName
     * @return string
     */
    public static function getNewFieldName($fieldName) {
        global $status;
        $metadata_table = ($status > 0) ? "redcap_metadata_temp" : "redcap_metadata";
        $sql = "SELECT COUNT(*) AS total FROM $metadata_table  WHERE project_id = ".PROJECT_ID." AND field_name = '{$fieldName}' LIMIT 1";
        $q = db_query($sql);
        $total_rows = db_result($q, 0, 'total');
        if ($total_rows > 0) {
            list($root, $num, $padding) = determine_repeat_parts($fieldName);
            do {
                $num++;
                $suffix_padded = str_pad($num, $padding, '0', STR_PAD_LEFT);
                $new_field_name = $root . $suffix_padded;

                $sql = "SELECT COUNT(1) FROM $metadata_table WHERE project_id = ".PROJECT_ID." AND field_name = '$new_field_name'";
                $varExists = db_result(db_query($sql), 0);
            } while ($varExists);

            $fieldName = $new_field_name;
        }
        return $fieldName;
    }

    /**
     * An active task may have one or more configurable properties. This method returns DEFAULT property
     * values for the active task as a JSON string. E.g. {"foo":"bar","zip":"zap"}
     *
     * @return string JSON string
     */
    public static function extendedConfigAsString($obj)
    {
        return is_object($obj) ? json_encode(get_object_vars($obj), JSON_FORCE_OBJECT) : null;
    }
}
