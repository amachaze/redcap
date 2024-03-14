#!/usr/bin/env php 
<?php namespace ExternalModules;
require_once __DIR__ . '/../redcap_connect.php';
ExternalModules::requireCommandLine();

echo APP_PATH_DOCROOT;