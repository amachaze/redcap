<?php
namespace ExternalModules;
require_once __DIR__ . '/../../redcap_connect.php';

$prefix = $_POST['moduleDirectoryPrefix'];
$page = $_POST['page'];
$pid = ExternalModules::getProjectId($_POST['pid']);

$url = ExternalModules::getPageUrl($prefix, $page)."&pid=".$pid;

echo json_encode(array(
    'status' => 'success',
    'url' => $url
));