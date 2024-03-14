<?php
namespace Vanderbilt\REDCap\Classes\DTOs;

use JsonSerializable;
use ReflectionObject;
use ReflectionProperty;
use Vanderbilt\REDCap\Classes\Traits\CanMakeDateTime;

/**
 * base for a Data Transfer Object:
 * an object that carries data between processes
 */
abstract class DTO implements JsonSerializable {

    use CanMakeDateTime;

    /**
     * list of keys that will not be exposed in 
     * the JSON serialized payload
     *
     * @var array
     */
    protected $hidden = [];
    
    /**
     *
     * @param array $data associative array
     */
    public function __construct($data=[]) {
        $this->loadData($data);
    }

    /**
     * load data from a compatible DTO or an associative array
     *
     * @param array $data
     * @return void
     */
    public function loadData($data=[]) {
        if($data instanceof DTO)
            $data = $data->getData();
        
        if(!is_array($data)) return;

        foreach ($data as $key => $value) {
            $this->setProperty($key, $value);
        }
        $this->onDataLoaded();
    }

    /**
     * set a property if exists
     * also trigger the onPropertySet method
     *
     * @param string $key
     * @param mixed $value
     * @return void
     */
    public function setProperty($key, $value) {
        $property = $this->normalizeKey($key);
        if(!property_exists($this, $property)) return;
        $visited = $this->visitProperty($key, $value);
        $this->$property = $visited;
    }

    /**
     * called every time a property is set
     * override this method to adjust values
     *
     * @param string $key
     * @param mixed $value
     * @return mixed return the visited valud
     */
    public function visitProperty($key, $value) { return $value; }

    /**
     * called everytime data is loaded
     *
     * @return void
     */
    public function onDataLoaded() {}

    /**
     * normalize keys.
     *
     * @param string $key
     * @return string
     */
    private function normalizeKey($key) {
        return preg_replace('/[\.-]/', '_', $key);
    }

    /**
     * get an associative array with all the public key with an assigned value
     *
     * @return array
     */
    public function getData() {
        $reflect = new ReflectionObject($this);
        $properties = $reflect->getProperties(ReflectionProperty::IS_PUBLIC);
        $data = [];
        foreach ($properties as $property) {
            $value = $property->getValue($this);
            // if(is_null($value)) continue;
            $data[$property->getName()] =  $value;
        }
        return $data;
    }

    public function __serialize(): array {
        return $this->getData();
    }

    public function __unserialize(array $data): void {
		$this->loadData($data);
    }

    const SET_PREFIX = 'set';

    /**
     * allow to use dynamic set{PropertyName}
     * setters
     *
     * @param string $name
     * @param mixed $arguments
     * @return static
     */
    public function __call($name, $arguments)
    {
        $propertyNameTag = 'propertyName';
        $startsWithSetPrefix = sprintf("/^%s(?<%s>.+)/", self::SET_PREFIX, $propertyNameTag);
        if(preg_match($startsWithSetPrefix, $name, $matches)!==1) return $this;
        $propertyName = $matches[$propertyNameTag] ?? false;
        if($propertyName===false) return $this;
        $reflect = new ReflectionObject($this);
        try {
            $property = $reflect->getProperty($propertyName);
            if(!$property->isPublic()) return $this;
            $value = $arguments;
            $property->setValue($value);
            return $this;
        } catch (\Throwable $th) {
            return $this;
        }
    }

    /**
     * create an instance using an associative array
     *
     * @param array $array
     * @return static
     */
    public static function fromArray($array) {
        return new static($array);
    }

    /**
     *
     * @return array
     */
    public function jsonSerialize(): array {
        $data = array_filter($this->getData(), function($value, $key) {
            return !in_array($key, $this->hidden);
        },ARRAY_FILTER_USE_BOTH);
        return $data;
    }

}