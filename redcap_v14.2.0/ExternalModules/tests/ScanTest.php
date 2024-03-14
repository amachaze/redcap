<?php namespace ExternalModules;

require_once APP_PATH_EXTMOD . 'classes/Scan.php';
require_once APP_PATH_EXTMOD . 'classes/ScanConstants.php';
require_once __DIR__ . '/phpcs-shared/SniffMessages.php';

/**
 * @group slow
 */
class ScanTest extends BaseTest
{
   const PHP_TEMP_FILE_NAME = 'scan-test-temp-file.php';
   const VUE_TEMP_FILE_NAME = 'scan-test-temp-file.vue';
   const JS_TEMP_FILE_NAME = 'scan-test-temp-file.js';
   const WEBPACK_TEMP_FILE_NAME = 'scan-test-temp-file-webpack.js';

   static $output;
   static $actualTaints = [];
   static $actualJavaScriptFileErrors = [];
   static $actualPHPCSErrors = [];
   static $systemPageHookWarning;
   static $systemEmailHookWarning;
   static $composerPHPVersionError;

   static function setUpBeforeClass(): void{
      parent::setUpBeforeClass();
      static::setOutput();
   }

   function setUp(): void{
      if(static::areTestsSkipped()){
         $this->markTestSkipped();
         return;
      }

      parent::setUp();
   }

   private static function areTestsSkipped(){
      $parts = explode(':\\', __DIR__);
      if(PHP_OS_FAMILY === 'Windows' && $parts[0] !== 'C' && str_starts_with($parts[1], 'home\\')){
         throw new \Exception("
            You appear to be running Windows PHP against a WSL filesystem, which is not currently supported.
            Please either run Windows PHP against a Windows filesystem, or temporarily comment out this Exception
            in order to skip this test.
         ");

         return true;
      }

      return false;
   }

   private static function setOutput(){
      if(static::areTestsSkipped()){
         return;
      }

      $scanTestPHPTempFile = __DIR__ . '/test-module/' . static::PHP_TEMP_FILE_NAME;
      file_put_contents($scanTestPHPTempFile, '
         <script>
            eval // Make sure JS in PHP files is scanned
         </script>
         <?php
         $phpCompatibilityExample = "1" . 1 + 1;

         const SOME_CONST;
         function someFunction();
         class SomeClass;
      ');

      $scanTestEmptyPHPTempFile = __DIR__ . '/test-module/scan-test-empty-temp-file.php';
      file_put_contents($scanTestEmptyPHPTempFile, '');

      $scanTestVueTempFile = __DIR__ . '/test-module/' . static::VUE_TEMP_FILE_NAME;
      file_put_contents($scanTestVueTempFile, '
         <script>
            eval(someInjectableVar)
         </script>
      ');

      $scanTestJSTempFile = __DIR__ . '/test-module/' . static::JS_TEMP_FILE_NAME;
      // The following lines should produce the same result in EvalInJavascriptSniff and eslint (with /*eslint no-eval: "error"*/ set)
      file_put_contents($scanTestJSTempFile, '
         // Should show errors
         eval
         someFunction(eval(someVar))
         ""+eval
         window["eval"]
window[\'eval\'] // Tests lack of leading indentation as well

         // Should NOT show errors
         .eval
         eval.
         someObject["eval"]
         medieval
         evaluation
         string.match(/foo-eval/)
         string.match(/foo|eval/)
         string.match(/eval-foo/)
         string.match(/eval|foo/)
         // eval
         /**
          * eval
          */
         eval("require")
         (0, eval)("this")
         ;{
            \'%eval%\': eval,
            "%eval%": eval,
         }

/**
 * Make sure global JS functions/vars do not throw errors,
 * because modules include a lot of third party libraries (like jQuery).
 */
function function1(){}
var var1
const const1
let let1

      ');

      $scanTestWebpackTempFile = __DIR__ . '/test-module/' . static::WEBPACK_TEMP_FILE_NAME;
      // The following lines should produce the same result in EvalInJavascriptSniff and eslint (with /*eslint no-eval: "error"*/ set)
      file_put_contents($scanTestWebpackTempFile, '
/*
 * ATTENTION: An "eval-source-map" devtool has been used.    
 */
// Should be ignored
eval("whatever");
// Should report an ERROR
eval("eval()");
');

      [$lines, $result] = static::scan('tests/test-module');
      unlink($scanTestPHPTempFile);
      unlink($scanTestEmptyPHPTempFile);
      unlink($scanTestVueTempFile);
      unlink($scanTestJSTempFile);
      unlink($scanTestWebpackTempFile);

      static::$output = implode("\n", $lines);
      static::assertSame(1, $result, 'Scan failed with output: ' . static::$output);

      $currentTaint = null;
      $lastLine = null;
      $saveTaint = function() use (&$currentTaint, &$lastLine){
         // Replace ansi color codes that prevent simple string matching
         $lastLine = str_replace('[30;47m', '', $lastLine);

         $parts = explode("'", $lastLine);
         if(count($parts) === 3){
            $label = $parts[1];
         }
         else if(preg_match_all('/([a-zA-Z_:]+)\(/', $lastLine, $matches)){
            $label = end($matches[1]);
         }
         else{
            $label = $lastLine;
         }
         
         $label = trim(str_replace('[0m', '', $label));

         static::$actualTaints[$label][] = $currentTaint;
      };

      $currentPHPCSFile = null;
      foreach($lines as $line){
         if(
            str_starts_with($line, static::JS_TEMP_FILE_NAME)
            ||
            str_starts_with($line, static::WEBPACK_TEMP_FILE_NAME)
         ){
            static::$actualJavaScriptFileErrors[] = $line;
         }
         else if(str_starts_with($line, "[0;31mWARNING[0m: The 'enable-every-page-hooks-on-system-pages' flag")){
            static::$systemPageHookWarning = true;
         }
         else if(str_starts_with($line, "[0;31mWARNING[0m: The 'enable-email-hook-in-system-contexts' flag")){
            static::$systemEmailHookWarning = true;
         }
         else if(str_starts_with($line, "[0;31mERROR[0m: A platform PHP version should be set in composer.json")){
            static::$composerPHPVersionError = true;
         }
         else if(str_starts_with($line, '[0;31mERROR[0m: ')){
            if($currentTaint !== null){
               $saveTaint();
            }

            $currentTaint = explode(' ', $line)[1];
         }
         else if($currentTaint !== null){
            if(str_starts_with($line, '---')){
               // We've reached the end of Psalm's output
               $saveTaint();
               $currentTaint = null;
            }
            else if(!empty(trim($line))){
               $lastLine = $line;
            }
         }
         else if(str_starts_with($line, 'FILE: ')){
            $currentPHPCSFile = basename(explode('FILE: ', $line)[1]);
         }
         else{
            $parts = explode(' | ', $line);
            if(in_array(trim($parts[1] ?? ''), ['WARNING', 'ERROR'])){
               // Assume this is a phpcs error
               $lineNumber = trim($parts[0]);
               static::$actualPHPCSErrors[$currentPHPCSFile][$lineNumber] = $parts[2];
            }
         }
      }
   }

   private static function scan($args){
      $args .= ' ' . Scan::SKIP_CLEAN_REPO_CHECK . ' ';

      $filter = getopt('', ['filter:'])['filter'] ?? null;
      if($filter === 'testWarnings'){
         // Speed up this test by only running the parts of the scan we need.
         $args .= ' ' . Scan::SKIP_LONG_RUNNING_CHECKS;
      }

      exec('php ' . __DIR__ . "/../bin/scan.php $args 2>&1", $lines, $result);
      return [$lines, $result];
   }

   function testIgnoredCasesAndNoAuthConfigWarnings(){
      /**
       * This foreach is not currently necessary, but will become necessary to ensure
       * clean scans if additional example modules are ever added.
       */
      foreach(glob(__DIR__ . "/../example_modules/*") as $exampleModuleDir){
         $emptyFile = "$exampleModuleDir/empty-file.php";
         $fileWithIgnoreIssuesPath = "$exampleModuleDir/file-with-ignore-scan-issues.php";

         file_put_contents($emptyFile, '');
         file_put_contents($fileWithIgnoreIssuesPath, '
            <?php namespace Test;
            /**
             * These lines would normally cause PHPCompatibility sniffs, but we exclude them in the "phpcs" command.
             * This test assures that they do not trigger errors.
             */
            class Test{
               function someFunction($arg){
                  $arg = "whatever";
                  debug_backtrace();
                  $this->$arg[] = 1;
                  Whatever::cpdf();
               }
            }
         ');

         $this->assertScanResult($exampleModuleDir, "
            [0;31mWARNING[0m: The 'enable-no-auth-logging' flag is set to 'true' in config.json.
            If logging is not required for unauthenticated users, please remove this flag from config.json.
            If this flag is required, please review changes since the last scan that could influence unauthenticated log behavior.
            To minimize risk of exploitation, please use hard coded strings or allow lists for logged variables wherever possible.
            If any logged values must be sourced from request variables, please ensure that a malicious actor cannot use those values
            to compromise security or adversely influence module behavior in any way.
            Please review both PHP and JavaScript log() calls.

            [0;31mWARNING[0m: The 'no-auth-ajax-actions' flag is set to 'true' in config.json.
            If the JavaScript module.ajax() method is not required for unauthenticated users, please remove this flag from config.json.
            If this flag is required, please review changes since the last scan that could influence unauthenticated ajax() call behavior.
            To minimize risk of exploitation, please use hard coded strings or allow lists for the ajax data/payload wherever possible.
            If any portion of the data/payload must be sourced from request variables, please ensure that a malicious actor cannot use that data
            to compromise security or adversely influence module behavior in any way.
         ");

         unlink($emptyFile);
         unlink($fileWithIgnoreIssuesPath);
      }
   }

   private function assertScanResult($exampleModuleDir, $expectedOutput){
      [$lines, $result] = $this->scan($exampleModuleDir);
      
      $expected = trim(Scan::formatMessage($expectedOutput) . "\n" . Scan::formatMessage("
         ---------------------------------------------------------------------------------------------
         
         Please review the results above, consider any WARNINGs, and address any ERRORs.
         Solutions to ERRORs should also be applied in comparable scenarios throughout the codebase,
         as this scan is not capable of finding all potential vulnerabilities.
         If you encounter false positives, or have any other difficulties running scans,
         please reach out to Mark McEver via mark.mcever@vumc.org or community.projectredcap.org.
      "));

      if(version_compare(PHP_VERSION, '7.4', '<')){
         $expected = "[0;31mWARNING[0m: It is recommended to run this tool on PHP 7.4 or newer to find the most potential vulnerabilities, and avoid the most false positives.\n\n\n$expected";

         $lines = array_filter($lines, function($line){
            if(str_starts_with($line, 'Error message: Warning - mysqli_query(): ')){
               /**
                * Not sure why these errors appear on Mark's local in 7.3,
                * but it is a non-issue, and this check can be removed once 7.4
                * or greater is the minimum supported REDCap version.
                */
               echo "$line\n";
               return false;
            }
   
            return true;
         });
		}

      $this->assertSame($result, 1);
      $this->assertSame($expected, trim(implode("\n", $lines)));
   }

   function testRegularOutput(){
      // Disabled for now.
      $this->expectNotToPerformAssertions();
      return;

      $actual = [];
      foreach($this->getOutput()['regular'] as $item){
         $count =& $actual[$item['message']];
         $count++;
      }

      $this->assertSame([
         'Too few arguments for method ExternalModules\AbstractExternalModule::query saw 0' => 6,
      ], $actual);
   }

   function testTaintAnalysisOutput(){
      $expected = [];

      $addExpected = function($expectedTaintTypes, $paramNames) use (&$expected){
         if(!is_array($expectedTaintTypes)){
            $expectedTaintTypes = [$expectedTaintTypes];
         }
   
         foreach($paramNames as $paramName){
            foreach($expectedTaintTypes as $type){
               $expected[$paramName][] = $type;
            }
         }
      };

      $queryArgs = [
         'db_query',
         'mysqli_query',
         'mysqli::query',
         'query 1',
         'query 2',
         'query 3',
         'Query::add() 1',
         'Query::add() 2',
         'queryData 1',
         'queryData 2',
         'queryData 3',
         'queryData 4',
         'query in module page',
         'queryLogs 1',
         'queryLogs 2',
      ];

      $dbTaintSources = ScanConstants::DB_TAINT_SOURCE_METHODS;
      if(version_compare(PHP_VERSION, '7.4', '<')){
         unset($dbTaintSources[0]);
      }

      $addExpected(['TaintedHtml', 'TaintedTextWithQuotes'], array_merge($queryArgs, $dbTaintSources, [
         'direct-echo',
         'return',
         'fetch_all',
         'fetch_array',
         'fetch_assoc',
         'fetch_column',
         // 'fetch_object', // TODO - Once this case is fixed in newer psalm versions, uncomment this and remove the 'fetch_object' string from the PHP_VERSION block below.
         'fetch_row',
         'project_id',
         'event_id',
      ]));

      if(version_compare(PHP_VERSION, '7.4', '<')){
         $addExpected(['TaintedHtml', 'TaintedTextWithQuotes'], [
            'fetch_object',
            'project_id',
            'event_id',
         ]);

         $addExpected(['TaintedSSRF'], ['whatever', 'db_fetch_assoc']);
         $addExpected(['TaintedHeader'], ['header']);
      }

      $addExpected(['TaintedHeader'], [
         'full-header',
         'unencoded-header',
         'unencoded-location-header',
      ]);

      $addExpected('TaintedSql', array_merge($queryArgs, [
         'getQueryLogsSql 1',
         'getQueryLogsSql 2',
      ]));

      if(version_compare(PHP_VERSION, '7.4', '>=')){
         $addExpected(['TaintedHtml', 'TaintedTextWithQuotes'], [
            'echo $project->metadata;',
            'echo (new \Project)->metadata;',
            'getGroups',
            'eventsToCSV',
            'Project::getDataEntry',
         ]);

         $addExpected(['TaintedHeader'], [
            'encoded-non-location-header',
         ]);
      }

      $addExpected(['TaintedHtml', 'TaintedTextWithQuotes'], [
         'ldap_get_attributes',
         'ldap_get_values_len',
         'ldap_get_values',
         'ldap_get_entries',
      ]);

      foreach($expected as $key=>&$child){
         sort($child);
      }

      foreach(static::$actualTaints as $key=>&$child){
         sort($child);
      }

      $this->assertEquals($expected, static::$actualTaints);
   }

   function testWarnings(){
      $this->assertTrue(static::$systemPageHookWarning);
      $this->assertTrue(static::$systemEmailHookWarning);
      $this->assertTrue(static::$composerPHPVersionError);
   }

   function testJavaScriptFiles(){
      $getLine = function($filename, $line, $message){
         return "$filename:$line - $message";
      };

      $expected = [
         $getLine(static::WEBPACK_TEMP_FILE_NAME, 7, SniffMessages::JS_EVAL)
      ];

      foreach([3,4,5,6,7] as $line){
         $expected[] = $getLine(static::JS_TEMP_FILE_NAME, $line, SniffMessages::JS_EVAL);
      }

      // We've seen files processed in different orders on different systems.
      sort($expected);
      sort(static::$actualJavaScriptFileErrors);

      $this->assertSame($expected, static::$actualJavaScriptFileErrors);
   }

   function testPHPCS(){
      $expectedPHPCSErrors = [];

      $newFunctionsSniffFunction = $this->getLineForFunction('newFunctionsSniff');
      $miscFunction = $this->getLineForFunction('misc');
      $psalmEscapeAttributeFunction = $this->getLineForFunction('psalmEscapeAttribute');
      $phpcsDisableFlagsFunctionLine = $psalmEscapeAttributeFunction+2;

      $expectedPHPCSErrors['TestModule.php'] = [
         $newFunctionsSniffFunction-2 => 'The module class contains a constructor.  We ask t',
         $newFunctionsSniffFunction+2 => 'The function mb_str_split() is not present in PHP ',
         $miscFunction+30 => 'The filter_tags() function was used instead of $module->escape()',
         $psalmEscapeAttributeFunction-2 => 'A @psalm-taint-escape attribute was found.  If this',
         $phpcsDisableFlagsFunctionLine+3 => 'Using an unparenthesized expression containing a "',
         $phpcsDisableFlagsFunctionLine+8 => 'Using an unparenthesized expression containing a "',
         $phpcsDisableFlagsFunctionLine+12 => 'Using an unparenthesized expression containing a "',
      ];

      $expectedPHPCSErrors[static::PHP_TEMP_FILE_NAME] = [
         3 => SniffMessages::JS_EVAL,
         6 => 'Using an unparenthesized expression containing a "." before a "+" or "-" has been deprecated in PHP 7.4 and removed in PHP 8.0'
      ];

      foreach([8,9,10] as $lineNumber){
         $expectedPHPCSErrors[static::PHP_TEMP_FILE_NAME][$lineNumber] = SniffMessages::MISSING_NAMESPACE;
      }

      $expectedPHPCSErrors[static::VUE_TEMP_FILE_NAME] = [
         3 => SniffMessages::JS_EVAL
      ];

      foreach([
         &$expectedPHPCSErrors,
         &static::$actualPHPCSErrors
      ] as &$linesByFilename){
         foreach($linesByFilename as &$errorsByLine){
            foreach($errorsByLine as $line => $error){
               /**
                * In larger terminals, PHPCS output is wrapped differently.
                * It stops wrapping past a point when the terminal gets too small.
                * The following limit should ensure that this test passes regardless of terminal window width.
                */
                $errorsByLine[$line] = substr($error, 0, 50);
            }
         }
      }

      // We've seen PHPCS scan files in different orders on different systems.
      ksort($expectedPHPCSErrors);
      ksort(static::$actualPHPCSErrors);

      $this->assertSame($expectedPHPCSErrors, static::$actualPHPCSErrors);
   }

   private function getLineForFunction($name){
      $lines = explode("\n", file_get_contents(__DIR__ . '/test-module/TestModule.php'));
      for($n=1; $n<=count($lines); $n++){
         $line = $lines[$n-1];
         if(str_contains($line, "function $name(")){
            return $n;
         }
      }

      throw new \Exception('Function not found: ' . $name);
   }

   function testCheckComposerConfig(){
      $s = new Scan();
      $targetPHPVersion = Scan::TARGET_PHP_VERSION;
      
      $getRelativeVersion = function($offset) use ($targetPHPVersion){
         $parts = explode('.', $targetPHPVersion);

         for($i=count($parts)-1; $i>=0; $i--){
            $part = $parts[$i];
            if($offset < 0 && $part === '0'){
               continue;
            }

            $parts[$i] = $part+$offset;
         }

         return implode('.', $parts);
      };

      $assertOutput = function($expectedOutput) use ($s){
         $this->assertOutput(function() use ($s){
            $s->checkComposerConfig();
         }, $expectedOutput);
      };

      $assert = function($composerMinVersion, $moduleMinVersion, $expectedOutput) use ($s, $getRelativeVersion, $assertOutput){
         $config = [];
         if($moduleMinVersion !== null){
            $config['compatibility']['php-version-min'] = $getRelativeVersion($moduleMinVersion);
         }
         $s->setConfig($config);

         $s->setComposerConfig([]);
         $assertOutput('');
         
         $composerConfig = ["name" => "what/ever"];
         if($composerMinVersion !== null){
            $composerConfig['config']['platform']['php'] = $getRelativeVersion($composerMinVersion);
         }
         $s->setComposerConfig($composerConfig);

         if($expectedOutput !== ''){
            $expectedOutput = "[0;31mERROR[0m: " . $expectedOutput;
         }

         $assertOutput($expectedOutput);
      };

      $assert(null, null, $s->getComposerVersionMissingMessage($targetPHPVersion, null, true));
      $assert(null, -1, $s->getComposerVersionMissingMessage($targetPHPVersion, null, true));
      $assert(null, 1, $s->getComposerVersionMissingMessage($getRelativeVersion(1), 'your module'));
      $assert(1, null, $s->getComposerHigherThanModulePHPVersionMessage());
      $assert(0, null, '');
      $assert(0, -1, '');
      $assert(0, 0, '');
      $assert(0, 1, '');
      $assert(1, 1, '');
      $assert(2, 1, $s->getComposerHigherThanModulePHPVersionMessage());
   }

   protected function tearDown(): void{
      $failureOutputPath = __DIR__ . '/' . SCAN_TEST_FAILURE_OUTPUT_FILENAME;

      if ($this->getStatus() === \PHPUnit\Runner\BaseTestRunner::STATUS_PASSED){
         if(file_exists($failureOutputPath)){
            unlink($failureOutputPath);
         }
      }
      else if(!empty(getenv('REDCAP_CI_DIR'))){
         /**
          * We're running a GitHub CI Workflow
          * Show scan output
          */
         echo "\n\nScan output:\n" . static::$output;
      }
      else{
         // Write scan script output to a file on failure, for easy troubleshooting.
         file_put_contents($failureOutputPath, static::$output);
      }
  }

	function testIsManuallyUploadedGitHubAssetUrl(){
		$assert = function($expected, $url){
			$this->assertSame($expected, Scan::isManuallyUploadedGitHubAssetUrl($url));
		};

		$assert(false, 'https://github.com/fom-ds-redcap/data-entry-trigger-builder/archive/1.1.0.zip');
		$assert(false, 'https://github.com/fom-ds-redcap/data-entry-trigger-builder/archive/refs/tags/1.1.0.zip');
		$assert(true,  'https://github.com/fom-ds-redcap/data-entry-trigger-builder/releases/download/1.1.0/data-entry-trigger-ubc-v1.1.0.zip');

		$this->assertThrowsException(function() use ($assert){
			$assert('whatever', 'https://github.com/fom-ds-redcap/data-entry-trigger-builder/some/other/url/format');
		}, 'Unrecognized GitHub URL format!');
	}
}