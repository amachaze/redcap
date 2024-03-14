<?php

if(version_compare(phpversion(), '8.2', '>=')){
    /**
     * We replace these classes with empty versions to avoid PHP 8.2 related warnings.
     */
    require_once __DIR__ . '/replaced-classes/SerializableClosure.php';
    require_once __DIR__ . '/replaced-classes/ListResource.php';
    require_once __DIR__ . '/replaced-classes/Node.php';
}

require_once __DIR__ . '/../redcap_connect.php';