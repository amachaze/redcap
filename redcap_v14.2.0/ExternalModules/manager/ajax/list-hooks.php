<?php namespace ExternalModules;
require_once __DIR__ . '/../../redcap_connect.php';

if(!ExternalModules::isAdminWithModuleInstallPrivileges()){
    echo  ExternalModules::tt("em_errors_177"); //= You do not have permission to list hooks.
    return;
}

$methods = [];
try{
    $instance = ExternalModules::getModuleInstance(ExternalModules::getPrefix(), $_GET['version']);
    $className = get_class($instance);
    $class = new \ReflectionClass($className);
    foreach ($class->getMethods() as $method) {
        if ($method->class !== $className) {
            // Ignore methods inherited from the parent class
            continue;
        }

        $methods[] = $method->name;
    }
}
catch(\Throwable $t){
    /**
     * Ignore this exception, since it will get caught again & displayed later in the enableAndCatchExceptions() call.
     */
}

$hooks = [];
foreach($methods as $method){
    if(
        starts_with($method, 'redcap_')
        ||
        starts_with($method, 'hook_')
    ){
        $hooks[] = $method;
    }
}

echo json_encode($hooks);