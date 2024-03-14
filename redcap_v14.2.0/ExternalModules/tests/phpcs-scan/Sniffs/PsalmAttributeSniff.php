<?php namespace ExternalModules\Sniffs\Misc;

use PHP_CodeSniffer\Files\File;
use PHP_CodeSniffer\Sniffs\Sniff;

class PsalmAttributeSniff implements Sniff
{
    function register()
    {
        return [T_DOC_COMMENT_TAG];
    }

    function process(File $file, $position)
    {
        $content = $file->getTokens()[$position]['content'];
        if($content === '@psalm-taint-escape'){
            $file->addError('A @psalm-taint-escape attribute was found.  If this scenario is truly a false positive, please share it with mark.mcever@vumc.org so that he can modify the scan to ignore it.', $position, 'Found');
        }
    }
}
