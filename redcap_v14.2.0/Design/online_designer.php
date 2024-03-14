<?php

require_once dirname(dirname(__FILE__)) . '/Config/init_project.php';

use Vanderbilt\REDCap\Classes\MyCap\MyCap;
use Vanderbilt\REDCap\Classes\MyCap\ZeroDateTask;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTask;
use Vanderbilt\REDCap\Classes\MyCap\ActiveTasks;
use Vanderbilt\REDCap\Classes\MyCap\Task;
use Vanderbilt\REDCap\Classes\MyCap\Participant;

$exportButtonDisabled = true;
$hasAutoInvitesDefined = false;
$surveyQueueExportEnabled = false;
$formDisplayLogicExportEnabled = false;

if ($surveys_enabled)
{
	$asi = new AutomatedSurveyInvitation(PROJECT_ID);
    $asi->listen();
	// get the scheduled ASI to check if the export button should be enabled
	$scheduledASI = $asi->getScheduledASI();
	$exportButtonDisabled = (count($scheduledASI) == 0);
    // get Survey Queue Setup (SQS)
    $sqs = new SurveyQueueSetup(PROJECT_ID);
    // survey queue export enabled implies survey queue enabled
    $surveyQueueExportEnabled = $sqs->isSurveyQueueExportEnabled();
    // Listen for SQS export/import requests and handle such requests.
	// Handling will stop further execution of this file.
    $sqs->listen();
}
// instantiate form display logic (FDL) setup instance
$fdl = new FormDisplayLogicSetup(PROJECT_ID);
// form display logic export enabled implies form display logic enabled
$formDisplayLogicExportEnabled = $fdl->isFormDisplayLogicEnabled();
// Listen for FDL export/import requests
// Handling of such a request may stop further execution of this file.
$fdl->listen();


// Validate PAGE
if (isset($_GET['page']) && $_GET['page'] != '' && (($status == 0 && !isset($Proj->forms[$_GET['page']])) || ($status > 0 && !isset($Proj->forms_temp[$_GET['page']])))) {
	if ($isAjax) {
		exit("ERROR!");
	} else {
		redirect(APP_PATH_WEBROOT . "index.php?pid=" . PROJECT_ID);
	}
}
// If attempting to edit a PROMIS CAT, which is not allowed, redirect back to Form list
list ($isPromisInstrument, $isAutoScoringInstrument) = PROMIS::isPromisInstrument(isset($_GET['page']) && $_GET['page'] != '' ? $_GET['page'] : '');
if (isset($_GET['page']) && $_GET['page'] != '' && $isPromisInstrument) {
	redirect(APP_PATH_WEBROOT . "Design/online_designer.php?pid=$project_id");
}

// If attempting to edit a MyCap Active task instrument, which is not allowed, redirect back to Form list
if ($mycap_enabled && $mycap_enabled_global) {
    if (isset($_GET['page']) && $_GET['page'] != '' && isset($myCapProj->tasks[$_GET['page']]) && $myCapProj->tasks[$_GET['page']]['is_active_task'] == 1) {
        redirect(APP_PATH_WEBROOT . "Design/online_designer.php?pid=$project_id");
    }
}

include APP_PATH_DOCROOT . 'ProjectGeneral/header.php';

// Shared Library flag to avoid duplicate loading is reset here for the user to load a form
$_SESSION['import_id'] = '';

//If project is in production, do not allow instant editing (draft the changes using metadata_temp table instead)
$metadata_table = ($status > 0) ? "redcap_metadata_temp" : "redcap_metadata";


## AUTO PROD CHANGES (SUCCESS MESSAGE DIALOG)
if (isset($_GET['msg']) && $_GET['msg'] == "autochangessaved" && $auto_prod_changes > 0 && $status > 0 && $draft_mode == 0)
{
	// Set text to explain why changes were made automatically
	if ($auto_prod_changes == '1') {
		$explainText = $lang['design_279'];
	} elseif ($auto_prod_changes == '2') {
		$explainText = $lang['design_281'];
	} elseif ($auto_prod_changes == '3') {
		$explainText = $lang['design_288'];
	} elseif ($auto_prod_changes == '4') {
		$explainText = $lang['design_289'];
	}
	$explainText .= " " . $lang['design_282'];
	// Render hidden dialog div
	?>
	<div id="autochangessaved" style="display:none;" title="<?php echo js_escape2($lang['design_276']) ?>">
		<div class="darkgreen" style="margin:20px 0;">
			<table cellspacing=8 width=100%>
				<tr>
					<td valign="top" style="padding:15px 30px 0 20px;">
						<img src="<?php echo APP_PATH_IMAGES ?>check_big.png">
					</td>
					<td valign="top" style="font-size:13px;font-family:verdana;padding-right:30px;">
						<?php if (defined("AUTOMATE_ALL")) { ?>
							<?php echo "<b>{$lang['global_79']} {$lang['design_277']}</b><br>{$lang['design_526']}" ?>
						<?php } else { ?>
							<?php echo "<b>{$lang['global_79']} {$lang['design_277']}</b><br>{$lang['design_280']}" ?>
							<div style="padding:20px 0 0;">
								<a href="javascript:;" onclick="$('#explainAutoChanges').toggle('fade');" style=""><?php echo $lang['design_278'] ?></a>
							</div>
						<?php } ?>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<div style="display:none;margin-top:5px;border:1px solid #ccc;padding:8px;" id="explainAutoChanges"><?php echo $explainText ?></div>
                        <div class="fs11 yellow mt-3">
							<?php echo RCView::tt($GLOBALS['new_form_default_prod_user_access'] == '0' ? 'design_991' : 'design_1003') ?>
							<?php echo ($GLOBALS['new_form_default_prod_user_access'] == '2' ? RCView::tt('design_1009') : '') ?>
                        </div>
					</td>
				</tr>
			</table>
		</div>
		<div id="calcs_changed" class="yellow" style="<?php print ($_GET['calcs_changed'] != '1') ? "display:none;" : "" ?>margin:20px 0 0;">
			<img src="<?php echo APP_PATH_IMAGES ?>exclamation_orange.png">
			<?php echo RCView::b($lang['design_516']).RCView::br().$lang['design_517'] ?>
		</div>
		<div class="yellow" style="<?php print ($mycap_enabled_global && $mycap_enabled) ? "" : "display:none;" ?>margin:20px 0 0;">
            <img src='<?=APP_PATH_IMAGES?>mycap_logo_black.png' style='width:24px;position:relative;top:-2px;'>
			<?php echo $lang['mycap_mobile_app_677'] ?>
		</div>
	</div>
	<script type="text/javascript">
	$(function(){
		$('#autochangessaved').dialog({ bgiframe: true, modal: true, width: 750,
			buttons: { Close: function() {$(this).dialog('close'); } }
		});
	});
	</script>
	<?php
}

// TABS
include APP_PATH_DOCROOT . "ProjectSetup/tabs.php";

// Check if any notices need to be displayed regarding Draft Mode
include APP_PATH_DOCROOT . "Design/draft_mode_notice.php";

$sharedLibForms = '';

## VIDEO LINK AND SHARED LIBRARY LINK
// Share instruments to Shared Library (if in Prod and NOT in Draft Mode yet)
$sharedLibLink = "";
if ($shared_library_enabled && $draft_mode == 0 && $status > 0)
{
	// Create drop-down options
	$sharedLibForms = "";
	foreach ($Proj->forms as $form=>$attr) {
		$sharedLibForms .= "<option value='$form'>{$attr['menu']}";
		if (isset($formStyleVisible[$form])) {
			$sharedLibForms .= " " . $lang['shared_library_69'];
		}
		$sharedLibForms .= "</option>";
	}
	$sharedLibBtnDisabled = (($draft_mode == 0 || (isVanderbilt() && $super_user)) ? "" : "disabled");
	// Output link to page
	$sharedLibLink = RCView::div(array('style'=>'float:left;margin-top:4px;margin-right:30px;'),
						RCView::a(array('href'=>'javascript:;','style'=>'vertical-align:middle;text-decoration:underline;color:#3E72A8;','onclick'=>"\$('#shareToLibDiv').toggle('fade');"),
							RCView::i(['class'=>'far fa-question-circle me-1'], '') . $lang['setup_69'])
					 );
}
// Display link(s)
print 	RCView::div(array('class'=>'clearfix ms-2 mt-2 mb-3'),
			$sharedLibLink .
			RCView::div(array('style'=>'float:left;margin-top:4px;'),
				'<i class="fas fa-film"></i> ' .
				RCView::a(array('href'=>'javascript:;','style'=>'vertical-align:middle;font-size:12px;text-decoration:underline;font-weight:normal;','onclick'=>"window.open('".CONSORTIUM_WEBSITE."videoplayer.php?video=" . (isset($_GET['page']) && $_GET['page'] != '' ? "online_designer01.mp4" : "intro_instrument_dev.mp4") . "&referer=".SERVER_NAME."&title=".js_escape($lang['training_res_101'])."','myWin','width=1050, height=800, toolbar=0, menubar=0, location=0, status=0, scrollbars=1, resizable=1');"), $lang['design_02'])
			) .
			(!($status < 1 || ($status > 0 && $draft_mode == 1)) ? "" :
				RCView::div(array('style'=>'float:left;margin-left:90px;'),
					MetaData::renderDataDictionarySnapshotButton()
				)
			)
		);


// Hidden div containing drop-down list of forms to share to Shared Library -->
print  "<div id='shareToLibDiv' style='display:none;max-width:700px;margin:20px 0;padding:8px;border:1px solid #ccc;background-color:#f5f5f5;'>
			<b>{$lang['setup_69']}</b><br>
			{$lang['setup_70']}
			<a href='javascript:;' style='text-decoration:underline;font-size:12px;' onclick=\"openLibInfoPopup('download')\">{$lang['design_250']}</a>
			<div style='padding:5px 0;'>
				<select id='form_names' class='x-form-text x-form-field notranslate' style=''>
					<option value=''>-- {$lang['shared_library_59']} --</option>
					$sharedLibForms
				</select>
				<button onclick=\"
					if ($('#form_names').val().length < 1){
						alert('Please select an instrument');
					} else {
						window.location.href = app_path_webroot+'SharedLibrary/index.php?pid='+pid+'&page='+$('#form_names').val();
					}
				\">{$lang['design_174']}</button>
			</div>
		</div>";

// 'READY TO ADD QUESTIONS' BOX: For single survey projects, if no questions have been added yet (or if the participant_id is hidden),
// then give big instructional box to get started.
if (isset($_GET['page']) && $_GET['page'] != "" && count($Proj->metadata) == 2 && $table_pk == "record_id")
{
	?>
	<div id="ready_to_add_questions" class="green" style="max-width:780px;margin-top:20px;padding:10px 10px 15px;">
		<div style="text-align:center;font-size:20px;font-weight:bold;padding-bottom:5px;"><?php echo $lang['design_394'] ?></div>
		<div><?php echo $lang['design_393'] ?></div>
	</div>
	<p><?php echo $lang['design_07'] ?></p>
	<script type="text/javascript">
	$(function(){
		setTimeout(function(){
			$('#ready_to_add_questions').hide('blind',1500);
		},20000);
	});
	</script>
	<?php
}



//If user has not selected which form to edit, give them list of forms to choose from
loadJS('Libraries/jquery_tablednd.js');
addLangToJS(array(
	"calendar_popup_01", "design_401", "global_53", "mycap_mobile_app_92", "mycap_mobile_app_95", "designate_forms_13", 'mycap_mobile_app_480', 'create_project_20', 'mycap_mobile_app_108', 'mycap_mobile_app_457', 'mycap_mobile_app_458',
    'mycap_mobile_app_481', 'mycap_mobile_app_482', "mycap_mobile_app_594", "mycap_mobile_app_595", "folders_11"
));

$script = "<script type=\"text/javascript\">var baselineDateExists = false;</script>";
$part_list = Participant::getParticipantList(PROJECT_ID);
foreach ($part_list as $code => $participant) {
    if (trim($participant['baseline_date']) != '-') {
        $script = "<script type=\"text/javascript\">var baselineDateExists = true;</script>";
        break;
    }
}
print $script;
// Version published success message box
print "<div class='versionPublishMsg darkgreen' style='max-width:600px;text-align:center; display:none;'><img src='".APP_PATH_IMAGES."tick.png'> ".$lang['mycap_mobile_app_93']." ".$lang['mycap_mobile_app_787']."</div>";
?>
<!-- custom script -->
<script type="text/javascript">
// Language vars
var form_moved_msg = (getParameterByName('page') == '')
	? '<div style="color:green;font-size:13px;"><img src="'+app_path_images+'tick.png"> <?php echo js_escape($lang['design_371']) ?><br><br><?php echo js_escape($lang['design_373']) ?></div>'
	: '<?php echo js_escape($lang['design_372']) ?>';
var langRecIdFldChanged = '<?php echo js_escape($lang['design_400']) ?>';
var langQuestionMark = '<?php echo js_escape($lang['questionmark']) ?>';
var langPeriod = '<?php echo js_escape($lang['period']) ?>';
var langSave = '<?php echo js_escape($lang['designate_forms_13']) ?>';
var langDelete = '<?php echo js_escape($lang['global_19']) ?>';
var langOD30 = '<?php echo js_escape($lang['global_03']) ?>';
var langOD32 = '<?php echo js_escape($lang['design_128']) ?>';
var langOD33 = '<?php echo js_escape($lang['design_128']) ?>';
var langOD54 = '<?php echo js_escape($lang['design_729']) ?>';
var design_100 = '<?php echo js_escape($lang['design_100']) ?>';
var design_99 = '<?php echo js_escape($lang['design_99']) ?>';
var asi_024 = '<?php echo js_escape($lang['asi_024']) ?>';
var asi_036 = '<?php echo js_escape($lang['asi_036']) ?>';
var form_missing = '<?php echo js_escape($lang['design_988']) ?>';
var logic_missing = '<?php echo js_escape($lang['design_989']) ?>';
var duplicate_warning = '<?php echo js_escape($lang['design_971']) ?>';
var confirm_msg = '<?php echo js_escape($lang['design_972']) ?>';
var baseline_date_field = '<?php echo js_escape(ZeroDateTask::getBaselineDateField()) ?>';
</script>
<?php


// Publish new version help - hidden dialog
print RCView::simpleDialog($lang['mycap_mobile_app_96'].$lang['mycap_mobile_app_533'], $lang['mycap_mobile_app_92'], 'publishVersionDialog');



/**
 * CHOOSE A FORM TO EDIT OR ENTER NEW FORM TO CREATE
 */
if (!isset($_GET['page']) || $_GET['page'] == "")
{
	// If redirected here from Invite Participants when no surveys have been enabled yet, then display dialog for instructions
	// on how to enable surveys.
	if (isset($_GET['dialog']) && $_GET['dialog'] == 'enable_surveys')
	{
		?>
		<script type="text/javascript">
		$(function(){
			simpleDialog('<?php echo js_escape(RCView::b($lang['global_03'].$lang['colon'])." ".$lang['survey_357']) ?>','<?php echo js_escape($lang['setup_84']) ?>','how_to_enable_surveys-dialog');
		});
		</script>
		<?php
	}

	// If user just created/edited the Survey Settings page, then give confirmation popup
	if (isset($_GET['survey_save']))
	{
		print 	RCView::div(array('id'=>'saveSurveyMsg','class'=>'darkgreen','style'=>'color:green;display:none;vertical-align:middle;text-align:center;padding:25px;font-size:15px;'),
					RCView::img(array('src'=>'tick.png')) . $lang['survey_1003']
				);
		?>
		<script type="text/javascript">
		$(function(){
			// Change the URL in the browser's address bar to prevent reloading the msg if page gets reloaded
			modifyURL(window.location.protocol + '//' + window.location.host + window.location.pathname + '?pid=' + pid);
			// Display dialog
			simpleDialogAlt($('#saveSurveyMsg'), 2.2, 450);
		});
		</script>
		<?php
	}

    // If user just created/edited the Task Settings, then give confirmation popup
    if (isset($_GET['task_save']))
    {
        print 	RCView::div(array('id'=>'saveTaskMsg','class'=>'darkgreen','style'=>'color:green;display:none;vertical-align:middle;text-align:center;padding:25px;font-size:15px;'),
            RCView::img(array('src'=>'tick.png')) . $lang['mycap_mobile_app_131']
        );
        ?>
        <script type="text/javascript">
            $(function(){
                // Change the URL in the browser's address bar to prevent reloading the msg if page gets reloaded
                window.location.replace(window.location.protocol + '//' + window.location.host + window.location.pathname + '?pid=' + pid);
                //modifyURL(window.location.protocol + '//' + window.location.host + window.location.pathname + '?pid=' + pid);
                // Display dialog
                simpleDialogAlt($('#saveTaskMsg'), 2.2, 450);
            });
        </script>
        <?php
    }

	// Set flag if some parts of the instrument list table should be disabled to prevent editing because it's not in draft mode yet
	$disableTable = ($draft_mode != '1' && $status > 0);
	?>
	<style type="text/css">
	.edit_saved  { background: #C1FFC1 url(<?php echo APP_PATH_IMAGES ?>tick.png) no-repeat right; }
    #forms_surveys .ftitle { padding-top: 2px; }
	</style>

	<!-- JS for Online Designer (Forms) -->
	<script type="text/javascript">
	// Set vars and functions
	var disable_instrument_table = <?php echo $disableTable ? 1 : 0 ?>;
	var numForms = <?php echo ($status < 1 ? $Proj->numForms : $Proj->numFormsTemp) ?>;
	// Function to give error message if try to click on form names when not editable
	function cannotEditForm() {
		simpleDialog('<?php echo js_escape($lang['design_374']) ?>','<?php echo js_escape($lang['design_375']) ?>');
	}
	// Function to give error message if try to click on fix mycap issues button when not editable
    function cannotFixMyCapIssues() {
        simpleDialog('<?php echo js_escape($lang['mycap_mobile_app_760']) ?>','<?php echo js_escape($lang['mycap_mobile_app_761']) ?>');
    }
	// Function to give error message if try to click on Adaptive form names, which are not editable
	function cannotEditAdaptiveForm() {
		simpleDialog('<?php echo js_escape($lang['design_508']) ?>','<?php echo js_escape($lang['design_507']) ?>');
	}
	// Function to give error message if try to click on Auto-Scoring form names, which are not editable
	function cannotEditAutoScoringForm() {
		simpleDialog('<?php echo js_escape($lang['data_entry_257']) ?>','<?php echo js_escape($lang['data_entry_256']) ?>');
	}
    // Function to give error message if try to click on PROMIS form names, which are not editable
    function cannotEditPromisForm() {
        simpleDialog('<?php echo js_escape($lang['design_779']) ?>','<?php echo js_escape($lang['design_778']) ?>');
    }
    // Function to give error message if try to click on Active Task form names, which are not editable
    function cannotEditActiveTaskForm() {
        simpleDialog('<?php echo js_escape($lang['mycap_mobile_app_316']) ?>','<?php echo js_escape($lang['mycap_mobile_app_315']) ?>');
    }
    // Function to give error message if try to enable forms for MyCap to which baseline date field belongs
    function cannotEnableMyCap() {
	    simpleDialog('<?php echo js_escape($lang['mycap_mobile_app_471']) ?>','<?php echo js_escape($lang['global_48'].$lang['colon']." ".$lang['mycap_mobile_app_352']) ?>');
    }
    // Function to give error message if try to enable PROMIS form which is not supported for MyCap
    function cannotEnablePromisForMyCap() {
        simpleDialog('<?php echo js_escape($lang['mycap_mobile_app_488']) ?>','<?php echo js_escape($lang['global_48'].$lang['colon']." ".$lang['mycap_mobile_app_352']) ?>');
    }
    // Function to give error message if try to enable form which is not utilizing any event (for Longitudinal projects only)
    function cannotEnableMyCapAsNoEvents(page) {
        var msg = '<div><div style="padding-top:5px;"><?php echo js_escape($lang['mycap_mobile_app_816']) ?></div>';
        msg += '<div style="padding-top:15px;"><a href="'+app_path_webroot+'Design/designate_forms.php?pid='+pid+'&page_edit='+page+'" style="text-decoration:underline;"><?php echo js_escape($lang['global_28']) ?></a></div></div>';

        simpleDialog(msg, '<?php echo js_escape($lang['global_48'].$lang['colon']." ".$lang['mycap_mobile_app_723']) ?>');
    }
    // Function to give error message if try to enable form which has no fields other than MC annotations
    function cannotEnableMyCapAsNoFields() {
        simpleDialog('<?php echo js_escape($lang['mycap_mobile_app_727']) ?>','<?php echo js_escape($lang['global_48'].$lang['colon']." ".$lang['mycap_mobile_app_352']) ?>');
    }
    // Function to give error message if try to enable instrument having errors for MyCap
    function cannotEnableErrorInstrumentForMyCap(errorDiv) {
        simpleDialog('<?php echo js_escape($lang['mycap_mobile_app_556']) ?><br>'+$("#"+errorDiv).html(),'<?php echo js_escape($lang['global_48'].$lang['colon']." ".$lang['mycap_mobile_app_352']) ?>');
    }
	// Language vars
	var langErrorColon = '<?php echo js_escape($lang['global_01'].$lang['colon']) ?>';
    var langAlertColon = '<?php echo js_escape($lang['alerts_24'].$lang['exclamationpoint']) ?>';
	var langDrag = '<?php echo js_escape($lang['design_366']) ?>';
	var langModSurvey = '<?php echo js_escape($lang['survey_315']) ?>';
    var langModMyCap = '<?php echo js_escape($lang['mycap_mobile_app_133']) ?>';
	var langClickRowMod = '<?php echo js_escape($lang['design_367']) ?>';
	var langAddNewFlds = '<?php echo js_escape($lang['design_368']) ?>';
	var langDownloadPdf = '<?php echo js_escape($lang['design_369']) ?>';
	var langAddInstHere = '<?php echo js_escape($lang['design_380']) ?>';
	var langNewInstName = '<?php echo js_escape($lang['design_381']) ?>';
	var langCreate = '<?php echo js_escape($lang['design_248']) ?>';
	var langYesDelete = '<?php echo js_escape($lang['design_397']) ?>';
	var langDeleteFormSuccess = '<?php echo js_escape($lang['design_398']) ?>';
	var langDeleted = '<?php echo js_escape($lang['create_project_102']) ?>';
	var langNotDeletedRand = '<?php echo js_escape($lang['design_399']) ?>';
	var langNo = '<?php echo js_escape($lang['design_99']) ?>';
	var langRemove2Bchar = '<?php echo js_escape($lang['design_79']) ?>';
	var langProvideInstName = '<?php echo js_escape($lang['design_382']) ?>';
	var langNewFormRights = '<?php echo js_escape($lang['design_956']) ?>';
	var langNewFormRights2 = '<?php echo js_escape($lang['global_79']) ?>';
	var langNewFormRights3 = '<?php echo js_escape($GLOBALS['new_form_default_prod_user_access'] == '0' ? $lang['design_957'] : $lang['design_1002']) ?>';
	var langInstrCannotBeginNum = '<?php echo js_escape($lang['design_383']) ?>';
	var langSetSurveyTitleAsForm1 = '<?php echo js_escape($lang['design_402']) ?>';
	var langSetSurveyTitleAsForm2 = '<?php echo js_escape($lang['design_403']) ?>';
	var langSetSurveyTitleAsForm3 = '<?php echo js_escape($lang['design_404']) ?>';
	var langSetSurveyTitleAsForm4 = '<?php echo js_escape($lang['design_405']) ?>';
	var langSetSurveyTitleAsForm5 = '<?php echo js_escape($lang['design_406']) ?>';
	var langSetSurveyTitleAsForm6 = '<?php echo js_escape($lang['design_407']) ?>';
	var langAutoInvite1 = '<?php echo js_escape($lang['design_408']) ?>';
	var langAutoInvite2 = '<?php echo js_escape($lang['design_409']) ?>';
	var langAutoInvite3 = '<?php echo js_escape($lang['design_410']) ?>';
	var langAutoInvite4 = '<?php echo js_escape($lang['email_users_01']) ?>';
	var langAutoInvite5 = '<?php echo js_escape($lang['survey_451']) ?>';
	var langAutoInvite6 = '<?php echo js_escape($lang['survey_452']) ?>';
	var langAutoInvite7 = '<?php echo js_escape($lang['survey_453']) ?>';
	var langAutoInvite8 = '<?php echo js_escape($lang['survey_454']) ?>';
	var langAutoInvite9 = '<?php echo js_escape($lang['survey_455']) ?>';
	var langAutoInvite10 = '<?php echo js_escape($lang['survey_456']) ?>';
	var langAutoInvite11 = '<?php echo js_escape($lang['survey_457']) ?>';
	var langAutoInvite12 = '<?php echo js_escape($lang['survey_458']) ?>';
	var langSurveyQueue1 = '<?php echo js_escape($lang['survey_545']) ?>';
	var langSurveyLogin1 = '<?php echo js_escape($lang['survey_610']) ?>';
	var langSurveyLogin2 = '<?php echo js_escape($lang['survey_611']) ?>';
	var langSurveyLogin3 = '<?php echo js_escape($lang['survey_612']) ?>';
	var langCannotDeleteForm = '<?php echo js_escape($lang['design_523']) ?>';
	var langCannotDeleteForm2 = '<?php echo js_escape($lang['design_524']) ?>';
	var langUploadInstZip1 = '<?php echo js_escape($lang['design_535']) ?>';
	var langUploadInstZip2 = '<?php echo js_escape($lang['design_537']) ?>';
	var langUploadInstZip3 = '<?php echo js_escape($lang['design_545']) ?>';
	var langUploadInstZip4 = '<?php echo js_escape($lang['design_546']) ?>';
	var langUploadInstZip5 = '<?php echo js_escape($lang['design_547']) ?>';
	var shared_lib_path = '<?php echo js_escape(SHARED_LIB_PATH) ?>';
	var langCopyInstr = '<?php echo js_escape($lang['design_556']) ?>';
	var langCopyInstr2 = '<?php echo js_escape($lang['design_562']) ?>';
	var langCopyInstr3 = '<?php echo js_escape($lang['design_563']) ?>';
	var langCopyInstr4 = '<?php echo js_escape($lang['design_564']) ?>';
	var langFDL1 = '<?php echo js_escape($lang['design_993']) ?>';
	var langFDL2 = '<?php echo js_escape($lang['design_994']) ?>';
	var langFDL3 = '<?php echo js_escape($lang['design_995']) ?>';
    var langFDL4 = '<?php echo js_escape($lang['design_1093']) ?>';
    var langAT01 = '<?php print js_escape($lang['mycap_mobile_app_185']) ?>';
    var langAT02 = '<?php print js_escape($lang['mycap_mobile_app_187']) ?>';
    var langCreateActiveTask = '<?php print js_escape($lang['mycap_mobile_app_190']) ?>';
    var langActiveTaskInstr = '<?php print js_escape($lang['design_382']) ?>';
    var langActiveTaskInstr1 = '<?php print js_escape($lang['mycap_mobile_app_183']) ?>';
    var langSetTaskTitleAsForm1 = '<?php echo js_escape($lang['mycap_mobile_app_330']) ?>';
    var langSetTaskTitleAsForm2 = '<?php echo js_escape($lang['mycap_mobile_app_331']) ?>';
    var langSetTaskTitleAsForm3 = '<?php echo js_escape($lang['mycap_mobile_app_332']) ?>';
    var langSetTaskTitleAsForm4 = '<?php echo js_escape($lang['mycap_mobile_app_333']) ?>';
    var langSetTaskTitleAsForm5 = '<?php echo js_escape($lang['mycap_mobile_app_334']) ?>';
    var langSetTaskTitleAsForm6 = '<?php echo js_escape($lang['mycap_mobile_app_335']) ?>';
    var langCannotDeleteBaselineDateForm = '<?php echo js_escape($lang['mycap_mobile_app_467']) ?>';
    var langCannotDeleteBaselineDateForm2 = '<?php echo js_escape($lang['mycap_mobile_app_468']) ?>';
    var langWarningTasksWithErrors = '<?php echo js_escape($lang['mycap_mobile_app_786']) ?>';
	<?php if ($surveys_enabled) { ?>
	var langASI = {
		import_button: '<?php echo js_escape($lang['asi_001']) ?>',
		export_button: '<?php echo js_escape($lang['asi_002']) ?>',
		clone_description: '<?php echo js_escape($lang['asi_004']) ?>',
		export_help_description: '<?php echo js_escape($lang['asi_005'].RCView::a(array('href'=>'javascript:;', 'onclick'=>"$(this).hide();$('#asiImportFieldList').show();fitDialog($('#asiImportHelpDlg'));", 'style'=>'display:block;margin:10px 0;text-decoration:underline;'), $lang['asi_007']).RCView::ul(array('id'=>'asiImportFieldList', 'style'=>'font-size:11px;line-height:13px;color:#555;margin-top:10px;display:none;'), "<li>".implode("</li><li>", $asi->getHelpFieldsList())."</li>") ) ?>',
		selectAll: '<?php echo js_escape($lang['data_export_tool_52']) ?>',
		deselectAll: '<?php echo js_escape($lang['data_export_tool_53']) ?>',
        import_button1: '<?php echo js_escape($lang['global_53']) ?>',
        import_button2: '<?php echo js_escape($lang['asi_006']) ?>',
        save_button: '<?php echo js_escape($lang['designate_forms_13']) ?>',
        save_and_clone_button: '<?php echo js_escape($lang['asi_014']) ?>',
        from: '<?php echo js_escape($lang['global_37']) ?>',
        to: '<?php echo js_escape($lang['global_38']) ?>',
        asi_copied: '<?php echo js_escape($lang['asi_015']) ?>',
        asi_clone_title: '<?php echo js_escape($lang['asi_016']) ?>',
        asi_clone1: '<?php echo js_escape($lang['asi_017']) ?>',
        asi_clone2: '<?php echo js_escape($lang['asi_018']) ?>',
        asi_clone3: '<?php echo js_escape($lang['asi_019']) ?>',
        asi_upload1: '<?php echo js_escape($lang['asi_020']) ?>',
        asi_upload2: '<?php echo js_escape($lang['asi_021']) ?>',
        asi_reeval: '<?php echo js_escape($lang['asi_053']) ?>',
        asi_popup_title1: '<?php echo js_escape($lang['asi_054']) ?>',
        asi_popup_content1: '<?php echo js_escape($lang['asi_055']) ?>',
        asi_reset_accept_button: '<?php echo js_escape($lang['asi_056']) ?>',
        asi_reset_decline_button: '<?php echo js_escape($lang['asi_057']) ?>',
	};
    var langSQS = {
        import_help_description: '<?php echo js_escape($lang['sqs_002'].RCView::a(array('href'=>'javascript:;', 'onclick'=>"$(this).hide();$('#sqsImportFieldList').show();fitDialog($('#sqsImportHelpDlg'));", 'style'=>'display:block;margin:10px 0;text-decoration:underline;'), $lang['sqs_005']).RCView::ul(array('id'=>'sqsImportFieldList', 'style'=>'font-size:11px;line-height:13px;color:#555;margin-top:10px;display:none;'), "<li>".implode("</li><li>", $sqs->getHelpFieldsList())."</li>") ) ?>',
        import_button1: '<?php echo js_escape($lang['global_53']) ?>',
        import_button2: '<?php echo js_escape($lang['asi_006']) ?>',
        asi_upload1: '<?php echo js_escape($lang['sqs_003']) ?>',
        asi_upload2: '<?php echo js_escape($lang['sqs_004']) ?>'
    };
	<?php } ?>
    var langFDL = {
        import_button: '<?php echo js_escape($lang['fdl_002']) ?>',
        import_help_description: '<?php echo js_escape($lang['fdl_003'].RCView::a(array('href'=>'javascript:;', 'onclick'=>"$(this).hide();$('#sqsImportFieldList').show();fitDialog($('#sqsImportHelpDlg'));", 'style'=>'display:block;margin:10px 0;text-decoration:underline;'), $lang['fdl_004']).RCView::ul(array('id'=>'sqsImportFieldList', 'style'=>'font-size:11px;line-height:13px;color:#555;margin-top:10px;display:none;'), "<li>".implode("</li><li>", $fdl->getHelpFieldsList())."</li>") ) ?>',
        import_button1: '<?php echo js_escape($lang['global_53']) ?>',
        import_button2: '<?php echo js_escape($lang['asi_006']) ?>',
        fdl_upload1: '<?php echo js_escape($lang['fdl_005']) ?>',
        fdl_upload2: '<?php echo js_escape($lang['fdl_006']) ?>',
    };
	</script>
    <?php if ($surveys_enabled && !isset($_GET['form'])) {
        loadJS('SurveyQueueSetup.js');
		addLangToJS([
			"global_48",
			"sqs_001",
		]);
        loadJS('AutomatedSurveyInvitationTool.js');
        loadJS('Libraries/handlebars.js');
    }
    loadJS('FormDisplayLogicSetup.js');
	loadJS('DesignForms.js');
    loadJS("Libraries/jquery.repeater.min.js");

    $activeTasks = ActiveTask::getActiveTasksListLayout('researchKit');
    if ($mtb_enabled) {
        $mtbActiveTasks = ActiveTask::getActiveTasksListLayout('mtb');
    }

    ?>

	<!-- INSTRUMENT ZIP FILE UPLOAD - DIALOG POP-UP -->
	<div id="zip-instrument-popup" title="<?php echo js_escape2($lang['design_535']) ?>" class="simpleDialog">
		<!-- Upload form -->
		<form id="zipInstrumentUploadForm" target="upload_target" enctype="multipart/form-data" method="post"
			action="<?php echo APP_PATH_WEBROOT ?>Design/zip_instrument_upload.php?pid=<?php echo $project_id ?>">
			<div style="font-size:13px;padding-bottom:15px;">
				<?php echo $lang['design_536'] ?>
				<a href="javascript:;" onclick="openZipInstrumentExplainPopup()" style="text-decoration:underline;"><?php echo $lang['design_548'] ?></a>
				<?php echo $lang['design_552'] ?>
			</div>
			<input type="file" id="myfile" name="myfile" style="font-size:13px;">
			<div style="font-size:11px;line-height:13px;padding-top:20px;color:#800000;">
				<?php echo $lang['design_567'] ?>
			</div>
		</form>
		<iframe style="width:0;height:0;border:0px solid #ffffff;" src="<?php echo APP_PATH_WEBROOT ?>DataEntry/empty.php" name="upload_target" id="upload_target"></iframe>
		<!-- Response message: Success -->
		<div id="div_zip_instrument_success" style="display:none;">
			<div style="font-weight:bold;font-size:14px;text-align:center;color:green;margin-bottom:20px;">
				<img src="<?php echo APP_PATH_IMAGES ?>tick.png">
				<?php echo $lang['design_200'] ?>
			</div>
			<?php echo $lang['design_540'] ?>
			<!-- Note about any duplicated fields -->
			<div id="div_zip_instrument_success_dups"></div>
            <!-- Note about MyCap settings uploaded -->
            <div id="div_zip_instrument_success_mycap"></div>
		</div>
		<!-- Response message: Failure -->
		<div id="div_zip_instrument_fail" style="display:none;font-weight:bold;font-size:14px;text-align:center;color:red;">
			<img src="<?php echo APP_PATH_IMAGES ?>exclamation.png">
			<?php echo $lang['design_137'] ?>
		</div>
		<!-- Upload in progress -->
		<div id="div_zip_instrument_in_progress" style="display:none;font-weight:bold;font-size:14px;text-align:center;">
			<?php echo $lang['data_entry_65'] ?><br>
			<img src="<?php echo APP_PATH_IMAGES ?>loader.gif">
		</div>
	</div>

	<!-- COPY INSTRUMENT - DIALOG POP-UP -->
	<div id="copy-instrument-popup" title="<?php echo js_escape2($lang['design_556']) ?>" class="simpleDialog">
		<div style="font-size:13px;">
			<?php echo $lang['design_557'] ?> "<b id="copy_instrument_label"></b>"<?php echo $lang['design_558'] ?>
		</div>
		<div style="font-size:13px;font-weight:bold;margin:15px 0 8px;">
			<div style="float:left;width:230px;padding:3px 10px 0 0;text-align:right;">
				<?php echo $lang['design_559'] ?>
			</div>
			<div style="float:left;">
				<input type="text" id="copy_instrument_new_name" class="x-form-text x-form-field" style="width:200px;">
			</div>
			<div style="clear:both;"></div>
		</div>
		<div style="font-size:13px;font-weight:bold;margin:8px 0 2px;">
			<div style="float:left;width:230px;padding:3px 10px 0 0;text-align:right;">
				<?php echo $lang['design_560'] ?>
			</div>
			<div style="float:left;">
				<input type="text" id="copy_instrument_affix" class="x-form-text x-form-field" style="width:60px;"
					onblur="this.value = filterFieldAffix(this.value);">
			</div>
			<div style="clear:both;"></div>
		</div>
	</div>

    <!-- Active Tasks dialog -->
    <div id="activetask_list" style="display:none;">
        <div id="activeTasksContainer">
    <?php if ($mtb_enabled) { ?>
        <div style="margin:5px 2px 10px 2px;">
            <?=RCView::tt('mycap_mobile_app_817'); ?>
        </div>
        <div id="sub-nav" class="d-print-none" style="margin:20px 0 15px 0;">
            <ul>
                <li class="active">
                    <a id="researchKitTasks" class="active-task-list-tab" href="javascript:;" style="font-size:13px; color:#393733; padding:6px 9px 5px 10px; border: none;">
                        <span style="vertical-align:middle">&nbsp;ResearchKit</span></a>
                </li>
                <li>
                    <a id="mtbTasks" class="active-task-list-tab" href="javascript:;" style="font-size:13px; color:#393733; padding:6px 9px 5px 10px">
                        <span style="vertical-align:middle">&nbsp;Mobile Toolbox</span></a>
                </li>
            </ul>
        </div>
        <div id="List_researchKitTasks">
            <div style="margin:5px 2px 10px 2px;">
                <?=RCView::tt('mycap_mobile_app_818'); ?>
            </div>
            <div class="clear"></div>
            <div class="row">
                <?php echo $activeTasks;?>
            </div>
        </div>
        <div id="List_mtbTasks" style="display: none;">
            <div style="margin:5px 2px 10px 2px;">
                <?=RCView::tt('mycap_mobile_app_821'); ?>
            </div>
            <div class="clear"></div>
            <div class="row">
                <?php echo $mtbActiveTasks;?>
            </div>
        </div>
    <?php } else { ?>
        <div style="margin:5px 2px 10px 2px;">
            <?=RCView::tt('mycap_mobile_app_186'); ?>
        </div>
        <div class="clear"></div>
        <div class="row">
            <?php echo $activeTasks;?>
        </div>
    <?php } ?>
        </div>
    </div>

    <!-- CREATE ACTIVE TASK INSTRUMENT - DIALOG POP-UP -->
    <div id="activetask_add" title="<?php print RCView::tt_js2('mycap_mobile_app_187') ?>" class="simpleDialog">
        <div style="font-size:13px;">
            <?php print RCView::tt('mycap_mobile_app_188') ?> "<b id="activetask_instrument_label"></b>"<?php print RCView::tt('mycap_mobile_app_189') ?>
        </div>
        <div style="font-size:13px;font-weight:bold;margin:15px 0 8px;">
            <div style="float:left;width:230px;padding:3px 10px 0 0;text-align:right;">
                <?php print RCView::tt('design_559') ?>
            </div>
            <div style="float:left;">
                <input type="text" id="instrument_new_name" class="x-form-text x-form-field" style="width:200px;">
            </div>
            <div style="clear:both;"></div>
        </div>
    </div>

	<!-- Instructions -->
	<p style="margin-bottom:15px;max-width:<?=($surveys_enabled ? '920px' : '820px')?>;">
		<?php
		print "{$lang['design_377']} ";
		if ($status < 1) {
			print "{$lang['global_02']}{$lang['colon']} {$lang['design_27']}{$lang['period']}";
		} else {
			print ($draft_mode == '1' ? $lang['design_378'] : $lang['design_379']);
			if ($surveys_enabled) print " " . $lang['design_384'];
		}
		?>
	</p>

	<?php

	// Check if event_id exists in URL. If not, then this is not "longitudinal" and has one event, so retrieve event_id.
	if (!$longitudinal && (!isset($_GET['event_id']) || $_GET['event_id'] == "" || !is_numeric($_GET['event_id'])))
	{
		$_GET['event_id'] = getSingleEvent($project_id);
	}

    $errorDivs = '';
	## INSTRUMENT TABLE
	// Initialize vars
	$row_data = array();
	$stdmap_btn = ""; //default
	$row_num = 0; // loop counter
	// Create array of form_names that have automated invitations set for them (not checking more granular at event_id level)
	// Each form will have 0 and 1 subcategory to count number of active(1) and inactive(0) schedules for each.
	$formsWithAutomatedInvites = Design::formsWithAutomatedInvites();
	// Get array of PROMIS instrument names (if any forms were downloaded from the Shared Library)
	$promis_forms = PROMIS::getPromisInstruments();
	// Get array of AUTO-SCORING instrument names from Shared Library
	$auto_scoring_forms = PROMIS::getAutoScoringInstruments();
    // Get array of ADAPTIVE (CAT) instrument names from Shared Library
    $adaptive_forms = PROMIS::getAdaptiveInstruments();
    // Display MyCap options
    $displayMyCapOptions = ($mycap_enabled && $mycap_enabled_global);
	// Query to get form names to display in table
	$sql = "select form_name, max(form_menu_description) as form_menu_description, count(1)-1 as field_count
			from redcap_metadata".(($draft_mode > 0 && $status > 0) ? "_temp" : "")." where project_id = $project_id
			group by form_name order by field_order";
	$q = db_query($sql);
	// Loop through each instrument
	while ($row = db_fetch_assoc($q))
	{
		$row['form_menu_description'] = strip_tags(label_decode($row['form_menu_description']));
		// Give question mark if form menu name is somehow lost and set to ""
		if ($row['form_menu_description'] == "") $row['form_menu_description'] = "[ ? ]";
		// If survey exists, see if it's offline or active to determine the image to display
		if (isset($Proj->forms[$row['form_name']]['survey_id'])) {
			$enabledSurveyImg = ($Proj->surveys[$Proj->forms[$row['form_name']]['survey_id']]['survey_enabled']) ? "tick_small_circle.png" : "bullet_delete.png";
		}
		// Determine if instrument is a PROMIS form
		$isPromisForm = (in_array($row['form_name'], $promis_forms));
		// Determine if instrument is an auto-scoring form
		$isAutoScoringForm = ($isPromisForm && in_array($row['form_name'], $auto_scoring_forms));
        // Determine if instrument is an adaptive form
        $isAdaptiveForm = ($isPromisForm && in_array($row['form_name'], $adaptive_forms));
		// Show survey options (render but hide for all rows, then show only for first row)
		$enabledSurveyAutoContinue = (isset($Proj->forms[$row['form_name']]['survey_id']) && $Proj->surveys[$Proj->forms[$row['form_name']]['survey_id']]['end_survey_redirect_next_survey']);
		$enabledSurveyAutoContinueIcon = ($enabledSurveyAutoContinue) ? "<img src='".APP_PATH_IMAGES."arrow_down.png' title='".js_escape($lang['design_655'])."' class='opacity50' style='vertical-align:middle;position:relative;left:-3px;'>" : "";
		$enabledSurveyRepeat = (isset($Proj->forms[$row['form_name']]['survey_id']) && $Proj->surveys[$Proj->forms[$row['form_name']]['survey_id']]['repeat_survey_enabled'] && $Proj->isRepeatingFormAnyEvent($row['form_name']));
		$enabledSurveyRepeatIcon = ($enabledSurveyRepeat) ? "<img src='".APP_PATH_IMAGES."arrow_rotate_clockwise.png' title=\"".js_escape2($lang['design_701'])."\" class='opacity50' style='vertical-align:middle;position:relative;".($enabledSurveyAutoContinue ? "left:-7px;" : "")."'>" : "";
		$enabledSurveyAutoContinueLinkStyle = ($enabledSurveyRepeat && $enabledSurveyAutoContinue) ? "left:16px;" : ($enabledSurveyRepeat || $enabledSurveyAutoContinue ? "left:8px;" : "");
		// Link/button
		$enabledSurvey = (!isset($Proj->forms[$row['form_name']]['survey_id']))
						? 	"<button class='btn btn-xs btn-defaultrc fs11' style='color:green;' onclick=\"window.location.href=app_path_webroot+'Surveys/create_survey.php?pid='+pid+'&view=showform&page={$row['form_name']}&redirectDesigner=1';\">{$lang['survey_152']}</button>"
						:	"<a class='modsurvstg' href='".APP_PATH_WEBROOT."Surveys/edit_info.php?pid=$project_id&view=showform&page={$row['form_name']}&redirectDesigner=1' style='display:block;text-align:center;position:relative;$enabledSurveyAutoContinueLinkStyle'><img src='".APP_PATH_IMAGES."tick_shield_small.png' style='position:relative;top:-1px;'>{$enabledSurveyAutoContinueIcon}{$enabledSurveyRepeatIcon}</a>";
		$modifySurveyBtn = (!isset($Proj->forms[$row['form_name']]['survey_id']))
						? 	""
						: 	"<button class='btn btn-xs btn-defaultrc fs11' onclick=\"window.location.href=app_path_webroot+'Surveys/edit_info.php?pid='+pid+'&view=showform&page={$row['form_name']}&redirectDesigner=1';\"><img src='".APP_PATH_IMAGES."$enabledSurveyImg' style='position:relative;top:-1px;'> {$lang['survey_314']}</button>";
		// AUTO INVITES BTN: Show button to define conditions for automated invitations (but only for surveys and not for first instrument)
		$defineSurveyConditionsBtn = "";
		if (isset($Proj->forms[$row['form_name']]['survey_id'])) {
			// Set event_id (set as 0 for longitudinal so we can prompt user to select event after clicking button here)
			$surveyCondBtnEventId = $Proj->longitudinal ? '0' : $Proj->firstEventId;
			// Set image of checkmark if already enabled
			$automatedInvitesEnabledImg = '';
			$automatedInvitesEnabledClr = '';
			if (isset($formsWithAutomatedInvites[$row['form_name']])) {
				if ($formsWithAutomatedInvites[$row['form_name']]['1'] > 0) {
					$automatedInvitesEnabledImg .= RCView::img(array('src'=>'tick_small_circle.png', 'style'=>'position:relative;top:-1px;'));
					$automatedInvitesEnabledClr = 'color:green;';
				}
				if ($formsWithAutomatedInvites[$row['form_name']]['0'] > 0) {
					$automatedInvitesEnabledImg .= RCView::img(array('src'=>'bullet_delete.png', 'style'=>'position:relative;top:-1px;'));
					if (!$longitudinal || ($longitudinal && $formsWithAutomatedInvites[$row['form_name']]['1'] == 0)) {
						$automatedInvitesEnabledClr = 'color:#800000;';
					}
				}
			} else {
				$automatedInvitesEnabledImg = RCView::span(array('style'=>'margin-right:2px;'), "+");
			}
			// Set button html
			$defineSurveyConditionsBtn = "<button id='autoInviteBtn-{$row['form_name']}' class='btn btn-xs btn-defaultrc fs11' style='$automatedInvitesEnabledClr' onclick=\"setUpConditionalInvites({$Proj->forms[$row['form_name']]['survey_id']},$surveyCondBtnEventId,'{$row['form_name']}');\">{$automatedInvitesEnabledImg}{$lang['survey_342']}</button>";
		}
		// Invisible 'saved!' tag that only shows when update form order (dragged it)
		$saveMoveTag = "<span id='savedMove-{$row['form_name']}' style='display:none;margin-left:20px;color:red;'>{$lang['design_243']}</span>";
		// Invisible 'pencil/edit' icon to appear next to instrument name when mouseover
		$instrEditIcon = "<span class='instrEdtIcon' style='display:none;margin-left:6px;'><img src='".APP_PATH_IMAGES."pencil_small2.png'></span>";
		// Form actions drop-down list
		$formActionBtns =  	RCView::button(array('class'=>'formActionDropdownTrigger btn btn-xs btn-defaultrc fs11', 'onclick'=>"saveFormODrow('{$row['form_name']}',{$row['field_count']});showBtnDropdownList(this,event,'formActionDropdownDiv');"),
								$lang['design_554'] .
								RCView::img(array('src'=>'arrow_state_grey_expanded_sm.png', 'style'=>'margin-left:6px;position:relative;top:-1px;'))
							);
		// Add this form
		$row_data[$row_num][] = "<span style='display:none;'>{$row['form_name']}</span>";
		if ($disableTable) {
			// Display form name as simple text
			$row_data[$row_num][] = RCView::div(array('style'=>'font-size:12px;', 'onclick'=>"cannotEditForm()"),
										RCView::escape($row['form_menu_description'])
									);
		} else {
			// Set link
			if ($isPromisForm) {
				$projTitleLink = RCView::div(array('style'=>'font-size:13px;', 'onclick'=>($isAutoScoringForm ? "cannotEditAutoScoringForm()" : ($isAdaptiveForm ? "cannotEditAdaptiveForm()" : "cannotEditPromisForm()"))),
									RCView::span(array('id'=>"formlabel-{$row['form_name']}"),
										RCView::escape($row['form_menu_description'])
									) .
									RCView::span(array('id'=>"formlabeladapt-{$row['form_name']}", 'style'=>'margin-left:10px;color:#999;font-size:11px;'),
										($isAutoScoringForm ? $lang['data_entry_255'] : ($isAdaptiveForm ? $lang['design_509'] : ""))
									)
								);
			} else {
				$projTitleLink = "<a class='aGrid formLink' style='padding:3px;display:block;' href='".PAGE_FULL."?pid=$project_id&page={$row['form_name']}'"
							   . "><span id='formlabel-{$row['form_name']}'>{$row['form_menu_description']}</span>{$instrEditIcon}{$saveMoveTag}</a>";

                if ($mycap_enabled && $mycap_enabled_global) {
                    if (isset($myCapProj->tasks[$row['form_name']]) && $myCapProj->tasks[$row['form_name']]['is_active_task'] == 1) {
                        $projTitleLink = RCView::div(array('style' => 'font-size:13px;', 'onclick' => "cannotEditActiveTaskForm()"),
                            RCView::span(array('id' => "formlabel-{$row['form_name']}"),
                                RCView::escape($row['form_menu_description'])
                            ) .
                            RCView::span(array('id' => "formlabeladapt-{$row['form_name']}", 'style' => 'margin-left:10px;color:#999;font-size:11px;'),
                                "(".RCView::img(array('src'=>'tick_small_circle.png', 'style'=>'position:relative;top:-1px;')).(($myCapProj->tasks[$row['form_name']]['is_mtb_active_task'] == 1) ? 'MTB Active Task' : $lang['mycap_mobile_app_355']).")"
                            )
                        );
                    }
                }
			}

            $changeTaskTitle = 0;
            if (isset($myCapProj->tasks[$row['form_name']]['task_id'])) {
                $changeTaskTitle = 1;
            }

			// Display form name as link with hidden input for renaming
			$row_data[$row_num][] = "<div id='form_menu_description_input_span-{$row['form_name']}' style='display:none;'>
										<input type='text' value='".htmlspecialchars($row['form_menu_description'], ENT_QUOTES)."' maxlength='200'
											onblur='this.value=trim(this.value);'
											onkeydown=\"if(event.keyCode==13){
												this.value = trim(this.value);
												if (this.value.length < 1 || checkIsTwoByte(this.value)) return false;
												setFormMenuDescription('{$row['form_name']}',".(isset($Proj->forms[$row['form_name']]['survey_id']) ? 1 : 0).",".$changeTaskTitle.");
												}\"
											id='form_menu_description_input-{$row['form_name']}' class='x-form-text x-form-field' style='width:250px;'
										>&nbsp;
										<input type='button' value=' ".js_escape($lang['designate_forms_13'])." ' style='font-size:11px;' id='form_menu_save_btn-{$row['form_name']}' onclick=\"
											setFormMenuDescription('{$row['form_name']}',".(isset($Proj->forms[$row['form_name']]['survey_id']) ? 1 : 0).",".$changeTaskTitle.");
										\">	&nbsp;&nbsp;
										<img src='".APP_PATH_IMAGES."progress_circle.gif' style='visibility:hidden;' id='progress-{$row['form_name']}'>
									</div>
									<div class='projtitle'>
										$projTitleLink
									</div>";
		}
		$row_data[$row_num][] = $row['field_count'];
		$row_data[$row_num][] = "<a href='".APP_PATH_WEBROOT."index.php?route=PdfController:index&pid=$project_id&page={$row['form_name']}".(($status > 0 && $draft_mode == 1) ? "&draftmode=1" : "")."'><i class='far fa-file-pdf pdficon fs16' style='color:#B00000;'></i></a>";
        $mycap_access = $mycap_enabled && $mycap_enabled_global;
		// Display "enabled as survey" column
		if ($surveys_enabled) {
		    if ($mycap_access && $myCapProj->tasks[$row['form_name']]['is_active_task'] == 1) {
                $row_data[$row_num][] = "";
            } else {
                $row_data[$row_num][] = $enabledSurvey;
            }
		}

		if ($mycap_access) {
            $mycapEnabledInst = (isset($myCapProj->tasks[$row['form_name']]['redcap_instrument']));
            // $taskScheduleIcon = ($mycapEnabledInst) ? '<i class="fa-regular fa-calendar-days fs14" title="'.$myCapProj->tasks[$row['form_name']]['schedule_details'].'"></i> ' : '';
            if (!$Proj->longitudinal) {
                $taskScheduleTitle = ($mycapEnabledInst) ? $myCapProj->tasks[$row['form_name']]['schedule_details'] : '';
            }

            $form_oid = PROMIS::getPromisKey($row['form_name']);
            $list = ActiveTasks\Promis::unsupportedPromisInstruments();

            list ($issues, $warnings) = Task::checkErrors($row['form_name'], PROJECT_ID);

            $baselineDateFieldForm = ZeroDateTask::getBaselineDateForm();
            $events = ($Proj->longitudinal) ? Task::getEventsList($row['form_name']) : array();

            // Get list of fields of instrument excluding fields having MyCap annotations
            $instrumentFields = Task::getListExcludingMyCapFields($row['form_name']);

            if ($baselineDateFieldForm == $row['form_name']) {
                $myCapDisabled = true;
                $onClick = "onclick = \"cannotEnableMyCap()\"";
            } else if (empty($instrumentFields)) {
                $myCapDisabled = true;
                $onClick = "onclick = \"cannotEnableMyCapAsNoFields()\"";
            } else if ($Proj->longitudinal && empty($events)) {
                $myCapDisabled = true;
                $onClick = "onclick = \"cannotEnableMyCapAsNoEvents('".$row['form_name']."')\"";
            } else if ($isPromisForm && in_array($form_oid, $list)) {
                $myCapDisabled = true;
                $onClick = "onclick = \"cannotEnablePromisForMyCap()\"";
            } else if (!empty($issues)) {
                $myCapDisabled = true;
                $errorDivs .= '<div style="display:none;" id="issues_'.$row['form_name'].'"><span class="error">'. implode("<br>", $issues) . '</span></div>';
                $onClick = "onclick = \"cannotEnableErrorInstrumentForMyCap('issues_".$row['form_name']."')\"";
            } else {
                $onClick = 'onclick="window.location.href=\''.APP_PATH_WEBROOT.'MyCap/create_task.php?pid='.PROJECT_ID.'&view=showform&page='.$row['form_name'].'&redirectDesigner=1\';"';
                $myCapDisabled = false;
            }
            // MyCap enabled column
            $taskScheduleLinkStyle = ($mycapEnabledInst) ? "right:3px;" : "";

            if ($mycapEnabledInst) {
                $warningIcon = '';
                $myCapIssues = Task::getMyCapTaskErrors($row['form_name']);
                $myCapNonFixableErrors = Task::getMyCapTaskNonFixableErrors($row['form_name']);
                if (!empty($myCapIssues) || !empty($myCapNonFixableErrors)) {
                    $onClickFix = "onclick = \"showMyCapIssues('" . $row['form_name'] . "'); return false;\"";
                    if (!empty($myCapIssues) && !empty($myCapNonFixableErrors)) {
                        $warningIcon = '<i class="fa fa-circle-exclamation" '.$onClickFix.' style="color:red;" title="'.$lang['mycap_mobile_app_728'].'"></i> ';
                    } else if (count($myCapIssues) > 0) {
                        $warningIcon = '<i class="fa fa-warning" '.$onClickFix.' style="color:darkorange;" title="'.$lang['mycap_mobile_app_729'].'"></i> ';
                    } else if (count($myCapNonFixableErrors) > 0) {
                        $warningIcon = '<i class="fa fa-circle-exclamation" '.$onClickFix.' style="color:red;" title="'.$lang['mycap_mobile_app_730'].'"></i> ';
                    }
                    $enabledMyCapImg = "bullet_delete.png";
                } else {
                    $enabledMyCapImg = "tick_small_circle.png";
                    $warningIcon = '<img src="'.APP_PATH_IMAGES.'tick_small2.png" style="position:relative;top:-1px;"> ';
                }
            }

            $enabledMyCap = !$mycapEnabledInst
                ? 	($row['form_name'] == $Proj->firstForm ? "" : "<button class='btn btn-xs btn-defaultrc fs11 ".($myCapDisabled ? "opacity35" : "")."' style='color:#000066;' ".$myCapDisabled." ".$onClick.">{$lang['survey_152']}</button>")
                :	"<a class='modmycapstg' href='".APP_PATH_WEBROOT."MyCap/edit_task.php?pid=$project_id&view=showform&page={$row['form_name']}&redirectDesigner=1' style='display:block;text-align:center;position:relative;'>{$warningIcon}<img src='".APP_PATH_IMAGES."mycap_logo_black.png' style='width:24px;position:relative;top:-2px;' title='".js_escape($taskScheduleTitle)."'></a>";
            $row_data[$row_num][] = $enabledMyCap;
        }
		// Instrument actions column
		$row_data[$row_num][] = "<span class='formActions'>
									$formActionBtns
									$stdmap_btn
								 </span>";
		// Display survey-related options
        $surveyMyCapOptions = "";
        if ($displayMyCapOptions && $mycapEnabledInst) {
            $surveyMyCapOptions .= "<button class='btn btn-xs btn-defaultrc fs11' onclick=\"window.location.href=app_path_webroot+'MyCap/edit_task.php?pid=$project_id&view=showform&page={$row['form_name']}&redirectDesigner=1';\"><img src='".APP_PATH_IMAGES.$enabledMyCapImg."' style='position:relative;top:-1px;'> {$lang['mycap_mobile_app_637']}</button>";
        }
		if ($surveys_enabled) {
            $surveyMyCapOptions .= "<span id='{$row['form_name']}-btns' class='formActions'>
										$modifySurveyBtn
										$defineSurveyConditionsBtn
									 </span>";
		}
        if ($surveys_enabled || $displayMyCapOptions) {
            $row_data[$row_num][] = $surveyMyCapOptions;
        }
        // Increment counter
		$row_num++;
	}

	// Set table headers and attributes
	$col_widths_headers = array();
	$col_widths_headers[] = array(15, "", "center");
	$col_widths_headers[] = array(($surveys_enabled ? 382 : 580), RCView::SP . RCView::b($lang['design_244']));
	$col_widths_headers[] = array(34,  $lang['home_32'], "center");
	$col_widths_headers[] = array(29,  RCView::div(array('style'=>'line-height:11px;padding:2px 0;'), $lang['global_84'].RCView::br().$lang['global_85']), "center");
	if ($surveys_enabled) {
		$col_widths_headers[] = array(62, RCView::div(array('style'=>'line-height:11px;padding:2px 0;'), $lang['design_365'].RCView::br().$lang['global_59']), "center");
	}
    if ($displayMyCapOptions) {
        $col_widths_headers[] = array(67, RCView::div(array('class'=>'wrap', 'style'=>'line-height:12px;padding:2px 0;'), $lang['mycap_mobile_app_100']), "center");
    }
	$col_widths_headers[] = array(106, RCView::div(array('style'=>'line-height:11px;padding:2px 0;'), $lang['design_389']), "center");

    if ($surveys_enabled && $displayMyCapOptions) {
        $col_widths_headers[] = array(380, $lang['mycap_mobile_app_636']);
    } elseif ($surveys_enabled && !$displayMyCapOptions) {
        $col_widths_headers[] = array(350, $lang['design_390']);
    } elseif (!$surveys_enabled && $displayMyCapOptions) {
        $col_widths_headers[] = array(350, $lang['mycap_mobile_app_635']);
    }

	// Set table width
	// $instTableWidth = ($surveys_enabled || ($mycap_enabled && $mycap_enabled_global)) ? 1127 : 830;
	$instTableWidth = 830;
    if ($surveys_enabled && $displayMyCapOptions) {
        $instTableWidth = 1150;
    } elseif ($surveys_enabled && !$displayMyCapOptions) {
        $instTableWidth = 1040;
    } elseif (!$surveys_enabled && $displayMyCapOptions) {
        $instTableWidth = 1050;
    }

	if ($surveys_enabled)
	{
		// If survey notifications are enabled, then display the check icon for the survey queue button
		$survey_notifications_active_style = (Survey::surveyNotificationsEnabled()) ? '' : 'display:none;';
		// If survey login is enabled, then display the check icon for the survey login button
		$survey_login_active_style = (Survey::surveyLoginEnabled()) ? '' : 'display:none;';
		// Determine if an ASIs have been set
		$surveyScheduler = new SurveyScheduler(PROJECT_ID);
		$surveyScheduler->setSchedules();
		$hasAutoInvitesDefined = !empty($surveyScheduler->schedules);
	}
	if ($mycap_access) {
        loadJS('MyCapProject.js');
        loadCSS("MyCap.css");
        $baselineDateEnabled = ZeroDateTask::baselineDateEnabled();
        $baseline_date_img = $baselineDateEnabled ? 'tick_small_circle.png' : 'bullet_delete.png';

        $taskErrors = Task::getMyCapTaskErrors('');
        $taskNonFixableErrors = Task::getMyCapTaskNonFixableErrors('');
    }
    $total = 0;
    if (is_array($myCapProj->tasks ?? null)) {
        foreach ($myCapProj->tasks as $task) {
            $taskWithNonFixableErrors = Task::getMyCapTaskNonFixableErrors($task['redcap_instrument']);
            // Ignore tasks having non-fixable errors
            if (empty($taskWithNonFixableErrors)) {
                $total++;
            }
        }
    }
    $text_or_link = $mtb_enabled ? RCView::tt('mycap_mobile_app_185')
                                : "<a href='http://researchkit.org/docs/docs/ActiveTasks/ActiveTasks.html' target='_blank' class='fs11' style='text-decoration:underline;'>ResearchKit ActiveTasks</a>";
	// Set table title display
	$instTableTitle = " <div class='clearfix' style='color:#333;'>                        
                            <div class='float-start wrap' style='width:465px;border-right:1px solid #ccc;font-weight:normal;'>
                                <div class='fs15 m-2 font-weight-bold'>
                                    {$lang['global_36']} <!-- Data Collection Instruments -->
                                </div>
                                <!-- Add new instrument -->
                                <div class='ms-2 pt-2' style='border-top:1px solid #ccc;visibility:" . ($disableTable ? "hidden" : "visible") . ";'>
                                    <div class='fs12' style='padding:1px 0 2px;'>
                                        <button class='btn btn-xs btn-defaultrc fs11 text-successrc' style='vertical-align:middle;' onclick=\"showAddForm();\"><i class=\"fas fa-plus\" style='margin-right:2px;'></i> {$lang['design_248']}</button>
                                        <span style='vertical-align:middle;margin-left:2px;'>{$lang['design_249']}</span>
                                    </div>
                                    <div class='fs12' style='padding:1px 0 2px;display:" . ($shared_library_enabled ? "block" : "none") . ";'>
                                        ".SharedLibrary::renderBrowseLibraryForm()."
                                        <button class='btn btn-xs btn-defaultrc text-primaryrc fs11' style='vertical-align:middle;' onclick=\"$('form#browse_rsl').submit();\"><i class=\"fas fa-file-import fs12\" style='margin-right:1px;'></i> {$lang['design_551']}</button>
                                        <span style='vertical-align:middle;'>{$lang['design_534']}</span>
                                        <a href='javascript:;' onclick=\"openLibInfoPopup('download')\" style='font-size:11px;text-decoration:underline;vertical-align:middle;'>{$lang['shared_library_57']}</a>
                                    </div>
                                    ".(!(Files::hasZipArchive()) ? "" :
                                        "<div class='fs12' style='padding:1px 0 2px;" . (!$shared_library_enabled && !$mycap_access ? "margin-bottom:25px;" : "") . "'>
                                            <button class='btn btn-xs btn-defaultrc fs11' style='vertical-align:middle;color:#A86700;' onclick=\"openZipInstrumentPopup()\"><i class=\"fas fa-upload\"></i> {$lang['design_530']}</button>
                                            <span style='vertical-align:middle;'>{$lang['design_531']}</span>
                                            <a href='javascript:;' onclick=\"openZipInstrumentExplainPopup()\" style='font-size:11px;text-decoration:underline;vertical-align:middle;'>{$lang['design_533']}</a>
                                        </div>"
                                    ).
                                    (!$mycap_access ? "" :
                                        "<div class='fs12' style='padding:1px 0 2px;'>
                                            <button class='btn btn-xs btn-defaultrc fs11 text-successrc' style='vertical-align:middle;' onclick=\"openActiveTasksListing();\"><i class=\"fas fa-plus\" style='margin-right:2px;'></i> {$lang['mycap_mobile_app_190']}</button>
                                            <span style='vertical-align:middle;margin-left:2px;'>
                                                ".RCView::tt('mycap_mobile_app_191')." ".
                                                $text_or_link."
                                            </span>
                                        </div>"
                                    )."
                                </div>
                            </div>
                            <div class=''>
                            
                                <!-- Form Options -->
                                <div class='float-start wrap' style='width:160px;padding:8px 5px 10px 10px;color:#444;'>
                                    <div class='boldish mb-1'>{$lang['design_986']}</div>
                                    <div id='FDL-container' class='btn-group dropdown' role='group'>
                                        <button id='btnGroupDrop0' type='button' class='nowrap btn btn-defaultrc btn-xs fs11 ms-1 mb-1 " . ($formDisplayLogicExportEnabled ? '' : 'dropdown-toggle') . "' onclick='toggleFormDisplayLogicSetupExport()' style='padding-top:1px;padding-left: 6px;color:#800000;' data-bs-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                            <i class=\"fas fa-eye-slash\"></i> {$lang['design_985']}" . (!$formDisplayLogicExportEnabled ? '' : "<img style='position:relative;margin-left:5px;' src='" . APP_PATH_IMAGES . "tick_small_circle.png'>") . "
                                        </button>
                                        <div class='dropdown-menu' aria-labelledby='btnGroupDrop2'>
                                            <a id='FDL-container_dropdown_setup' class='dropdown-item fs12 ' href='javascript:;' onclick='displayFormDisplayLogicPopup()' style='padding-bottom:2px;color:#8A5502;padding-left: 10px;'>
                                                <img style='position:relative;top:-2px;margin-right:5px;' src='".APP_PATH_IMAGES."pencil_small.png'>{$lang['fdl_000']}</a>
                                            <a class='dropdown-item fs12 ' href='javascript:;' onclick='FormDisplayLogicSetup.showImportHelp()' style='padding-bottom:2px;color:#000066;padding-left: 10px;'><img src='".APP_PATH_IMAGES."arrow_up_sm.gif' style='position:relative;top:-2px;margin-right:5px;'>{$lang['fdl_002']}</a>
                                            <a id='FDL-container_dropdown_export' class='dropdown-item fs12 opacity35' href='javascript:;' onclick='' style='padding-bottom:2px;padding-left: 10px;'><img src='".APP_PATH_IMAGES."arrow_down_sm.png' style='position:relative;top:-2px;margin-right:5px;'>{$lang['fdl_001']}</a>
                                        </div>
                                    </div>
                                </div>
                                
                                ".(!$surveys_enabled ? '' : "
                                <!-- Survey Options -->
                                <div class='float-start wrap' style='min-width:300px;max-width:400px;padding:8px 5px 0px 10px;color:#444;'> 
                                    <div class='boldish mb-1'>{$lang['survey_549']}</div>
                                    <div id='SQS-container' class='btn-group dropdown' role='group'>
                                        <button id='btnGroupDrop1' type='button' class='nowrap btn btn-defaultrc btn-xs fs11 ms-1 mb-1 " . ($surveyQueueExportEnabled ? '' : 'dropdown-toggle') . "' onclick='toggleSurveyQueueExport()' style='padding-top:1px;padding-left: 6px;color:#800000;' data-bs-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                            <i class=\"fas fa-list fs12\"></i> {$lang['survey_505']}" . (!$surveyQueueExportEnabled ? '' : "<img data-surveyqueue-enabled style='position:relative;margin-left:5px;' src='" . APP_PATH_IMAGES . "tick_small_circle.png'>") . "
                                        </button>
                                        <div class='dropdown-menu' aria-labelledby='btnGroupDrop2'>
                                            <a id='SQS-container_dropdown_setup' class='dropdown-item fs12 ' href='javascript:;' onclick='displaySurveyQueueSetupPopup()' style='padding-bottom:2px;color:#8A5502;padding-left: 10px;'>
                                                <img style='position:relative;top:-2px;margin-right:5px;' src='".APP_PATH_IMAGES."pencil_small.png'>".RCView::tt("survey_1581")."</a>
                                            <a class='dropdown-item fs12 ' href='javascript:;' onclick='SurveyQueueSetup.showImportHelp()' style='padding-bottom:2px;color:#000066;padding-left: 10px;'><img src='".APP_PATH_IMAGES."arrow_up_sm.gif' style='position:relative;top:-2px;margin-right:5px;'>".RCView::tt("sqs_001")."</a>
                                            <a id='SQS-container_dropdown_export' class='dropdown-item fs12 opacity35' href='javascript:;' onclick='' style='padding-bottom:2px;padding-left: 10px;'><img src='".APP_PATH_IMAGES."arrow_down_sm.png' style='position:relative;top:-2px;margin-right:5px;'>".RCView::tt("sqs_007")."</a>
                                        </div>
                                    </div>
                                    <div id='ASI-container' class='btn-group dropdown' role='group'>
                                        <button id='btnGroupDrop2' type='button' class='nowrap btn btn-defaultrc btn-xs dropdown-toggle fs11 ms-1 mb-1' style='padding-top:1px;padding-left: 6px;' data-bs-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                            <i class='fa-solid fa-gears'></i> {$lang['asi_051']} 
                                        </button>
                                        <div class='dropdown-menu' aria-labelledby='btnGroupDrop2'>
                                            <a class='dropdown-item fs12 ' href='javascript:;' onclick='AutomatedSurveyInvitationTool.showExportHelp()' style='padding-bottom:2px;color:#8A5502;padding-left: 10px;'><img src='".APP_PATH_IMAGES."arrow_up_sm_orange.gif' style='position:relative;top:-2px;margin-right:5px;'>{$lang['asi_001']}</a>
                                            <a class='dropdown-item fs12 ".($exportButtonDisabled ? "opacity35" : "")."' href='javascript:;' onclick='".($exportButtonDisabled ? "" : "AutomatedSurveyInvitationTool.export()")."' style='padding-bottom:2px;padding-left: 10px;'><img src='".APP_PATH_IMAGES."arrow_down_sm.png' style='position:relative;top:-2px;margin-right:5px;'>{$lang['asi_002']}</a>
                                            <a class='dropdown-item fs12 ".(($hasAutoInvitesDefined && Records::getRecordCount(PROJECT_ID) > 0) ? "" : "opacity35")."' href='javascript:;' onclick='dialogReevalAutoInvites();' style='padding-bottom:2px;padding-left: 10px;'><i class=\"fas fa-redo\"></i> {$lang['asi_052']}</a>
                                        </div>
                                    </div>
                                    <button class='nowrap btn btn-defaultrc btn-xs fs11 ms-1 mb-1' style='color:#865200;' onclick=\"showSurveyLoginSetupDialog();\"><i class=\"fas fa-key me-1\" style='color:#ab8900;'></i>{$lang['survey_573']}<img id='survey_login_active' src='".APP_PATH_IMAGES."tick_small_circle.png' style='margin-left:5px;position:relative;top:-1px;$survey_login_active_style'></button> 
                                    <button class='nowrap btn btn-defaultrc btn-xs fs11 ms-1 mb-1' style='color:#000066;padding: 1px 8px 1px;' onclick=\"displayTrigNotifyPopup();\"><i class='fas fa-mail-bulk me-1'></i>{$lang['survey_548']}<img id='survey_notifications_active' src='".APP_PATH_IMAGES."tick_small_circle.png' style='margin-left:5px;$survey_notifications_active_style'></button>
                                    ".(!($twilio_enabled && $Proj->twilio_enabled_surveys) ? '' :
                                        "<button class='nowrap btn btn-defaultrc btn-xs fs11 ms-1 mb-1' onclick=\"dialogTwilioAnalyzeSurveys();\"><img src='".APP_PATH_IMAGES."security-high.png'> ".($Proj->messaging_provider == Messaging::PROVIDER_TWILIO ? $lang['survey_869'] : $lang['survey_1532'])."</button>"
                                    )."
                                </div>
                                ")."
                                
                                ".(!$mycap_access ? '' : "
                                <!-- MyCap Options -->
                                <div class='float-start wrap' style='max-width:500px;padding:8px 5px 0px 10px;color:#444;'>
                                    <div class='boldish mb-1''>{$lang['mycap_mobile_app_451']}</div>
                                    <button class='nowrap btn btn-xs btn-primaryrc fs12 ms-1 mb-1' onclick=\"window.location.href=app_path_webroot+'MyCapMobileApp/index.php?about=1&pid='+pid;\"><i class=\"fa-solid fa-mobile-screen-button fs15\" style='position:relative;top:1px;'></i> {$lang['mycap_mobile_app_623']}</button>
                                    <button class='nowrap btn btn-xs btn-defaultrc fs11 ms-1 mb-1' onclick=\"displayTasksListing();\" ".($total == 0 ? "disabled" : "")."><i class=\"fas fa-magnifying-glass fs12\"></i> {$lang['mycap_mobile_app_536']}</button>
                                    <button class='nowrap btn btn-xs btn-defaultrc fs11 ms-1 mb-1' id='display-baselinedate-settings'><i class=\"fa-solid fa-calendar-day\"></i> {$lang['mycap_mobile_app_453']}".RCView::img(array('src' => APP_PATH_IMAGES . $baseline_date_img, 'style'=>'margin-left:5px;position:relative;top:-1px;'))."</button>
                                    ".((empty($taskErrors) && empty($taskNonFixableErrors)) ? '' :
                                        "<button class='nowrap btn btn-xs btn-defaultrc fs11 ms-1 mb-1' onclick=\"showMyCapIssues('');\"><i class=\"fa fa-warning\"></i> ".$lang['mycap_mobile_app_731']."</button>"
                                    )."
                                </div>
                                ")."
                                
                            </div>
                        </div>";
	// append error messages for MyCap if instrument having any issues
	print $errorDivs;

	renderGrid("forms_surveys", $instTableTitle, $instTableWidth, 'auto', $col_widths_headers, $row_data, true, false);

    $baselineDateFieldForm = ZeroDateTask::getBaselineDateForm();

	$formListDownloadedFromLibrary = $Proj->getFormListDownloadFromLibrary();
	$formListDownloadedFromLibraryCSV = implode(",", $formListDownloadedFromLibrary);

	// Instrument action button/drop-down options (initially hidden)
	print 	RCView::div(array('id'=>'formActionDropdownDiv', 'style'=>'display:none;position:absolute;z-index:1000;'),
				RCView::ul(array('id'=>'formActionDropdown'),
					// Rename instrument
					(!($status == 0 || ($status > 0 && $draft_mode == '1')) ? '' :
						RCView::li(array(),
							RCView::a(array('href'=>'javascript:;', 'style'=>'line-height:14px;color:#006060;font-size:11px;', 'onclick'=>"setupRenameForm($('#ActionCurrentForm').val());"),
								RCView::img(array('src'=>'redo.png', 'style'=>'vertical-align:middle;')) .
								RCView::span(array('style'=>'vertical-align:middle;'), $lang['design_241'])
							)
						)
					) .
					// Copy instrument
					(!($status == 0 || ($status > 0 && $draft_mode == '1')) ? '' :
						RCView::li(array(),
							RCView::a(array('href'=>'javascript:;', 'style'=>'line-height:14px;font-size:11px;', 'onclick'=>"if($('#ActionCurrentFormNumFields').val()=='0'){simpleDialog('".RCView::tt_js('design_1046')."');}else{ copyForm($('#ActionCurrentForm').val()); }"),
								RCView::img(array('src'=>'copy_small.gif', 'style'=>'vertical-align:middle;')) .
								RCView::span(array('style'=>'vertical-align:middle;'), $lang['report_builder_46'])
							)
						)
					) .
					// Delete instrument
					(!($status == 0 || ($status > 0 && $draft_mode == '1')) ? '' :
						RCView::li(array(),
							RCView::a(array('href'=>'javascript:;', 'style'=>'line-height:14px;color:#800000;font-size:11px;', 'onclick'=>"deleteForm($('#ActionCurrentForm').val(), '".$baselineDateFieldForm."');"),
								RCView::img(array('src'=>'cross_small2.png', 'style'=>'vertical-align:middle;')) .
								RCView::span(array('style'=>'vertical-align:middle;'), $lang['design_242'])
							)
						)
					) .
					// Download instrument ZIP
					RCView::li(array(),
						RCView::a(array('href'=>'javascript:;', 'style'=>'line-height:14px;color:#333;font-size:11px;', 'onclick'=>"downloadInstrumentZip($('#ActionCurrentForm').val(),false,'$formListDownloadedFromLibraryCSV');"),
							RCView::img(array('src'=>'arrow_down_sm_orange.gif', 'style'=>'vertical-align:middle;')) .
							RCView::span(array('style'=>'vertical-align:middle;color:#A86700;'), $lang['design_555'])
						)
					) .
					// Download instrument ZIP
					(!($status > 0 && $draft_mode == '1') ? '' :
						RCView::li(array(),
							RCView::a(array('href'=>'javascript:;', 'style'=>'line-height:14px;color:#333;font-size:11px;', 'onclick'=>"downloadInstrumentZip($('#ActionCurrentForm').val(),true,'$formListDownloadedFromLibraryCSV');"),
								RCView::img(array('src'=>'arrow_down_sm_orange.gif', 'style'=>'vertical-align:middle;')) .
								RCView::span(array('style'=>'vertical-align:middle;color:#A86700;'), $lang['design_555'] . " " . $lang['design_122'])
							)
						)
					)
				)
			) .
			// Hidden input to temporarily store the current form selected when clicking the Choose Action drop-down
			RCView::hidden(array('id'=>'ActionCurrentForm', 'value'=>'')) .
			RCView::hidden(array('id'=>'ActionCurrentFormNumFields', 'value'=>''));

	// Invisible div used for Deleting a form dialog
	print 	RCView::div(array('id'=>'delete_form_dialog', 'class'=>'simpleDialog', 'title'=>$lang['design_44']),
				"{$lang['design_42']} \"<b id='del_dialog_form_name'></b>\" {$lang['design_43']}"
			);

	// Invisible div used for dialog for re-evaling ASIs
	print 	RCView::div(array('id'=>'reeval_asi_dlg', 'class'=>'simpleDialog', 'title'=>$lang['asi_023']), '');

	// Invisible div used for explaing what Instrument ZIP files are
	print 	RCView::div(array('id'=>'instrument_zip_explain_dialog', 'class'=>'simpleDialog', 'title'=>$lang['design_542']),
				$lang['design_543'] . " " .
				RCView::span(array('style'=>'color:#800000;'), $lang['design_553']) .
				RCView::div(array('style'=>'margin:10px 0;'),
					$lang['design_549'] . " " . RCView::b($lang['design_550'])
				) .
				RCView::div(array('id'=>'external_instrument_list', 'loaded_list'=>'0', 'style'=>'padding:10px;background-color:#f5f5f5;border:1px solid #ddd;margin:15px 0 10px;'),
					RCView::img(array('src'=>'progress_circle.gif')) .
					RCView::span(array('style'=>'color:#666;margin-left:2px;'), $lang['design_544'])
				)
			);

	// AUTOMATED INVITATIONS: Hidden div containing list of events for user to choose from when setting up Automated Invitations (longitudinal or repeating instruments only)
    // Display hidden div
    print 	RCView::div(array('id'=>'choose_event_div'),
                RCView::div(array('id'=>'choose_event_div_sub'),
                    RCView::div(array('style'=>'float:left;color:#B00000;width:260px;min-width:260px;font-weight:bold;font-size:13px;padding:6px 3px 5px;margin-bottom:3px;border-bottom:1px solid #ccc;'),
                        $lang['survey_342'] .
                        RCView::div(array('style'=>'padding:3px 0;color:#555;font-size:12px;font-weight:normal;'),
                            $lang['design_1025']
                        )
                    ) .
                    RCView::div(array('style'=>'float:right;width:20px;padding:3px 0 0 3px;'),
                        RCView::a(array('onclick'=>"$('#choose_event_div').fadeOut('fast');",'href'=>'javascript:;'),
                            RCView::img(array('src'=>'delete_box.gif'))
                        )
                    ) .
                    RCView::div(array('class'=>'clear'), '') .
                    RCView::div(array('id'=>'choose_event_div_loading','style'=>'padding:8px 3px;color:#555;'),
                        RCView::img(array('src'=>'progress_circle.gif')) . RCView::SP .
                        $lang['data_entry_64']
                    ) .
                    RCView::div(array('id'=>'choose_event_div_list','style'=>'padding:3px 6px;display:none;'), "")
                )
            );
	Survey::renderCheckComposeForSurveyLink();
}










// If production project is not in draft mode yet, prevent this page from being accessed
elseif (isset($_GET['page']) && $_GET['page'] != "" && $status > 0 && $draft_mode != '1')
{
    // Display nothing
}


/**
 * FORM WAS SELECTED - SHOW FIELDS
 */
elseif (isset($_GET['page']) && $_GET['page'] != "")
{
    // Enable an auto-appearing button to allow users to scroll to top of page
    outputButtonScrollToTop();

	// Instructions
	print  "<p style='margin:15px 0 0;max-width: 800px;'>
				{$lang['design_45']} <span style='color:#800000;'>{$lang['design_309']}</span>
				{$lang['design_47']} <img src='".APP_PATH_IMAGES."pencil.png' style='vertical-align:middle;'>
				{$lang['design_48']} <img src='".APP_PATH_IMAGES."cross.png' style='vertical-align:middle;'>
				{$lang['design_49']}
				" . (($status < 1) ? "{$lang['global_02']}{$lang['colon']} {$lang['design_27']}{$lang['period']}" : "") . "
			</p>";

	// Show "previous page" link if editing a form
	print "<div class='clearfix' style='margin:20px 0 15px;padding-top:20px;max-width:800px;border-top:1px solid #ddd;'>";
	print "<div class='float-start'><button class='btn btn-xs btn-primaryrc fs13' onclick=\"window.location.href=app_path_webroot+page+'?pid='+pid;\"><i class='fas fa-chevron-circle-left'></i> {$lang['design_618']}</button></div>";

	// If coming from the Codebook, then give button to return
	if (isset($_GET['field']))
	{
		print "<div class='float-start' style='margin-left:10px;'><button class='btn btn-xs btn-defaultrc fs13' onclick=\"window.location.href=app_path_webroot+'Design/data_dictionary_codebook.php?pid='+pid;\"><i class='fas fa-book fs12'></i> {$lang['design_617']}</button></div>";
	}
	
	// If instrument is enabled as a survey, then add button to go to Survey Settings page
	if ($surveys_enabled && isset($Proj->forms[$_GET['page']]['survey_id'])) 
	{
		print "<div class='float-start' style='margin-left:10px;'><button class='btn btn-xs btn-defaultrc fs13' onclick=\"window.location.href=app_path_webroot+'Surveys/edit_info.php?pid='+pid+'&view=showform&page={$_GET['page']}';\"><img src='".APP_PATH_IMAGES."blog_arrow.png' style='vertical-align:middle;position:relative;top:-1px;'> {$lang['survey_314']}</button></div>";
	}

    // If instrument is enabled for mycap, then add button to go to MyCap Settings page
	if ($mycap_enabled && $mycap_enabled_global && isset($myCapProj->tasks[$_GET['page']]['enabled_for_mycap']))
    {
        print "<div class='float-start' style='margin-left:10px;'><button class='btn btn-xs btn-defaultrc fs13' onclick=\"window.location.href=app_path_webroot+'MyCap/edit_task.php?pid='+pid+'&view=showform&page={$_GET['page']}';\"><img src='".APP_PATH_IMAGES."blog_arrow.png' style='vertical-align:middle;position:relative;top:-1px;'> {$lang['mycap_mobile_app_314']}</button></div>";
    }

	// Display Prev/Next Instrument buttons
	$inDraftMode = ($Proj->project['status'] && $Proj->project['draft_mode']);
	$prevForm = $Proj->getPrevForm($_GET['page'], $inDraftMode);
	$nextForm = $Proj->getNextForm($_GET['page'], $inDraftMode);
	if ($nextForm) {
		print "<div class='float-end' style='margin-left:10px;'><button style='text-decoration:none;' class='btn btn-xs btn-link fs13' onclick=\"window.location.href=app_path_webroot+page+'?pid='+pid+'&page=$nextForm';\">{$lang['design_954']} <i class='fas fa-angle-double-right'></i></button></div>";
	}
	if ($prevForm) {
		print "<div class='float-end' style='margin-left:10px;'><button style='text-decoration:none;' class='btn btn-xs btn-link fs13' onclick=\"window.location.href=app_path_webroot+page+'?pid='+pid+'&page=$prevForm';\"><i class='fas fa-angle-double-left'></i> {$lang['design_953']}</button></div>";
	}
	
	print "</div>";

	?>
	<!-- Hidden pop-up div to display tooltip when mistakenly trying to drag a matrix field (which should not occur) -->
	<div id='tooltipMoveMatrix' class='tooltip1' style='max-width:250px;padding:0px 6px 3px;z-index:9999;'>
		<div style="float:left;font-weight:bold;padding:10px 0 4px;vertical-align:bottom;font-size:13px;">
			<img src="<?php echo APP_PATH_IMAGES ?>exclamation_frame.png" style="vertical-align:bottom;">
			<?php echo $lang['design_431'] ?>
		</div>
		<div style="float:right;"><a href="javascript:;" onclick="$('#tooltipMoveMatrix').hide();" style="text-decoration:underline;font-size:10px;">[Close]</a></div>
		<div style='clear:both;'><?php echo $lang['design_323'] ?></div>
		<div style='padding-top:8px;'><?php echo $lang['design_354'] ?></div>
	</div>
	<!-- Hidden pop-up div to display tooltip when mistakenly trying to drag the PK field (which should not occur) -->
	<div id='tooltipMovePk' class='tooltip1' style='max-width:250px;padding:0px 6px 10px;z-index:9999;'>
		<div style="float:left;font-weight:bold;padding:10px 0 4px;vertical-align:bottom;font-size:13px;">
			<img src="<?php echo APP_PATH_IMAGES ?>exclamation_frame.png" style="vertical-align:bottom;">
			<?php echo $lang['design_431'] ?>
		</div>
		<div style="float:right;"><a href="javascript:;" onclick="$('#tooltipMovePk').hide();" style="text-decoration:underline;font-size:10px;">[Close]</a></div>
		<div style='clear:both;'><?php echo $lang['design_430'] ?></div>
	</div>
	<?php
	// Hidden pop-up div to display tooltip when using multi field select -->
    $tooltipMultiFieldSelect = '
            <div class="my-2"><button class="btn btn-xs btn-defaultrc fs13" onclick="copyFieldMulti();"><img src="'.APP_PATH_IMAGES.'page_copy.png"> '.$lang['design_830'].'</button></div>
            <div class="my-2"><button class="btn btn-xs btn-defaultrc fs13" onclick="moveFieldMulti()"><img src="'.APP_PATH_IMAGES.'file_move.png"> '.$lang['design_825'].'</button></div>
            <div class="my-2"><button class="btn btn-xs btn-defaultrc fs13" onclick="deleteFieldMulti()"><img src="'.APP_PATH_IMAGES.'cross.png"> '.$lang['design_826'].'</button></div>
        ';

    $baseline_date_field = ZeroDateTask::getBaselineDateField();

	// Render javascript putting all form names in an array to prevent users from creating form+"_complete" field name, which is illegal
	print  "<script type='text/javascript'>
            var mfspc = '".js_escape($tooltipMultiFieldSelect)."';
			var allForms = new Array('" . implode("','", array_keys($Proj->forms)) . "');
			var baseline_date_field = '".js_escape($baseline_date_field)."';
			</script>";

	//Get descriptive form name of selected form
	if (isset($_GET['newform'])) {
		$this_form_menu_description = filter_tags($_GET['newform']);
		$editFormMenu = "<div style='color:#800000;font-size:10px;font-family:tahoma;'>
							({$lang['global_02']}: {$lang['design_51']})
						 </div>";
	} else {
		$sql = "select form_menu_description from $metadata_table where project_id = $project_id and form_name = '{$_GET['page']}' "
			 . "and form_menu_description is not null limit 1";
		$this_form_menu_description = filter_tags(db_result(db_query($sql), 0));
		if ($this_form_menu_description == "") $this_form_menu_description = "[{$lang['global_01']}{$lang['colon']} {$lang['design_52']}]";
		$editFormMenu = "";
	}


	print  "<div style='padding:20px 0 10px 0;max-width:800px;'>
			<table cellspacing=0 width=100%>
			<tr>
				<td valign='top'>
					<span style='color:#666;font-size:14px;'>{$lang['design_54']} </span>
					<span id='form_menu_description_label' class='notranslate'
						style='display:;color:#800000;font-size:16px;font-weight:bold;'>$this_form_menu_description</span>
					$editFormMenu
				</td>";
	// Show buttons to preview instrument/survey (but not if instrument does not exist yet)
	if (!isset($_GET['newform']))
	{
		print  "<td valign='top' style='text-align:right;'>
					<button class='btn btn-xs btn-light fs13' id='showpreview1' href='javascript:;' onclick='previewInstrument(1)'>{$lang['design_55']}</button>
					<button class='btn btn-xs btn-light' style='font-size:13px;display:none;' id='showpreview0' href='javascript:;' onclick='previewInstrument(0)'>{$lang['design_56']}</button>
				</td>";
	}
	print  "</tr>";

    $myCapEnabled = $Proj->project['mycap_enabled'];
	if ($myCapEnabled) {
	    if (isset($myCapProj->tasks[$_GET['page']])) {
            print '<input name="is_form_enabled_for_mycap" id="is_form_enabled_for_mycap" type="hidden" value="1">';
        }
        loadJS('MyCapProject.js');
        if (isset($myCapProj->tasks[$_GET['page']]) && $myCapProj->tasks[$_GET['page']]['is_active_task'] == true) {
            print  "<tr id='blcalc-warn'>
                        <td valign='top' colspan='2' class='yellow' style=''>
                            {$lang['mycap_mobile_app_184']}
                        </td>
                    </tr>";
        }

        if (isset($myCapProj->tasks[$_GET['page']])) {
            $taskNonFixableErrors = Task::getMyCapTaskNonFixableErrors($_GET['page']);
            $myCapNonFixableErrText = '';
            if (!empty($taskNonFixableErrors)) {
                foreach ($taskNonFixableErrors as $error) {
                    $myCapNonFixableErrText .= $error;
                }
            }
            if ($myCapNonFixableErrText != '') {
                print  "<tr id='blcalc-warn'>
                            <td colspan='2' valign='top' class='red'>
                                <i class='fa fa-circle-exclamation' style='color: red;'></i> <b>".$lang['global_109']."</b> {$myCapNonFixableErrText} 
                            </td>
                        </tr>";
            }

            $taskErrors = Task::getMyCapTaskErrors($_GET['page']);
            $data['count'] = count($taskErrors);
            $myCapErrText = '';
            if (!empty($taskErrors)) {
                $myCapErrText = '<p>'.$lang['mycap_mobile_app_589'].'</p>';
                $myCapErrText .= '<ul>';
                foreach ($taskErrors as $error) {
                    $myCapErrText .= '<li style="padding-top: 5px;">' . $error . '</li>';
                }
                $myCapErrText .= '</ul>';
            }
            if ($myCapErrText != '') {
                $fixButton = '<button class="btn btn-success btn-xs fs13 my-2" onclick="fixMyCapIssues(\''.$_GET['page'].'\'); return false;" style="margin-left: 20px;"><span>Fix Issues</span></button>';
                print  "<tr id='blcalc-warn'>
                            <td valign='top' class='yellow' style='border-right: 0px;'>
                                {$myCapErrText} 
                            </td>
                            <td valign='bottom' align='left' class='yellow' style='border-left: 0px;'>
                                {$fixButton}
                            </td>
                        </tr>";
            }
        }
    }

    print  "<tr id='blcalc-warn' style='display:none;'>
			<td valign='top' colspan='2' class='yellow' style=''>
				{$lang['design_246']}
			</td>
		</tr>
		</table>
		</div>";

	?>
	<style type="text/css">
	.labelrc, .labelmatrix, .data, .data_matrix {
		border:0; background:#f3f3f3;
	}
	.data  { max-width:400px; width:340px; }
	.header{ border:0; }
    .popover { z-index:100;}
    .frmedit_tbl td { z-index:10;}
    #online-designer-hint-card { z-index:1;}
    .ui-menu.ui-autocomplete.ui-front { z-index:103;}
	</style>
	<?php
	loadJS('DataEntrySurveyCommon.js');

	// Render the table of fields
	print  "<div id='draggablecontainer_parent'>";
	include APP_PATH_DOCROOT . "Design/online_designer_render_fields.php";
	print  "</div>";
	
	// Get recod list options to display in branching logic popup and when testing calc field equations
	$recordListOptions = Records::getRecordsAsOptions(PROJECT_ID, 200);

	/**
	 * ADD/EDIT MATRIX OF FIELDS POP-UP
	 */
	// For single survey or survey+forms project, see if custom question numbering is enabled for this survey
	$matrixQuesNumHdr = "";
	$matrixQuesNumRow = "";
	if (($surveys_enabled) && isset($Proj->forms[$_GET['page']]['survey_id'])
		&& !$Proj->surveys[$Proj->forms[$_GET['page']]['survey_id']]['question_auto_numbering'])
	{
		$matrixQuesNumHdr = "<td valign='bottom' class='addFieldMatrixRowQuesNum'>
								{$lang['design_342']}
								<div style='color:#888;font-size:10px;font-weight:normal;font-family:tahoma;'>{$lang['survey_251']}</div>
							</td>";
		$matrixQuesNumRow = "<td class='addFieldMatrixRowQuesNum'>
								<input type='text' class='x-form-text x-form-field field_quesnum_matrix' style='width:35px;' maxlength='10'>
							</td>";
	}
	// Iframe for catching post data when adding Matrix fields
	print  "<iframe id='addMatrixFrame' name='addMatrixFrame' src='".APP_PATH_WEBROOT."DataEntry/empty.php' style='width:0;height:0;border:0px solid #fff;'></iframe>";
	//
	$matrixSHnote = '';
	if (isset($Proj->forms[$_GET['page']]['survey_id']) && $Proj->surveys[$Proj->forms[$_GET['page']]['survey_id']]['question_by_section']) {
		$matrixSHnote = RCView::span(array('style'=>'font-size:11px;margin-left:20px;font-weight:normal;color:#000066;'), $lang['design_455']);
	}
    // Show auto-variable naming feature?
    $auto_variable_naming_displayed = ($allow_auto_variable_naming == '1' || ($allow_auto_variable_naming == '2' && UserRights::isSuperUserNotImpersonator()));
    if ($auto_variable_naming && !$auto_variable_naming_displayed) $auto_variable_naming = false; // If enabled in the project, then the system-level setting can override it, regardless.
    $auto_variable_naming_checked = ($auto_variable_naming && $auto_variable_naming_displayed);
	// Hidden div for adding/editing Matrix fields dialog
	print  "<div id='addMatrixPopup' title='".js_escape($lang['design_307'])."' style='display:none;background-color:#f5f5f5;'>
				<div style='margin:10px 0 15px;'>
					{$lang['design_310']}
					<a href='javascript:;' style='text-decoration:underline;' onclick=\"showMatrixExamplePopup();\">{$lang['design_355']}</a> {$lang['global_47']}
					<a href='javascript:;' style='text-decoration:underline;' onclick=\"helpPopup('3','category_12_question_5_tab_3');\">{$lang['design_358']}</a>
				</div>
				<div style='background:#FFFFE0;border: 1px solid #d3d3d3;padding:5px 8px 8px; margin-top: 10px;'>
					<!-- Section Header -->
					<div class='addFieldMatrixRowHdr' style='margin-bottom:6px;'>{$lang['design_454']}{$matrixSHnote}</div>
					<textarea id='section_header_matrix' name='section_header_matrix' class='x-form-textarea x-form-field' style='height:50px;width:95%;position:relative;'></textarea>
					<div id='section_header_matrix-expand' class='expandLinkParent'>
						<a href='javascript:;' class='expandLink' style='margin-right: 35px;' onclick=\"growTextarea('section_header_matrix')\">{$lang['form_renderer_19']}</a>&nbsp;
					</div>
				</div>
				<div style='border: 1px solid #d3d3d3; background-color: #eee; padding:5px 8px 8px; margin-top: 10px;'>
					<!-- Headers -->
					<div>
						<div class='addFieldMatrixRowHdr' style='float:left;margin:0;'>
							{$lang['design_316']}
						</div>
						<div style='float:right;padding-right:2px;".($auto_variable_naming_displayed ? "" : "display:none;")."'>
							<span id='auto_variable_naming_matrix_saved' style='visibility:hidden;text-align:center;font-size:9px;color:red;font-weight:bold;'>{$lang['design_243']}</span>
							<input type='checkbox' id='auto_variable_naming_matrix' " . ($auto_variable_naming_checked ? "checked" : "") . ">
							<span style='line-height:11px;color:#800000;font-family:tahoma;font-size:10px;font-weight:normal;' class='opacity75'>{$lang['design_267']}</span>
						</div>
						<div class='clear'></div>
						<div style='color:#777;font-size:11px;font-weight:normal;'>{$lang['design_341']}</div>
						<table cellspacing=0 style='width:100%;table-layout:fixed;'>
							<tr>
								<td valign='bottom' class='addFieldMatrixRowDrag'>&nbsp;</td>
								<td valign='bottom'  class='addFieldMatrixRowLabel'>{$lang['global_40']}</td>
								<td valign='bottom'  class='addFieldMatrixRowVar'>
									{$lang['global_44']}
									<div style='color:#888;font-size:10px;line-height:10px;font-weight:normal;font-family:tahoma;'>{$lang['design_80']}</div>
								</td>
								$matrixQuesNumHdr
								<td valign='bottom' class='addFieldMatrixRowFieldReq nowrap'>{$lang['design_98']}</td>
								<td valign='bottom' class='addFieldMatrixRowFieldAnnotation nowrap'>
									{$lang['design_527']}<a href='javascript:;' class='help' style='font-size:10px;margin-left:3px;' onclick=\"simpleDialog(null,null,'fieldAnnotationExplainPopup',550);\">?</a>
								</td>
								<td valign='bottom' class='addFieldMatrixRowDel'></td>
							</tr>
						</table>
					</div>

					<!-- Row with Label/Variable inputs -->
					<table class='addFieldMatrixRowParent' cellspacing=0 style='width:100%;table-layout:fixed;'>
						<tr class='addFieldMatrixRow'>
							<td class='addFieldMatrixRowDrag dragHandle'></td>
							<td class='addFieldMatrixRowLabel'>
								<input class='x-form-text x-form-field field_labelmatrix' autocomplete='new-password' onkeydown='if(event.keyCode==13) return false;'>
							</td>
							<td class='addFieldMatrixRowVar'>
								<input class='x-form-text x-form-field field_name_matrix' autocomplete='new-password' maxlength='100' onkeydown='if(event.keyCode==13) return false;'>
							</td>
							$matrixQuesNumRow
							<td class='addFieldMatrixRowFieldReq'>
								<input type='checkbox' class='field_req_matrix'>
							</td>
							<td class='addFieldMatrixRowFieldAnnotation'>
								<textarea class='x-form-textarea x-form-field field_annotation_matrix' style='font-size:11px; line-height: 13px;height:22px;width:97%;' onclick=\"$(this).css('height','36px');\" onfocus=\"$(this).css('height','36px');\"></textarea>
							</td>
							<td class='addFieldMatrixRowDel'>
								<a href='javascript:;' style='text-decoration:underline;font-size:10px;font-family:tahoma;' onclick='delMatrixRow(this)'><img src='".APP_PATH_IMAGES."cross.png' style='vertical-align:middle;' title='Delete Field'></a>
							</td>
						</tr>
					</table>

					<div style='padding:5px 0 0 30px;'>
						<button id='addMoreMatrixFields' style='font-size:11px;' onclick='return false;'>{$lang['design_314']}</button>
					</div>
				</div>
				<div>
					<!-- Choices --> 
					<div style='background-color: #eee; float:left;width:350px;border: 1px solid #d3d3d3; padding:5px 8px 8px; margin:10px 10px 0 0;'>
						<div class='addFieldMatrixRowHdr'>{$lang['design_317']}</div>
						<div style='font-weight:bold;'>
							{$lang['design_71']} <a href='javascript:;' style='font-weight:normal;margin-left:30px;font-size:11px;color:#3E72A8;text-decoration:underline;' onclick='existingChoices(1);'>{$lang['design_522']}</a>
						</div>
						<textarea class='x-form-textarea x-form-field' style='height:120px;width:100%;position:relative;' id='element_enum_matrix'
							name='element_enum_matrix'/></textarea>
						<div class='manualcode-label' style='padding-right:25px;'>
							<a href='javascript:;' style='color:#277ABE;font-size:11px;' onclick=\"
								$('#div_manual_code_matrix').toggle();
							\">{$lang['design_72']}</a>
						</div>
						<div id='div_manual_code_matrix' style='border:1px solid #ddd;font-size:11px;padding:5px 15px 5px 5px;display:none;'>
							{$lang['design_73']} {$lang['design_296']} ".RCView::tt_i('design_1092',['<br>'])."
							<div style='color:#800000;'>
								0, {$lang['design_311']}<br>
								1, {$lang['design_312']}<br>
								2, {$lang['design_313']}
							</div>
						</div>
					</div>
					<!-- Matrix Info -->
					<div style='background-color: #eee; float:left;font-weight:bold;border: 1px solid #d3d3d3; padding:5px 15px 8px 8px; margin-top: 10px;'>
						<div class='addFieldMatrixRowHdr''>{$lang['design_318']}</div>
						<!-- Answer Format -->
						<div>
							<div>{$lang['design_340']}</div>
							<select id='field_type_matrix' class='x-form-text x-form-field'
								style='' onchange='matrix_rank_disable();'>
								<option value='radio'>{$lang['design_319']}</option>
								<option value='checkbox'>{$lang['design_339']}</option>
							</select>
						</div>
						<!-- Ranking -->
						<div id='ranking_option_div' style='margin:15px 0 0;'>
							<div style='margin-left:5px;'>{$lang['design_495']}<a href='javascript:;' class='mtxrankDesc' style='margin-left:50px;'>{$lang['design_496']}</a></div>
							<table width=100%>
								<tr>
									<td><input type='checkbox' id='field_rank_matrix'></td>
									<td style='padding-left: 4px;'><span style='margin-right:5px;font-size:11px;font-weight:normal;'>{$lang['design_497']}</span></td>
								</tr>
							</table>
						</div>
						<!-- Matrix group name -->
						<div style='margin:15px 0 0;'>
							<div>{$lang['design_300']} <span style='margin-left:10px;color:#777;font-size:11px;font-weight:normal;'>{$lang['design_80']}</span></div>
							<input type='text' class='x-form-text x-form-field' style='width:160px;' maxlength='60' id='grid_name'>
							<a href='javascript:;' class='mtxgrpHelp'>{$lang['design_303']}</a>
						</div>
					</div>
					<!-- Hidden fields -->
					<input type='hidden' id='old_grid_name' value=''>
					<input type='hidden' id='old_matrix_field_names' value=''>
					<div class='clear'></div>
				</div>
			</div>";

	/**
	 * ADD/EDIT FIELD POP-UP
	 */
	// Iframe for catching post data when adding/editing fields
	print  "<iframe id='addFieldFrame' name='addFieldFrame' src='".APP_PATH_WEBROOT."DataEntry/empty.php' style='width:0;height:0;border:0px solid #fff;'></iframe>";
	// Hidden div for adding/editing fields dialog
	print  "<div id='div_add_field' title='".js_escape($lang['design_57'])."' style='display:none;background-color:#f5f5f5;'>
			<div id='div_add_field2'>
				<form enctype='multipart/form-data' target='addFieldFrame' method='post' action='".APP_PATH_WEBROOT."Design/edit_field.php?pid=$project_id&page={$_GET['page']}' name='addFieldForm' id='addFieldForm'>
					<input type='hidden' id='wasSectionHeader' name='wasSectionHeader' value='0'>
					<input type='hidden' id='isSignatureField' name='isSignatureField' value='0'>
					<p style='max-width:100%;'>
						{$lang['design_58']}
						<i class=\"fas fa-film\"></i>
						<a onclick=\"popupvid('field_types02.mp4','REDCap Project Field Types');\" href=\"javascript:;\" style=\"font-size:13px;text-decoration:underline;font-weight:normal;\">{$lang['design_59']}</a>.
					</p>
					<div id='add_field_settings' style='padding-top:5px;'>
						<div style='display:flex;justify-content:space-between;align-items: center;'>
							<div>
								<b class='fs14'>{$lang['design_61']}</b>&nbsp;
								<select name='field_type' id='field_type' onchange='selectQuesType()' class='x-form-text x-form-field fs14' style='max-width:100%;'>
									<option value=''> ---- {$lang['design_60']} ---- </option>
									<option value='text'>{$lang['design_634']}</option>
									<option value='textarea'>{$lang['design_63']}</option>
									<option value='calc'>{$lang['design_64']}</option>
									<option value='select'>{$lang['design_66']}</option>
									<option value='radio' grid='0'>{$lang['design_65']}</option>
									<option value='checkbox' grid='0'>{$lang['design_67']}</option>
									<option value='yesno'>{$lang['design_184']}</option>
									<option value='truefalse'>{$lang['design_185']}</option>
									<option value='file' sign='1'>{$lang['form_renderer_32']}</option>
									<option value='file' sign='0'>{$lang['design_68']}</option>
									<option value='slider'>{$lang['design_181']}</option>
									<option value='descriptive'>".($enable_field_attachment_video_url ? $lang['design_597'] : $lang['design_596'])."</option>
									<option value='section_header'>{$lang['design_69']}</option>
								</select>
							</div>
							<div>
								<span class='nowrap'><i class=\"fas fa-book fs12\" style='text-indent:0;'></i>&nbsp;<a href='".APP_PATH_WEBROOT."Design/data_dictionary_codebook.php?pid=$project_id' target='_blank' title='".RCView::tt_attr("design_1049")."'>".RCView::tt("design_482")."</a></span>
							</div>
						</div>
						<div id='quesTextDiv' style='visibility: hidden;' class='quesDivClass'>
							<table>
							<tr>
								<td valign='top' style='width: 65%;'>";
	// For single survey or survey+forms project, see if custom question numbering is enabled for this survey
	if (($surveys_enabled) && isset($Proj->forms[$_GET['page']]['survey_id'])
		&& !$Proj->surveys[$Proj->forms[$_GET['page']]['survey_id']]['question_auto_numbering'])
	{
		// Render text box for question auto numbering
		print  "					<div id='div_question_num' style='padding-top:15px;'>
										<b>{$lang['design_221']}</b>
										<span style='color:#505050;font-size:11px;'>{$lang['global_06']}</span>&nbsp;
										<input type='text' class='x-form-text x-form-field' style='width:60px;' maxlength='10' id='question_num' name='question_num'>
										<div style='padding-left:2px;color:#808080;font-size:10px;font-family:tahoma;position:relative;top:-6px;'>
											{$lang['design_222']}
										</div>
									</div>";
	}
	print  "						<div style='padding-top:15px;'>
										<div style='font-weight:bold; margin-bottom: 8px; display: inline-block'>{$lang['global_40']}</div>
										<div style='float: right; margin-right: 18px'>
											<label style='margin-right:12px;color:#016301;'>
												<input id='field_label_rich_text_checkbox' type='checkbox' style='vertical-align:-2px' onchange='REDCap.toggleFieldLabelRichText()'>
												{$lang['design_783']}
												<a href='javascript:;' class='help' onclick=\"simpleDialog('".js_escape($lang['design_784'])."','<i class=\'fas fa-paragraph\'></i> ".js_escape($lang['design_783'])."',null,600);\">?</a>
											</label>
										</div>
										<div>
											<textarea class='x-form-textarea x-form-field mceEditor' style='height:200px;width:725px;resize:auto;' id='field_label' name='field_label'/></textarea>
											<script type='text/javascript'>
												REDCap.initTinyMCEFieldLabel(true); // Pre-init TinyMCE so it renders quickly later.
											</script>
										</div>
									</div>

									<div id='slider_labels' style='display:none;margin-top:20px;'>
										<div style='font-weight:bold;margin-bottom:3px;'>{$lang['design_668']}</div>
										<table style='width:100%;max-width:450px;'>
											<tr>
												<td>
													{$lang['design_665']}
												</td>
												<td>
													<input type='text' class='x-form-text x-form-field' style='margin:1px 0;width:120px;' maxlength='200' id='slider_label_left' name='slider_label_left' onkeydown='if(event.keyCode==13){return false;}'>
												</td>
											</tr>
											<tr>
												<td>
													{$lang['design_666']}
												</td>
												<td>
													<input type='text' class='x-form-text x-form-field' style='margin:1px 0;width:120px;' maxlength='200' id='slider_label_middle' name='slider_label_middle' onkeydown='if(event.keyCode==13){return false;}'>
												</td>
											</tr>
											<tr>
												<td>
													{$lang['design_667']}
												</td>
												<td>
													<input type='text' class='x-form-text x-form-field' style='margin:1px 0;width:120px;' maxlength='200' id='slider_label_right' name='slider_label_right' onkeydown='if(event.keyCode==13){return false;}'>
												</td>
											</tr>
											<tr>
												<td style='padding-top:6px;'>
													{$lang['design_941']}
												</td>
												<td style='padding-top:6px;'>
													<input type='checkbox' valign='middle' style='' id='slider_display_value' name='slider_display_value' onkeydown='if(event.keyCode==13){return false;}'>
												</td>
											</tr>
											<tr>
												<td style='padding-top:6px;'>
													{$lang['design_942']}
												</td>
												<td style='padding-top:6px;'>
												    <span class='me-2'>{$lang['design_486']} <input type='text' class='x-form-text x-form-field' style='width:50px;' maxlength='10' id='slider_min' name='slider_min' onkeydown='if(event.keyCode==13){return false;}' onblur=\"redcap_validate(this,'','','hard','integer',1);if(this.value==''){this.value='0';}\"></span>
												    <span>{$lang['design_487']} <input type='text' class='x-form-text x-form-field' style='width:50px;' maxlength='10' id='slider_max' name='slider_max' onkeydown='if(event.keyCode==13){return false;}' onblur=\"redcap_validate(this,'','','hard','integer',1);if(this.value==''){this.value='100';}\"></span>
												</td>
											</tr>
										</table>
									</div>

									<div id='div_pk_field_info' style='display:none;color:#C00000;font-size:11px;line-height:12px;padding:5px 20px 0 5px;'>
										<b>{$lang['global_02']}{$lang['colon']}</b> {$lang['design_434']}
									</div>

									<div id='div_element_yesno_enum' style='display:none;'>
										<div style='padding-top:15px;font-weight:bold;'>{$lang['design_512']}</div>
										<div style='padding: 2px 3px;margin-bottom: -2px;border: 1px solid #B5B8C8;background-color:#ddd;color:#555;height:60px;width:330px;position:relative;'>
											".str_replace(" \\n ", "<br>", YN_ENUM)."
										</div>
									</div>

									<div id='div_element_truefalse_enum' style='display:none;'>
										<div style='padding-top:15px;font-weight:bold;'>{$lang['design_512']}</div>
										<div style='padding: 2px 3px;margin-bottom: -2px;border: 1px solid #B5B8C8;background-color:#ddd;color:#555;height:60px;width:330px;position:relative;'>
											".str_replace(" \\n ", "<br>", TF_ENUM)."
										</div>
									</div>

									<div id='div_element_enum' style='display:none;'>
										<div style='padding-top:15px;font-weight:bold;'>
											<span id='choicebox-label-mc' style='display:none;'>
												{$lang['design_71']} <a href='javascript:;' style='font-weight:normal;margin-left:30px;font-size:11px;color:#3E72A8;text-decoration:underline;' onclick='existingChoices();'>{$lang['design_522']}</a>
											</span>
											<span id='choicebox-label-calc' style='display:none;'>
												{$lang['design_163']} &nbsp;&nbsp;
												<a href='javascript:;' onclick=\"helpPopup('3','category_15_question_7_tab_3');\" style='font-weight:normal;color:#277ABE;font-size:11px;'>{$lang['design_165']}</a>
												<span style='margin-left:25px;color:#808080;font-size:11px;font-weight:normal;'>
												    {$lang['edit_project_186']}
						                            <button class='btn btn-xs btn-primaryrc btn-primaryrc-light' style='position:relative;top:-3px;margin-left:4px;font-size:11px;padding:0px 3px;'  onclick=\"specialFunctionsExplanation();return false;\"><i class='fas fa-square-root-alt' style='margin:0 2px 0 1px;'></i> {$lang['design_839']}</button>
												</span>
											</span>
											<span id='choicebox-label-sql' style='display:none;'>
												{$lang['design_164']}<button class='btn btn-primaryrc btn-xs' onclick='dialogSqlFieldExplain();return false;' style='margin:0 0 1px 20px;font-size:11px;padding:0 3px;'>{$lang['form_renderer_33']}</button>
												<div class='text-secondary fs12 font-weight-normal mt-1 mb-2 ml-2 mr-5' style='line-height:1;'><i class=\"fa-solid fa-circle-info\"></i> ".RCView::tt_i('design_1102',[\Records::getDataTable(PROJECT_ID)])."</div>
											</span>
										</div>
										<div style='width: 725px; height: 110px;'><textarea hasrecordevent='0' class='x-form-textarea x-form-field' name='element_enum' id='element_enum' style='padding:1px;width:100%;height:120px;resize:auto;' onblur='logicHideSearchTip(this);' onfocus=\"if ($('#field_type').val() == 'calc' || $('#field_type').val() == 'sql') openLogicEditor($(this))\" onkeydown=\"if ($('#field_type').val() == 'calc') logicSuggestSearchTip(this, event, false, true, 0);\"></textarea>".logicAdd("element_enum")."</div>
										
										<div id='test-calc-parent' style='display:none;margin-top:20px;'>
											<table style='width:95%;'><tr>
											   <td style='border: 0; font-weight: bold; vertical-align: middle; text-align: left; height: 20px;'><span id='element_enum_Ok' class='logicValidatorOkay'></span></td>
											   <td style='vertical-align: top; text-align: right;'><a id='linkClearAdv' style='font-family:tahoma;font-size:10px;text-decoration:underline;' href='javascript:;' onclick='$(\"#element_enum\").val(\"\");logicValidate($(\"#element_enum\"), false);'>{$lang['design_711']}</a></td>
											</tr></table>
											<script type='text/javascript'>logicValidate($('#element_enum'), false, 0);</script>
											<div style='margin: 0 0 5px; '>
												<span class='logicTesterRecordDropdownLabel'>{$lang['design_704']}</span> 
												<select id='logicTesterRecordDropdown' onchange=\"
												var circle=app_path_images+'progress_circle.gif'; 
												if (this.value != '') { 
													$('#element_enum_res').html('<img src='+circle+'>'); 
												} else { 
													$('#element_enum_res').html(''); 
												} 
												logicCheck($('#element_enum'), 'calc', false, '', this.value, '".js_escape($lang['design_706'])."', '".js_escape($lang['design_707'])."', '".js_escape($lang['design_712'])."', 
													['', '', '".js_escape($lang['design_708'])."']);\">
												<option value=''>{$lang['data_entry_91']}</option>".$recordListOptions."</select><br>
												<span id='element_enum_res' style='color: green; font-weight: bold;'></span>
											</div>
										</div>
										<div style='margin-top:23px;'>
                                            <div id='div_autocomplete' style='display:none;font-weight:bold;margin:0 0 0 2px;'>
                                                <input type='checkbox' id='dropdown_autocomplete' name='dropdown_autocomplete'>
                                                {$lang['design_602']}<a href='javascript:;' class='help' onclick=\"simpleDialog('".js_escape($lang['design_603'])."','".js_escape($lang['design_604'])."');return false;\">?</a>
                                            </div>
                                            <div class='manualcode-label' style='text-align:right;padding-right:25px;'>
                                                <a href='javascript:;' style='color:#277ABE;font-size:11px;' onclick=\"
                                                    $('#div_manual_code').toggle();
                                                \">{$lang['design_72']}</a>
                                            </div>
										</div>
										<div id='div_manual_code' style='border:1px solid #ddd;font-size:11px;padding:5px 15px 5px 5px;display:none;'>
											{$lang['design_73']} {$lang['design_296']} ".RCView::tt_i('design_1092',['<br>'])."
											<div style='color:#800000;'>
												0, {$lang['design_74']}<br>
												1, {$lang['design_75']}<br>
												2, {$lang['design_76']}
											</div>
										</div>
									</div>
									<div id='div_field_annotation' style='width:525px;border: 1px solid #d3d3d3; padding: 6px 8px; margin-top: 20px;'>
										<div>
											<b>{$lang['global_132']}</b> /
											<b>{$lang['design_527']}</b> 
											<span style='color: #505050; font-size: 11px;'>{$lang['global_06']}</span>
										</div>
										<div id='div_parent_field_annotation' style='margin:0 0 1px;'>
											<textarea tabindex='-1' class='x-form-textarea x-form-field' style='width:99%;height:40px;font-size:13px;line-height:15px;background:#F7EBEB;' id='field_annotation' name='field_annotation' onfocus=\"openLogicEditor($(this));\"></textarea>
										</div>
										<div style='margin:5px 0;font-size:11px;color: #808080;'>
											{$lang['design_747']} 
											<button class='btn btn-xs btn-rcred btn-rcred-light' onclick=\"actionTagExplainPopup(0);return false;\" style='line-height: 14px;margin-left:3px;padding:0px 3px 1px;font-size:11px;'>@ {$lang['global_132']}</button>
											<span style='margin:0 1px;'>{$lang['global_47']}</span>
											<a href='javascript:;' style='text-decoration:underline;font-size:11px;' onclick=\"simpleDialog(null,null,'fieldAnnotationExplainPopup',550);\">{$lang['design_673']}</a>
										    <div style='float: right' id='div_mc_slider_help'><i class='far fa-lightbulb'></i> <a href='javascript:;' style='text-decoration:underline;font-size:11px;' onclick=\"simpleDialog(null,null,'myCapSliderActionTagsExplainPopup',550);\">{$lang['mycap_mobile_app_695']}</a></div>
										</div>										
									</div>
								</td><td valign='top' style='width: 35%;'>
								<div id='baseline_date_warning' style='color:red;font-size:11px;display:none;'>{$lang['mycap_mobile_app_484']}</div>
										
									<div id='righthand_fields'>
                                        <div id='div_var_name' style='background-color: #ececec;border: 1px solid #d3d3d3; padding: 4px 4px 2px 8px; margin-top: 20px;'>
											<b>{$lang['global_44']}</b> 
											<span style='margin-left:7px;color: #777;font-size:11px;line-height:16px;'>{$lang['design_761']}</span><br/>
											<table cellspacing=0 width=100%>
												<tr>
													<td valign='top'>
														<input class='x-form-text x-form-field' autocomplete='new-password' maxlength='100' size='25'
															id='field_name' name='field_name'
															onkeydown='if(event.keyCode==13) return false;'
															onfocus='chkVarFldDisabled(this)'><br/>
														<div style='color: #888; font-size: 10px;margin-top:1px;'>{$lang['design_80']}</div>
													</td>
													<td valign='top' style='text-align:right;padding:2px 4px 0px 8px;".($auto_variable_naming_displayed ? "" : "display:none;")."'>
														<input type='checkbox' id='auto_variable_naming' " . ($auto_variable_naming_checked ? "checked" : "") . ">
														<div id='auto_variable_naming_saved' style='padding-top:2px;visibility:hidden;font-weight:bold;text-align:center;font-size:9px;color:red;'>{$lang['design_243']}</div>
													</td>
													<td valign='top' style='line-height:11px;padding:2px 0 0;color:#800000;font-family:tahoma;font-size:10px;".($auto_variable_naming_displayed ? "" : "display:none;")."' class='opacity75'>
														{$lang['design_267']}
													</td>
												</tr>
											</table>
										</div>
										
										<div style='padding:7px 4px 4px;'>
											<span style='color:#808080;font-size:11px;margin-right:6px;'>
												{$lang['design_748']}
											</span>
											<button class='btn btn-xs btn-rcgreen btn-rcgreen-light' style='margin-right:6px;font-size:11px;padding:0px 3px 1px;line-height:14px;'  onclick=\"smartVariableExplainPopup();return false;\">[<i class='fas fa-bolt fa-xs' style='margin:0 1px;'></i>] {$lang['global_146']}</button>
											<button class='btn btn-xs btn-rcpurple btn-rcpurple-light' style='margin-right:6px;font-size:11px;padding:0px 3px 1px;line-height: 14px;' onclick='pipingExplanation();return false;'><img src='".APP_PATH_IMAGES."pipe.png' style='width:12px;position:relative;top:-1px;margin-right:2px;'>{$lang['info_41']}</button>
											<button class='btn btn-xs btn-rcyellow' style='font-size:11px;padding:1px 3px;line-height:14px;'  onclick=\"fieldEmbeddingExplanation();return false;\"><i class='fas fa-arrows-alt' style='margin:0 1px;'></i> {$lang['design_795']}</button>						
					                    </div>

										<div id='div_val_type' style='border: 1px solid #d3d3d3; padding: 4px 8px; margin-top: 5px;'>
											<b>{$lang['design_81']}</b> <span style='color: #505050; font-size: 11px;'>{$lang['global_06']}</span>
											<select onchange=\"try { update_ontology_selection(); }catch(e){ } hide_val_minmax();\" id='val_type' name='val_type' class='x-form-text x-form-field' style='width:235px;max-width:235px;margin-left:8px;'>
												<option value=''> ---- {$lang['design_83']} ---- </option>";
	// Get list of all valid field validation types from table
	$valTypesHidden = array();
	foreach (getValTypes() as $valType=>$valAttr)
	{
		if ($valAttr['visible']) {
			// Only display those listed as "visible"
			print "		<option value='$valType' datatype=\"".js_escape2($valAttr['data_type'])."\">{$valAttr['validation_label']}</option>";
		} else {
			// Add to list of hidden val types
			$valTypesHidden[] = $valType;
		}
	}
	print "									</select>
											<div id='div_val_minmax' style='padding:10px 0 2px 10px;display:none;'>
												<div class='mb-1'>
                                                    <b style='margin-right:8px;'>{$lang['design_96']}</b>
                                                    <input type='text' name='val_min' id='val_min' maxlength='200' size='18'
                                                        onkeydown='if(event.keyCode==13) return false;' class='x-form-text x-form-field' style='font-size:12px;'><br>
												</div>
												<div>
                                                    <b style='margin-right:6px;'>{$lang['design_97']}</b>
                                                    <input type='text' name='val_max' id='val_max' maxlength='200' size='18'
                                                        onkeydown='if(event.keyCode==13) return false;' class='x-form-text x-form-field' style='font-size:12px;'>
                                                </div>
												<div class='fs10' style='margin-top:14px;color:#808080;line-height:1;'>
												    <b><i class=\"far fa-lightbulb\"></i> {$lang['design_998']}</b> {$lang['design_1066']}
                                                </div>	
											</div>
											";
  if (OntologyManager::hasOntologyProviders()){print OntologyManager::buildOntologySelection();}
  print	"									</div>

										<div id='div_attachment' style='display:none;border: 1px solid #d3d3d3; padding: 4px 4px 4px 8px; margin-top: 5px;'>
											".(!$enable_field_attachment_video_url ? "" : "
											<div style='margin:1px 0 8px;color:#B00000;'>
												{$lang['design_1084']}
											</div>
											<div id='div_video_url'>
												<div style='margin-bottom: 2px;'>
													<i class=\"fa-solid fa-file-video fs14\" style='margin-right:1px;'></i>
													<b>{$lang['design_1085']}</b><a href='javascript:;' class='help' title='".js_escape($lang['form_renderer_02'])."' style='font-size:10px;' onclick=\"simpleDialog(null,null,'embed_video_explain',700);\">?</a>
												</div>
												<div style='margin:3px 0 0 22px;'>
													<span onclick=\"
														if ($('#video_url').prop('disabled')) {
															simpleDialog('".js_escape($lang['design_573'])."');
														}
													\"><input type='text' name='video_url' id='video_url' class='x-form-text x-form-field' placeholder='".js_escape($lang['design_1086'])."' style='width:95%;font-size:12px;' onkeydown='if(event.keyCode==13) return false;' onblur=\"
														this.value = trim(this.value);
														if (this.value.length == 0) return;
														// Validate URL as full or relative URL
														if (!isUrl(this.value) && this.value.substr(0,1) != '/' && this.value.indexOf('[') < 0) {
															if (this.value.substr(0,4).toLowerCase() != 'http' && isUrl('http://'+this.value)) {
																// Prepend 'http' to beginning
																this.value = 'http://'+this.value;
															} else {
																// Error msg
																simpleDialog('".js_escape($lang['edit_project_126'])."','".js_escape($lang['global_01'])."',null,null,'$(\'#video_url\').focus();');
															}
														}
													\"></span>
													<div style='margin-top:4px;text-indent:-2em;margin-left:2em;color:#888;font-size:11px;'>
														e.g. https://youtube.com/watch?v=E1cCuWMupz0, http://example.com/movie.mp4, [survey-url:instrument_name], https://redcap.myinstitution.org/surveys/?s=M9HL8L8WWT 
													</div>
													<div style='padding-top:8px;'>
														{$lang['design_1087']}&nbsp;
														<input disabled='disabled' id='video_display_inline1' name='video_display_inline' value='1' type='radio'> {$lang['design_580']}&nbsp;
														<input disabled='disabled' id='video_display_inline0' name='video_display_inline' value='0' checked='checked' type='radio'> {$lang['design_581']}
													</div>
												</div>
											</div>
											<div style='margin:10px 0 10px 6px;color:#777;'>
												&ndash; {$lang['global_47']} &ndash;
											</div>
											")."
											<div style='margin-bottom: 2px;'>
												<i class=\"fa-solid fa-paperclip fs14\" style='margin-right:1px;'></i> <b>{$lang['design_577']}</b>
											</div>
											<div style='margin:0 0 0 22px;'>
												<div id='div_attach_upload_link'>
													<img src='".APP_PATH_IMAGES."add.png'>
													<a href='javascript:;' onclick='openAttachPopup();' style='text-decoration:underline;color:green;'>{$lang['form_renderer_23']}</a>
												</div>
												<div id='div_attach_download_link' style='display:none;padding:3px 0;'>
													<a id='attach_download_link' href='javascript:;' onclick=\"window.open(app_path_webroot+'DataEntry/file_download.php?pid='+pid+'&type=attachment&id='+$('#edoc_id').val()+'&doc_id_hash='+$('#edoc_id_hash').val(),'_blank');\" style='text-decoration:underline;'>filename goes here.doc</a>
													&nbsp;&nbsp;
													<a href='javascript:;' class='nowrap' onclick='deleteAttachment();' style='color:#800000;font-family:tahoma;font-size:10px;'>[X] {$lang['data_entry_369']}</a>
												</div>
												<input type='hidden' id='edoc_id' name='edoc_id' value=''>
												<input type='hidden' id='edoc_id_hash' name='edoc_id_hash' value=''>
												<div id='div_img_display_options' style='padding-top:15px;'>
													{$lang['design_576']}<br>
													<input disabled='disabled' id='edoc_img_display_link' name='edoc_display_img' value='0' checked='checked' type='radio'> {$lang['design_196']}<br>
													<input disabled='disabled' id='edoc_img_display_image' name='edoc_display_img' value='1' type='radio'> {$lang['design_1053']}<br>
													<input disabled='disabled' id='edoc_img_display_audio' name='edoc_display_img' value='2' type='radio'> {$lang['global_122']}
													<div style='margin:1px 0 0 16px;'>
														<img src='".APP_PATH_IMAGES."information_small.png'><a href='javascript:;' 
															style='color:#3E72A8;font-size:11px;text-decoration:underline;' onclick=\"simpleDialog('".js_escape($lang['design_658'])."','".js_escape($lang['design_657'])."');\">{$lang['design_657']}</a>
													</div>
													<div style='font-family: tahoma; font-size: 10px; padding-top: 15px;'>
														{$lang['design_198']}
													</div>
												</div>
											</div>
										</div>

										<div id='div_field_req' style='border: 1px solid #d3d3d3; padding: 2px 8px; margin-top: 5px;'>
											<b>{$lang['design_98']}</b> &nbsp;
											<input type='radio' id='field_req0' name='field_req2'
												onclick=\"document.getElementById('field_req').value='0';\" checked>&nbsp;{$lang['design_99']}&nbsp;
											<input type='radio' id='field_req1' name='field_req2'
												onclick=\"document.getElementById('field_req').value='1';\">&nbsp;{$lang['design_100']}
											<input type='hidden' name='field_req' id='field_req' value='0'>
											<span id='req_disable_text' style='visibility:hidden;padding-left:10px;color:#800000;font-family:tahoma;'>
												{$lang['design_101']}
											</span>
											<div style='color:#808080;font-size:10px;font-family:tahoma;padding-top:2px;'>
												{$lang['design_102']}
											</div>
										</div>

										<div id='div_field_phi' style='color:#800000;border: 1px solid #d3d3d3; padding: 2px 8px 4px; margin-top: 5px;'>
											<b>{$lang['design_103']}</b> &nbsp;
											<input type='radio' id='field_phi0' name='field_phi2'
												onclick=\"document.getElementById('field_phi').value='';\" checked>&nbsp;{$lang['design_99']}&nbsp;
											<input type='radio' id='field_phi1' name='field_phi2'
												onclick=\"document.getElementById('field_phi').value='1';\">&nbsp;{$lang['design_100']}
											<input type='hidden' name='field_phi' id='field_phi' value=''>
											<div style='color:#808080;font-size:10px;font-family:tahoma;padding-top:2px;'>
												{$lang['design_166']}
											</div>
										</div>

										<div id='div_custom_alignment' style='border: 1px solid #d3d3d3; padding: 4px 8px; margin-top: 5px;'>
											<b>{$lang['design_212']}</b> &nbsp;
											<select id='custom_alignment' name='custom_alignment' class='x-form-text x-form-field' style=''>
												<option value=''>{$lang['design_213']} (RV)</option>
												<option value='RH'>{$lang['design_214']} (RH)</option>
												<option value='LV'>{$lang['design_215']} (LV)</option>
												<option value='LH'>{$lang['design_216']} (LH)</option>
											</select>
											<div style='color:#808080;font-size:10px;font-family:tahoma;padding-top:2px;'>
												{$lang['design_218']}
												<span id='customalign_disable_text' style='visibility:hidden;font-size:11px;padding-left:10px;color:#800000;font-family:tahoma;'>
													{$lang['design_101']}
												</span>
											</div>
											<div id='div_custom_alignment_slider_tip'>{$lang['design_669']}</div>
										</div>

										<div id='div_field_note' style='border: 1px solid #d3d3d3; padding: 4px 8px; margin-top: 5px;'>
											<b>{$lang['design_104']}</b> <span style='color: #505050; font-size: 11px;'>{$lang['global_06']}</span>
											<input class='x-form-text x-form-field' type='text' size='30' id='field_note' name='field_note'
												onkeydown='if(event.keyCode==13) return false;' style='width: 200px;margin-left: 5px;'>
											<div style='color:#808080;font-size:10px;font-family:tahoma;padding-top:2px;'>
												{$lang['design_217']}
											</div>
										</div>

										<!-- Hidden pop-up to note any non-numerical MC field fixes -->
										<div id='mc_code_change' style='display:none;padding:10px;' title='".js_escape($lang['design_294'])."'>
											{$lang['design_293']}
											<div id='element_enum_clone' style='padding:5px 8px;margin:15px 0 10px;width:90%;color:#444;border:1px solid #ccc;'></div>
											<div id='element_enum_dup_warning' style=''></div>
										</div>
										<input type='hidden' id='existing_enum' value=''>

									</div>
								</td>
							</tr>
							</table>
						</div>
					</div>
					<input type='hidden' name='form_name' value='{$_GET['page']}'>
					<input type='hidden' name='this_sq_id' id='this_sq_id' value=''>
					<input type='hidden' name='sq_id' id='sq_id' value=''>
				</form>
			</div>
			</div>
			<br><br>";
	?>

	<!-- EXPLANATION DIALOG POP-UP FOR EMBEDDING VIDEOS -->
	<div id="embed_video_explain" title="<?php echo js_escape2($lang['design_1085']) ?>" class="simpleDialog">
		<div><?=$lang['design_1089']?></div>
		<div class="mt-3"><?=$lang['design_1090']?></div>
		<div class="mt-3 boldish"><?=$lang['design_1088']?></div>
		<div class="mt-3" style="color:#C00000;">
			<img src="<?php echo APP_PATH_IMAGES ?>exclamation.png">
			<?php print $lang['design_578'] ?>
		</div>
	</div>

	<!-- IMAGE/FILE ATTACHMENT DIALOG POP-UP -->
	<div id="attachment-popup" title="<?php echo js_escape2($lang['design_577']) ?>" class="simpleDialog">
		<!-- Upload form -->
		<form id="attachFieldUploadForm" target="upload_target" enctype="multipart/form-data" method="post"
			action="<?php echo APP_PATH_WEBROOT ?>Design/file_attachment_upload.php?pid=<?php echo $project_id ?>">
			<div style="font-size:13px;padding-bottom:5px;">
				<?php echo $lang['data_entry_62'] ?>
			</div>
			<input type="file" id="myfile" name="file" style="font-size:13px;">
			<div style="color:#555;font-size:13px;">(<?php echo $lang["data_entry_63"] . " " . maxUploadSizeAttachment() ?>MB)</div>
		</form>
		<iframe style="width:0;height:0;border:0px solid #ffffff;" src="<?php echo APP_PATH_WEBROOT ?>DataEntry/empty.php" name="upload_target" id="upload_target"></iframe>
		<!-- Response message: Success -->
		<div id="div_attach_doc_success" style="display:none;font-weight:bold;font-size:14px;text-align:center;color:green;">
			<img src="<?php echo APP_PATH_IMAGES ?>tick.png">
			<?php echo $lang['design_200'] ?>
		</div>
		<!-- Response message: Failure -->
		<div id="div_attach_doc_fail" style="display:none;font-weight:bold;font-size:14px;text-align:center;color:red;">
			<img src="<?php echo APP_PATH_IMAGES ?>exclamation.png">
			<?php echo $lang['design_137'] ?>
		</div>
		<!-- Upload in progress -->
		<div id="div_attach_doc_in_progress" style="display:none;font-weight:bold;font-size:14px;text-align:center;">
			<?php echo $lang['data_entry_65'] ?><br>
			<img src="<?php echo APP_PATH_IMAGES ?>loader.gif">
		</div>
	</div>

	<!-- DISABLE AUTO VARIABLE NAMING DIALOG POP-UP -->
	<div id="auto_variable_naming-popup" title="<?php echo js_escape2($lang['design_268']) ?>" class="round chklist" style="display:none;">
		<div class="yellow">
			<table cellspacing=5 width=100%><tr>
				<td valign='top' style='padding:10px 20px 0 10px;'><img src="<?php echo APP_PATH_IMAGES ?>warning.png"></td>
				<td valign='top'>
					<p style="color:#800000;font-size:13px;font-family:verdana;"><b><?php echo $lang['design_268'] ?></b></p>
					<p><?php echo $lang['design_269'] ?></p>
					<p><?php echo $lang['design_270'] ?></p>
					<p><?php echo $lang['design_271'] ?></p>
				</td>
			</tr></table>
		</div>
	</div>

	<!-- STOP ACTIONS DIALOG POP-UP -->
	<div id="stop_action_popup" title="<?php echo js_escape2($lang['design_210']) ?>" style="display:none;"></div>

	<!-- LOGIC BUILDER DIALOG POP-UP -->
	<div id="logic_builder" title="<img src='<?php echo APP_PATH_IMAGES ?>arrow_branch_side.png'> <span style='color:#008000;'><?php echo $lang['design_225'] ?></span>" style="display:none;">
		<p style="line-height: 1.2em;font-size:12px;border-bottom:1px solid #ccc;padding-bottom:10px;margin:5px 0 0;">
			<?php echo $lang['design_226'] ?>
		</p>

		<div style="padding-top:10px;">
			<table cellspacing="0" width="100%">

				<tr>
					<td valign="top" colspan="2" style="padding-bottom:4px;font-family:verdana;color:#777;font-weight:bold;">
						<div style="width:700px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
							<?php echo $lang['design_230'] ?>
							<span id="logic_builder_field" style="color:#008000;padding-left:4px;"></span>
							<span style="color:#008000;font-weight:normal;">- <i id="logic_builder_label"></i></span>
						</div>
					</td>
				</tr>

				<!-- Advanced Branching Logic text box -->
				<tr>
					<td valign="top" style="padding:15px 20px 0 5px;">
						<input checked type="radio" name="optionBranchType" onclick="chooseBranchType(this.value,true);" value="advanced">
					</td>
					<td valign="top">
						<div style="font-weight:bold;padding:15px 20px 0 0;color:#800000;font-family:verdana;">
							<?php echo $lang['design_231'] . 
										"<span style='font-weight:normal;color:#808080;font-size:11px;margin-right:4px;margin-left:40px;'>
											{$lang['design_748']}
										</span>
										<button class='btn btn-xs btn-defaultrc' style='color:#1049a0;margin-right:4px;font-size:11px;padding:0px 3px 1px;line-height: 14px;' onclick=\"helpPopup('3','category_16_question_1_tab_3');return false;\"><img src='".APP_PATH_IMAGES."arrow-branch.png' style='width:13px;position:relative;top:-1px;margin-right:2px;'>{$lang['database_mods_74']}</button>
										<button class='btn btn-xs btn-rcgreen btn-rcgreen-light' style='margin-right:4px;font-size:11px;padding:0px 3px 1px;line-height:14px;'  onclick=\"smartVariableExplainPopup();return false;\">[<i class='fas fa-bolt fa-xs' style='margin:0 1px;'></i>] {$lang['global_146']}</button>
										<button class='btn btn-xs btn-primaryrc btn-primaryrc-light' style='font-size:11px;padding:1px 3px;line-height:14px;'  onclick=\"specialFunctionsExplanation();return false;\"><i class='fas fa-square-root-alt' style='margin:0 2px 0 1px;'></i> {$lang['design_839']}</button>
										";
							?>							
						</div>
						<div id="logic_builder_advanced" class="chklist" style="border:1px solid #ccc;padding:8px 10px 2px;margin:5px 0 15px;max-width: 710px;">
							<div style="padding-bottom:2px;">
								<?php echo $lang['design_227'] ?>
							</div>
							<table style='width: 98%; border: 0;'>
								<tr>
									<td colspan='2' style=' width: 100%; border: 0;'><textarea id="advBranchingBox" hasrecordevent="0" style="padding:1px;width:100%;height:65px;resize:auto;" onblur="logicHideSearchTip(this);" onkeydown="logicSuggestSearchTip(this, event, false, true, 0);" onfocus="openLogicEditor($(this))"></textarea><?php echo logicAdd("advBranchingBox"); ?></td>
								</tr>
								<tr>
									<td style='border: 0; font-weight: bold; text-align: left; vertical-align: middle; height: 20px;' id='advBranchingBox_Ok'>&nbsp;</td>
									<td style='border: 0; text-align: right; vertical-align: top;padding-right:10px;'><a id="linkClearAdv" style="font-family:tahoma;font-size:11px;text-decoration:underline;" href="javascript:;" onclick="$('#advBranchingBox').val('');logicValidate($('#advBranchingBox'), false);"><?php echo $lang['design_232'] ?></a></td>
								</tr>
							</table>
							<script type='text/javascript'>logicValidate($('#advBranchingBox'), false, 0);</script>
							<div style="margin: 0 0 4px;">
								<span class='logicTesterRecordDropdownLabel'><?php echo $lang['design_705'] ?></span>
								<?= Records::renderRecordListAutocompleteDropdown($Proj->project_id, false, 1000, "logicTesterRecordDropdown2", "fs11 x-form-text x-form-field", "", "", null, $lang['global_291'],
                                    'var circle=\''.APP_PATH_IMAGES.'progress_circle.gif\'; if (this.value !== \'\') $(\'#advBranchingBox_res\').html(\'<img src=\'+circle+\'>\'); else $(\'#advBranchingBox_res\').html(\'\'); logicCheck($(\'#advBranchingBox\'), \'branching\', '.($longitudinal ? 'true' : 'false').', \'\', this.value+'.'\'||'.$event_id.'\', \''.js_escape2($lang['design_706']).'\', \''.js_escape2($lang['design_707']).'\', \''.js_escape2($lang['design_713']).'\', [\''.js_escape2($lang['design_716']).'\', \''.js_escape2($lang['design_717']).'\', \''.js_escape2($lang['design_708']).'\'], \'advBranchingBox\');') ?>
                                <div id='advBranchingBox_res' style='margin-left:5px;color: green; font-weight: bold;'></div>
							</div>
						</div>

					</td>
				</tr>

				<!-- OR -->
				<tr>
					<td valign="top" colspan="2" style="padding:8px 15px 8px 0px;font-weight:bold;color:#777;">
						&#8212; <?php echo $lang['global_46'] ?> &#8212;
					</td>
				</tr>

				<!-- Drag-n-drop -->
				<tr>
					<td valign="top" style="padding:15px 20px 0 5px;">
						<input type="radio" name="optionBranchType" value="drag">
					</td>
					<td valign="top">
						<div style="font-weight:bold;padding:15px 20px 0 0;font-family:verdana;color:#800000;"><?php echo $lang['design_233'] ?></div>
						<div id="logic_builder_drag" class="chklist" style="height:270px;border:1px solid #ccc;padding:10px 10px 2px;margin:5px 0;">
						
							<table cellspacing="0">
								<tr>
									<td valign="bottom" style="width:290px;padding:20px 2px 2px;">
										<!-- Div containing options to drag over -->
										<b><?php echo $lang['design_234'] ?></b><br>
										<?php echo $lang['design_235'] ?><br>
										<div class="listBox" id="nameList" style="height:150px;overflow:auto;cursor:move;">
											<ul id="ulnameList"></ul>
										</div>
										<div style="font-size:11px;">&nbsp;</div>
									</td>
									<td valign="middle" style="text-align:center;font-weight:bold;font-size:11px;color:green;padding:0px 20px;">
										<img src="<?php echo APP_PATH_IMAGES ?>arrow_right.png"><br><br>
										<?php echo $lang['design_236'] ?><br>
										<?php echo $lang['global_43'] ?><br>
										<?php echo $lang['design_237'] ?><br><br>
										<img src="<?php echo APP_PATH_IMAGES ?>arrow_right.png">
									</td>
									<td valign="bottom" style="width:290px;padding:0px 2px 2px;">
										<!-- Div where options will be dragged to -->
										<b><?php echo $lang['design_227'] ?></b><br>
										<input type="radio" name="brOper" id="brOperAnd" value="and" onclick="updateAdvBranchingBox();" checked> <?php echo $lang['design_238'] ?><br>
										<input type="radio" name="brOper" id="brOperOr" value="or" onclick="updateAdvBranchingBox();"> <?php echo $lang['design_239'] ?><br>
										<div class="listBox" id="dropZone1" style="height:150px;overflow:auto;">
											<ul id="mylist" style="list-style:none;">
											</ul>
										</div>
										<div style="text-align:right;">
											<a id="linkClearDrag" style="font-family:tahoma;font-size:11px;text-decoration:underline;" href="javascript:;" onclick="
												$('#dropZone1').html('');
												updateAdvBranchingBox();
											"><?php echo $lang['design_232'] ?></a>
										</div>
									</td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</div>

    <!-- BRANCHING LOGIC UPDATE DIALOG POP-UP -->
    <div id="branching_update" title="<?php echo isset($lang['design_999']) ? $lang['design_999'] : ''; ?></span>" class="simpleDialog">
        <?php echo isset($lang['design_1001']) ? $lang['design_1001'] : ''; ?>
        <br/><br/>
        <div>
            <em><input type="checkbox" id="branching_update_chk" name="branching_update_chk" value=""> <?php echo isset($lang['alerts_250']) ? $lang['alerts_250'] : ''; ?></em>
        </div>
    </div>

	<!-- CALCULATIONS HELP DIALOG POP-UP -->
	<div id="calc_help" title="<img src='<?php echo APP_PATH_IMAGES ?>help.png'> <span style='color:#3E72A8;'><?php echo $lang['help_10'] ?></span>" style="display:none;"></div>

	<!-- Tooltip when Choices textbox is pre-filled with matrix group name choices -->
	<div id="prefillChoicesTip" class="tooltip4" style="z-index:9999;"><?php echo $lang['design_305'] ?></div>

	<!-- MOVE FIELD DIALOG POP-UP -->
	<div id="move_field_popup" title="<?php echo js_escape2($lang['design_333']) ?>" style="display:none;"></div>

	<!-- MOVE MATRIX DIALOG POP-UP -->
	<div id="move_matrix_popup" title="<?php echo js_escape2($lang['design_334']) ?>" style="display:none;"></div>

	<!-- MATRIX EXAMPLES DIALOG POP-UP -->
	<div id="matrixExamplePopup" title="<?php echo js_escape2($lang['design_356']) ?>" style="display:none;"></div>

	<!-- FIELD ANNOTATION EXPLANATION DIALOG POP-UP -->
	<div id="fieldAnnotationExplainPopup" title="<?php echo js_escape2($lang['design_527']) ?>" class="simpleDialog"><?php echo $lang['design_529'] ?></div>

    <!-- MYCAP SLIDER ACTION TAG EXPLANATION DIALOG POP-UP -->
    <div id="myCapSliderActionTagsExplainPopup" title="<?php echo $lang['mycap_mobile_app_695'] ?>" class="simpleDialog"><?php echo $lang['mycap_mobile_app_694'] ?></div>

    <div id="online-designer-hint-card">
        <!-- FLOATING CARD OF COLORED BUTTONS -->
        <div class="card mb-4">
            <div class="card-body p-2">
                <h5 class="card-title fs14 boldish mb-1"><i class="far fa-lightbulb"></i> <?php echo $lang['design_955'] ?></h5>
                <div class="card-text clearfix"><?php
                    echo   "<div class='float-start ms-2 my-1'><button class='btn btn-xs btn-rcgreen btn-rcgreen-light' style='font-size:11px;padding:0px 3px 1px;line-height:14px;'  onclick=\"smartVariableExplainPopup();return false;\">[<i class='fas fa-bolt fa-xs' style='margin:0 1px;'></i>] {$lang['global_146']}</button></div>
                            <div class='float-start ms-2 my-1'><button class='btn btn-xs btn-rcpurple btn-rcpurple-light' style='font-size:11px;padding:0px 3px 1px;line-height: 14px;' onclick='pipingExplanation();return false;'><img src='".APP_PATH_IMAGES."pipe.png' style='width:12px;position:relative;top:-1px;margin-right:2px;'>{$lang['info_41']}</button></div>
                            <div class='float-start ms-2 my-1'><button class='btn btn-xs btn-rcred btn-rcred-light' onclick=\"actionTagExplainPopup(1);return false;\" style='line-height: 14px;padding:1px 3px;font-size:11px;'>@ {$lang['global_132']}</button></div>
                            <div class='float-start ms-2 my-1'><button class='btn btn-xs btn-rcyellow' style='font-size:11px;padding:1px 3px;line-height:14px;'  onclick=\"fieldEmbeddingExplanation();return false;\"><i class='fas fa-arrows-alt' style='margin:0 1px;'></i> {$lang['design_795']}</button></div>
                            <div class='float-start ms-2 my-1'><button class='btn btn-xs btn-primaryrc btn-primaryrc-light' style='font-size:11px;padding:1px 3px;line-height:14px;'  onclick=\"specialFunctionsExplanation();return false;\"><i class='fas fa-square-root-alt' style='margin:0 2px 0 1px;'></i> {$lang['design_839']}</button></div>";
                ?></div>
            </div>
        </div>
        <!-- FLOATING REMINDER FOR HOW TO USE FIELD EMBEDDING -->
        <div class="card mb-4">
            <div class="card-body p-2">
                <h5 class="card-title fs14 boldish"><i class="far fa-lightbulb"></i> <?php echo $lang['design_794'] ?></h5>
                <p class="card-text fs12" style="line-height: 1.25;"><?php echo $lang['design_831'] ?> <a href="javascript:;" style="text-decoration:underline;" class="fs12" onclick="fieldEmbeddingExplanation();return false;"><?php echo $lang['design_795'] ?></a><?php echo $lang['period'] ?></p>
            </div>
        </div>
        <!-- FLOATING REMINDER FOR HOW TO USE MULTI FIELD SELECT OPTIONS -->
        <div class="card mb-4">
            <div class="card-body p-2">
                <h5 class="card-title fs14 boldish"><i class="far fa-lightbulb"></i> <?php echo $lang['design_827'] ?></h5>
                <p class="card-text fs12" style="line-height: 1.25;"><?php echo $lang['design_828'] ?></p>
            </div>
        </div>

    </div>
	
	<!-- Set variables and static msgs -->
	<script type="text/javascript">
	var form_name = '<?php echo $_GET['page'] ?>';
	var edit_mode = '<?php echo isset($_GET['edit_mode']) ? $_GET['edit_mode'] : ''; ?>';
	var valTypesHidden = new Array('<?php echo implode("', '", $valTypesHidden) ?>');
	var hide_pk = <?php echo (($surveys_enabled) && isset($_GET['page']) && $_GET['page'] == $Proj->firstForm) ? 'true' : 'false' ?>; // Hide first field for Single Survey projects only
	var matrixNameValErrMsg = '<?php echo js_escape($lang['design_298']) ?>';
	var addNewFieldMsg = '<?php echo js_escape($lang['design_57']) ?>';
	var editFieldMsg = '<?php echo js_escape($lang['design_320']) ?>';
	var addNewMatrixMsg = '<?php echo js_escape($lang['design_307']) ?>';
	var editMatrixMsg = '<?php echo js_escape($lang['design_321']) ?>';
	var rawEnumValMsg = '<?php echo js_escape2($lang['design_295']) ?>';
	var twoByteCharMsg = '<?php echo js_escape($lang['design_79']) ?>';
	var delMatrixTitle = '<?php echo js_escape($lang['design_324']) ?>';
	var delMatrixMsg = '<?php echo js_escape($lang['design_325']) ?>';
	var delMatrixMsg2 = '<?php echo js_escape($lang['design_326']) ?>';
	var delSHMsg = '<?php echo js_escape($lang['design_330']) ?>';
	var delSHTitle = '<?php echo js_escape($lang['design_415']) ?>';
	var delFieldMsg = '<?php echo js_escape($lang['design_328']) ?>';
	var delFieldTitle = '<?php echo js_escape($lang['design_327']) ?>';
	var duplVarMtxMsg = '<?php echo js_escape($lang['design_331']) ?>';
	var duplVarMtxMsg2 = '<?php echo js_escape($lang['design_332']) ?>';
	var disabledAutoQuesNumMsg = '<?php echo js_escape($lang['global_03'].$lang['colon'])."\\n".js_escape($lang['survey_07']." ".$lang['survey_09']) ?>';
	var pleaseSelectField = '<?php echo js_escape($lang['design_338']) ?>';
	var successfullyMovedMsg = '<?php echo js_escape($lang['design_346']) ?>';
	var langPkNoDisplayMsg = '<?php echo js_escape($lang['design_392'] . "<br>" . $lang['design_792']) ?>';
	var langOD0 = '<?php echo js_escape($lang['design_411']) ?>';
	var langOD1 = '<?php echo js_escape($lang['survey_459']) ?>';
	var langOD2 = '<?php echo js_escape($lang['survey_460']) ?>';
	var langOD3 = '<?php echo js_escape($lang['survey_461']) ?>';
	var langOD4 = '<?php echo js_escape($lang['survey_462']) ?>';
	var langOD5 = '<?php echo js_escape($lang['survey_463']) ?>';
	var langOD6 = '<?php echo js_escape($lang['survey_464']) ?>';
	var langOD7 = '<?php echo js_escape($lang['survey_465']) ?>';
	var langOD8 = '<?php echo js_escape($lang['survey_466']) ?>';
	var langOD9 = '<?php echo js_escape($lang['survey_467']) ?>';
	var langOD10 = '<?php echo js_escape($lang['survey_468']) ?>';
	var langOD11 = '<?php echo js_escape($lang['survey_469']) ?>';
	var langOD13 = '<?php echo js_escape($lang['survey_471']) ?>';
	var langOD15 = '<?php echo js_escape($lang['survey_473']) ?>';
	var langOD16 = '<?php echo js_escape($lang['survey_474']) ?>';
	var langOD17 = '<?php echo js_escape($lang['survey_475']) ?>';
	var langOD18 = '<?php echo js_escape($lang['survey_476']) ?>';
	var langOD19 = '<?php echo js_escape($lang['survey_477']) ?>';
	var langOD20 = '<?php echo js_escape($lang['survey_478']) ?>';
	var langOD21 = '<?php echo js_escape($lang['design_412']) ?>';
	var langOD23 = '<?php echo js_escape($lang['design_414']) ?>';
	var langOD24 = '<?php echo js_escape($lang['global_19']) ?>';
	var langOD25 = '<?php echo js_escape($lang['design_304']) ?>';
	var langOD26 = '<?php echo js_escape($lang['design_303']) ?>';
	var langOD27 = '<?php echo js_escape($lang['design_203']) ?>';
	var langOD28 = '<?php echo js_escape($lang['design_202']) ?>';
	var langOD29 = '<?php echo js_escape($lang['design_315']) ?>';
	var langOD30 = '<?php echo js_escape($lang['global_03']) ?>';
	var langOD31 = '<?php echo js_escape($lang['form_renderer_23']) ?>';
	var langOD33 = '<?php echo js_escape($lang['design_416']) ?>';
	var langOD34 = '<?php echo js_escape($lang['design_417']) ?>';
	var langOD35 = '<?php echo js_escape($lang['design_418']) ?>';
	var langOD36 = '<?php echo js_escape($lang['design_419']) ?>';
	var langOD37 = '<?php echo js_escape($lang['design_420']) ?>';
	var langOD39 = '<?php echo js_escape($lang['design_421']) ?>';
	var langOD40 = '<?php echo js_escape($lang['design_422']) ?>';
	var langOD41 = '<?php echo js_escape($lang['design_423']) ?>';
	var langOD42 = '<?php echo js_escape($lang['design_424']) ?>';
	var langOD43 = '<?php echo js_escape($lang['design_425']) ?>';
	var langOD44 = '<?php echo js_escape($lang['design_426']) ?>';
	var langOD45 = '<?php echo js_escape($lang['design_427']) ?>';
	var langOD46 = '<?php echo js_escape($lang['design_656']) ?>';
	var langOD47 = '<?php echo js_escape($lang['design_429']) ?>';
	var langOD48 = '<?php echo js_escape($lang['global_02'].$lang['colon'].' '.$lang['design_432']) ?>';
	var langOD49 = '<?php echo js_escape($lang['design_441']) ?>';
	var langOD50 = '<?php echo js_escape($lang['design_453']) ?>';
	var langOD51 = '<?php echo js_escape($lang['design_499'].'<br><br><b>'.$lang['design_500'].'<br><br>'.$lang['design_501'].'</b>') ?>';
	var langOD52 = '<?php echo js_escape($lang['design_496']) ?>';
	var langOD53 = '<?php echo js_escape($lang['design_525']) ?>';
	var langOD54 = '<?php echo js_escape($lang['design_829']) ?>';
    var langOD55 = '<?php echo js_escape($lang['design_906']) ?>';
    var langQB01 = '<?php print js_escape($lang['design_920']) ?>';
    var langQB02 = '<?php print js_escape($lang['design_921']) ?>';
    var langQB03 = '<?php print js_escape($lang['design_928']) ?>';
    var langQB04 = '<?php print js_escape($lang['design_929']) ?>';
    var langQB05 = '<?php print js_escape($lang['design_908']) ?>';
	// Put all reserved variable names into an array for checking later
	var reserved_field_names = new Array(<?php
		echo prep_implode(array_keys(\Project::$reserved_field_names))
			. ",'" . implode("_timestamp','", array_keys($Proj->forms)) . "_timestamp'"
			. ",'" . implode("_return_code','", array_keys($Proj->forms)) . "_return_code'"
	?>);
    var deleteBaselineDateField = '<?php print js_escape($lang['mycap_mobile_app_469']) ?>';
    var deleteBaselineDateField1 = '<?php print js_escape($lang['mycap_mobile_app_470']) ?>';
    var isMyCapEnabled = '<?php print $mycap_enabled; ?>';
    var delParInfoFieldWarning = '<?php echo js_escape($lang['design_1081']) ?>';
	</script>
    <link rel="stylesheet" type="text/css" href="<?php echo APP_PATH_CSS ?>bootstrap-select.min.css">
	<?php
	loadJS('Libraries/tablednd.js');
	loadJS('Libraries/jquery.simplePagination.js');
	loadJS('Libraries/bootstrap-select-min.js');
    loadJS('DesignFields.js');
	addLangToJS([
		"design_1056",
		"design_1057",
		"design_1058",
		"design_1059",
		"design_1060",
		"design_1061",
		"design_1062"
	]);
	loadJS('FieldBank.js');
	?>
    <!-- Field Bank dialog -->
    <div id="add_fieldbank">
        <div id="questionBankContainer">
            <div style="margin:5px 2px 10px 2px;">
                <?=$lang['design_907']; ?>
            </div>
            <div class="clear"></div>
            <div class="row">
                <div class="col">
                    <div class="input-group">
                        <span class="input-group-text fs13"><?=$lang['design_935']?></span>
                        <select id="classification-list" data-header="<?=js_escape2("<div style='color:#800000;font-size:14px;background-color:#eee;padding:5px;'>{$lang['design_931']}</div>")?>" data-style="btn-defaultrc" data-dropup-auto="false" data-size="8" class="show-menu-arrow form-control" data-style="btn-white"><?=FieldBank::getClassificationDropDown()?></select>
                    </div>
                    <div class="input-group" style="padding-top: 10px;">
                        <span id="basic-addon2" class="input-group-text" onclick="doFieldBankSearch();"><i class="fa fa-search"></i></span>
                        <input autocomplete="off" class="form-control py-2" type="search" placeholder="<?=js_escape2($lang['messaging_161'])?>" value="" id="keyword-search-input" aria-describedby="basic-addon2">
                    </div>
                </div>
            </div>
            <div class="clear"></div>
            <div id="fieldbank-result-container">
                <div id="cde_search_result"></div>
                <div class="clear"></div>
                <div id="fieldbank-pagination-container">
                    <nav>
                        <ul class="pagination"></ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
	<?php

	// If field name and type are passed in query string, then open Edit Field popup
	if (isset($_GET['field']) && isset($Proj->metadata[$_GET['field']]))
	{
		if (isset($_GET['branching'])) { ?>
			<script type="text/javascript">
                $(function(){ setTimeout(function(){
                    openLogicBuilder('<?php echo $_GET['field']; ?>');
                },1000); });
			</script>
		<?php } elseif (isset($_GET['matrix'])) { ?>
			<script type="text/javascript">
                $(function(){ setTimeout(function(){
                    openAddMatrix('<?php echo $_GET['field']; ?>', '');
                },1000); });
			</script>
		<?php } else { ?>
			<script type="text/javascript">
                $(function(){ setTimeout(function(){
                    openAddQuesForm('<?php echo $_GET['field']; ?>', '<?php echo $Proj->metadata[$_GET['field']]['element_type']; ?>', 0, '<?php print (($Proj->metadata[$_GET['field']]['element_type'] == 'file' && $Proj->metadata[$_GET['field']]['element_validation_type'] == 'signature') ? '1' : '0') ?>');
                },1000); });
			</script>
		<?php }
	}
}

include APP_PATH_DOCROOT . 'ProjectGeneral/footer.php';
