<?php
namespace Vanderbilt\REDCap\Classes\Cache\StorageSystems;

use DateTime;
use Vanderbilt\REDCap\Classes\Cache\REDCapCache;
use Vanderbilt\REDCap\Classes\Utility\FileCache\FileCache;
use Vanderbilt\REDCap\Classes\Utility\FileCache\NameVisitorInterface;

/**
 * use a file-based cache
 */
class FileStorage implements StorageInterface
{
    private $project_id = null;
    private $fileCache = null;
    private $list;

    const NAMESPACE_PREFIX = 'redcap-cache-';
    const METADATA_KEY = 'METADATA';
    /**
     * set the cache modification time to NOW
     * these fiels will not be collected by the remove_temp_deleted_files
     * functuion of the FILES class
     */
    const CACHE_TTL = 0;

    /**
     *
     * @param int $project_id
     * @param FileCache $fileCache
     */
    public function __construct($project_id, FileCache $fileCache)
    {
        $cacheDir = empty($cacheDir) ? APP_PATH_TEMP : $cacheDir;
        $this->project_id = $project_id;
        $this->fileCache = $fileCache;
    }

    private function createFolderIfNeeded($folderPath) {
        // Check if the folder already exists
        if (file_exists($folderPath)) {
            return true;
        }
    
        // Try to create the folder
        return mkdir($folderPath, 0755, true);
    }
    

    public function __destruct()
    {
        $this->saveList();
    }

    /**
     *
     * @param StorageItem $storageItem
     * @return string
     */
    private function processDataForSaving($storageItem) {
        $processed = $storageItem;
        // Serialize the data
        $processed = serialize($storageItem);
    
        // Encrypt the serialized data
        $processed = encrypt($processed); 
    
        // Compress the encrypted data
        // $processed = gzcompress($processed, 9);
    
        return $processed;
    }
    

    /**
     *
     * @param string $data
     * @return StorageItem|false
     */
    private function processDataForRetrieval($data) {
        $processed = $data;
        // Decompress the data
        // $processed = gzuncompress($data);

        // Decrypt the data
        $processed = decrypt($processed);
    
        // Unserialize the decrypted data
        $processed = unserialize($processed, ['allowed_classes'=> [StorageItem::class]]);
    
        return $processed;
    }

    public function get($cache_key) {
        $cached = $this->fileCache->get($cache_key);
        if($cached===false) return false;
        $storageItem = $this->processDataForRetrieval($cached);
        return $storageItem;
    }

    public function add($cache_key, $data, $ttl=null, $invalidationStrategies=[]) {
        if(!is_int($ttl)) $ttl = REDCapCache::DEFAULT_TTL;
        $ts = date(REDCapCache::TIMESTAMP_FORMAT);
        $expiration = date(REDCapCache::TIMESTAMP_FORMAT, time() + $ttl);
        $storageItem = new StorageItem($cache_key, $ts, $expiration, $invalidationStrategies, $data);
        $cacheData = $this->processDataForSaving($storageItem);
        // $ttl = self::CACHE_TTL;
        $this->fileCache->set($cache_key, $cacheData, $ttl);
        $this->updateList($cache_key, $storageItem);
        return $storageItem;
    }

    public function delete($cache_key) {
        $this->fileCache->delete($cache_key);
        $this->deleteFromList($cache_key);
    }

    /**
     *
     * @return StorageItem[]
     */
    public function getList() {
        if(!is_array($this->list)) {
            $serializedList = $this->fileCache->get(self::METADATA_KEY);
            $list = unserialize($serializedList, ['allowed_classes' => [StorageItem::class]]);
            if(!is_array($list)) $list = [];
            $this->list = $list;
        }
        return $this->list;
    }

    /**
     * Save the list of cached items.
     * Ensures that the expiration time of the list aligns with the expiration 
     * time of the item that expires last
     *
     * @return void
     */
    public function saveList() {
        $getLatestExpiration = function () {
            $latestExpiration = REDCapCache::DEFAULT_TTL;
            $list = $this->getList();
            $now = new DateTime();
            foreach ($list as $storageItem) {
                $expiration = $storageItem->expiration();
                if(!$expiration instanceof DateTime) continue;
                $difference = $now->getTimestamp() - $expiration->getTimestamp();
                if($difference > $latestExpiration) $latestExpiration = $difference;
            }
            return $latestExpiration;
        };
        $serializedList = serialize($this->getList());
        $ttl = $getLatestExpiration();
        // $ttl = self::CACHE_TTL;
        $this->fileCache->set(self::METADATA_KEY, $serializedList, $ttl);
    }

    /**
     *
     * @param string $key
     * @param StorageItem $storageItem
     * @return void
     */
    public function updateList($key, $storageItem) {
        $list = $this->getList();
        $storageItem->setData(null); // do not store the data in the list
        $list[$key] = $storageItem;
        $this->list = $list;
    }

    public function deleteFromList($key) {
        $list = $this->getList();
        unset($list[$key]);
    }
}