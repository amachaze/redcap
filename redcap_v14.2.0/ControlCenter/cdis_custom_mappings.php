<?php

namespace Vanderbilt\REDCap\ControlCenter;

use System;
use Vanderbilt\REDCap\Classes\Fhir\FhirMetadata\FhirCustomMetadataService;

// Config for non-project pages
require_once dirname(dirname(__FILE__)) . "/Config/init_global.php";

if (!ACCESS_CONTROL_CENTER) redirect(APP_PATH_WEBROOT);
if (!ACCESS_SYSTEM_CONFIG) print "<script type='text/javascript'>$(function(){ disableAllFormElements(); });</script>";

$baseURL = APP_PATH_WEBROOT_FULL . 'redcap_v' . REDCAP_VERSION;
/**
 * Generate a Bootstrap 5 alert based on a provided string.
 *
 * @param string $message The message to display in the alert.
 * @param string $type The type of alert to display (success, danger, warning, or info).
 * @return string The HTML code for the alert.
 */
function generateAlert($message, $type = 'info', $autoCloseDelay = null) {
	$valid_types = ['success', 'danger', 'warning', 'info'];

	// Validate the alert type
	if (!in_array($type, $valid_types)) {
		$type = 'info';
	}

	$autoCloseHtml = '';
	if ($autoCloseDelay) {
        $autoCloseHtml = sprintf('data-bs-delay="%d" data-bs-autohide="true"', $autoCloseDelay);
    }

	// Generate the HTML code for the alert
	$html = '<div class="alert alert-' . $type . ' alert-dismissible fade show" ' . $autoCloseHtml . ' role="alert">';
	$html .= $message;
	$html .= '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
	$html .= '</div>';

	return $html;
}

// Retrieve data from configuration
$customMetadataService = new FhirCustomMetadataService();
$currentSettings = System::getConfigVals();
$displayAlerts = [];

// download files if the correct query param is detected
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
	try {
		if($alertMessage = $_GET['alert-message']) {
			$alertType = $_GET['alert-type'] ?? null;
			$displayAlerts[] = function() use($alertMessage, $alertType){
				return generateAlert($alertMessage, $alertType, 5000);
			};
		}
	} catch (\Throwable $th) {
		$displayAlerts[] = function() use($th){
			return generateAlert($th->getMessage(), 'warning', 5000);
		};
	}
}



include 'header.php';
?>
<h4 class="" style="margin-top:10px;"><i class="fas fa-fire"></i> <?= $lang['cdis_custom_mapping_title'] ?></h4>

<div id="alerts-container" style="
	position: fixed;
	top: 10px;
	right: 10px;
	color: white;
	isolation: isolate;
	z-index: 9999;">
	<?php foreach ($displayAlerts as $alertClosure) if(is_callable($alertClosure)) print($alertClosure()); ?>
</div>

<div style="white-space:pre-line;">
	<span><?= $lang['cdis_custom_mapping_description'] ?></span>
</div>

<div class="card mt-2">
	<div class="card-body">
		<form id="uploadForm" data-route="CdisController:uploadCustomMapping">
			
		<?php if($rows = $customMetadataService->getData()) :?>

			<div class="card-title">
				<h6>Custom mappings</h6>
			</div>

			<table class="table table-striped table-hover table-bordered">
				<thead>
					<tr>
					<?php foreach (($headers= array_keys($rows[0])) as $header) : ?>
						<th><?= $header ?></th>
					<?php endforeach; ?>
					</tr>
				</thead>
				<tbody>
				<?php foreach ($rows as $index => $row) : ?>
					<tr>
					<?php foreach ($row as $key => $field) : ?>
					<td><?= $field ?></td>
					<?php endforeach; ?>
				</tr>
				<?php endforeach; ?>
				</tbody>
			</table>

			<div class="d-flex flex-row gap-2">
				<a class="btn btn-primary btn-sm text-white" href="<?= $baseURL ?>/?route=CdisController:downloadCustomMapping" download>
					<i class="fas fa-file-csv fa-fw"></i><span class="ms-2">Download custom mappings file</span>
				</a>
				<a class="btn btn-danger btn-sm text-white" href="#" data-route="CdisController:removeCustomMapping" data-delete-mapping>
					<i class="fas fa-trash fa-fw"></i><span class="ms-2">Delete custom mappings</span>
				</a>
			</div>
				

		<?php else: ?>
			
			<div class="mb-2">
				<div class="mb-3">
					<label for="csvfile" class="form-label"></label>
					<input class="form-control" type="file" name="file" id="csvfile" accept=".csv">
				</div>
			</div>
			
			<div class="d-flex flex-row gap-2 align-items-center">
				<a href="<?= $baseURL ?>/?route=CdisController:downloadCustomMappingTemplate" download>
					<i class="fas fa-file-csv fa-fw"></i><span class="ms-2">Download template file</span>
				</a>
				<button class="btn btn-sm btn-primary ms-auto" type="submit" >Upload</button>
			</div>
			
			<div class="alert alert-primary mt-2" role="alert">
				<h6><?= $lang['cdis_custom_mapping_note_title'] ?></h6>
				<p><?= $lang['cdis_custom_mapping_note_description'] ?></p>
				<ul>
					<li><?= $lang['cdis_custom_mapping_note_1'] ?></li>
					<li><?= $lang['cdis_custom_mapping_note_2'] ?></li>
					<li><?= $lang['cdis_custom_mapping_note_3'] ?></li>
					<li><?= $lang['cdis_custom_mapping_note_4'] ?></li>
					<li><?= $lang['cdis_custom_mapping_note_5'] ?></li>
				</ul>
			</div>

		<?php endif; ?>

		</form>

	</div>
</div>

<script type="module">
	import CustomMappingUploadManager from '<?= APP_PATH_JS ?>EHR/CustomMappingUploadManager.js'
	import Modal from '<?= APP_PATH_JS ?>modules/Modal.js'
	
	// instantiate the modal class; it uses an html5 dialog element
	const modal = new Modal()

	/**
	 * auto-close alerts
	 */
	const autoCloseAlerts = () => {
		const alerts = document.querySelectorAll('.alert[role="alert"]')
		alerts.forEach(element => {
			const delay = parseInt(element.getAttribute('data-bs-delay'));
			const autohide = Boolean(element.getAttribute('data-bs-autohide'));
			if(autohide && delay>0) {
				setTimeout(() => {
					var bsAlert = bootstrap.Alert.getOrCreateInstance(element)
					bsAlert.close()
				}, delay);
			}
		});
	}

	/**
     * Removes all query parameters from the current URL without reloading the page.
     */
    const removeQueryParams = () => {
        const url = new URL(window.location.href);
        url.search = '';
        const newUrl = url.toString();
        window.history.replaceState({}, '', newUrl);
    }

	/**
	 * register the listener for the button that can delete the mapping
	 */
	const useDeleteMapping = (uploadManager, selector) => {
		if(!uploadManager) return
		const deleteMappingButton = document.querySelector(selector)
		if(!deleteMappingButton) return
		deleteMappingButton.addEventListener('click', async (e) => {
			e.preventDefault()
			const confirmed = await modal.showDialog({title:'Delete confirmation', body:'Are you sure you want to delete this item?'})
			if(!confirmed) return
			const route = deleteMappingButton.getAttribute('data-route')
			uploadManager.sendRequest(route)
		})
	}

	document.addEventListener('DOMContentLoaded', function() {
		const uploadManager = new CustomMappingUploadManager()
		uploadManager.initUploadForm('#uploadForm');
		removeQueryParams(); // remove query params (if any), when the page is loaded
		autoCloseAlerts(); // auto close alerts
		useDeleteMapping(uploadManager, '[data-delete-mapping]')
	})
</script>


<?php include 'footer.php'; ?>