<?php
require_once dirname(dirname(__FILE__)) . "/Config/init_project.php";
use Vanderbilt\REDCap\Classes\MyCap;

// If not using a type of project with mycap, then don't allow user to use this page.
if (!$mycap_enabled) redirect(APP_PATH_WEBROOT . "index.php?pid=$project_id");

global $myCapProj;
// Determine the instrument
$form = (isset($_GET['page']) && isset($Proj->forms[$_GET['page']])) ? $_GET['page'] : $Proj->firstForm;

// If no task id, assume it's the first form and retrieve
if (!isset($_GET['task_id']))
{
	$_GET['task_id'] = MyCap\MyCap::getTaskId($form);
}

if (MyCap\MyCap::checkIfValidTaskOfProject($form, $_GET['task_id'])) {
    // Default message
    $msg = "";

    // Retrieve task info
    $q = db_query("SELECT * FROM redcap_mycap_tasks WHERE project_id = $project_id AND task_id = " . $_GET['task_id']);
    foreach (db_fetch_assoc($q) as $key => $value) {
        if ($value === null) {
            $$key = $value;
        } else {
            // Replace non-break spaces because they cause issues with html_entity_decode()
            $value = str_replace(array("&amp;nbsp;", "&nbsp;"), array(" ", " "), $value);
            // Don't decode if can not detect encoding
            if (function_exists('mb_detect_encoding') && (
                    (mb_detect_encoding($value) == 'UTF-8' && mb_detect_encoding(html_entity_decode($value, ENT_QUOTES)) === false)
                    || (mb_detect_encoding($value) == 'ASCII' && mb_detect_encoding(html_entity_decode($value, ENT_QUOTES)) === 'UTF-8')
                )) {
                $$key = trim($value);
            } else {
                $$key = trim(html_entity_decode($value, ENT_QUOTES));
            }
        }
    }
    if ($schedule_ends == '') $schedule_ends = MyCap\Task::ENDS_NEVER;
    $schedule_days_of_the_week_list = explode(",", $schedule_days_of_the_week ?? "");

    $date_fields = MyCap\Task::getDataTypeBasedFieldsList('date', $form);
    $time_fields = MyCap\Task::getDataTypeBasedFieldsList('time', $form);
    $numeric_fields = MyCap\Task::getDataTypeBasedFieldsList('numeric', $form);

    // Task Schedule
    $daysOfWeek = MyCap\Task::getDaysOfWeekList();

    list($isPromis, $isAutoScoringInstrument) = PROMIS::isPromisInstrument($form);

    $isBatteryInstrument = false;
    $triggers = array();
    if ($isPromis) {
        $issues = MyCap\Task::getUnsupportedPromisInstrumentsIssues($form);
        if (!empty($issues)) {
            echo implode("<br>", $issues);
            exit;
        }
        // Check if Battery Instrument
        $batteryInstrumentsList = MyCap\Task::batteryInstrumentPositions();
        if (array_key_exists($form, $batteryInstrumentsList)) {
            $isBatteryInstrument = true;
            $trigger = MyCap\ActiveTasks\Promis::triggerForBattery(
                $form,
                $batteryInstrumentsList
            );
        }
    }
    if (isset($trigger)) {
        $triggers[] = $trigger;
    }

    // Issue exists if its battery instrument and currently not at position 1
    $batteryInstrumentIssueExists = ($isBatteryInstrument && $batteryInstrumentsList[$form]['instrumentPosition'] != '1');

    $is_active_task = MyCap\ActiveTask::isActiveTask($question_format);
    $is_mtb_task = MyCap\ActiveTask::isMTBActiveTask($question_format);

    $baseline_date_settings = MyCap\ZeroDateTask::getBaselineDateSettings();
    $use_baseline_date = $baseline_date_settings['enabled'] ?? "";
    /**
     * PROCESS SUBMITTED CHANGES
     */
    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        // Build "go back" button to specific page
        if (isset($_GET['redirectDesigner'])) {
            // Go back to Online Designer
            $goBackBtn = renderPrevPageBtn("Design/online_designer.php", $lang['global_77'], false);
        }
        $msg = RCView::div(array('style' => 'padding:0 0 20px;'), $goBackBtn);

        // Assign Post array as globals
        foreach ($_POST as $key => $value) {
            if (strpos($key, 'extendedConfig_') !== false) {
                $key_parts = explode('_', $key);
                if ($key == 'extendedConfig_numberOfDisks') $value = (int)$value;

                $extendedConfigData[$key_parts[1]] = $value;
            } else {
                $$key = $value;
            }
        }
        $missingAnnotations = MyCap\Task::getMissingAnnotationList($form);
        if (count($missingAnnotations) > 0) {
            MyCap\Task::fixMissingAnnotationsIssues($missingAnnotations, $form);
        }

        $extendedConfigAsString = "";
        $is_active_task = MyCap\ActiveTask::isActiveTask($question_format);

        if ($isPromis) {
            $taskObj = MyCap\ActiveTask::getActiveTaskObj($question_format);
            $taskObj->setupIfNeeded($form, PROJECT_ID);
        } else if ($is_active_task == 1 && $is_mtb_task == 0) {
            $taskObj = MyCap\ActiveTask::getActiveTaskObj($question_format);
            $taskObj->buildExtendedConfig($extendedConfigData);
        }
        $extendedConfigAsString = isset($taskObj) ? MyCap\ActiveTask::extendedConfigAsString($taskObj) : null;
        // If some fields are missing from Post because disabled drop-downs don't post, then manually set their default value.
        // Set values
        $enabled_for_mycap = 1;
        $allow_retroactive_completion = (isset($allow_retroactive_completion) && $allow_retroactive_completion == 'on') ? '1' : '0';
        $allow_saving = (isset($allow_saving) && $allow_saving == 'on') ? '1' : '0';
        $instruction_step = (isset($instruction_step) && $instruction_step == 'on') ? '1' : '0';
        $completion_step = (isset($completion_step) && $completion_step == 'on') ? '1' : '0';

        if ($card_display == MyCap\Task::TYPE_PERCENTCOMPLETE) {
            $x_date_field = $x_time_field = $y_numeric_field = '';
        }

        if ($instruction_step == '0') {
            $instruction_step_title = $instruction_step_content = '';
        }

        if ($completion_step == '0') {
            $completion_step_title = $completion_step_content = '';
        }

        if (in_array($schedule_type, array(MyCap\Task::TYPE_ONETIME, MyCap\Task::TYPE_INFINITE))) {
            if ($schedule_ends != MyCap\Task::ENDS_ONDATE) $schedule_end_date = '';
            $schedule_frequency = $schedule_interval_week = $schedule_days_of_the_week = $schedule_interval_month = $schedule_days_of_the_month = $schedule_days_fixed = '';
            // Set "allow retroactive completion" to off if task is scheduled infinite times
            if ($schedule_type == MyCap\Task::TYPE_INFINITE) $allow_retroactive_completion = 0;
        } elseif ($schedule_type == MyCap\Task::TYPE_REPEATING) {
            if ($schedule_ends != MyCap\Task::ENDS_ONDATE) $schedule_end_date = '';
            $schedule_days_fixed = '';
            if ($schedule_frequency == MyCap\Task::FREQ_DAILY) {
                $schedule_interval_week = $schedule_days_of_the_week = $schedule_interval_month = $schedule_days_of_the_month = '';
            } elseif ($schedule_frequency == MyCap\Task::FREQ_WEEKLY) {
                $schedule_interval_month = $schedule_days_of_the_month = '';
            } elseif ($schedule_frequency == MyCap\Task::FREQ_MONTHLY) {
                $schedule_interval_week = $schedule_days_of_the_week = '';
            }
        } elseif ($schedule_type == MyCap\Task::TYPE_FIXED) {
            $schedule_frequency = $schedule_interval_week = $schedule_days_of_the_week = $schedule_interval_month = $schedule_days_of_the_month = '';
        }

        if (in_array($schedule_type, array(MyCap\Task::TYPE_ONETIME, MyCap\Task::TYPE_FIXED))) {
            $schedule_ends = $schedule_end_count = $schedule_end_after_days = $schedule_end_date = '';
        }

        $schedule_end_date = ($schedule_end_date != '') ? DateTimeRC::format_ts_to_ymd($schedule_end_date) : '';

        // Convert 1,  7 to 1,7
        if ($schedule_days_fixed != '') {
            $schedule_days_fixed = MyCap\Task::removeSpaces($schedule_days_fixed);
        }

        // Join array of days selected with ";"
        $schedule_days_of_the_week_list = is_array($schedule_days_of_the_week) ? implode(",", $schedule_days_of_the_week) : "";

        // If no baseline date is defined for the project, then make sure the task isn't set to use a baseline date
        if ($schedule_relative_to == '.ZeroDate' && $myCapProj->project['baseline_date_field'] == '') {
            $schedule_relative_to = '.JoinDate';
        }

        // Save Task info
        $sql = "UPDATE redcap_mycap_tasks SET task_title = '" . db_escape($task_title) . "', question_format = '" . db_escape($question_format) . "',
                    card_display = '" . db_escape($card_display) . "', x_date_field = '" . db_escape($x_date_field) . "',
                    x_time_field = '" . db_escape($x_time_field) . "', y_numeric_field = '" . db_escape($y_numeric_field) . "',
                    allow_retro_completion = '" . db_escape($allow_retroactive_completion) . "', allow_save_complete_later = '" . db_escape($allow_saving) . "',
                    include_instruction_step = '" . db_escape($instruction_step) . "',
                    include_completion_step = '" . db_escape($completion_step) . "', instruction_step_title = '" . db_escape($instruction_step_title) . "',
                    instruction_step_content = '" . db_escape($instruction_step_content) . "', completion_step_title = '" . db_escape($completion_step_title) . "',
                    completion_step_content = '" . db_escape($completion_step_content) . "',
                    schedule_type = '" . db_escape($schedule_type) . "', schedule_frequency = '" . db_escape($schedule_frequency) . "',
                    schedule_interval_week = '" . db_escape($schedule_interval_week) . "', schedule_days_of_the_week = '" . db_escape($schedule_days_of_the_week_list) . "',
                    schedule_interval_month = '" . db_escape($schedule_interval_month) . "', schedule_days_of_the_month = '" . db_escape($schedule_days_of_the_month) . "',
                    schedule_days_fixed = '" . db_escape($schedule_days_fixed) . "', schedule_relative_offset = '" . db_escape($schedule_relative_offset) . "',
                    schedule_ends = '" . db_escape($schedule_ends) . "', schedule_end_count = '" . db_escape($schedule_end_count) . "',
                    schedule_end_after_days = '" . db_escape($schedule_end_after_days) . "',
                    extended_config_json = '" . db_escape($extendedConfigAsString) . "'" . (isset($schedule_relative_to) ? ", schedule_relative_to = '" . db_escape($schedule_relative_to) . "'" : "");
        if ($schedule_end_date != '') {
            $sql .= ", schedule_end_date = '" . db_escape($schedule_end_date) . "'";
        }
        $sql .= " WHERE task_id = $task_id";

        if (db_query($sql)) {
            if ($Proj->longitudinal) {
                foreach ($_POST['tsevent'] as $eventId) {
                    $active = (isset($_POST["tsactive-$eventId"]) && $_POST["tsactive-$eventId"] == 'on') ? '1' : '0';

                    // Check if task/event already exists in DB
                    $sql = "SELECT * FROM redcap_mycap_tasks_schedules WHERE task_id='".(int)$task_id."' AND event_id='".(int)$eventId."'";
                    $q = db_query($sql);
                    $num_rows = db_num_rows($q);

                    if ($active == 1 && $num_rows == 0) { // if checked and not exists in DB then insert new entry
                        $sql = "INSERT INTO redcap_mycap_tasks_schedules (task_id, event_id)
                                VALUES ($task_id, '" . $eventId . "')";
                    } elseif ($active == 0) {
                        $sql = "DELETE FROM redcap_mycap_tasks_schedules WHERE event_id = " . $eventId . " AND task_id = " . $task_id;
                    }
                    db_query($sql);
                }
                $sql = "DELETE FROM redcap_mycap_tasks_schedules WHERE event_id NOT IN (" . implode(", ", $_POST['tsevent']) . ") AND task_id = " . $task_id;
                db_query($sql);

                MyCap\Task::fixNonRepeatingFormIssues($form);

            } else {
                if (!$Proj->isRepeatingForm($Proj->firstEventId, $form)) {
                    // Make this form as repeatable with default eventId as project is classic
                    $sql = "INSERT INTO redcap_events_repeat (event_id, form_name) 
                            VALUES ({$Proj->firstEventId}, '" . db_escape($form) . "')";
                    db_query($sql);
                }
            }
            $msg .= RCView::div(array('id' => 'saveTaskMsg', 'class' => 'darkgreen', 'style' => 'display:none;vertical-align:middle;text-align:center;margin:0 0 25px;'),
                RCView::img(array('src' => 'tick.png')) . $lang['control_center_48']
            );
        } else {
            $msg = RCView::div(array('id' => 'saveTaskMsg', 'class' => 'red', 'style' => 'display:none;vertical-align:middle;text-align:center;margin:0 0 25px;'),
                RCView::img(array('src' => 'exclamation.png')) . $lang['survey_159']
            );
        }

        // Log the event
        Logging::logEvent($sql, "redcap_mycap_tasks", "MANAGE", $task_id, "task_id = $task_id", "Modify MyCap Task info");

        // Once the task is updated, redirect to Online Designer and display "saved changes" message
        redirect(APP_PATH_WEBROOT . "Design/online_designer.php?pid=$project_id&task_save=edit");
    }
}
// Header
include APP_PATH_DOCROOT . 'ProjectGeneral/header.php';

// TABS
include APP_PATH_DOCROOT . "ProjectSetup/tabs.php";

?>
<script type="text/javascript">
// Display "saved changes" message, if just saved task settings
$(function(){
    if ($('#saveTaskMsg').length) {
        setTimeout(function(){
            $('#saveTaskMsg').slideToggle('normal');
        },200);
        setTimeout(function(){
            $('#saveTaskMsg').slideToggle(1200);
        },2500);
    }
});
</script>

<p style="margin-bottom:20px;"><?php echo $lang['mycap_mobile_app_132'] ?></p>

<?php

$disabledSaveBtn = "";
if ($Proj->longitudinal) {
    $events = MyCap\Task::getEventsList($form);
    $message = MyCap\Task::checkFormEventsBindingError($events);
    if ($message != "") {
        print $message;
        exit;
    }
    $schedules = MyCap\Task::getTaskSchedules($task_id);
    $disabledSaveBtn = (count($events) > 0) ? "" : "disabled";
}
// If form name does not exist (except only in Draft Mode), then give error message
if (($form == null || !isset($myCapProj->tasks[$form]['task_id'])) && $status > 0 && $draft_mode >= 1)
{
    print 	RCView::div(array('class'=>'yellow','style'=>''),
        RCView::img(array('src'=>'exclamation_orange.png')) .
        RCView::b($lang['global_01'].$lang['colon']) . " " . $lang['mycap_mobile_app_708']
    );

    include APP_PATH_DOCROOT . 'ProjectGeneral/footer.php';
    exit;
}
if (empty($task_title)) {
    $task_title = $Proj->forms[$form]['menu'];
}
if (!$Proj->longitudinal && !$Proj->isRepeatingFormAnyEvent($form)) {
    print RCView::div(array('class'=>'yellow','style'=>'max-width:910px;'),
        RCView::img(array('src'=>'exclamation_orange.png')) .
        RCView::b($lang['global_03'].$lang['colon']) . " ".$lang['mycap_mobile_app_534']." \"".$task_title."\""
    );
}

$missingAnnotations = MyCap\Task::getMissingAnnotationList($form);
if (!empty($missingAnnotations)) {
    $missingAnnotationsError = MyCap\Task::getMissingAnnotationErrorText($missingAnnotations);
    print 	RCView::div(array('class'=>'yellow','style'=>'max-width:910px;'),
        RCView::img(array('src'=>'exclamation_orange.png')) .
        RCView::b($lang['global_03'].$lang['colon']) . " ".$missingAnnotationsError
    );
}

$nonFixableErrors = MyCap\Task::getMyCapTaskNonFixableErrors($form);
if (!empty($nonFixableErrors)) {
    print 	RCView::div(array('class'=>'red','style'=>'max-width:910px;'),
        '<i class="fa fa-circle-exclamation"></i> ' .
        RCView::b($lang['global_01'].$lang['colon']) . " <br>".implode("<br><br>", $nonFixableErrors)
    );
}

// Display error message, if exists
if (!empty($msg)) print $msg;
?>

<div id="errMsgContainerModal" class="alert alert-danger col-md-12" role="alert" style="display:none;margin-bottom:20px;max-width:910px;"></div>
<div class="blue" style="max-width:910px;">
    <div style="float:left;">
        <i class="fas fa-pencil-alt"></i>
        <?php
        print $lang['mycap_mobile_app_102'];
        print " {$lang['setup_89']} \"<b>".RCView::escape($Proj->forms[$form]['menu'])."</b>\"";
        ?>
    </div>
    <button class="btn btn-defaultrc btn-xs float-end" onclick="history.go(-1);return false;"><?php echo js_escape2($lang['global_53']) ?></button>
    <button type="button" <?php echo $disabledSaveBtn."=".$disabledSaveBtn;?> class="btn btn-primaryrc btn-xs float-end me-2" onclick="$('#taskSettingsSubmit').trigger('click');"><?php echo js_escape2($lang['report_builder_28']) ?></button>
    <div class="clear"></div>
</div>
<div style="background-color:#FAFAFA;border:1px solid #DDDDDD;padding:0 6px;max-width:910px;">
<?php
    include APP_PATH_DOCROOT . "MyCap/task_info_table.php";
    print "</div>";
    // Footer
    include APP_PATH_DOCROOT . 'ProjectGeneral/footer.php';

addLangToJS(array('mycap_mobile_app_398', 'mycap_mobile_app_399', 'mycap_mobile_app_448', 'mycap_mobile_app_449', 'global_53', 'mycap_mobile_app_450'));