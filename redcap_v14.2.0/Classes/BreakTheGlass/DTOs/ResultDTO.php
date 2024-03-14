<?php
namespace Vanderbilt\REDCap\Classes\BreakTheGlass\DTOs;

use Vanderbilt\REDCap\Classes\DTOs\DTO;

class ResultDTO extends DTO {

    const STATUS_SKIPPED = 'skipped';
    const STATUS_ACCEPTED = 'accepted';
    const STATUS_NOT_ACCEPTED = 'not accepted';

    /**
     *
     * @var String
     */
    public $mrn;

    /**
     *
     * @var String
     */
    public $status;

    /**
     *
     * @var String
     */
    public $details;

}