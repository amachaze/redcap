<?php namespace ExternalModules;

use Exception;

abstract class SharedBaseTest extends \PHPUnit\Framework\TestCase{
    protected function setPrivateVariable($name, $value, $target)
	{
		$class = new \ReflectionClass($target);
		$property = $class->getProperty($name);
		$property->setAccessible(true);

		return $property->setValue($class, $value);
	}

	protected function captureOutput($action){
		ob_start();
		try{
			$action();
		}
		finally{
			$output = ob_get_contents();
			ob_end_clean();
		}

		return $output;
	}

	protected function assertOutput($action, $expectedOutput){
		$output = $this->captureOutput($action);
		$this->assertSame($expectedOutput, $output);
	}

	protected function assertThrowsException($callable, $exceptionExcerpt)
	{
		$exceptionThrown = false;
		try{
			$callable();
		}
		catch(\Throwable $e){
			if(empty($exceptionExcerpt)){
				throw new Exception('You must specify an exception excerpt!  Here\'s a hint: ' . $e->getMessage());
			}

			if(!str_contains($e->getMessage(), $exceptionExcerpt)){
				throw new Exception("Could not find the string '$exceptionExcerpt' in the following exception message: " . $e->getMessage() . "\n\n" . $e->getTraceAsString());
			}

			$exceptionThrown = true;
		}

		if($exceptionExcerpt === null){
			$this->assertFalse($exceptionThrown);
		}
		else{
			$this->assertTrue($exceptionThrown, "An exception was not thrown where one was expected containing the following text: $exceptionExcerpt");
		}
	}

	protected function setExternalModulesProperty($name, $value)
	{
		$externalModulesClass = new \ReflectionClass("ExternalModules\\ExternalModules");
		$configsProperty = $externalModulesClass->getProperty($name);
		$configsProperty->setAccessible(true);
		$configsProperty->setValue(null, $value);
	}
}
