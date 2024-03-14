<?php namespace ExternalModules;

require_once __DIR__ . '/../classes/ScanConstants.php';
require_once __DIR__ . '/HeaderTaintAnalyzer.php';

use Psalm\Issue\TaintedHeader;
use Psalm\Issue\TaintedSSRF;
use Psalm\Plugin\EventHandler\Event\BeforeAddIssueEvent;

class REDCapPsalmPlugin implements
    \Psalm\Plugin\EventHandler\AfterExpressionAnalysisInterface,
    \Psalm\Plugin\EventHandler\AfterFunctionCallAnalysisInterface,
    \Psalm\Plugin\EventHandler\AfterMethodCallAnalysisInterface,
    \Psalm\Plugin\EventHandler\BeforeAddIssueInterface
{
    private static $safeColumns;

    public static function init(): void
    {
        /**
         * Make all DB queries ahead of time.
         * If we don't, psalm will end up calling the same DB query
         * from multiple threads simultaneously on some modules (e.g. Flight Tracker).
         * This triggers REDCap's duplicate request killing ("multiple browser tabs" errors).
         */
        static::setSafeDBColumns();
    }

    public static function beforeAddIssue(BeforeAddIssueEvent $event): ?bool
    {
        $issue = $event->getIssue();

        if(is_a($issue, TaintedHeader::class) && HeaderTaintAnalyzer::shouldIgnore($issue)){
            return false;
        }
        else if(static::isDBTaintSource($issue)){
            if(is_a($issue, TaintedSSRF::class)){
                /**
                 * A server-side request containing data from the database
                 * is an expected use case for REDCap.  Ignore this taint.
                 */
                return false;
            }

            foreach($issue->journey as $step){
                $entryPathType = $step['entry_path_type'] ?? '';
                $parts = explode('arrayvalue-fetch-', $entryPathType);
                if(count($parts) !== 2){
                    continue;
                }
                
                $parts = explode("'", $parts[1]);
                if(count($parts) !== 3){
                    continue;
                }

                $columnName = $parts[1];
                if(static::isSafeDBColumn($columnName)){
                    /**
                     * Ignore this DB column, since it cannot contain a string.
                     */
                    return false;
                }
            }
        }

        return null;
    }

    private static function isDBTaintSource($issue){
        $items = ScanConstants::DB_TAINT_SOURCE_METHODS;
        $items[] = 'mysqli_result::';
        foreach($items as $item){
            // Psalm seems inconsistent on casing in some cases.  This ensures all cases match.
            $journey = strtolower($issue->journey_text ?? '');
            $item = strtolower($item);

            if(str_starts_with($journey, $item)){
               return true;
            }
        }

        return false;
    }

    private static function isSafeDBColumn($name){
        return isset(static::$safeColumns[$name]);
    }

    private static function setSafeDBColumns(){
        $safeTypes = array_flip([
            'bigint',
            'date',
            'datetime',
            'double',
            'enum',
            'float',
            'int',
            'mediumint',
            'smallint',
            'time',
            'timestamp',
            'tinyint'
        ]);

        $result = ExternalModules::query("
            select column_name, data_type
            from information_schema.columns
            where table_schema = database()
            and table_name not in (
                'redcap_projects_external' -- this table has some oddities
            )
        ", []);
        
        $candidates = [];
        $unsafeColumns = [];
        while($row = $result->fetch_assoc()){
            $name = $row['column_name'];
            $type = $row['data_type'];

            if(isset($safeTypes[$type])){
                $candidates[$name] = $type;
            }
            else{
                $unsafeColumns[$name] = $type;
            }
        }

        static::$safeColumns = array_diff_key($candidates, $unsafeColumns);
    }

    static function afterFunctionCallAnalysis(\Psalm\Plugin\EventHandler\Event\AfterFunctionCallAnalysisEvent $event): void{
        // var_dump($event->getFunctionId());
    }

    static function afterMethodCallAnalysis(\Psalm\Plugin\EventHandler\Event\AfterMethodCallAnalysisEvent $event): void{
        $methodId = $event->getMethodId();
        list($class, $methodName) = explode('::', $methodId);

        if($methodName === '__get'){
            return;
        }

        static::checkTaint($event, $class, $methodName);
    }

    static function afterExpressionAnalysis(\Psalm\Plugin\EventHandler\Event\AfterExpressionAnalysisEvent $event): ?bool{
        $expr = $event->getExpr();

        if(get_class($expr) === 'PhpParser\\Node\\Expr\\PropertyFetch'){
            $class = static::getVariableType($event, $expr->var);
            if($class !== null){
                // This line avoids a warning when scanning https://github.com/Nottingham-CTU/REDCap-API-Client/archive/refs/tags/v1.2.1.zip
                $name = $expr->name->name ?? null;
                static::checkTaint($event, $class, '$' . $name);
            }
        }

        return null;
    }
    
    static function getVariableType($event, $v){
        if(isset($v->class)){
            return $v->class->getAttributes()['resolvedName'];
        }
        else if(isset($v->name) && gettype($v->name) === 'string'){
            $var = $event->getContext()->vars_in_scope['$' . $v->name] ?? null;
            if($var !== null){
                return $var->getId();
            }
        }

        /**
         * We don't currently support cases like this.
         * Scan Vizr and Multilingual for examples.
         */
        return null;
    }

    static function isTaintSource($class, $methodOrProperty){
        if($class === 'Project'){
            return true;
        }
        else if(
            $class === 'REDCap'
            &&
            $methodOrProperty === 'getdata'
        ){
            return true;
        }

        return false;
    }

    static function checkTaint($event, $class, $methodOrPropertyName){
        if(!static::isTaintSource($class, $methodOrPropertyName)){
            return;
        }

        $label = "$class::$methodOrPropertyName";
        $id = $label;
        if(!str_starts_with($methodOrPropertyName, '$')){
            /**
             * Method IDs must be made lower case for methods (but not properties).
             */
            $id = strtolower($id);
        }

        $event->getCodeBase()->taint_flow_graph->addSource(new \Psalm\Internal\DataFlow\TaintSource(
            $id,
            $label,
            null,
            null,
            \Psalm\Type\TaintKindGroup::ALL_INPUT,
        ));
    }
}

REDCapPsalmPlugin::init();