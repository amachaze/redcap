<?php

namespace Vanderbilt\REDCap\Classes\MyCap\Api\DB;

use Vanderbilt\REDCap\Classes\MyCap\Api\Exceptions\StudyNotFoundException;

/**
 * Enumerates error types for the API class
 */
class Project
{
    /**
     * Load metadata given a study code
     *
     * @param $code
     * @throws \Exception
     * @throws StudyNotFoundException
     */
    public function loadByCode($code)
    {
        $project = array();
        $sql = "SELECT * FROM redcap_mycap_projects WHERE code = '" . db_escape($code) ."'";
        $q = db_query($sql);
        if (db_num_rows($q) == 0) {
            throw new StudyNotFoundException("Could not find study code $code");
        } elseif (db_num_rows($q) > 1) {
            throw new \Exception(
                "Metadata project contains multiple data projects with code $code. There should only be 1"
            );
        } else {
            while ($row = db_fetch_assoc($q)) {
                foreach ($row as $key=>$value) {
                    $project[$key] = $value;
                }
            }
        }
        return $project;
    }
}
