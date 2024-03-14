<?php
use Vanderbilt\REDCap\Classes\MyCap;
?>
<script type="text/javascript">
    var oneTimeType = '<?=MyCap\Task::TYPE_ONETIME?>';
    var infiniteType = '<?=MyCap\Task::TYPE_INFINITE?>';
    var repeatingType = '<?=MyCap\Task::TYPE_REPEATING?>';
    var fixedType = '<?=MyCap\Task::TYPE_FIXED?>';

    var dailyFreqVal = '<?=MyCap\Task::FREQ_DAILY?>';
    var weeklyFreqVal = '<?=MyCap\Task::FREQ_WEEKLY?>';
    var monthlyFreqVal = '<?=MyCap\Task::FREQ_MONTHLY?>';

    var afterCount = '<?=MyCap\Task::ENDS_AFTERCOUNT?>';
    var afterDays = '<?=MyCap\Task::ENDS_AFTERDAYS?>';
    var onDate = '<?=MyCap\Task::ENDS_ONDATE?>';

    // Task setup validation message variables
    var setTaskTitle = '<?=$lang['mycap_mobile_app_151']?>';
    var setDateField = '<?=$lang['mycap_mobile_app_166']?>';
    var setTimeField = '<?=$lang['mycap_mobile_app_167']?>';
    var setNumField = '<?=$lang['mycap_mobile_app_168']?>';
    var setInstrTitle = '<?=$lang['mycap_mobile_app_169']?>';
    var setInstrContent = '<?=$lang['mycap_mobile_app_170']?>';
    var setCompTitle = '<?=$lang['mycap_mobile_app_171']?>';
    var setCompContent = '<?=$lang['mycap_mobile_app_172']?>';
    var setWeeklyDays = '<?=$lang['mycap_mobile_app_173']?>';
    var setMonthlyDays = '<?=$lang['mycap_mobile_app_174']?>';
    var foundInvlid = ' <?=$lang['mycap_mobile_app_175']?> ';
    var setFixedDays = '<?=$lang['mycap_mobile_app_176']?>';
    var gte = '<?=$lang['config_functions_89']?>';
    var numeric = '<?=$lang['data_import_tool_85']?>';
    var delayMsg = '<?=$lang['mycap_mobile_app_178']?>';
    var endsAfterNums = '<?=$lang['mycap_mobile_app_179']?>';
    var endsAfterDays = '<?=$lang['mycap_mobile_app_180']?>';
    var endsOnDate = '<?=$lang['mycap_mobile_app_181']?>';
    var errorsIn = '<?=$lang['mycap_mobile_app_182']?>';
    var errBasicHeading = '<?=$lang['mycap_mobile_app_182']." ".$lang['mycap_mobile_app_107']?>';
    var errOptionalHeading = '<?=$lang['mycap_mobile_app_182']." ".$lang['design_984']?>';
    var errScheduleHeading = '<?=$lang['mycap_mobile_app_182']." ".$lang['mycap_mobile_app_137']?>';
    var isLongitudinal = '<?=$Proj->longitudinal;?>';
    var enableEvent = '<?=$lang['mycap_mobile_app_779']?>';
</script>
<?php
loadJS('MyCapProject.js');

$one_time = MyCap\Task::TYPE_ONETIME;
$infinite = MyCap\Task::TYPE_INFINITE;
$repeating = MyCap\Task::TYPE_REPEATING;
$fixed = MyCap\Task::TYPE_FIXED;

?>
<style type="text/css">
    label[for] { cursor: pointer; }
</style>

<form id="saveTaskSettings" action="<?php echo $_SERVER['REQUEST_URI']; ?>" method="post">
    <input type="hidden" name="is_active_task" id="is_active_task" value="<?php echo $is_active_task;?>">
	<table cellspacing="3" style="width:100%; font-size: 13px;">

		<tr class="mycap_setting_row">
			<td colspan="3">
				<div class="header" style="padding:7px 10px 5px;margin:-5px -8px 10px; color: #800000;"><i class="fas fa-info-circle"></i> <?php echo $lang['mycap_mobile_app_107'] ?></div>
			</td>
		</tr>
        <?php if (!$batteryInstrumentIssueExists) { ?>
            <tr class="mycap_setting_row">
                <td valign="top" style="width:20px;">
                    <img src="<?php echo APP_PATH_IMAGES ?>tag_orange.png">
                </td>
                <td valign="top" style="font-weight:bold; width:220px;">
                    <?php echo $lang['mycap_mobile_app_108'] ?><div class="requiredlabel p-0">* <?=$lang['data_entry_39']?></div>
                </td>
                <td valign="top" style="padding-left:15px;padding-bottom:5px;">
                    <input name="task_title" type="text" value="<?php echo htmlspecialchars(label_decode($task_title), ENT_QUOTES) ?>" class="x-form-text x-form-field" style="width:80%;">
                    <div class="newdbsub">
                        <?php echo $lang['mycap_mobile_app_109'] ?>
                    </div>
                </td>
            </tr>

            <tr class="mycap_setting_row">
                <td valign="top" style="width:20px;">
                    <img src="<?php echo APP_PATH_IMAGES ?>table_gear.png">
                </td>
                <td valign="top" style="font-weight:bold;padding-bottom:15px;">
                    <?php echo $lang['mycap_mobile_app_110'] ?>
                </td>
                <td valign="top" style="padding-left:15px;padding-bottom:15px;">
                    <?php
                        if ($is_active_task == 0 && !$isPromis) {
                            $questionnaire_format = MyCap\Task::QUESTIONNAIRE;
                            $form_format = MyCap\Task::FORM;
                    ?>
                        <div>
                            <input type="radio" name="question_format" id="questionnaire" <?php echo ($question_format == $questionnaire_format ? "checked" : "") ?> value="<?php echo $questionnaire_format; ?>">
                            <label for="questionnaire"><?php echo MyCap\Task::toString($questionnaire_format)." - "; ?>
                            <span class="newdbsub" style="font-weight:normal;"><i><?php echo $lang['mycap_mobile_app_111'] ?></i></span></label>
                        </div>
                        <div style="margin:4px 0;">
                            <input type="radio" name="question_format" id="form" <?php echo ($question_format == $form_format ? "checked" : "") ?> value="<?php echo $form_format; ?>">
                            <label for="form"><?php echo MyCap\Task::toString($form_format)." - "; ?></label>
                            <span class="newdbsub" style="font-weight:normal;"><i><?php echo $lang['mycap_mobile_app_129'] ?></i></span>
                        </div>
                    <?php } else {
                            $urlPostFix = MyCap\ActiveTask::getHelpURLForTaskFormat($question_format);
                            ?>
                            <div style="margin:4px 0;">
                                <input type="hidden" name="question_format" value="<?php echo $question_format;?>">
                                <?php echo MyCap\ActiveTask::toString($question_format); ?>
                                <?php if ($urlPostFix != '') { ?>
                                    <a class="modmycapstg" target="_blank" href="<?php echo MyCap\ActiveTask::RESEARCHKIT_DOCS_URL.$urlPostFix; ?>"><i class="fas fa-external-link-alt" style="padding-left: 8px;"></i></a>
                                <?php } ?>
                            </div>
                    <?php } ?>
                </td>
            </tr>

            <tr class="mycap_setting_row">
                <td valign="top" colspan="2" style="font-weight:bold;padding-bottom:5px;padding-left:5px;">
                        <i class="fas fa-chart-line"></i>&nbsp; <?php echo $lang['mycap_mobile_app_114'] ?>
                </td>
                <td valign="top" style="padding-left:15px;padding-bottom:15px;">
                    <div>
                        <?php if ($is_active_task == 0 && !$isPromis) { ?>
                        <input type="radio" name="card_display" id="percentcomplete" <?php echo ($card_display == MyCap\Task::TYPE_PERCENTCOMPLETE ? "checked" : "") ?> value="<?php echo MyCap\Task::TYPE_PERCENTCOMPLETE; ?>"
                               onclick="if ($(this).is(':checked')){
                                            $('#cardDateLineFields').slideUp('fast');
                                        }">
                        <?php } ?>
                        <label for="percentcomplete"><?php echo $lang['mycap_mobile_app_115']; ?></label><a href='javascript:;' class='help' style='font-size:10px;margin-left:3px;' onclick="simpleDialog(null,null,'percentCompleteExplainPopup',650);">?</a>
                        <!-- PERCENT COMPLETE EXPLANATION DIALOG POP-UP -->
                        <div id="percentCompleteExplainPopup" title="<?php echo js_escape2($lang['mycap_mobile_app_115']) ?>" class="simpleDialog">
                            <div>
                                <?php echo $lang['mycap_mobile_app_112'] ?>
                            </div>
                            <div style="margin-top: 15px;">
                                <b><?php echo $lang['mycap_mobile_app_130'] ?></b><br><br>
                                <img style="max-width:400px;" src="<?php echo APP_PATH_IMAGES ?>card_display_percent.png">
                            </div>
                        </div>
                    </div>
                    <?php if ($is_active_task == 0 && !$isPromis) { ?>
                        <div style="margin:4px 0;">
                            <input type="radio" name="card_display" id="chart" <?php echo ($card_display == MyCap\Task::TYPE_DATELINE ? "checked" : "") ?> value="<?php echo MyCap\Task::TYPE_DATELINE; ?>"
                                   onclick="if ($(this).is(':checked')){
                                                $('#cardDateLineFields').slideDown('fast');
                                            }">
                            <label for="chart"><?php echo $lang['mycap_mobile_app_116']; ?></label><a href='javascript:;' class='help' style='font-size:10px;margin-left:3px;' onclick="simpleDialog(null,null,'chartExplainPopup',800);">?</a>
                            <!-- CHART EXPLANATION DIALOG POP-UP -->
                            <div id="chartExplainPopup" title="<?php echo js_escape2($lang['mycap_mobile_app_116']) ?>" class="simpleDialog">
                                <div>
                                    <?php echo $lang['mycap_mobile_app_113'] ?><br>
                                    <?php echo $lang['mycap_mobile_app_134'] ?><br>
                                    <?php echo $lang['mycap_mobile_app_135'] ?><br>
                                    <?php echo $lang['mycap_mobile_app_136'] ?><br>
                                </div>
                                <div style="margin-top: 15px;">
                                    <b><?php echo $lang['mycap_mobile_app_130'] ?></b><br><br>
                                    <img style="max-width:400px;" src="<?php echo APP_PATH_IMAGES ?>card_display_chart.png">
                                </div>
                            </div>
                        </div>
                        <?php
                            $modifyInstBtn = RCView::button(array('type'=>'button', 'onclick'=>"window.location.href=app_path_webroot+'Design/online_designer.php?pid={$_GET['pid']}&page={$_GET['page']}';", 'class'=>'jqbuttonmed'),
                                RCView::img(array('src'=>'blog_pencil.png', 'style'=>'vertical-align:middle;position:relative;top:-1px;')) .
                                RCView::span(array('style'=>'vertical-align:middle;color:#444;'), $lang['data_entry_202'])
                            );
                        ?>
                        <div id="cardDateLineFields" style="<?php echo ($card_display == MyCap\Task::TYPE_DATELINE) ? '' : 'display: none;'; ?>">
                            <div class="additional-inputs-div" style="padding:5px 8px;background-color:#f5f5f5;border:1px solid #ddd;font-size:12px;margin:8px 0 0;">
                                <div style="margin-bottom:8px;color:#A00000;line-height:14px; width: 100%;">
                                    <div style="font-weight:bold;margin:3px 0 6px;font-size:13px;">
                                        <i class="fas fa-chart-bar"></i>&nbsp; <?php echo $lang['mycap_mobile_app_159'] ?>
                                    </div>

                                    <?php echo $lang['mycap_mobile_app_163'] ?>
                                    <a href="javascript:;" style="font-size:11px;text-decoration:underline;" onclick="simpleDialog(null,null,'chartExplainPopup',800);"><?php echo $lang['scheduling_78'] ?></a>
                                </div>
                                <div>
                                    <table width="100%" cellpadding="3" cellspacing="3" border="0">
                                        <tr>
                                            <td width="20%" style="font-weight: bold; font-size: 13px;">
                                                <?php echo $lang['mycap_mobile_app_160'] ?>
                                                <div class="requiredlabel p-0">* <?=$lang['data_entry_39']?></div>
                                            </td>
                                            <td valign="top">
                                                <?php echo RCView::select(array('name'=>"x_date_field", 'class'=>'x-form-text x-form-field',
                                                    'style'=>'height:24px;margin:0 3px 0 10px;max-width:200px; font-size:13px;'), $date_fields, $x_date_field);?>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-weight: bold; font-size: 13px;">
                                                <?php echo $lang['mycap_mobile_app_161'] ?>
                                                <div class="requiredlabel p-0">* <?=$lang['data_entry_39']?></div>
                                            </td>
                                            <td>
                                                <?php echo RCView::select(array('name'=>"x_time_field", 'class'=>'x-form-text x-form-field',
                                                    'style'=>'height:24px;margin:0 3px 0 10px;max-width:200px;font-size: 13px;'), $time_fields, $x_time_field);?>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-weight: bold;font-size: 13px;">
                                                <?php echo $lang['mycap_mobile_app_162'] ?>
                                                <div class="requiredlabel p-0">* <?=$lang['data_entry_39']?></div>
                                            </td>
                                            <td>
                                                <?php echo RCView::select(array('name'=>"y_numeric_field", 'class'=>'x-form-text x-form-field',
                                                    'style'=>'height:24px;margin:0 3px 0 10px;max-width:200px;font-size: 13px;'), $numeric_fields, $y_numeric_field);?>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div style="float: right;margin:3px 0;"><?php echo $modifyInstBtn; ?></div>
                                <div class="clear"></div>
                            </div>
                        </div>
                    <?php } ?>
                </td>
            </tr>

            <?php
                $allow_retroactive_completion_checked = $allow_retro_completion ? "checked = 'checked'" : "";
                $disabled = $style = '';
                if ($schedule_type == $infinite) {
                    $disabled = "disabled";
                    $style = 'style="opacity: 0.6;"';
                }
            ?>
            <tr class="mycap_setting_row">
                <td colspan="3">
                    <div class="header" style="padding:7px 10px 5px;margin:-5px -8px 10px;color: #800000;"><i class="fas fa-cog"></i> <?php echo $lang['design_984'] ?></div>
                </td>
            </tr>

            <tr class="mycap_setting_row" id="allow_retro_completion_row" <?php echo $style;?>>
                <td valign="top" style="width:20px;">
                    <input type="checkbox" <?php echo $disabled;?> <?php echo $allow_retroactive_completion_checked;?> style="position:relative;top:2px;" id="allow_retroactive_completion" name="allow_retroactive_completion">
                </td>
                <td valign="top" style="padding-bottom:3px;" colspan=2>
                    <label for="allow_retroactive_completion"><img src="<?php echo APP_PATH_IMAGES ?>calendar_exclamation.png" alt="">
                    <?php echo RCView::b($lang['mycap_mobile_app_117']) . " <span class='newdbsub'>" . $lang['mycap_mobile_app_118']."</span>" ?></label>
                </td>
            </tr>
        <?php } else { ?>
            <tr class="mycap_setting_row">
                <td valign="top" style="width:20px;">
                    <img src="<?php echo APP_PATH_IMAGES ?>tag_orange.png">
                </td>
                <td valign="top" style="font-weight:bold; width:220px;">
                    <?php echo $lang['mycap_mobile_app_108'] ?>
                </td>
                <td valign="top" style="padding-left:15px;padding-bottom:5px;">
                    <?php echo htmlspecialchars(label_decode($task_title), ENT_QUOTES) ?>
                </td>
            </tr>
            <tr class="mycap_setting_row">
                <td valign="top" style="width:20px;">

                </td>
                <td valign="top" style="font-weight:bold; width:220px; padding-bottom: 20px;">
                    <?php echo $lang['mycap_mobile_app_100'].$lang['questionmark']; ?>
                </td>
                <td valign="top" style="padding-left:15px;padding-bottom:5px;">
                    <?php echo $enabled_for_mycap == 1 ? $lang['design_100'] : $lang['design_99'].'<span style="padding-left: 30px;" class="note">'.$lang['mycap_mobile_app_500'].'</span>'; ?>
                </td>
            </tr>
        <?php }
        if ($is_active_task == 0 && !$isPromis && !$batteryInstrumentIssueExists) {
            $allow_saving_checked = $allow_save_complete_later ? "checked = 'checked'" : "";
        ?>
            <tr class="mycap_setting_row">
                <td valign="top" style="width:20px;">
                    <input type="checkbox" <?php echo $allow_saving_checked;?> style="position:relative;top:2px;" id="allow_saving" name="allow_saving">
                </td>
                <td valign="top" style="padding-bottom:3px;" colspan=2>
                    <label for="allow_saving"><img src="<?php echo APP_PATH_IMAGES ?>arrow_circle_315.png" alt="">
                    <?php echo RCView::b($lang['mycap_mobile_app_119']) . " <span class='newdbsub'>" . $lang['mycap_mobile_app_120']."</span>" ?></label>
                </td>
            </tr>
            <?php
                $instruction_step_checked = $include_instruction_step ? "checked='checked'" : "";
                $completion_step_checked = $include_completion_step ? "checked='checked'" : "";

                $instruction_step_display = $include_instruction_step ? "" : "display:none;";
                $completion_step_display = $include_completion_step ? "" : "display:none;";

            ?>
            <tr class="mycap_setting_row">
                <td valign="top" style="width:20px;">
                    <input type="checkbox" <?php echo $instruction_step_checked;?> style="position:relative;top:2px;" id="instruction_step" name="instruction_step" onchange="
                            if ($(this).is(':checked')){
                                $('#instruction_steps_settings').slideDown('fast');
                                $('#instruction_step_title').focus();
                            } else {
                                $('#instruction_steps_settings').slideUp('fast');
                            }
                        ">
                </td>
                <td valign="top" style="padding-bottom:3px;" colspan=2>
                    <label for="instruction_step"><i class="fas fa-list-ul"></i> <?php echo RCView::b($lang['mycap_mobile_app_121']) . " <span class='newdbsub'>" . $lang['mycap_mobile_app_122']."</span>" ?></label>
                    <div class="additional-inputs-div" id="instruction_steps_settings" style="padding:5px 8px;background-color:#f5f5f5;border:1px solid #ddd;font-size:12px;margin:8px 0 8px 0;<?php echo $instruction_step_display;?>">
                        <div style="margin-bottom:8px;color:#A00000;line-height:14px; width: 100%;">
                            <div style="font-weight:bold;margin:3px 0 6px;font-size:13px;">
                                <i class="fas fa-list-ul"></i>&nbsp; <?php echo $lang['mycap_mobile_app_164'] ?>
                            </div>
                        </div>
                        <div>
                            <table width="100%" cellpadding="3" cellspacing="3" border="0" style="font-size: 12px;">
                                <tr>
                                    <td width="14%" style="font-weight: bold;">
                                        <?php echo $lang['training_res_05'].$lang['colon']; ?>
                                        <div class="requiredlabel p-0">* <?=$lang['data_entry_39']?></div>
                                    </td>
                                    <td valign="top">
                                        <?php echo RCView::input(array('id'=>'instruction_step_title', 'style'=>'width:80%;height:24px;margin:0 3px 0 10px;', 'class'=>'x-form-text x-form-field',
                                            'name'=>'instruction_step_title', 'type'=>'text', 'value' => $instruction_step_title??""));?>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="top" style="font-weight: bold;">
                                        <?php echo $lang['mycap_mobile_app_126'].$lang['colon']; ?>
                                        <div class="requiredlabel p-0">* <?=$lang['data_entry_39']?></div>
                                    </td>
                                    <td valign="top">
                                        <?php echo RCView::textarea(array('id'=>'instruction_step_content',
                                            'name'=>'instruction_step_content', 'class'=>'x-form-field notesbox','style'=>'width:90%;margin:0 3px 0 10px;vertical-align: top;'), $instruction_step_content??"") ?>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </td>
            </tr>
            <tr class="mycap_setting_row">
                <td valign="top" style="width:20px;">
                    <input type="checkbox" <?php echo $completion_step_checked; ?> style="position:relative;top:2px;" id="completion_step" name="completion_step" onchange="
                            if ($(this).is(':checked')){
                                $('#completion_steps_settings').slideDown('fast');
                                $('#completion_step_title').focus();
                            } else {
                                $('#completion_steps_settings').slideUp('fast');
                            }
                        ">
                </td>
                <td valign="top" style="padding-bottom:15px;" colspan=2>
                    <label for="completion_step"><i class="fas fa-list-ul"></i> <?php echo RCView::b($lang['mycap_mobile_app_123']) . " <span class='newdbsub'>" . $lang['mycap_mobile_app_124']."</span>" ?></label>
                    <div class="additional-inputs-div" id="completion_steps_settings" style="padding:5px 8px;background-color:#f5f5f5;border:1px solid #ddd;font-size:12px;margin:8px 0 8px 0;<?php echo $completion_step_display;?>">
                        <div style="margin-bottom:8px;color:#A00000;line-height:14px; width: 100%;">
                            <div style="font-weight:bold;margin:3px 0 6px;font-size:13px;">
                                <i class="fas fa-list-ul"></i>&nbsp; <?php echo $lang['mycap_mobile_app_165'] ?>
                            </div>
                        </div>
                        <div>
                            <table width="100%" cellpadding="3" cellspacing="3" border="0" style="font-size: 12px;">
                                <tr>
                                    <td width="14%" style="font-weight: bold;">
                                        <?php echo $lang['training_res_05'].$lang['colon']; ?>
                                        <div class="requiredlabel p-0">* <?=$lang['data_entry_39']?></div>
                                    </td>
                                    <td valign="top">
                                        <?php echo RCView::input(array('id'=>'completion_step_title', 'style'=>'width:80%;height:24px;margin:0 3px 0 10px;', 'class'=>'x-form-text x-form-field',
                                            'name'=>'completion_step_title', 'type'=>'text', 'value' => $completion_step_title??""));?>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="top" style="font-weight: bold;">
                                        <?php echo $lang['mycap_mobile_app_126'].$lang['colon']; ?>
                                        <div class="requiredlabel p-0">* <?=$lang['data_entry_39']?></div>
                                    </td>
                                    <td valign="top">
                                        <?php echo RCView::textarea(array('id'=>'completion_step_content', 'name'=>'completion_step_content', 'class'=>'x-form-field notesbox',
                                            'style'=>'width:90%;margin:0 3px 0 10px;vertical-align: top;'), $completion_step_content??"") ?>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </td>
            </tr>
        <?php }
        // If Active Task, include Active Task Configuration Section
        if (($is_active_task == 1 && !$isPromis) || $isBatteryInstrument) {
            // Render the active task configuration html
            $activeTaskFormat = $question_format;
            $configs = json_decode($extended_config_json, true);
            if (!empty($configs)) {
                ?>
                <tr>
                    <td colspan="3">
                        <div class="header" style="padding:7px 10px 5px;margin:-5px -8px 10px; color: #800000;"><i class="fas fa-cog"></i>
                            <span id="activeTaskHeading">
                                <?php echo ($isBatteryInstrument) ? 'Health Measure Battery' : MyCap\ActiveTask::toString($question_format)." ".$lang['multilang_72'].$lang['colon']; ?>
                            </span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="3" valign="top" style="padding-bottom:15px;">
                <?php

                    foreach ($configs as $key => $value) {
                        if (is_null($value)) {
                            $$key = "";
                        } else {
                            $$key = $value;
                        }
                    }
                    include APP_PATH_DOCROOT . "MyCap/activetask_extended_config.php";
                ?>
                    </td>
                </tr>
        <?php }
        } ?>

        <?php if ($batteryInstrumentIssueExists) { ?>
            <!-- Do not allow to schedule if its battery PROMIS instrument and its not 1st in list -->
        <?php } else { ?>
            <tr class="mycap_setting_row">
                <td colspan="3">
                    <div class="header" style="padding:7px 10px 5px;margin:-5px -8px 10px; color: #800000;"><i class="fas fa-clock"></i> <?php echo $lang['mycap_mobile_app_137'] ?></div>
                </td>
            </tr>
            <tr class="mycap_setting_row" <?php echo ($use_baseline_date == false) ? 'style="display:none;"' : ''; ?> >
                <td colspan="2" valign="top" style="font-weight:bold;padding-bottom:15px;">
                    <?php echo $lang['mycap_mobile_app_128'] ?>
                </td>
                <td valign="top" style="padding-left:15px;padding-bottom:15px;">
                    <?php
                        $install_date = MyCap\Task::RELATIVETO_JOINDATE;
                        $baseline_date = MyCap\Task::RELATIVETO_ZERODATE;
                    ?>
                    <div>
                        <input type="radio" name="schedule_relative_to" id="install_date" <?php echo ($schedule_relative_to == $install_date ? "checked" : "") ?> value="<?php echo $install_date; ?>">
                        <label for="install_date"><?php echo $lang['mycap_mobile_app_125'] ." - "; ?>
                            <span class="newdbsub" style="font-weight:normal;"><i><?php echo $lang['mycap_mobile_app_138'] ?></i></span></label>
                    </div>
                    <div style="margin:4px 0;">
                        <input type="radio" name="schedule_relative_to" id="baseline_date" <?php echo ($schedule_relative_to == $baseline_date ? "checked" : "") ?> value="<?php echo $baseline_date; ?>">
                        <label for="baseline_date"><?php echo $lang['mycap_mobile_app_127']." - "; ?>
                            <span class="newdbsub" style="font-weight:normal;"><i><?php echo $lang['mycap_mobile_app_139'] ?></i></span></label>
                    </div>
                </td>
            </tr>
            <?php if ($Proj->longitudinal) {
                ?>
                <tr>
                    <td colspan="3" style="padding-bottom: 5px;"><b><?php echo $lang['mycap_mobile_app_724'] ?></b></td>
                </tr>
                <tr class="mycap_setting_row">
                    <td colspan="3">
                        <table cellspacing="0" class="form_border" style="width:100%;table-layout:fixed;"><tbody>
                            <tr>
                                <td class="header" style="width:75px;text-align:center;"><?php echo $lang['create_project_104'] ?></td>
                                <td class="header" style="font-size:11px;"><?php echo $lang['global_242'] ?></td>
                                <td class="header" style="width:600px;font-size:11px;"><?php echo $lang['mycap_mobile_app_537'] ?></td>
                            </tr>
                            <?php
                            if (count($events) > 0) {
                                foreach ($events as $eventId) {
                                    if (in_array($eventId, $schedules)) { // Enabled
                                        $enabledStyle = "";
                                        $disabledStyle = "display:none;";
                                        $opacityClass = "";
                                        $taskEnabledChecked = 'checked = "checked"';
                                    } else { // Disabled
                                        $enabledStyle = "display:none;";
                                        $disabledStyle = "";
                                        $opacityClass = "opacity35";
                                        $taskEnabledChecked = "";
                                    }
                                    ?>
                                    <tr id="tstr-<?php echo $eventId;?>">
                                        <td class="data " valign="top" style="text-align:center;padding:6px;padding-top:10px;">
                                            <div class="disableSchedule" title="Click to Disable" id="div_ts_icon_enabled-<?php echo $eventId;?>" style="<?php echo $enabledStyle?>">
                                                <span style="cursor: pointer;" onclick="taskSetupActivate(0, <?php echo $eventId;?>);return false;"><img src="<?php echo APP_PATH_IMAGES ?>checkbox_checked.png"></span>
                                            </div>
                                            <div class="enableSchedule" title="Click to Enable" id="div_ts_icon_disabled-<?php echo $eventId;?>" style="<?php echo $disabledStyle?>">
                                                <span style="cursor: pointer;" onclick="taskSetupActivate(1, <?php echo $eventId;?>);return false;"><img src="<?php echo APP_PATH_IMAGES ?>checkbox_cross.png"></span>
                                            </div>
                                            <input name="tsactive-<?php echo $eventId;?>" id="tsactive-<?php echo $eventId;?>" class="hidden event-enabled" type="checkbox" <?php echo $taskEnabledChecked;?>>
                                            <input name="tsevent[]" id="tsevent-<?php echo $eventId;?>" class="hidden" type="textbox" value="<?php echo $eventId;?>">
                                        </td>
                                        <td class="data " style="padding:6px;" valign="top">
                                            <div style="padding:3px 8px 8px 2px;font-size:13px;"><span style="font-size:13px;"><b><?php echo $Proj->eventInfo[$eventId]['name_ext'] ?></b></span></div>
                                        </td>
                                        <td class="data <?php echo $opacityClass?>" style="padding:6px 6px 3px;font-size:12px;">
                                            <?php echo $lang['mycap_mobile_app_738'] ?> <b><?php echo $Proj->eventInfo[$eventId]['day_offset'] ?></b> <?php echo $lang['mycap_mobile_app_739'] ?> <span class="scheduleToText"><?php echo ($schedule_relative_to == $install_date ? $lang['mycap_mobile_app_125'] : $lang['mycap_mobile_app_127'])?></span>
                                            <?php if ($Proj->isRepeatingForm($eventId, $_GET['page'])) { echo $eventId; ?>
                                                <br><span class="newdbsub"><?php echo $lang['global_03'] . $lang['colon']." ".$lang['mycap_mobile_app_740'] ?></span>
                                            <?php }
                                            if ($Proj->isRepeatingEvent($eventId)) { ?>
                                                <br><span class="newdbsub"><?php echo $lang['global_03'] . $lang['colon']." ".$lang['mycap_mobile_app_741'] ?></span>
                                            <?php }  ?>
                                        </td>
                                    </tr>
                                <?php }
                            } ?>
                            </tbody></table>
                    </td></tr>
            <?php } else { ?>
                <tr class="mycap_setting_row">
                    <td colspan="2" valign="top" style="font-weight:bold;padding-bottom:15px;">
                        <?php echo $lang['mycap_mobile_app_140'] ?>
                    </td>
                    <td valign="top" style="padding-left:15px;padding-bottom:15px;">
                        <div>
                            <input class="schedule_type_sel" id="onetime" type="radio" name="schedule_type" <?php echo ($schedule_type == $one_time ? "checked" : "") ?> value="<?php echo $one_time; ?>">
                            <label for="onetime"><?php echo $lang['mycap_mobile_app_141']; ?></label>
                        </div>
                        <div style="margin:4px 0;">
                            <input class="schedule_type_sel" id="infinite" type="radio" name="schedule_type" <?php echo ($schedule_type == $infinite ? "checked" : "") ?> value="<?php echo $infinite; ?>">
                            <label for="infinite"><?php echo $lang['mycap_mobile_app_142']; ?></label>
                        </div>
                        <div style="margin:4px 0;">
                            <input class="schedule_type_sel" id="repeating" type="radio" name="schedule_type" <?php echo ($schedule_type == $repeating ? "checked='checked'" : "") ?> value="<?php echo $repeating; ?>">
                            <label for="repeating"><?php echo $lang['mycap_mobile_app_143']; ?></label>
                        </div>
                        <?php
                            $daily = MyCap\Task::FREQ_DAILY;
                            $weekly = MyCap\Task::FREQ_WEEKLY;
                            $monthly = MyCap\Task::FREQ_MONTHLY;

                            if ($schedule_frequency == $daily || $schedule_frequency == '') {
                                $displayMonthly = $displayWeekly = 'none';
                            } elseif ($schedule_frequency == $weekly) {
                                $displayMonthly = 'none';
                            } elseif ($schedule_frequency == $monthly) {
                                $displayWeekly = 'none';
                            }

                            $displayEndTaskFields = '';
                            if ($schedule_type == $one_time || $schedule_type == $fixed) {
                                $displayEndTaskFields = 'none';
                            }
                            $repeating_disable_css = ($schedule_type == $repeating) ? "" : "disableInputs";
                        ?>
                        <div id="scheduleRepeatingFields" class="<?php echo $repeating_disable_css; ?>" style="margin-top:0.15rem; margin-left: 15px;" >
                            <div>
                                <i class="fas fa-redo" style="margin-right:1px;"></i> Repeats
                                <?php echo RCView::select(array('name'=>"schedule_frequency",'class'=>'x-form-text schedule_frequency_sel', 'style'=>'height:24px;max-width:90px;width:90px;position:relative;top:2px;'),
                                    array($daily=>'Daily', $weekly=>'Weekly', $monthly=>'Monthly'), $schedule_frequency)?>
                                <span id="schedulePrefix" style="display: none;"> <?php echo $lang['mycap_mobile_app_592']; ?></span>
                                <span id="scheduleFreqWeekFields" style="display: <?php echo $displayWeekly;?>;">
                                    <select name="schedule_interval_week" class="x-form-text">
                                        <?php for ($i = 1; $i <= 24; $i++) {
                                            $week_label = $i.' WEEK'.(($i>1) ? 'S':'');
                                        ?>
                                            <option value="<?php echo $i;?>" <?php echo (isset($schedule_interval_week) && $schedule_interval_week == $i) ? 'selected="selected"' : '';  ?>><?php echo $week_label;?></option>
                                        <?php } ?>
                                    </select>
                                </span>
                                <span id="scheduleFreqMonthFields" style="display: <?php echo $displayMonthly;?>">
                                    <select name="schedule_interval_month" class="x-form-text">
                                        <?php for ($i = 1; $i <= 12; $i++) {
                                            $month_label = $i.' MONTH'.(($i>1) ? 'S':'');
                                        ?>
                                            <option value="<?php echo $i;?>" <?php echo (isset($schedule_interval_month) && $schedule_interval_month == $i) ? 'selected="selected"' : '';  ?>><?php echo $month_label;?></option>
                                        <?php } ?>
                                    </select>
                                </span>
                            </div>
                            <div id="scheduleDaysOfWeekFields" style="padding-top: 10px; display: <?php echo $displayWeekly;?>;">
                                <i class="far fa-calendar-times-o" style="margin-right:3px;"></i> On:
                                <?php foreach($daysOfWeek as $val => $day) {
                                    $is_checked = in_array($val, $schedule_days_of_the_week_list) ? 'checked = "checked"' : '';
                                ?>
                                    <span style="padding-right: 5px;">
                                        <input type="checkbox" value="<?php echo $val;?>" <?php echo $is_checked;?> style="position:relative;top:2px;" id="schedule_days_of_the_week<?php echo $val; ?>" name="schedule_days_of_the_week[]">
                                        <label for="schedule_days_of_the_week<?php echo $val; ?>"><?php echo $day; ?></label>
                                    </span>
                                <?php } ?>
                            </div>
                            <div id="scheduleDaysOfMonthFields" style="padding-top: 10px; display: <?php echo $displayMonthly;?>;">
                                <i class="far fa-calendar-times-o" style="margin-right:3px;"></i> On Day(s):
                                <input type="text" name="schedule_days_of_the_month" value="<?php echo $schedule_days_of_the_month ?? "";?>" placeholder="1,7" class="x-form-text x-form-field" style="height:24px;position:relative;top:0px;">
                            </div>
                        </div>
                        <?php
                            $fixed_disable_css = ($schedule_type == $fixed) ? "" : "disableInputs";
                        ?>
                        <div style="margin:4px 0;">
                            <input class="schedule_type_sel" id="fixed" type="radio" name="schedule_type" <?php echo ($schedule_type == $fixed ? "checked" : "") ?> value="<?php echo $fixed; ?>">
                            <label for="fixed"><?php echo $lang['mycap_mobile_app_144']; ?></label>
                        </div>
                        <div id="scheduleFixedFields" class="<?php echo $fixed_disable_css; ?>" style="margin-top:0.15rem; margin-left: 15px;">
                            <i class="far fa-calendar-times-o" style="margin-right:3px;"></i> On Day(s):
                            <input type="text" name="schedule_days_fixed" placeholder="1,7" value="<?php echo $schedule_days_fixed ?? ""; ?>" class="x-form-text x-form-field" style="height:24px;position:relative;top:0px;">
                        </div>
                    </td>
                </tr>
                <tr class="mycap_setting_row">
                    <td colspan="2" valign="top" style="font-weight:bold;padding-bottom:15px;">
                        <?php echo $lang['mycap_mobile_app_145'] ?>
                    </td>
                    <td class="external-modules-input-td" style="padding-bottom: 15px; padding-left: 15px;">
                        <?php echo RCView::input(array('id'=>'schedule_relative_offset', 'style'=>'width:30%;', 'class'=>'x-form-text x-form-field', 'name'=>'schedule_relative_offset', 'type'=>'text', 'value' => $schedule_relative_offset));?>
                    </td>
                </tr>
                <tr class="mycap_setting_row" id="endTaskFields" style="display: <?php echo $displayEndTaskFields;?>;" >
                    <td colspan="2" valign="top" style="font-weight:bold;padding-bottom:15px;">
                        End this <span id="typeSelection"><?php echo ltrim($schedule_type, "."); ?></span> task
                    </td>
                    <td valign="top" style="padding-left:15px;padding-bottom:15px;">
                        <?php
                        $never = MyCap\Task::ENDS_NEVER;
                        $after_count = MyCap\Task::ENDS_AFTERCOUNT;
                        $after_days = MyCap\Task::ENDS_AFTERDAYS;
                        $ends_on_date = MyCap\Task::ENDS_ONDATE;
                        ?>
                        <div>
                            <input type="radio" name="schedule_ends" id="schedule_ends_never" <?php echo ($schedule_ends == $never ? "checked" : "") ?> value="<?php echo $never; ?>">
                            <label for="schedule_ends_never" class="m-0 align-middle"><?php echo $lang['mycap_mobile_app_146']; ?></label>
                        </div>
                        <div style="margin:4px 0;">
                            <input type="radio" name="schedule_ends" id="schedule_ends_after_count" <?php echo ($schedule_ends == $after_count ? "checked" : "") ?> value="<?php echo $after_count; ?>">
                            <label for="schedule_ends_after_count" class="m-0 align-middle"><?php echo $lang['mycap_mobile_app_147'];?> <input type="text" name="schedule_end_count" value="<?php echo $schedule_end_count??""; ?>" class="x-form-text" maxlength="4" style="height:24px;width:42px;position:relative;top:0px;">
                                <?php echo $lang['survey_738'];?></label>
                        </div>
                        <div style="margin:4px 0;">
                            <input type="radio" name="schedule_ends" id="schedule_ends_after_days" <?php echo ($schedule_ends == $after_days ? "checked" : "") ?> value="<?php echo $after_days; ?>">
                            <label for="schedule_ends_after_days" class="m-0 align-middle"><?php echo $lang['mycap_mobile_app_148'];?> <input type="text" name="schedule_end_after_days" value="<?php echo $schedule_end_after_days??""; ?>" class="x-form-text" maxlength="4" style="height:24px;width:42px;position:relative;top:0px;">
                                <?php echo $lang['mycap_mobile_app_149'];?></label>
                        </div>
                        <div style="margin:4px 0;">
                            <input type="radio" name="schedule_ends" id="schedule_ends_on_date" <?php echo ($schedule_ends == $ends_on_date ? "checked" : "") ?> value="<?php echo $ends_on_date; ?>">
                            <label for="schedule_ends_on_date" class="m-0 align-middle"><?php echo $lang['mycap_mobile_app_150'];?>
                                <input id="schedule_end_date" name="schedule_end_date" type="text" style="width:123px;" class="x-form-text x-form-field"
                                       placeholder="<?php echo str_replace(array('M','D','Y'),array('MM','DD','YYYY'),DateTimeRC::get_user_format_label());?>"
                                       onblur="redcap_validate(this,'','','hard','date_'+user_date_format_validation,1,1,user_date_format_delimiter);"
                                       value="<?php echo DateTimeRC::format_ts_from_ymd($schedule_end_date??""); ?>"
                                       onkeydown="if(event.keyCode==13){return false;}"
                                       onfocus="this.value=trim(this.value); if(this.value.length == 0 && $('.ui-datepicker:first').css('display')=='none'){$(this).next('img').trigger('click');}">
                                <span class='df'><?php echo DateTimeRC::get_user_format_label(); ?></span>
                            </label>
                        </div>
                    </td>
                </tr>
            <?php } ?>

        <?php }
        if (!empty($triggers)) {
        ?>
        <tr class="mycap_setting_row">
            <td colspan="3">
                <div class="header" style="padding:7px 10px 5px;margin:-5px -8px 10px; color: #800000;"><?php echo $lang['mycap_mobile_app_353'] ?></div>
            </td>
        </tr>
        <?php
        foreach ($triggers as $trigger) {
            ?>
            <tr>
                <td valign="top" colspan="3" style="padding-left: 20px;">
                    Condition:
                    <?php if ($trigger->condition == MyCap\ActiveTasks\Promis::CONDITION_COMPLETED) { ?>
                        <code>when this task is completed</code>
                    <?php } ?>
                </td>
            </tr>
            <tr>
                <td valign="top" colspan="3" style="padding-left: 20px;">
                    Action:
                    <?php if ($trigger->action == MyCap\ActiveTasks\Promis::ACTION_AWAKEN) { ?>
                        <code>activate target task</code>
                    <?php } elseif ($trigger->action == MyCap\ActiveTasks\Promis::ACTION_AWAKEN_AND_NOTIFY) { ?>
                        <code>activate target task and display notification</code>
                    <?php } elseif ($trigger->action == MyCap\ActiveTasks\Promis::ACTION_AUTO_CONTINUE) { ?>
                        <code>auto-continue to target task</code>
                    <?php } ?>
                </td>
            </tr>
            <tr>
                <td colspan="3" valign="top" style="padding-left: 20px;">
                    Target: <code><?php echo $trigger->target; ?></code>
                </td>
            </tr>
            <?php
            }
        }
        ?>
		<!-- Save Button -->
		<tr>
			<td colspan="2" <?php echo ($Proj->longitudinal ? '' : 'style="border-top:1px solid #ddd;"') ?>></td>
			<td valign="middle" style="<?php echo ($Proj->longitudinal ? '' : 'border-top:1px solid #ddd;')?>padding:20px 0 20px 15px;">
				<button type="button" class="btn btn-primaryrc" <?php echo $disabledSaveBtn."=".$disabledSaveBtn;?> id="taskSettingsSubmit" style="font-weight:bold;"><?php print $lang['report_builder_28'] ?></button>
			</td>
		</tr>

		<!-- Cancel/Delete buttons -->
		<tr>
            <td colspan="2" style="border-top:1px solid #ddd;"></td>
            <td valign="middle" style="border-top:1px solid #ddd;padding:10px 0 20px 15px;">
                <button class="btn btn-defaultrc" onclick="history.go(-1);return false;">-- <?php echo js_escape2($lang['global_53']) ?>--</button><br>
                <?php if (PAGE == 'MyCap/edit_task.php' && ($is_active_task == 0 || $isPromis)) { ?>
                    <!-- Option to delete the mycap settings -->
                    <div style="margin:30px 0 10px;">
                        <button class="btn btn-defaultrc btn-sm" style="color:#A00000;" onclick="deleteMyCapSettings(<?php echo $_GET['task_id'] ?>, '<?php echo $_GET['page'] ?>');return false;"><?php echo js_escape2($lang['mycap_mobile_app_354']) ?></button>
                    </div>
                <?php } ?>
            </td>
        </tr>

	</table>
</form>