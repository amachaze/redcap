<?php


require_once dirname(dirname(__FILE__)) . '/Config/init_project.php';

// Is the form valid?
$formValid = ($status > 0) ? isset($Proj->forms_temp[$_POST['form']]['menu']) : isset($Proj->forms[$_POST['form']]['menu']);
if (!isset($_POST['form']) || !$formValid) exit('0');

// Get form label
$formLabel = ($status > 0) ? $Proj->forms_temp[$_POST['form']]['menu'] : $Proj->forms[$_POST['form']]['menu'];

// Change mycap task title in tasks table
$sql = "UPDATE redcap_mycap_tasks SET task_title = '".db_escape($formLabel)."'
		WHERE project_id = $project_id AND form_name = '".db_escape($_POST['form'])."'";
if (!db_query($sql)) {
	exit('0');
} else {
	// Logging
	Logging::logEvent($sql,"redcap_mycap_tasks","MANAGE",$_POST['form'],"form_name = '".db_escape($_POST['form'])."'","Modify MyCap Task Title");
	// Output the task title to display to user for confirmation
	print $formLabel;
}