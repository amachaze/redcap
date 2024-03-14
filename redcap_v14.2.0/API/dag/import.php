<?php
global $format, $returnFormat, $post;

# put all the records to be imported
$content = putItems();

# Logging
Logging::logEvent("", "redcap_data_access_groups", "MANAGE", PROJECT_ID, "project_id = " . PROJECT_ID, "Import DAGs (API$playground)");

# Send the response to the requestor
RestUtility::sendResponse(200, $content, $format);

function putItems()
{
    global $post, $format, $lang;
    $count = 0;
    $errors = array();
    $data = removeBOMfromUTF8($post['data']);

    $Proj = new Project();
    $dags = $Proj->getUniqueGroupNames();

    switch($format)
    {
        case 'json':
            // Decode JSON into array
            $data = json_decode($data, true);
            if ($data == '') return $lang['data_import_tool_200'];
            break;
        case 'xml':
            // Decode XML into array
            $data = Records::xmlDecode(html_entity_decode($data, ENT_QUOTES));
            if ($data == '' || !isset($data['dags']['item'])) return $lang['data_import_tool_200'];
            $data = (isset($data['dags']['item'][0])) ? $data['dags']['item'] : array($data['dags']['item']);
            break;
        case 'csv':
            // Decode CSV into array
            $data = str_replace(array('&#10;', '&#13;', '&#13;&#10;'), array("\n", "\r", "\r\n"), $data);
            $data = csvToArray($data);
            break;
    }

    // Begin transaction
    db_query("SET AUTOCOMMIT=0");
    db_query("BEGIN");

    list ($count, $errors) = DataAccessGroups::uploadDAGs(PROJECT_ID, $data);

    if (!empty($errors)) {
        // ERROR: Roll back all changes made and return the error message
        db_query("ROLLBACK");
        db_query("SET AUTOCOMMIT=1");
        die(RestUtility::sendResponse(400, implode("\n", $errors)));
    }

    db_query("COMMIT");
    db_query("SET AUTOCOMMIT=1");

    return $count;
}
