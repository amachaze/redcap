<?php


require_once dirname(dirname(__FILE__)) . '/Config/init_project.php';
?>


<?php
// Header
include APP_PATH_DOCROOT  . 'ProjectGeneral/header.php';
renderPageTitle("<i class=\"fas fa-database\"></i> " . ($DDP->isEnabledInProjectFhir() ? $lang['ws_210'] : $lang['ws_51']) . " " . $DDP->getSourceSystemName());

// CSS & Javascript
?>



<?php print loadJS('vue/vue-factory/dist/js/app.js') ?>
<?php print loadJS('vue/cdp-mapping/dist/cdp_mapping_vue.umd.js') ?>

<div id="cdp-mapping-container"></div>
<script>
	window.addEventListener('DOMContentLoaded', function(event) {
		const componentPromise = window.renderVueComponent(cdp_mapping_vue, '#cdp-mapping-container')
		/* componentPromise.then(component => {
			console.log('CDP mapping is ready')
		}) */
	})
</script>

<?php

// Render page
// print $DDP->renderSetupPage();

// Footer
include APP_PATH_DOCROOT . 'ProjectGeneral/footer.php';
