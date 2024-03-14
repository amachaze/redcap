<?php


require_once dirname(dirname(__FILE__)) . "/Config/init_project.php";

// If not using a type of project with mycap, then don't allow user to use this page.
if (!$mycap_enabled) redirect(APP_PATH_WEBROOT . "index.php?pid=$project_id");

use Vanderbilt\REDCap\Classes\MyCap;
// Determine the instrument
$form = (isset($_GET['page']) && isset($Proj->forms[$_GET['page']])) ? $_GET['page'] : null;

// If task has already been created (it shouldn't have been), then redirect to edit_task page to edit task
if (isset($myCapProj->tasks[$form]['task_id'])) {
	redirect(str_replace(PAGE, 'MyCap/edit_task.php', $_SERVER['REQUEST_URI']));
}


/**
 * PROCESS SUBMITTED CHANGES
 */
if ($_SERVER['REQUEST_METHOD'] == "POST")
{
	// Assign Post array as globals
	foreach ($_POST as $key => $value) $$key = $value;

    $missingAnnotations = MyCap\Task::getMissingAnnotationList($form);
    if (count($missingAnnotations) > 0) {
        MyCap\Task::fixMissingAnnotationsIssues($missingAnnotations, $form);
    }

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
    // Set Task Schedule variables
    if (!isset($schedule_relative_to))  $schedule_relative_to = '';

    if (in_array($schedule_type, array(MyCap\Task::TYPE_ONETIME, MyCap\Task::TYPE_INFINITE))) {
        if ($schedule_ends != MyCap\Task::ENDS_ONDATE)  $schedule_end_date = '';
        $schedule_frequency = $schedule_interval_week = $schedule_days_of_the_week = $schedule_interval_month = $schedule_days_of_the_month = $schedule_days_fixed = '';
        // Set "allow retroactive completion" to off if task is scheduled infinite times
        if ($schedule_type == MyCap\Task::TYPE_INFINITE)    $allow_retroactive_completion = 0;
    } elseif ($schedule_type == MyCap\Task::TYPE_REPEATING) {
        if ($schedule_ends != MyCap\Task::ENDS_ONDATE)  $schedule_end_date = '';
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

    // Convert 1,  7 to 1,7
    if ($schedule_days_fixed != '') {
        $schedule_days_fixed = MyCap\Task::removeSpaces($schedule_days_fixed);
    }

    if (in_array($schedule_type, array(MyCap\Task::TYPE_ONETIME, MyCap\Task::TYPE_FIXED))) {
        $schedule_ends = $schedule_end_count = $schedule_end_after_days = $schedule_end_date = '';
    }

    $schedule_end_date = ($schedule_end_date != '') ? DateTimeRC::format_ts_to_ymd($schedule_end_date) : '';

    // Join array of days selected with ";"
    $schedule_days_of_the_week_list = isset($schedule_days_of_the_week) && is_array($schedule_days_of_the_week) ? implode(",", $schedule_days_of_the_week) : "";

    $extendedConfigAsString = "";
    list ($isPromisInstrument, $isAutoScoringInstrument) = PROMIS::isPromisInstrument($form);
    if ($isPromisInstrument) {
        $isBatteryInstrument = false;
        $triggers = array();
        $batteryInstrumentsList = MyCap\Task::batteryInstrumentPositions();
        if (array_key_exists($form, $batteryInstrumentsList)) {
            $isBatteryInstrument = true;
        }
        if ($isBatteryInstrument && $batteryInstrumentsList[$form]['instrumentPosition'] != '1') {
            $question_format = MyCap\ActiveTask::PROMIS;
            $schedule_relative_to = MyCap\Task::RELATIVETO_JOINDATE;
            $schedule_type = MyCap\Task::TYPE_INFINITE;
            $schedule_ends = MyCap\Task::ENDS_NEVER;
        }
        $taskObj = MyCap\ActiveTask::getActiveTaskObj($question_format);
        $taskObj->setupIfNeeded($form, PROJECT_ID);
        $extendedConfigAsString = MyCap\ActiveTask::extendedConfigAsString($taskObj);
    }

    // Save task info
    $sql = "REPLACE INTO redcap_mycap_tasks (project_id, form_name, enabled_for_mycap, task_title, question_format,
			card_display, x_date_field, x_time_field, y_numeric_field,
			allow_retro_completion, allow_save_complete_later, include_instruction_step, include_completion_step, instruction_step_title,
			instruction_step_content, completion_step_title, completion_step_content, schedule_relative_to, schedule_type, schedule_frequency,
			schedule_interval_week, schedule_days_of_the_week, schedule_interval_month, schedule_days_of_the_month, schedule_days_fixed, schedule_relative_offset,
			schedule_ends, schedule_end_count, schedule_end_after_days, extended_config_json".(($schedule_end_date != '') ? ', schedule_end_date' : '').")
			VALUES ($project_id, '" . db_escape($form) . "',
			'" . db_escape($enabled_for_mycap) . "', '" . db_escape($task_title) . "',
			'" . db_escape($question_format) . "', '" . db_escape($card_display) . "',
			'" . db_escape($x_date_field) . "', '" . db_escape($x_time_field) . "', '" . db_escape($y_numeric_field) . "',
			'" . db_escape($allow_retroactive_completion) . "', '" . db_escape($allow_saving) . "', '" . db_escape($instruction_step) . "',
			'" . db_escape($completion_step) . "', '" . db_escape($instruction_step_title) . "',
			'" . db_escape($instruction_step_content) . "', '" . db_escape($completion_step_title) . "', '" . db_escape($completion_step_content) . "', 
			'" . db_escape($schedule_relative_to) . "', '" . db_escape($schedule_type) . "', '" . db_escape($schedule_frequency) . "', 
			'" . db_escape($schedule_interval_week) . "', '" . db_escape($schedule_days_of_the_week_list) . "', '" . db_escape($schedule_interval_month) . "',
			'" . db_escape($schedule_days_of_the_month) . "', '" . db_escape($schedule_days_fixed) . "', '" . db_escape($schedule_relative_offset) . "',
			'" . db_escape($schedule_ends) . "', '" . db_escape($schedule_end_count) . "', '" . db_escape($schedule_end_after_days) ."', '" . db_escape($extendedConfigAsString) ."'" .(($schedule_end_date != '') ? ",'" . db_escape($schedule_end_date) . "'" : '')."
        )";


    if (!db_query($sql)) {
        exit("An error occurred. Please try again.");
    }
    $task_id = db_insert_id();

    if ($Proj->longitudinal) {
        foreach ($_POST['tsevent'] as $eventId) {
            $active = (isset($_POST["tsactive-$eventId"]) && $_POST["tsactive-$eventId"] == 'on') ? '1' : '0';
            if ($active == 1) {
                // Save task schedule
                $sql = "REPLACE INTO redcap_mycap_tasks_schedules (task_id, event_id)
                    VALUES ($task_id, '" . $eventId . "')";
                db_query($sql);
                MyCap\Task::makeFormNonRepeating($eventId, $form);
            }
        }
    } else {
        // Get default eventId as project is non-longitudinal
        $RepeatingFormsEvents = $Proj->getRepeatingFormsEvents();
        if ((isset($RepeatingFormsEvents[$Proj->firstEventId][$form]) && is_array($RepeatingFormsEvents[$Proj->firstEventId])) == false) {
            foreach ($RepeatingFormsEvents[$Proj->firstEventId] as $repeatingFormsEvent => $value) {
                $_POST['repeat_form-'.$Proj->firstEventId.'-'.$repeatingFormsEvent] = "on";
            }
        }
        $_POST['repeat_form-'.$Proj->firstEventId.'-'.$form] = "on";
        RepeatInstance::saveSetup();
    }


	// Log the event
	Logging::logEvent($sql, "redcap_mycap_tasks", "MANAGE", $task_id, "task_id = $task_id", "Set up MyCap Task");

	// Once the task is created, redirect to Online Designer and display "saved changes" message
	redirect(APP_PATH_WEBROOT . "Design/online_designer.php?pid=$project_id&task_save=create");
}

loadCSS("MyCap.css");
// Header
include APP_PATH_DOCROOT . 'ProjectGeneral/header.php';

// TABS
include APP_PATH_DOCROOT . "ProjectSetup/tabs.php";

// Instructions
?>
<p style="margin-bottom:20px;">
	<?php
	print $lang['mycap_mobile_app_104'];
	?>
</p>
<?php


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

// Force user to click button to begin mycap-enabling process
if (!isset($_GET['view']))
{
	?>
	<div class="yellow" style="text-align:center;font-weight:bold;padding:10px;">
		<?php echo $lang['survey_151'] ?>
		<br><br>
		<button class="jqbutton" onclick="window.location.href='<?php echo $_SERVER['REQUEST_URI'] ?>&view=showform';"
			><?php echo $lang['survey_152'] ?> "<?php echo $Proj->forms[$form]['menu'] ?>" <?php echo $lang['survey_153'] ?></button>
	</div>
	<?php
}


// Display form to enable task for mycap
elseif (isset($_GET['view']) && $_GET['view'] == "showform")
{
    if ($Proj->longitudinal) {
        $events = MyCap\Task::getEventsList($form);
        $message = MyCap\Task::checkFormEventsBindingError($events);
        if ($message != "") {
            print $message;
            exit;
        }
        $schedules = array();
    }
    // Set defaults to pre-fill table
    $enabled_for_mycap = 0;
    $is_active_task = 0;
    $task_title = empty($Proj->forms[$form]['menu']) ? "" : $Proj->forms[$form]['menu'];

    $card_display = MyCap\Task::TYPE_PERCENTCOMPLETE;
    $allow_retro_completion = $allow_save_complete_later = $include_instruction_step = $include_completion_step = 0;

    $date_fields = MyCap\Task::getDataTypeBasedFieldsList('date', $form);
    $time_fields = MyCap\Task::getDataTypeBasedFieldsList('time', $form);
    $numeric_fields = MyCap\Task::getDataTypeBasedFieldsList('numeric', $form);

    $x_date_field = $x_time_field = $y_numeric_field = "";

    // Task Schedule
    $schedule_relative_to = MyCap\Task::RELATIVETO_JOINDATE;
    $schedule_type = ($Proj->longitudinal) ? "" : MyCap\Task::TYPE_INFINITE;
    $schedule_frequency = MyCap\Task::FREQ_DAILY;
    $schedule_ends = MyCap\Task::ENDS_NEVER;
    $schedule_relative_offset = 0;

    $daysOfWeek = MyCap\Task::getDaysOfWeekList();
    $schedule_days_of_the_week_list = array();

    // Return warnings and errors for instrument
    list ($issues, $warnings) = MyCap\Task::checkErrors($form, PROJECT_ID);

    if (!empty($issues)) {
        echo '<span class="error">'. implode("<br>", $issues) . '</span>';
        exit;
    }

    list($isPromis, $isAutoScoringInstrument) = PROMIS::isPromisInstrument($form);

    $isBatteryInstrument = false;
    $triggers = array();
    if ($isPromis) {
        $issues = MyCap\Task::getUnsupportedPromisInstrumentsIssues($form);
        if (!empty($issues)) {
            echo '<span class="error">'. implode("<br>", $issues) . '</span>';
            exit;
        }
        $question_format = MyCap\Task::PROMIS;
        // Check if Battery Instrument
        $batteryInstrumentsList = MyCap\Task::batteryInstrumentPositions();
        if (array_key_exists($form, $batteryInstrumentsList)) {
            $isBatteryInstrument = true;
            $trigger = MyCap\ActiveTasks\Promis::triggerForBattery(
                $form,
                $batteryInstrumentsList
            );
        }
    } else {
        $question_format = MyCap\Task::QUESTIONNAIRE;
    }
    if (isset($trigger)) {
        $triggers[] = $trigger;
    }

    // Issue exists if its battery instrument and currently not at position 1
    $batteryInstrumentIssueExists = ($isBatteryInstrument && $batteryInstrumentsList[$form]['instrumentPosition'] != '1');

    $baseline_date_settings = MyCap\ZeroDateTask::getBaselineDateSettings();
    $use_baseline_date = $baseline_date_settings['enabled'] ?? false;

    if (!$Proj->longitudinal) {
        // For non-longitudinal projects, instrument need to be repeating
        if (!$Proj->isRepeatingFormAnyEvent($form)) {
            print 	RCView::div(array('class'=>'yellow','style'=>'max-width:910px;'),
                RCView::img(array('src'=>'exclamation_orange.png')) .
                RCView::b($lang['global_03'].$lang['colon']) . " ".$lang['mycap_mobile_app_534']." \"".$task_title."\""
            );
        }
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
    $disabledSaveBtn = "";

	?>
    <div id="errMsgContainerModal" class="alert alert-danger col-md-12" role="alert" style="display:none;margin-bottom:20px;max-width:910px;"></div>
	<div class="darkgreen" style="max-width:910px;">
		<div style="float:left;">
            <i class="fas fa-plus"></i>
			<?php
			print $lang['mycap_mobile_app_103'];
			print " {$lang['setup_89']} \"<b>".RCView::escape($Proj->forms[$form]['menu'])."</b>\"";
			?>
		</div>
        <button class="btn btn-defaultrc btn-xs float-end" onclick="history.go(-1);return false;"><?php echo js_escape2($lang['global_53']) ?></button>
        <button type="button" class="btn btn-rcgreen btn-xs float-end me-2" onclick="$('#taskSettingsSubmit').trigger('click');"><?php echo js_escape2($lang['report_builder_28']) ?></button>
		<div class="clear"></div>
	</div>
	<div style="background-color:#FAFAFA;border:1px solid #DDDDDD;padding:0 6px;max-width:910px;">
		<?php
        include APP_PATH_DOCROOT . "MyCap/task_info_table.php";
		?>
	</div>
	<?php
}


// Footer
include APP_PATH_DOCROOT . 'ProjectGeneral/footer.php';
