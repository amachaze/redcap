<?php

namespace Vanderbilt\REDCap\Classes\MyCap;

use RCView;

class ZeroDateTask
{
    /**
     * Display Baseline Date settings form
     *
     * @return string
     */
    public static function displaySetupTable()
    {
        global $lang;

        // Instructions
        $html = RCView::div(array('style' => 'margin:0 0 5px;'),
            $lang['mycap_mobile_app_456']
        );

        $html .= loadJS("MyCapProject.js", false);

        $baseline_date_settings = self::getBaselineDateSettings();

        $display_baseline_setting = $display_instruction_steps = "display: none;";
        $use_baseline_date = $title = $question1 = $question2 = $include_baseline_date = $instruction_title = $instruction_content = '';
        $baseline_date_field = "";
        if (!empty($baseline_date_settings)) {
            if ($baseline_date_settings['enabled'] == true) {
                $use_baseline_date = "checked='checked'";
                global $myCapProj;
                $baseline_date_field = $myCapProj->project['baseline_date_field'];
                $display_baseline_setting = "";
                $title = $baseline_date_settings['title'];
                $question1 = $baseline_date_settings['question1'];
                $question2 = $baseline_date_settings['question2'];

                if (!empty($baseline_date_settings['instructionStep'])) {
                    $include_baseline_date = "checked='checked'";
                    $display_instruction_steps = "";
                    $instruction_title = $baseline_date_settings['instructionStep']['title'];
                    $instruction_content = htmlspecialchars($baseline_date_settings['instructionStep']['content'], ENT_QUOTES);
                }
            }
        }
        $baseline_date_fields_list = self::getDateFieldsForDropDown();
        ob_start();
        ?>
        <style type="text/css">
            .form-control-custom textarea{
                display: block;
                width: 100%;
                height: 32px;
                padding: 4px 8px;
                font-size: 13px;
                line-height: 1.42857143;
                color: #555;
                background-color: #fff;
                background-image: none;
                border: 1px solid #ccc;
                border-radius: 4px;
                -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
                box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
                -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
                -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
                transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
            }
            .form-control-custom textarea{
                height: 100%;
            }
        </style>
        <form id="BaselineDateSetupForm">
            <div>
                <div id="errMsgContainerModal" class="alert alert-danger col-md-12" role="alert" style="display:none;margin-bottom:20px;"></div>
                <table width="100%">
                    <tr>
                        <td>
                            <div id="div_use_baseline" class="fs14 data mt-1 mb-3 px-3 pt-3 pb-2" style="background:#F8F8F8;">
                                <input id="use_baseline_chk" name="use_baseline" <?php echo $use_baseline_date;?> style="position:relative;top:2px;margin-right:3px;" type="checkbox">
                                <label for="use_baseline_chk" class="mt-1 mb-2 boldish" style="color:#A00000;"><?php echo $lang['mycap_mobile_app_454']?></label>
                                <a href="javascript:;" class="help ms-1" onclick="simpleDialog('<?php echo js_escape($lang['mycap_mobile_app_455']) ?>','<?php echo js_escape($lang['mycap_mobile_app_454'])?>');">?</a>
                                <div class="chklist" style="border: none; background-color: #F8F8F8; padding-left: 30px; padding-top: 0px !important;">
                                    <i class="fas fa-tags" style="text-indent: 0;"></i>
                                    <b style=""><u><?php echo $lang['mycap_mobile_app_462'];?></u></b><br>
                                    <?php echo $lang['mycap_mobile_app_463'] ?>
                                    <div id="baseline_date_id_div" style="text-indent: 0em; padding: 10px; <?php echo (!$use_baseline_date ? 'opacity: 0.3;' : ''); ?>">
                                        <?php echo RCView::select(array('name'=>'baseline_date_field', 'id'=>'baseline_date_field', 'class'=>'survey-login-field x-form-text x-form-field', 'style'=>'width:300px;'),
                                            $baseline_date_fields_list, $baseline_date_field, 200); ?>
                                    </div>
                                    <div style="font-weight:normal;padding:2px 5px 0 5px;color:#C00000;"><?php echo $lang['mycap_mobile_app_543'];?></div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="div_baseline_settings" class="data mt-1 mb-3 px-3 pt-3 pb-2" style="background:#F8F8F8; <?php echo $display_baseline_setting;?>">
                                <div class="mt-1 mb-2 boldish" style="color:#A00000;"><?=$lang['mycap_mobile_app_596']?>
                                    <div class="requiredlabel"> <?=$lang['mycap_mobile_app_464']?></div>
                                    <div class="fs12" style="font-size:11px;color:#D00000;font-weight:normal;padding-bottom:8px;line-height:13px;">
                                        <ol>
                                            <li><?=$lang['mycap_mobile_app_472']?></li>
                                            <li><?=$lang['mycap_mobile_app_597']?></li>
                                        </ol>
                                    </div>
                                </div>
                                <table cellspacing="3" cellpadding="3" style="width:100%;">
                                    <tr>
                                        <td valign="top" style="width:300px;">
                                            <b><?php echo $lang['mycap_mobile_app_473'] ?></b>
                                            <div class="newdbsub"><?php echo $lang['mycap_mobile_app_476'] ?></div>
                                        </td>
                                        <td valign="top">
                                            <input name="title" type="text" value="<?php echo $title; ?>" class="x-form-text x-form-field" style="width:90%;">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top">
                                            <b><?php echo $lang['mycap_mobile_app_474'] ?></b>
                                            <div class="newdbsub"><?php echo $lang['mycap_mobile_app_477'] ?></div>
                                        </td>
                                        <td valign="top">
                                            <input name="yesnoquestion" type="text" value="<?php echo $question1; ?>" class="x-form-text x-form-field" style="width:90%;">
                                            <i class="fas fa-info-circle text-secondary" data-toggle="popover" data-trigger="hover" data-content='<?php echo js_escape($lang['mycap_mobile_app_465'])?>' data-title="<?php echo $lang['mycap_mobile_app_457']?>"></i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top">
                                            <b><?php echo $lang['mycap_mobile_app_475'] ?></b>
                                            <div class="newdbsub"><?php echo $lang['mycap_mobile_app_478'] ?></div>
                                        </td>
                                        <td valign="top">
                                            <input name="datequestion" type="text" value="<?php echo $question2; ?>" class="x-form-text x-form-field" style="width:90%;">
                                            <i class="fas fa-info-circle text-secondary" data-toggle="popover" data-trigger="hover" data-content='<?php echo js_escape($lang['mycap_mobile_app_466'])?>' data-title="<?php echo $lang['mycap_mobile_app_458']?>"></i>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="div_include_instructions" class="fs14 data mt-1 mb-3 px-3 pt-3 pb-2" style="background:#F8F8F8;<?php echo $display_baseline_setting;?>">
                                <input id="include_instructions_chk" name="include_instructions" <?php echo $include_baseline_date;?>  style="position:relative;top:2px;margin-right:3px;" type="checkbox">
                                <label for="include_instructions_chk" class="mt-1 mb-2 boldish" style="color:#A00000;"><?php echo $lang['mycap_mobile_app_459']?></label>
                                <div class="fs12 ps-4" style="margin-top:2px;line-height: 1.1;">
                                    <?php echo $lang['mycap_mobile_app_460']?>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div id="div_instruction_steps" class="data mt-1 mb-3 px-3 pt-3 pb-2" style="background:#F8F8F8; <?php echo $display_instruction_steps;?>">
                                <div class="mt-1 mb-2 boldish" style="color:#A00000;"><?php echo $lang['mycap_mobile_app_479']?></div>
                                <table cellspacing="3" cellpadding="3" style="width:100%;">
                                    <tr>
                                        <td valign="top" style="width:150px;">
                                            <b><?php echo $lang['training_res_05'].$lang['colon']; ?></b>
                                            <div class="requiredlabel p-0">* <?=$lang['data_entry_39']?></div>
                                        </td>
                                        <td valign="top">
                                            <input name="instruction_title" type="text" value="<?php echo $instruction_title; ?>" class="x-form-text x-form-field" style="width:90%;">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top">
                                            <b><?php echo $lang['mycap_mobile_app_126'].$lang['colon']; ?></b>
                                            <div class="requiredlabel p-0">* <?=$lang['data_entry_39']?></div>
                                        </td>
                                        <td valign="top">
                                            <textarea name="instruction_content" class="x-form-field notesbox" style="width:90%;margin-bottom:3px;vertical-align: top;"><?php echo $instruction_content; ?></textarea>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </form>
        <?php
        $html .= ob_get_clean();

        // Return all html to display
        return $html;
    }

    /**
     * Get baseline date settings values
     * @param int $projectId
     *
     * @return array
     */
    public static function getBaselineDateSettings($projectId = null) {
        if (is_null($projectId)) {
            global $myCapProj;
        } else {
            $myCapProj = new MyCap($projectId);
            $myCapProj->loadMyCapProjectValues();
        }
        $baseline_date_config = $myCapProj->project['baseline_date_config'] ?? "";
        $baseline_date_settings = !empty($baseline_date_config) ? json_decode($baseline_date_config, true) : array();

        return $baseline_date_settings;
    }

    /**
     * Check if "Use Baseline Date?" is enabled from Baseline date settings
     * @param int $projectId
     *
     * @return boolean
     */
    public static function baselineDateEnabled($projectId = null) {
        $baseline_date_settings = self::getBaselineDateSettings($projectId);
        if (empty($baseline_date_settings)) return false;
        return $baseline_date_settings['enabled'];
    }

    /**
     * Get instrument of baseline date field selected
     *
     * @return string
     */
    public static function getBaselineDateForm() {
        global $Proj, $myCapProj;
        $myCapEnabled = $Proj->project['mycap_enabled'];

        $baselineDateFieldForm = "";
        if ($myCapEnabled && self::baselineDateEnabled()) {
            $baseline_date_field = $myCapProj->project['baseline_date_field'];
            $baselineDateFieldForm = ($Proj->metadata[$baseline_date_field]['form_name']);
        }
        return $baselineDateFieldForm;
    }

    /**
     * Get baseline date field selected
     * @param int $projectId
     *
     * @return string
     */
    public static function getBaselineDateField($projectId = null) {
        if (is_null($projectId)) {
            global $Proj, $myCapProj;
        } else {
            $Proj = new \Project($projectId);
            $myCapProj = new MyCap($projectId);
            $myCapProj->loadMyCapProjectValues();
        }
        $myCapEnabled = $Proj->project['mycap_enabled'];

        $baselineDateField = "";
        if ($myCapEnabled && self::baselineDateEnabled($projectId)) {
            $baselineDateField = $myCapProj->project['baseline_date_field'];
        }
        return $baselineDateField;
    }

    /**
     * Get list of all fields as type date as baseline date identifier
     *
     * @return array
     */
    public static function getDateFieldsForDropDown()
    {
        global $Proj, $myCapProj;
        // Build an array of drop-down options listing all REDCap fields
        $rc_fields = array(''=>'-- '.RCView::getLangStringByKey("random_02").' --');
        foreach ($Proj->metadata as $this_field=>$attr1) {
            // Date fields only
            if ($attr1['element_type'] != 'text' || substr($attr1['element_validation_type']??"", 0, 4) != 'date') continue;
            // Exclude if instrument is enabled for MyCap
            if (array_key_exists($attr1['form_name'], $myCapProj->tasks)) continue;
            // Exclude if field is used to store participant join date
            if (strpos($attr1['misc'], Annotation::PARTICIPANT_JOINDATE) !== false) continue;
            // Exclude record ID field?
            if ($this_field == $Proj->table_pk) continue;
            // Add to fields/forms array. Get form of field.
            $this_form_label = strip_tags($Proj->forms[$attr1['form_name']]['menu']);
            // Truncate label if long
            $attr1['element_label'] = trim(strip_tags($attr1['element_label']));
            if (strlen($attr1['element_label']) > 65) {
                $attr1['element_label'] = trim(substr($attr1['element_label'], 0, 47)) . "... " . trim(substr($attr1['element_label'], -15));
            }
            $rc_fields[$this_form_label][$this_field] = "$this_field \"{$attr1['element_label']}\"";
        }
        // Return all options
        return $rc_fields;
    }

    /**
     * Get default baseline date settings values
     *
     * @return array
     */
    public static function getDefaultBaselineDateSettings() {
        $data['enabled'] = false;
        $data['instructionStep'] = null;
        $data['title'] = null;
        $data['question1'] = null;
        $data['question2'] = null;
        return $data;
    }
}
