<?php

use Vanderbilt\REDCap\Classes\Fhir\FhirStats\FhirStats;

class FhirStatsController extends BaseController
{


    public function __construct()
    {
        parent::__construct();
    }

    /**
     * export data to CSV
     *
     * @return void
     */
    public function export()
    {
        $params = [
            'date_start' => @$_GET['date_start'] ?? '',
            'date_end' => @$_GET['date_end'] ?? '',
        ];
        $fhir_stats = new FhirStats($params);
        $fhir_stats->exportData();
    }


    public function getStats() {
		$params = [
            'date_start' => @$_GET['date_start'] ?? '',
            'date_end' => @$_GET['date_end'] ?? '',
        ];
        $fhir_stats = new FhirStats($params);
        $response = $fhir_stats->getCounts();
        $this->printJSON($response, 200);
    }
    
    public function index()
    {
        global $lang;
        if (!ACCESS_ADMIN_DASHBOARDS) redirect(APP_PATH_WEBROOT);
		extract($GLOBALS);


        include APP_PATH_DOCROOT . 'ControlCenter/header.php';
        
        $browser_supported = !$isIE || vIE() > 10;
        $data = compact('date_start','date_end','results','show','export_link','browser_supported');


        $objHtmlPage = new HtmlPage();
        ob_start();
        ?>
        <h4 style="margin-top: 0;font-size: 1.3em;font-weight: bold;"><i class="fas fa-fire" style="margin-left:1px;margin-right:1px;"></i> FHIR Statistics</h4>

        <?php print loadJS('vue/vue-factory/dist/js/app.js') ?>
        <?php print loadJS('vue/fhir-stats/dist/fhir_stats_vue.umd.js') ?>

        <div id="fhir-stats-app"></div>
        <script>
            window.addEventListener('DOMContentLoaded', function(event) {
                const componentPromise = window.renderVueComponent(fhir_stats_vue, '#fhir-stats-app')
                componentPromise.then(component => {
                    console.log('component is ready')
                })
            })
        </script>

        <?php
        $contents = ob_get_contents();
        ob_end_clean();

        print $contents;
        include APP_PATH_DOCROOT . 'ControlCenter/footer.php';
    }

}