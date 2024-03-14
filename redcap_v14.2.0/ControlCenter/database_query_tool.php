<?php
use PHPSQLParser\PHPSQLParser;

// Config for non-project pages
require_once dirname(dirname(__FILE__)) . "/Config/init_global.php";

if (!ADMIN_RIGHTS && !SUPER_USER && !ACCESS_SYSTEM_CONFIG) exit($lang['system_config_884']);

// Get saved queries
$customQueries = [];
$sql = "select * from redcap_custom_queries order by qid";
$q = db_query($sql);
while ($row = db_fetch_assoc($q)) {
    $customQueries[] = ['title'=>$row['title'], 'query'=>$row['query']];
}

$baseUrl = PAGE_FULL;
$doExport = ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['query']) && !$isAjax && isset($_GET['export']));


// Custom queries being saved
if ($isAjax && isset($_POST['save_custom_queries']))
{
    $customQueries = [];
    foreach ($_POST as $key=>$val) {
        if (strpos($key, "qtitle_") === 0) {
            list ($nothing, $num) = explode("_", $key, 2);
            $customQueries[$num]['title'] = trim($val);
        } elseif (strpos($key, "qsql_") === 0) {
            list ($nothing, $num) = explode("_", $key, 2);
            $customQueries[$num]['query'] = trim($val);
        } else {
            continue;
        }
    }
    // If only have one query submitted and it is blank, then we're erasing all custom queries
    if (count($customQueries) === 1 && $customQueries[$num]['title'] == '' && $customQueries[$num]['query'] == '') {
        $customQueries = [];
    }
    // Begin transaction
    db_query("SET AUTOCOMMIT=0");
    db_query("BEGIN");
    $errors = 0;
    // Delete table contents first
    $sql = "delete from redcap_custom_queries";
    if (!db_query($sql)) {
        $errors++;
    }
    // Add new rows
    $sql_all = [];
    foreach ($customQueries as $attr) {
        $sql_all[] = $sql = "insert into redcap_custom_queries (title, query) values ('".db_escape($attr['title'])."', '".db_escape($attr['query'])."')";
        if (!db_query($sql)) {
            $errors++;
        }
    }
    // Commit changes
    if ($errors > 0) {
        db_query("ROLLBACK");
        db_query("SET AUTOCOMMIT=1");
        exit("0");
    }
    // LOGGING
    Logging::logEvent(implode(";\n",$sql_all),"redcap_custom_queries","MANAGE","", json_encode_rc($customQueries),"Add/edit custom queries for the Database Query Tool");
    db_query("COMMIT");
    db_query("SET AUTOCOMMIT=1");
    exit("1");
}
// Custom queries being viewed
elseif ($isAjax && isset($_POST['view_custom_queries']))
{
    // Build the content for the "add saved query" dialog
    $dialogHtml = RCView::hidden(['name'=>'save_custom_queries', 'value'=>'1']);
    $key = 1;
    // Add placeholder for empty first row
    if (empty($customQueries)) {
        $customQueries[] = ['title'=>'', 'query'=>''];
    }
    // Loop through all and render
    foreach ($customQueries as $attr) {
        $dialogHtml .= RCView::div(['class'=>'query-row mt-3 pt-3', 'style'=>'border-top:1px dashed #bbb;'],
            RCView::span(['style'=>'width:30px;', 'class'=>'align-top query-num fs14 text-dangerrc font-weight-bold'], "$key) ") .
            RCView::span(['class'=>'align-top font-weight-bold'], $lang['control_center_4821']).
            RCView::text(['name'=>'qtitle_'.$key, 'class'=>'ms-2 align-top x-form-text x-form-field fs13', 'style'=>'width:450px;max-width:450px;', 'value'=>$attr['title']]) .
            RCView::button(['class'=>'ms-3 align-top btn btn-link text-danger py-0 btn-sm fs16', 'onclick'=>"deleteRow(this);return false;", 'title'=>$lang['control_center_4823']], '<i class="fas fa-times"></i>') .
            RCView::div(['class'=>'ms-3 mt-2'],
                RCView::b($lang['control_center_4822']).RCView::SP.
                RCView::textarea(['name'=>'qsql_'.$key, 'class'=>'align-top x-form-field notesbox fs12', 'style'=>'width:450px;max-width:450px;margin-left:52px;font-family:monospace;resize:auto;line-height:1.1;padding:5px;'], $attr['query'])
            )
        );
        $key++;
    }
    $dialogHtml .= RCView::div(['class'=>'mt-3', 'id'=>'add-row-parent'],
        RCView::button(['class'=>'ms-3 btn btn-success btn-xs fs12', 'onclick'=>"addRow();return false;"], '<i class="fas fa-plus"></i> ' . $lang['control_center_4824'])
    );
    print   RCView::div(['class'=>'mb-3'], $lang['control_center_4817']) .
            RCView::form(['id'=>'saved-query-dialog-form', 'method'=>'post', 'action'=>$baseUrl], $dialogHtml);
    exit;
}


// Header
if (!$doExport) include 'header.php';

// Get list of open requests
function getOpenRequests($mysql_ids=null)
{
    $current_mysql_process = db_thread_id();
    $reqs = array();
    $sql = "select r.mysql_process_id, r.php_process_id, v.user, v.project_id, v.full_url 
			from redcap_log_open_requests r, redcap_log_view v where v.log_view_id = r.log_view_id";
    if (is_array($mysql_ids)) {
        $sql .= " and r.mysql_process_id in (".prep_implode($mysql_ids).")";
    }
    $q = db_query($sql);
    while ($row = db_fetch_assoc($q)) {
        // Ignore the current MySQL process running THIS script
        if ($current_mysql_process == $row['mysql_process_id']) continue;
        // Add to array
        $reqs[$row['mysql_process_id']] = $row;
    }
    return $reqs;
}

function isQueryType($query, $types) {
    if(!is_array($types)){
        $types = [$types];
    }

    foreach($types as $type){
        if(empty($type)){
            throw new \Exception('Empty types are not allowed');
        }

        $type = preg_quote($type);
        if(preg_match("/^$type\s/i", $query)){
            return true;
        }
    }

    return false;
}

// Get formatted timestamp for NOW
list ($nowDate, $nowTime) = explode(" ", NOW, 2);
$nowTS = (method_exists('DateTimeRC', 'format_user_datetime')) ? DateTimeRC::format_user_datetime($nowDate, 'Y-M-D_24', null) . " $nowTime" : NOW;

if (!$doExport)
{
    ?>
    <style type="text/css">
    #pagecontainer { max-width: 1600px; }
    td.query_cell { padding:3px;border-top:1px solid #ddd;font-size:10px;vertical-align:top; }
    td.query_cell a { text-decoration:underline;font-size:8pt;font-family:verdana,arial; }
    #west2 {
      border-right:1px solid #aaa;
      width:250px;
    }
    #center2 {
      padding:0 20px;
    }
    .rcf { display:none; }
    .rcp a { text-decoration:underline !important;font-size:8pt !important; }
    </style>
    <script type="text/javascript">
    var baseUrl = '<?=js_escape($baseUrl)?>';
    function showMore() {
        $('.rcp').hide();
        $('.rcf').show();
    }
    function loadCustomQuery(querynum) {
        showProgress(1,1);
        window.location.href = baseUrl+'?q='+querynum;
    }
    function formatRows()
    {
        // Re-number the rows
        var i = 1;
        $('#saved-query-dialog .query-row').each(function(){
            $('.query-num', this).html(i+") ");
            $('input[type=text]', this).prop('name', 'qtitle_'+i);
            $('textarea', this).prop('name', 'qsql_'+i);
            i++;
        });
    }
    function deleteRow(ob)
    {
        // If there's only one row, then just clear out the text boxes
        if ($('.query-row').length == 1) {
            $('.query-row :input').val('');
            $('.query-row:first :input:first').focus();
        } else {
            var thisRow = $(ob).closest('.query-row');
            thisRow.fadeOut(500);
            setTimeout(function(){
                thisRow.remove();
                formatRows();
            }, 550);
        }
    }
    function addRow()
    {
        var $div = $('.query-row:last').clone();
        $('#add-row-parent').before($div);
        $('.query-row:last :input').val('');
        formatRows();
        fitDialog($('#saved-query-dialog'));
    }
    $(function(){

        $('button').click(function(){
            setTimeout("$('#form').prop('action',window.location.href);",100);
            setTimeout("$('#form').prop('action',window.location.href);",1000);
        });

        var errors = 0;
       $('#open-saved-query-dialog').click(function(){
           $.post(app_path_webroot+page, { view_custom_queries: 1 }, function(data){
               // Display dialog to enter saved queries
               initDialog('saved-query-dialog');
               $('#saved-query-dialog').html(data);
               formatRows();
               $('#saved-query-dialog').dialog({ bgiframe: true, modal: true, width: 650, title: '<?=RCView::tt_js('control_center_4812')?>', buttons: {
                   '<?=RCView::tt_js('global_53')?>': function () {
                       $(this).dialog('close');
                   },
                   '<?=RCView::tt_js('control_center_4818')?>': function () {
                       errors = 0;
                       // Save Queries: Validate data
                       $('#saved-query-dialog input:visible, #saved-query-dialog textarea').each(function() {
                           if (errors > 0) return;
                           $(this).val($(this).val().trim());
                           var targetTag = $(this).get(0).tagName.toLowerCase();
                           // Make sure there is a value
                           if ($(this).val() == '' && $('.query-row').length > 1) {
                               simpleDialog('<?=RCView::tt_js('control_center_4820')?>');
                               errors = 1;
                           } else
                           // Make sure query begins with select or show
                           if ($(this).val() != '' && targetTag == 'textarea' && ($(this).val().toLowerCase().indexOf('select') !== 0 && $(this).val().toLowerCase().indexOf('show') !== 0 && $(this).val().toLowerCase().indexOf('explain') !== 0)) {
                               simpleDialog('<?=RCView::tt_js('control_center_4825')?>');
                               errors = 1;
                           }
                       });
                       if (errors > 0) return;
                       // AJAX to save
                       $(this).dialog('close');
                       showProgress(1);
                       $.post(app_path_webroot+page, $('#saved-query-dialog-form').serializeObject(), function(data2){
                           showProgress(0,0);
                           if (data2 == '1') {
                               simpleDialog('<div class="darkgreen"><i class="fas fa-check"></i> <?=RCView::tt_js('control_center_4819')?></div>', '<?=RCView::tt_js('global_79')?>', null, null, "showProgress(1);window.location.reload();", '<?=RCView::tt_js('design_401')?>');
                           } else {
                               alert(woops);
                               //window.location.reload();
                           }
                       });
                   } }
               });
               fitDialog($('#saved-query-dialog'));
               $('.ui-dialog-buttonpane button:eq(1)').css('font-weight','bold');
           });
       });
    });
    </script>

    <div style="padding-left:10px;">
    <h4 style="color:#A00000;margin:0 0 10px;"><i class="fas fa-database"></i> <?=RCView::tt('control_center_4803')?></h4>
    <p style="margin:20px 0;max-width:1000px;"><?=RCView::tt('control_center_4804')?></p>
    <?php
}

// Page must be enabled via the back-end
if ($database_query_tool_enabled != '1')
{
    print RCView::p(['class'=>'red'],
            RCView::tt('control_center_4805')
        ) .
        RCView::code([], "UPDATE redcap_config SET value = '1' WHERE field_name = 'database_query_tool_enabled';");
    include APP_PATH_DOCROOT . 'ControlCenter/footer.php';
    exit;
}

if (!SUPER_USER) {
    print RCView::p(['class'=>'red'],
            RCView::tt('control_center_4806')
        );
    include APP_PATH_DOCROOT . 'ControlCenter/footer.php';
    exit;
}

## DEFAULT SETTINGS
$query_limit = 500;
$query = "";
$display_result = "";



// Get list of tables in db
$q = db_query("show tables");
$table_list = array();
while ($row = db_fetch_array($q)) 
{
	$table_list[] = $row[0];
}

// If clicked a saved query
if ($_SERVER['REQUEST_METHOD'] != 'POST' && isset($_GET['q']) && isset($customQueries[$_GET['q']])) {
	$query = trim(html_entity_decode($customQueries[$_GET['q']]['query'], ENT_QUOTES));
}
// If query was submitted, then execute it
elseif ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['query']) && !$isAjax)
{
	// Sanitize query
	$query = trim(html_entity_decode($_POST['query'], ENT_QUOTES));
}
// Do select * of selected table
elseif (isset($_GET['table']) && in_array($_GET['table'], $table_list))
{
	$query = "select * from " . htmlentities($_GET['table'], ENT_QUOTES);
	if (isset($_GET['field']) && isset($_GET['value'])) {
		$_GET['field'] = preg_replace("/[^0-9a-zA-Z_]/", "", $_GET['field']);
		$query .= " where " . prep($_GET['field']) . " = '" . prep($_GET['value']) . "'";
	}
}

// Trim semi-colon from the end, if needed
$query = rtrim(trim($query), ";");
$queryHasLimit = ($query != "" && preg_match("/\blimit\s+\d+/i", $query));

if ($query != "")
{
	// Add query limit (unless already exists in query)
	$query_executed = $queryHasLimit ? $query : "$query limit 0,$query_limit";
	// Execute query
	$foreign_key_array = array();
	$mtime = explode(" ", microtime());
	$starttime = $mtime[1] + $mtime[0];
    $query_errno = "";

	$allowedQueryTypes = [
		'select',
		'show',
		'explain'
	];

	if (isQueryType($query, $allowedQueryTypes))
	{
		// SELECT
		if (isQueryType($query, 'select'))
		{
			// Find total rows that could be returned
            $q = db_query($query_executed);
			$mtime = explode(" ", microtime());
			$endtime = $mtime[1] + $mtime[0]; 
			// Check for errors
			$query_error = db_error();
			$query_errno = db_errno();
			
			## FOREIGN KEYS
            if (!$doExport)
            {
                // Place all SQL into strings, segregating create table statements and foreign key statements
                $foreign_key_array = $query_tables = array();
                $parser = new PHPSQLParser($query);
                if (isset($parser->parsed['FROM'])) {
                    foreach ($parser->parsed['FROM'] as $attr) {
                        $query_tables[] = $attr['table'];
                    }
                }
                // Now do "create table" to obtain all the FK for each table
                foreach ($query_tables as $this_table) {
                    // Do create table
                    $q3 = db_query("show create table `$this_table`");
                    if (!$q3) continue;
                    $row3 = db_fetch_assoc($q3);
                    $create_table_statement = $row3['Create Table'];
                    // Make sure all line breaks are \n and not \r
                    $create_array = explode("\n", str_replace(array("\r\n", "\r", "\n\n"), array("\n", "\n", "\n"), trim($create_table_statement)));
                    // Check each line
                    foreach ($create_array as $line) {
                        // Trim the line
                        $line = trim($line);
                        // If a foreign key
                        if (substr($line, 0, 11) == 'CONSTRAINT ') {
                            // Format the line
                            $fkword_pos = strpos($line, "FOREIGN KEY ");
                            $fkline = trim(substr($line, $fkword_pos));
                            if (substr($fkline, -1) == ',') $fkline = substr($fkline, 0, -1);
                            // Isolate the field names
                            $first_paren_pos = strpos($fkline, "(") + 1;
                            $fk_field = trim(str_replace("`", "", substr($fkline, $first_paren_pos, strpos($fkline, ")") - $first_paren_pos)));
                            // Get reference table
                            $fkword_pos = strpos($line, "REFERENCES `");
                            $fkline = trim(substr($line, $fkword_pos + strlen("REFERENCES `")));
                            $fk_ref_table = trim(substr($fkline, 0, strpos($fkline, "`")));
                            // Get reference field
                            $ref_field = trim(substr($fkline, strpos($fkline, "(`") + strlen("(`"), strpos($fkline, "`)") - strpos($fkline, "(`") - strlen("(`")));
                            // Add FK line to FK array
                            $foreign_key_array[$this_table][$fk_field] = array('ref_table' => $fk_ref_table, 'ref_field' => $ref_field);
                        }
                    }
                }
            }
		}
		// SHOW or EXPLAIN
		else
		{
			$q = db_query($query);
			$mtime = explode(" ", microtime());
			$endtime = $mtime[1] + $mtime[0];
			// Check for errors
			$query_error = db_error();
			$query_errno = db_errno();
		}
	} 
	else 
	{
		$query_error = $lang['control_center_4816']." " . strtoupper(implode(', ', $allowedQueryTypes));
	}
    $total_execution_time = isset($endtime) ? round($endtime - $starttime, 4) : 0;
	// Query failed
	if (!$q || $query_error != "")
	{
		$display_result .= "<div class='red' style='font-family:arial;'><b>".db_get_server_type()." error $query_errno:</b><br>$query_error</div>";
	}
	// Successful query, give results
	else
	{
        $query_field_info = db_fetch_fields($q);
        $num_rows = db_num_rows($q);
        $num_cols = db_num_fields($q);

        // Perform CSV export
        if ($doExport)
        {
            // Get headers
            $headers = [];
            foreach ($query_field_info as $attr) {
                $headers[] = $attr->name;
            }
            // Open connection to create file in memory and write to it
            $fp = fopen('php://memory', "x+");
            // Add header row to CSV
            fputcsv($fp, $headers, User::getCsvDelimiter());
            // Loop through array and output line as CSV
            while ($row = db_fetch_assoc($q))
            {
                foreach ($row as &$val) {
                    if ($val === null) $val = "";
                }
                fputcsv($fp, $row, User::getCsvDelimiter());
            }
            unset($val);
            // Open file for reading and output to user
            fseek($fp, 0);
            $output = trim(stream_get_contents($fp));
            fclose($fp);
            // Output to file
            header('Pragma: anytextexeptno-cache', true);
            header("Content-type: application/csv");
            header("Content-Disposition: attachment; filename=query_tool_export_".date("Y-m-d_His").".csv");
            print addBOMtoUTF8($output);
            // Logging
            Logging::logEvent($query,"redcap_log_event","MANAGE",'',$query,"Export query results in Database Query Tool");
            exit;
        }

        // Logging
        Logging::logEvent($query,"redcap_log_event","MANAGE",'',$query,"Execute query in Database Query Tool");

        // If the rows returned = query_limit and limit does not exist in query, then remind admin that more rows might exist
        $moreRowsText = "";
        if ($num_rows == $query_limit && !$queryHasLimit) {
            $moreRowsText = "<div style='font-size:11px;line-height:1.1;margin:5px 5px 15px;color:#C00000;'><i class=\"fa-solid fa-circle-exclamation mr-1\"></i>NOTICE: 
                            More rows might exist that are not displayed here because \"<b>LIMIT 0,500</b>\" was auto-added to limit the size of the results.</div>";
        }

        // Display webpage
		$display_result .= "<p>
								Returned <b>$num_rows</b> rows
								<i>(executed in $total_execution_time seconds)</i> $moreRowsText
							</p>";
		
		$display_result .= "<table class='dt2' style='font-family:Verdana;font-size:11px;' border='1'>
								<tr class='grp2'>
									<td colspan='$num_cols'>
									    <div style='max-width:800px;'>
                                            <div class='float-end m-1 ms-3'>
                                                <button class='btn btn-xs btn-primaryrc fs11' onclick=\"$('#form').prop('action', $('#form').prop('action')+'?export=1');$('#form').submit();\"><i class=\"fas fa-download\"></i> ".RCView::tt('control_center_4826')."</button>
                                            </div>
                                            <div class='float-start mt-1' style='display:inline;max-width:600px;font-size:12px;font-weight:normal;padding:5px 5px 8px;color:#C00000;font-family:monospace;'>
                                                " . htmlentities($query_executed, ENT_QUOTES) . "
                                            </div>
                                        </div>
									</td>
								</tr>
								<tr class='hdr2' style='white-space:normal;'>";
			
		// Display column names as table headers
		for ($i = 0; $i < $num_cols; $i++) {			
			$this_fieldname = db_field_name($q,$i);			
			//Display the Label and Field name
			$display_result .= "	<td style='padding:5px;font-size:10px;'>".htmlspecialchars($this_fieldname, ENT_QUOTES)."</td>";
		}			
		$display_result .= "    </tr>";	
		
		// Display each table row
		$j = 1;
        $class = "odd";
		while ($row = db_fetch_array($q)) 
		{
			$class = ($j%2==1) ? "odd" : "even";
			$display_result .= "<tr class='$class'>";			
			for ($i = 0; $i < $num_cols; $i++) 
			{
				// Display value
				if ($row[$i] === null) {
					$this_display = $this_value = "<i style='color:#aaa;'>NULL</i>";
				} else {
					$this_value = nl2br(htmlspecialchars($row[$i], ENT_QUOTES));
					if (strlen($this_value) > 200) {
						$this_display = "<div class='rcp'>
											" . substr($this_value, 0, strpos(wordwrap($this_value, 200), "\n")) . "<br>
											(<a href='javascript:showMore();'>...show more</a>)
										 </div>
										 <div class='rcf'>$this_value</div>";
					} else {
						$this_display = $this_value;
						// Foreign Key linkage: Get this column's table and field name
						if (isset($foreign_key_array[$query_field_info[$i]->orgtable][$query_field_info[$i]->orgname])) {
							$ref_table = $foreign_key_array[$query_field_info[$i]->orgtable][$query_field_info[$i]->orgname]['ref_table'];
							$ref_field = $foreign_key_array[$query_field_info[$i]->orgtable][$query_field_info[$i]->orgname]['ref_field'];
							// Make value into link to other table
							$this_display = "<a href='$baseUrl?table=$ref_table&field=$ref_field&value=".htmlspecialchars($this_display, ENT_QUOTES)."'>$this_display</a>";
						}
					}
				}
				// Cell contents
				$display_result .= "<td class='query_cell'>$this_display</td>";
			}			
			$display_result .= "</tr>";
			$j++;
		}
		// If returned nothing
		if ($j == 1)
		{
			$display_result .= "<tr class='$class'>
									<td colspan='$num_cols' style='color:#777;padding:3px;border-top:1px solid #CCCCCC;font-size:10px;'>
										Zero rows returned
									</td>
								</tr>";
		
		}
			
		$display_result .= "</table>";
	}
}











?>
<style>
    .btn-clear-search {
        background-color: var(--bs-gray-200);
        border: 1px solid #ced4da;
        color: var(--bs-danger);
    }
    .dqt-search > input ~ span {
        display: none;
    }
    .dqt-search > input:placeholder-shown ~ span {
        display: block;
    }
    .dqt-search > input ~ button.btn-clear-search {
        display: block;
    }
    .dqt-search > input:placeholder-shown ~ button.btn-clear-search {
        display: none;
    }
</style>
<table style="width:100%;">
	<tr>
		<td valign="top" id="west2">
			<!-- TABLE MENU -->
			<div style="width:95%;">
				<div style="font-weight:bold;padding:0 3px 5px 0;"><?=RCView::tt('control_center_4811')?></div>
				<?php if (!empty($customQueries)){ ?>
				<ol style="padding-inline-start:15px;">
					<?php foreach ($customQueries as $key => $cattr) { ?>
					<li style="line-height:12px;margin:3px 0;font-size:10px;">
						<a href="javascript:;" style="text-decoration:underline;font-size:10px;" onclick="loadCustomQuery(<?=$key?>);"><?php echo htmlspecialchars($cattr['title'], ENT_QUOTES, 'UTF-8') ?></a>
					</li>
					<?php } ?>
				</ol>
				<?php } ?>
                <button id="open-saved-query-dialog" class="btn btn-xs fs11 ms-3 btn-defaultrc" onclick=""><i class="fas fa-plus"></i> <?=RCView::tt('control_center_4812')?></button>
				<hr>
				<div style="font-weight:bold;padding:0 3px 5px 0;"><?=RCView::tt('control_center_4813')?></div>
                <div class="input-group input-group-sm mb-2 dqt-search">
                    <input type="text" class="form-control dqt-filter-text fs12" placeholder="<?=RCView::tt_attr("report_builder_31") // Filter?>">
                    <span class="input-group-text fs12"><i class="fa-solid fa-filter"></i></span>
                    <button class="btn btn-secondary btn-clear-search fs12" type="button"><i class="fa-solid fa-filter-circle-xmark"></i></button>
                </div>
                <div class="database-tables-list">
                    <?php foreach ($table_list as $this_table) { ?>
                        <div class="ps-1" style="line-height:1.2;">
                            <a href="javascript:;" style="text-decoration:underline;font-size:11px;" onclick="window.location.href='<?php echo $baseUrl ?>?table=<?php echo $this_table ?>';"><?php echo $this_table ?></a>
                        </div>
                    <?php } ?>
                </div>
			</div>
		</td>
		<td valign="top" id="center2">
			<!-- MAIN WINDOW -->
			<div style="font-weight:bold;margin-bottom:2px;"><?=RCView::tt('control_center_4814')?></div>
			<form action="<?php echo $baseUrl ?>" enctype="multipart/form-data" target="_self" method="post" name="form" id="form">
				<textarea id="query" name="query" style="font-family:monospace;resize:auto;width:100%;max-width:800px;font-size:14px;height:200px;padding:5px;" placeholder="select * from redcap_config"><?php echo htmlentities($query, ENT_QUOTES) ?></textarea>
				<div class="">
					<button class="btn btn-sm btn-primaryrc fs15" onclick="showProgress(1,1);$('#form').submit();"><?=RCView::tt('control_center_4815')?></button>
				</div>
			</form>
			<!-- RESULT -->
			<?php if ($display_result != "") echo "<div style='padding:20px 0;margin-top:30px;border-top:1px solid #aaa;'>$display_result</div>"; ?>		
		</td>
	</tr>
</table>
</div>
<script type="text/javascript">
    const searchTextCookieName = 'dqt-filter';
    $('.btn-clear-search').on('click', () => $('input.dqt-filter-text').val('').trigger('keyup'));
    $('input.dqt-filter-text').on('keyup', function(e) {
        const searchText = e.target.value.toLowerCase();
        const items = document.querySelectorAll('div.database-tables-list div');
        items.forEach((e) => e.classList[searchText == '' || e.textContent.includes(searchText) ? 'remove' : 'add']('hide'));
        // Store
        setCookie(searchTextCookieName, searchText);
    });
    // Set filter and width
    const prevSearch = getCookie(searchTextCookieName) ?? '';
    $(function() {
        const $list = $('div.database-tables-list');
        $list.css('min-width', $list[0].offsetWidth+10+'px');
        if (prevSearch != '') {
            $('input.dqt-filter-text').val(prevSearch).trigger('keyup');
        }
    });
</script>
<?php
include APP_PATH_DOCROOT . 'ControlCenter/footer.php';
