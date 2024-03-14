<?php
namespace ExternalModules;
require_once __DIR__ . '/../../redcap_connect.php';

$pid = ExternalModules::getProjectId();

?>

<table id='external-modules-disabled-table' class="table table-no-top-row-border">
	<?php

	if (ExternalModules::isSuperUser() || ExternalModules::isAdminWithModuleInstallPrivileges()) {
		$enabledModules = ExternalModules::getEnabledModules();
	} else {
		$enabledModules = ExternalModules::getDiscoverableModules();
	}

	if (!isset($pid)) {
		$disabledModuleConfigs = ExternalModules::getDisabledModuleConfigs($enabledModules);

		if (empty($disabledModuleConfigs)) {
			echo 'None';
		} else {
			foreach ($disabledModuleConfigs as $moduleDirectoryPrefix => $versions) {
				$config = reset($versions);
				
				// Determine if module is an example module
				$isExampleModule = ExternalModules::isExampleModule($moduleDirectoryPrefix, array_keys($versions));
	
				$deleteButtonDisabled = '';
				if(isset($enabledModules[$moduleDirectoryPrefix])){
					//= Change Version
					$enableButtonText = ExternalModules::tt("em_manage_58"); 
					$enableButtonIcon = 'fas fa-sync-alt';
				}
				else{
					//= Enable
					$enableButtonText = ExternalModules::tt("em_manage_59"); 
					$enableButtonIcon = 'fas fa-plus-circle';
					$deleteButtonDisabled = $isExampleModule ? 'disabled' : ''; // Modules cannot be deleted if they are example modules
				}

				$enableButtonStyle = '';
				if(empty($config)){
					$name = "None (config.json is missing for $moduleDirectoryPrefix)";
					$enableButtonStyle = 'display: none';
				}
				else{
					$name = trim($config['name']);
					if(empty($name)){
						//= None ('name' is not specified in config.json for {0})
						$name = ExternalModules::tt("em_manage_60", $moduleDirectoryPrefix);
					}
				}

				?>
				<tr data-module='<?= $moduleDirectoryPrefix ?>'>
					<td>
						<?= $name ?>
						<div class="cc_info">
						<?php if (isset($enabledModules[$moduleDirectoryPrefix])) { ?>
						<!--= (Current version: {0}) -->
						<?=ExternalModules::tt("em_manage_61", $enabledModules[$moduleDirectoryPrefix])?>
						<?php } else { ?>
						<!--= (Not enabled) -->
						<?=ExternalModules::tt("em_manage_62")?>
						<?php } ?>
						</div>
					</td>
					<td>
						<select name="version">
							<?php
							foreach(array_keys($versions) as $version){
								echo "<option>$version</option>";
							}
							?>
						</select>
					</td>
					<td class="external-modules-action-buttons">
						<button class='btn btn-success btn-xs enable-button' style='<?=$enableButtonStyle?>'>
							<span class="<?=$enableButtonIcon?>" aria-hidden="true"></span>
							<?=$enableButtonText?>
						</button> &nbsp;
						<button class='btn btn-defaultrc btn-xs disable-button' <?=$deleteButtonDisabled?>>
							<span class="far fa-trash-alt" aria-hidden="true"></span>
							<?=ExternalModules::tt("em_manage_116")?>
						</button>
					</td>
				</tr>
				<?php
			}
		}
	} else {
		// Sort modules by title
		$configs = array();
		$moduleTitles = array();
		foreach ($enabledModules as $prefix => $version) {
			$configs[$prefix] = ExternalModules::getConfig($prefix, $version, $pid); // Disabled modules have no say in their language.
			$moduleTitles[$prefix] = trim(strtoupper($configs[$prefix]['name'])); // Uppercase for sorting, otherwise A b C will be A C b.
		}
		array_multisort($moduleTitles, SORT_REGULAR, $enabledModules);
		// Loop through each module to render
		foreach ($enabledModules as $prefix => $version) {
			$config = $configs[$prefix];
			$enabled = ExternalModules::getProjectSetting($prefix, $pid, ExternalModules::KEY_ENABLED);
			$userCanEnable = ExternalModules::userCanEnableDisableModule($prefix);

			$name = trim($config['name']);
			if(empty($name)){
				continue;
			}

			if (!$enabled) {
			?>
				<tr data-module='<?= ExternalModules::escape($prefix) ?>' data-version='<?= ExternalModules::escape($version) ?>'>
					<td>
						<?php require __DIR__ . '/../templates/module-table.php'; ?>
					</td>
					<td class="external-modules-action-buttons">
						<?php
                            if ($userCanEnable) {
                                ?><button class='enable-button'>Enable</button><?php
                            }
                            elseif ($GLOBALS['external_modules_allow_activation_user_request']) {
                                $requestPending = \ToDoList::isExternalModuleRequestPending($prefix, $pid);
								$requestPendingDisabled = $requestPending ? "disabled" : "";
                                ?><button class='enable-button module-request' <?=$requestPendingDisabled?>>Request Activation</button><?php
                                if ($requestPending) {
									?><div class='text-danger'>Activation request is pending</div><?php
                                }
                            }
                        ?>
					</td>
				</tr>
			<?php
			}
		}
	}

	?>
</table>

<?php 
ExternalModules::tt_initializeJSLanguageStore();
ExternalModules::tt_transferToJSLanguageStore(
	array(
		"em_manage_12",
		"em_manage_27", 	
		"em_manage_30",
		"em_manage_116",
		"em_manage_64",
		"em_manage_66",
		"em_manage_67",	
		"em_manage_68",
		"em_manage_69",
		"em_manage_70",
		"em_manage_71",
        "em_manage_89",
        "em_errors_112",
        "em_manage_27"
	));
ExternalModules::addResource(ExternalModules::getManagerJSDirectory().'get-disabled-modules.js'); 