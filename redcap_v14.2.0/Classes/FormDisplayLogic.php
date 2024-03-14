<?php

/**
 * FormDisplayLogic Class
 * Contains methods used with regard to setup for Project setup::form render skip logic
 */
class FormDisplayLogic
{
    public static function isEnabled($projectId) {
        $sql = "SELECT 1 FROM redcap_form_display_logic_conditions WHERE project_id ='".$projectId."' limit 1";
        $q = db_query($sql);
        return (db_num_rows($q) > 0);
    }
	// Display the Conditional Form Activation setup table in HTML table format
	public static function displayFormDisplayLogicTable()
	{
		global $lang, $Proj, $longitudinal;

		// Instructions
		$html = RCView::div(array('style' => 'margin:0 0 5px;'),
            RCView::tt('design_964') . " " . RCView::tt('design_1112')
		);

		// Enable for Survey auto-continue checkbox selection
        $autoContinueOption = '';
		if ($Proj->project['surveys_enabled']) {
			$autoContinueOption .=  RCView::div(array(),
                    RCView::checkbox(array('id' => 'enable_survey_support', 'name' => 'enable_survey_support', 'checked' => '', 'style' => 'position:relative;top:2px;margin-right:3px;')) .
                    RCView::label(array('for' => 'enable_survey_support', 'style' => 'color:#A00000;', 'class' => 'boldish me-2 mb-0'), $lang['design_973']) .
                    RCView::div(array('class' => 'fs12 ps-4', 'style' => 'margin-top:2px;line-height: 1.1;'), $lang['design_974'])
			);
		}

		$html .= RCView::div(array('class' => 'data mt-3 mb-4 px-3 pt-1 pb-2', 'style' => 'background:#f8f8f8;'),
                    RCView::div(array('class' => 'mb-2'),
                        $lang['design_984']
                    ) .
                    // Prevent hiding of filled forms? checkbox selection
                    RCView::div(array('class' => 'mb-2'),
                        RCView::checkbox(array('id' => 'prevent_hiding_filled_forms', 'name' => 'prevent_hiding_filled_forms', 'checked' => '', 'style' => 'position:relative;top:2px;margin-right:3px;')) .
                        RCView::label(array('for' => 'prevent_hiding_filled_forms', 'style' => 'color:#A00000;', 'class' => 'boldish me-2 mb-0'), $lang['design_965']) .
                        RCView::div(array('class' => 'fs12 ps-4', 'style' => 'margin-top:2px;line-height: 1.1;'), $lang['design_966'])
                    ) .
                    // Option to hide any disabled forms from the data collection menu and record home page
                    RCView::div(array('class' => 'mb-2'),
                        RCView::checkbox(array('id' => 'hide_disabled_forms', 'name' => 'hide_disabled_forms', 'checked' => '', 'style' => 'position:relative;top:2px;margin-right:3px;')) .
                        RCView::label(array('for' => 'hide_disabled_forms', 'style' => 'color:#A00000;', 'class' => 'boldish me-2 mb-0'), $lang['design_1064']) .
                        RCView::div(array('class' => 'fs12 ps-4', 'style' => 'margin-top:2px;line-height: 1.1;'), $lang['design_1065'])
                    ) .
                    $autoContinueOption
                );

        $html .= RCView::hidden(array('name' => 'control_id', 'id' => 'control_id'));

        // HTML for form-event drop-down list
        $formAllEventDropdownOptions = [];
        $formEventDropdownOptions = [];
        foreach ($Proj->eventsForms as $this_event_id=>$these_forms)
        {
            foreach ($these_forms as $this_form)
            {
                if ($longitudinal) {
                    if (!isset($formEventDropdownOptions["$this_form-"])) {
                        $formAllEventDropdownOptions[$lang['design_983']]["$this_form-"] = "{$Proj->forms[$this_form]['menu']} ".$lang['design_983'];
                    }
                    $thisEvent = $Proj->eventInfo[$this_event_id]['name_ext'];
                    $formEventDropdownOptions["$thisEvent"]["$this_form-$this_event_id"] = "{$Proj->forms[$this_form]['menu']} ($thisEvent)";
                } else {
                    $formEventDropdownOptions["$this_form-$this_event_id"] = "{$Proj->forms[$this_form]['menu']}";
                }
            }
        }

        ob_start();
        ?>
        <style type="text/css">
            .code_modal_table{
                width: 100%;
            }
            /***MODAL***/
            .code_modal_table{
                margin: 0 auto;
            }
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
        <form id="FRSLForm" class="repeater">
            <div data-repeater-list="outer-list">
                <div data-repeater-item class="repeater-divs" style="overflow:hidden;color:#A00000;background-color:#f7f7f7;border:1px solid #ddd;margin:10px 0 30px;" >
                    <table class="code_modal_table" id="code_modal_table_update">
                        <input type="hidden" name="control_id" id="control_id" value="">
                        <tr>
                            <td class="labelrc" colspan="2" height="30px;" style="border: none; border: 1px solid #bbb;color:#000;background:#d0d0d0;">
                                <i class="fas fa-filter"></i> <?php echo $lang['design_975']; ?> <span class="condition-number">1</span>:
                                <div style="float: right;">
                                    <a data-repeater-delete class="survey_auth_field_delete" href="javascript:;" style="margin-left: 5px;">
                                        <img src="<?php echo APP_PATH_IMAGES;?>cross.png" title="<?php echo $lang['data_entry_369']; ?>">
                                    </a>
                                </div>
                            </td>
                        </tr>
                         <tr>
                            <td class="pb-1 boldish align-top" style="padding: 10px;">
                                <div class="mt-1 mb-2 boldish"><?=$lang['design_976']?></div>
                                <?=RCView::select(array('name'=>"form-name",'class'=>'x-form-text x-form-field d-inline p-1 select-form-event', 'style'=>'min-width:300px;max-width:450px;height:150px;max-height:400px;',
                                    'multiple'=>'multiple', 'onchange'=>'checkRepeatSelection(this);'), $formAllEventDropdownOptions+$formEventDropdownOptions, "", 500)?>
                                <div class="cc_info">
                                    <div class="float-start"><?php echo $lang['design_969']; ?></div>
                                    <div class="float-end me-3"><button class="btn btn-xs btn-link fs11 p-0" onclick="viewSelectedFormDisplayLogicList(this);return false;"><?php echo $lang['design_992']; ?></button></div>
                                </div>
                            </td>
                             <td class="pb-0 ps-3 align-top" style="padding: 10px;" field="control-condition">
                                 <div class="mt-1 mb-2 boldish"><?=$lang['design_970']?></div>
                                 <textarea class="x-form-text x-form-field notesbox fs12" type="text" id="control-condition-1" name="control-condition" onfocus="openLogicEditor($(this))" class="external-modules-input-element ms-4" style="max-width:95%;height:100px;width:360px;" onkeydown="logicSuggestSearchTip(this, event);" onblur="validate_logic($(this).val());"></textarea>
                                 <div class="clearfix" style="font-size:11px;color:#777;font-weight:normal;margin-top:2px;margin-left:2px;margin-right:85px;">
									 <?php
									 echo "<div class='float-start'>" . ($Proj->longitudinal ? 'e.g., [enrollment_arm_1][age] > 30' : 'e.g., [age] > 30 and [sex] = "1"') . "</div>";
									 echo '<div class="float-end"><a href="javascript:;" class="opacity75" style="text-decoration:underline;font-size:11px;font-weight:normal;" onclick="helpPopup(\'5\',\'category_33_question_1_tab_5\')";">'.$lang['form_renderer_33'].'</a></div>';
									 ?>
                                 </div>
                                 <div id='control-condition_Ok' class='logicValidatorOkay fs13'></div>
                                 <div id='LSC_id_control-condition' class='fs-item-parent fs-item LSC-element'></div>
                             </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="float-end ms-3">
                <button class="btn btn-xs btn-link text-danger" id="deleteAll" onclick="delete_conditions();return false;">
                    <i class="fas fa-times"></i>
					<?php echo $lang['design_977']; ?>
                </button>
            </div>
            <div class="float-end">
                <a data-repeater-create class="add-control-field" href="javascript:;" style="font-weight: normal; color: green; font-size: 12px; text-decoration: underline;">
                    <button class="btn btn-xs btn-rcgreen fs14" onclick="return false;"><i class="fas fa-plus"></i> <?php echo $lang['design_968']; ?></button>
                </a>
            </div>
        </form>
        <?php
        $html .= ob_get_clean();

		// Return all html to display
		return $html;
	}

	// Return boolean if enabled in a project
	public static function FormDisplayLogicEnabled($projectId)
	{
		$result = FormDisplayLogic::getFormDisplayLogicTableValues($projectId);
        return !empty($result['controls']);
	}

    // Return JSON string of FDL values to be utilized by the REDCap Mobile App
    public static function outputFormDisplayLogicForMobileApp($project_id)
	{
        $Proj = new Project($project_id);
		$settings = self::getFormDisplayLogicTableValues($project_id);
        $config = [
                'prevent_hiding_filled_forms'=>$settings['prevent_hiding_filled_forms'],
                'hide_disabled_forms'=>$settings['hide_disabled_forms'],
                'conditions'=>[]
        ];
        foreach ($settings['controls'] as $attr) {
            $targets = [];
            foreach ($attr['form-name'] as $formEventId) {
                list ($form, $event_id) = explode("-", $formEventId, 2);
                if (!isset($Proj->forms[$form])) continue;
                if (isinteger($event_id) && !isset($Proj->eventInfo[$event_id])) continue;
				if (isinteger($event_id)) {
					$event_name = $Proj->getUniqueEventNames($event_id);
				} else {
                    $event_name = '';
				}
				$targets[] = ['form'=>$form, 'event'=>$event_name];
			}
			$config['conditions'][] = ['condition'=>$attr['control-condition'], 'targets'=>$targets];
		}
        return $config;
	}

	// Obtain the values stored in database for project
	private static $formActivationConditions = [];
	public static function getFormDisplayLogicTableValues($projectId = null)
	{
	    if (is_null($projectId)) {
            global $Proj;
        } else {
	        $Proj = new Project($projectId);
        }
        // Add to cache if not cached yet
        if (!isset(self::$formActivationConditions[$projectId]))
        {
            // Get initial values
			$output = [ 'prevent_hiding_filled_forms' => ($Proj->project['hide_filled_forms'] ? 0 : 1),
                        'hide_disabled_forms' => ($Proj->project['hide_disabled_forms'] ? 1 : 0),
                        'enable_survey_support' => $Proj->project['form_activation_survey_autocontinue'],
                        'controls' => self::getControlsByProjectId($Proj->project_id) ];
			// Get list of all forms and events targeted
			$forms_targeted = [];
			$events_targeted = [];
			foreach ($output['controls'] as $key=>$attr) {
				foreach ($attr['form-name'] as $thisFormEvent) {
					list ($form, $event_id) = explode("-", $thisFormEvent, 2);
					$forms_targeted[] = $form;
					if (!$Proj->longitudinal) {
						$events_targeted[] = $Proj->firstEventId;
					} elseif ($event_id == '') {
						// Add all events for which this form is designated
						foreach ($Proj->eventsForms as $form_event_id=>$forms) {
							if (in_array($form, $forms)) {
								$events_targeted[] = $form_event_id;
							}
						}
					} else {
						$events_targeted[] = $event_id;
					}
				}
			}
			$output['forms_targeted'] = array_unique($forms_targeted);
			$output['events_targeted'] = array_unique($events_targeted);
            // Add to static var
			self::$formActivationConditions[$projectId] = $output;
		}
        return self::$formActivationConditions[$projectId];
	}

	public static function getControlsByProjectId($projectId)
	{
        $controls = $output = [];
        $sql = "SELECT control_id, control_condition FROM redcap_form_display_logic_conditions 
                WHERE project_id = $projectId order by control_id";
        $q = db_query($sql);
        if (db_num_rows($q) > 0) {
            while ($row = db_fetch_assoc($q)) {
                $control_id = $row['control_id'];
                $controls['control_id'] = $control_id;
                $controls['control-condition'] = $row['control_condition'];
                $controls['form-name'] = self::getAllTargetFormsByControlId($control_id, $projectId);
                $output[] = $controls;
            }
        }
        // Return array
		return $output;
	}

    public static function getAllTargetFormsByControlId($control_id, $projectId)
    {
		$Proj = new Project($projectId);
        $forms = [];
        $sql = "SELECT * FROM redcap_form_display_logic_targets WHERE control_id ='".$control_id."'";
        $q = db_query($sql);
        if (db_num_rows($q) > 0) {
            while ($row = db_fetch_assoc($q)) {
                if ($row['event_id'] == '' && !$Proj->longitudinal) {
                    $row['event_id'] = $Proj->firstEventId;
				}
                $forms[] = $row['form_name']."-".$row['event_id'];
            }
        }
        return $forms;
    }

    // Cache all record data for relevant fields being evaluated in the conditions
	private static $cached_data = null;
	public static function loadData($records)
	{
		global $Proj;
        if (is_array($records) && empty($records)) return;
        if (!is_array($records)) $records = [$records];
		$result = FormDisplayLogic::getFormDisplayLogicTableValues();
		self::$cached_data = [];
        if (!empty($result['controls'])) {
			// Gather list of all fields utilized in all control conditions
			$field_string = "[".$Proj->table_pk."] ";
			foreach ($result['controls'] as $attr) {
				$field_string .= $attr['control-condition'] . " ";
			}
			$fields_utilized = array_keys(getBracketedFields($field_string, true, true, true));
			// Get data for these fields/records and add to cached data
            self::$cached_data = Records::getData(['records'=>$records, 'fields'=>$fields_utilized, 'returnEmptyEvents'=>true]);
		}
	}

    public static function getAccess($location, $record = null, $event_id = null, $instrument = null, $instance = null, $forms_events_array = array())
    {
        global $Proj;

        // If data has not been cached yet, do so now (for single record only) - record status dashboard should already have had this done
        if ($record && self::$cached_data === null) {
			self::loadData($record);
		}

        // Get form-level activation for all records in self::$cached_data
        $forms_access = self::getFormsAccessMatrix($record, $event_id, $instrument, $instance, $location, $forms_events_array);

        // Set "next step" redirect path when viewing a single record
        if ($record && $event_id && $instrument && $location == 'left_form_menu' && !empty($forms_access))
        {
			$next_step_path = '';
            $instruments = $Proj->eventsForms[$event_id];
            $curr_forms_access = $forms_access[$record][$event_id] ?? [];

            $i = array_search($instrument, $instruments) + 1;
            $len = count($instruments);

            while ($i < $len) {
                if (isset($instruments[$i]) && isset($curr_forms_access[$instruments[$i]]) && $curr_forms_access[$instruments[$i]]) {
                    $next_instrument = $instruments[$i];
                    break;
                }
                $i++;
            }

            if (isset($next_instrument)) {
                // Path to the next available form in the current event.
                $next_step_path = APP_PATH_WEBROOT . 'DataEntry/index.php?pid=' . $Proj->project_id . '&id=' . $record . '&event_id=' . $event_id . '&page=' . $next_instrument;

                // If this is a repeating event, maintain the instance
                if ($Proj->hasRepeatingFormsEvents() && $instance) {
                    if ($Proj->RepeatingFormsEvents[$event_id] == "WHOLE") {
                        $next_step_path .= '&instance=' . $instance;
                    }
                }
            }

            // Access denied to the current page.
            if (!$forms_access[$record][$event_id][$instrument]) {
                if (!$next_step_path) {
                    $arm = $event_id ? $Proj->eventInfo[$event_id]['arm_num'] : (isset($_GET['arm']) ? $_GET['arm'] : 1);
                    $next_step_path = APP_PATH_WEBROOT . 'DataEntry/record_home.php?pid=' . $Proj->project_id . '&id=' . $record . '&arm=' . $arm;
                }
                redirect($next_step_path);
                return;
            }
        }

        return $forms_access;
    }

    private static $form_activation_access = null;
    public static function getFormsAccessMatrix($record, $event_id, $current_instrument = null, $current_instance = null, $location=null, $forms_events_array = array())
    {
        global $Proj;
		if ($record == null || $event_id == null) return [];

        // Get setup values
        $result = FormDisplayLogic::getFormDisplayLogicTableValues();

        // If not set up, return empty array
        if (empty($result['controls'])) return [];

        // If form activation status is already cached, then return it
        if (self::$form_activation_access !== null) return self::$form_activation_access;

        $check_forms_events_array = (is_array($forms_events_array) && !empty($forms_events_array));

		$arm = getArm();
        $forms_status = $result['prevent_hiding_filled_forms'] ? Records::getFormStatus($Proj->project_id, array_keys(self::$cached_data), $arm) : [];
		$forms_status_empty = empty($forms_status);

        if ($location == 'left_form_menu') {
            $events = array($event_id);
        } else {
            // Getting events of the current arm.
            $arm = $event_id ? $Proj->eventInfo[$event_id]['arm_num'] : (isset($_GET['arm']) ? $_GET['arm'] : 1);
            $events = isset($Proj->events[$arm]['events']) ? array_keys($Proj->events[$arm]['events']) : [];
        }

        $events_forms = [];
        foreach ($result['controls'] as $_ => $cf) {
            if (empty($cf['form-name'])) {
                continue;
            }
            foreach ($cf['form-name'] as $form_event_pair) {
                $target_events = [];
                list($form_name, $event_id) = explode("-", $form_event_pair);
                if (empty($event_id)) {
                    // If no event_id, then add ALL events for this arm
                    $target_events = isset($Proj->events[$arm]['events']) ? array_keys($Proj->events[$arm]['events']) : [];
                } else {
                    $target_events[] = $event_id;
                }
                foreach($target_events as $event_id) {
                    // Skip non-displayed events in a custom Record Status Dashboard
                    if ($check_forms_events_array && !isset($forms_events_array[$event_id])) {
                        continue;
                    }
                    // Skip non-displayed forms in a custom Record Status Dashboard
                    if ($check_forms_events_array && !in_array($form_name, $forms_events_array[$event_id])) {
                        continue;
                    }
                    if (!isset($events_forms[$event_id][$form_name])) {
                        $events_forms[$event_id][$form_name] = [];
                    }
                    $events_forms[$event_id][$form_name][] = $cf["control-condition"];
                }
            }
        }
        // Populate empty fields for non-existing record (that is about to be created)
        if ($record && !isset(self::$cached_data[$record])) {
            $data = array_combine(array_keys($Proj->metadata), array_fill(0, count($Proj->metadata), ''));
            $data = array_combine(array_keys($Proj->eventInfo), array_fill(0, count($Proj->eventInfo), $data));
            self::$cached_data = array($record => $data);
        }
        // Building forms access matrix.
        self::$form_activation_access = [];
        if (self::$cached_data === null) self::$cached_data = [];
        foreach (array_keys(self::$cached_data) as $id)
        {
            self::$form_activation_access[$id] = [];
            foreach ($events as $event_id) 
            {
                self::$form_activation_access[$id][$event_id] = [];
                $forms = [];
              
                if ($result['prevent_hiding_filled_forms'] && !$forms_status_empty) {
                    if (isset($forms_status[$id][$event_id])) {
                        foreach ($forms_status[$id][$event_id] as $form => $instances) {
                            if (empty($instances)) {
                                $forms[] = $form;
                            } else {
                                self::$form_activation_access[$id][$event_id][$form] = true;
                            }
                        }
                    }
                } elseif (isset($Proj->eventsForms[$event_id])) {
                    $forms = $Proj->eventsForms[$event_id];
                }

                foreach ($forms as $form)
                {
                    // By default, all forms should be displayed
                    $access = true;
                    // But if an event/form has been set up for FRSL, then it defaults to false UNLESS its logic evaluates as true
                    if (isset($events_forms[$event_id][$form])) {
                        $access = false;
                        foreach ($events_forms[$event_id][$form] as $cond) {
                            $passedLogicTest = REDCap::evaluateLogic($cond, $Proj->project_id, $id, $event_id, 1, ($Proj->isRepeatingFormOrEvent($event_id, $form) ? $form : ""), $current_instrument, self::$cached_data, false, false);
                            if ($passedLogicTest) {
                                $access = true;
                                break;
                            }
                        }
                    }
                    // Set access for record-event-form
                    self::$form_activation_access[$id][$event_id][$form] = $access;
                }
            }
        }
        return self::$form_activation_access;
    }

    // Override Survey statuses
    public static function overrideSurveysStatuses($record, $event_id, $form_name, $instance)
    {
        global $Proj;
        if ($Proj->project['form_activation_survey_autocontinue'] == '0') return;

		// If data has not been cached yet, do so now (for single record only) - record status dashboard should already have had this done
		if ($record && self::$cached_data === null) {
			self::loadData($record);
		}

        $forms_access = self::getFormsAccessMatrix($record, $event_id, $form_name, $instance);

        if (!isset($forms_access[$record][$event_id])) return;

        foreach ($forms_access[$record][$event_id] as $form => $value) {
            if ($value || empty($Proj->forms[$form]['survey_id'])) {
                continue;
            }
            // Disabling surveys that are not allowed.
            $survey_id = $Proj->forms[$form]['survey_id'];
            $Proj->surveys[$survey_id]['survey_enabled'] = 0;
        }
    }

    /**
     * @param array $post - POST data received from POST request or array that contains data expected from the post request
     * @param array $forms_list - list names for all forms/events that have form display conditions set on them.
     * @param array $sql_all - list all SQL queries executed during this method execution, for logging purposes.
     * @return void
     * @throws Exception
     */
    public static function saveConditionsSettings(array &$post, array &$forms_list, array &$sql_all)
    {
        global $Proj;

        $hide_filled_forms = (isset($post['prevent_hiding_filled_forms']) && in_array($post['prevent_hiding_filled_forms'], ['0','1'])) ? ($post['prevent_hiding_filled_forms'] == '1' ? '0' : '1') : $Proj->project['hide_filled_forms'];
        $hide_disabled_forms = (isset($post['hide_disabled_forms']) && in_array($post['hide_disabled_forms'], ['0','1'])) ? $post['hide_disabled_forms'] : $Proj->project['hide_disabled_forms'];
        $enable_survey_support = (isset($post['enable_survey_support']) && in_array($post['enable_survey_support'], ['0','1'])) ? $post['enable_survey_support'] : $Proj->project['form_activation_survey_autocontinue'];

        $sql_all[] = $sql = "UPDATE redcap_projects 
						SET hide_filled_forms = '$hide_filled_forms', hide_disabled_forms = '$hide_disabled_forms', form_activation_survey_autocontinue = '$enable_survey_support' 
						WHERE project_id = " . $Proj->getId();
        db_query_throw_on_error($sql);

        $deletedIds = json_decode($post['deleted_ids'] ?? '[]');
        if (!empty($deletedIds)) {
            // Delete Controls
            $sql_all[] = $sql = "DELETE FROM redcap_form_display_logic_conditions WHERE control_id IN (" . prep_implode($deletedIds) . ") and project_id = '" . $Proj->getId() . "'";
            db_query_throw_on_error($sql);
        }

        if (isset($post['outer-list'])) {
            foreach ($post['outer-list'] as $post_controls) {
                $control_id = $post_controls['control_id'];
                if (empty($control_id)) {
                    // Insert
                    $sql_all[] = $sql = "INSERT INTO redcap_form_display_logic_conditions (project_id, control_condition) VALUES
									 ('" . $Proj->getId() . "', '" . db_escape($post_controls['control-condition']) . "')";
                    if (db_query_throw_on_error($sql)) {
                        $control_id = db_insert_id();
                    }
                } else {
                    // Update
                    $sql_all[] = $sql = "UPDATE redcap_form_display_logic_conditions SET control_condition = '" . db_escape($post_controls['control-condition']) . "' WHERE control_id ='" . $control_id . "'";
                    db_query_throw_on_error($sql);
                }

                if ($control_id > 0) {
                    $sql_all[] = $sql = "DELETE FROM redcap_form_display_logic_targets WHERE control_id ='" . $control_id . "'";
                    $q = db_query_throw_on_error($sql);
                    foreach ($post_controls['form-name'] as $form_event_pair) {
                        list($form_name, $event_id) = explode("-", $form_event_pair);
                        if ($Proj->longitudinal) {
                            $event_name = ($event_id == '') ? $lang['alerts_70'] : $Proj->eventInfo[$event_id]['name_ext'];
                            $forms_label = "{$Proj->forms[$form_name]['menu']} ($event_name)";
                        } else {
                            $forms_label = "{$Proj->forms[$form_name]['menu']}";
                        }
                        if (!in_array($forms_label, $forms_list)) {
                            $forms_list[] = $forms_label;
                        }
                        // Insert Target Forms
                        $sql_all[] = $sql = "INSERT INTO redcap_form_display_logic_targets (control_id, form_name, event_id) VALUES
											('" . db_escape($control_id) . "', '" . db_escape($form_name) . "', " . checkNull($event_id) . ")";
                        $q = db_query_throw_on_error($sql);
                    }
                }
            }
        } else {
            // Delete Controls
            $sql_all[] = $sql = "DELETE FROM redcap_form_display_logic_conditions WHERE project_id = '" . $Proj->getId() . "'";
            db_query_throw_on_error($sql);
        }
    }
}