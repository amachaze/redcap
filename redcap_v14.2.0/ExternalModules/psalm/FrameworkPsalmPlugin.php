<?php namespace ExternalModules;

if(!interface_exists('Psalm\Plugin\EventHandler\BeforeAddIssueInterface')){
    require_once __DIR__ . '/EventStubs.php';
    require_once __DIR__ . '/EventHandlerStubs.php';
}

use Psalm\Issue\TaintedCallable;
use Psalm\Plugin\EventHandler\Event\BeforeAddIssueEvent;

/**
 * @psalm-suppress UnusedClass
 */
class FrameworkPsalmPlugin implements \Psalm\Plugin\EventHandler\BeforeAddIssueInterface
{
    public static function beforeAddIssue(BeforeAddIssueEvent $event): ?bool
    {
        $issue = $event->getIssue();

        if(is_a($issue, TaintedCallable::class)){
            $inPath = [];
            foreach($issue->journey as $step){
                $location = $step['location'];
                if($location === null){
                    continue;
                }
                
                $text = $location->getSelectedText();

                $inPath[$text] = true;
            }

            if(
                end($issue->journey)['label'] === '$classNameWithNamespace'
                &&
                isset($inPath['getAdditionalFieldChoices'])
            ){
                return false;
            }
        }

        return null;
    }
}