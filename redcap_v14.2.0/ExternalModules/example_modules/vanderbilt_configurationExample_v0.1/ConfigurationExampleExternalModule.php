<?php
/**
 * Created by PhpStorm.
 * User: mcguffk
 * Date: 4/4/2017
 * Time: 2:12 PM
 */

namespace Vanderbilt\ConfigurationExampleExternalModule;


class ConfigurationExampleExternalModule extends \ExternalModules\AbstractExternalModule {
    /**
     * @return void
     */
    function setupExampleActions(){
        $this->initializeJavascriptModuleObject();
        ?>
        <button id='ajax-request'>AJAX Request Example</button>
        <button id='add-log-entry'>Add a log entry</button><br>
        <br>
        <script>
            (function(){
                const module = <?=$this->getJavascriptModuleObjectName()?>;

                const createRandomString = () => {
                    return Math.random().toString()
                }

                const handleRequest = (promise, randomNumber, next) => {
                    promise.then(response => {
                        // Make sure the random number given is returned.
                        if(response === randomNumber){
                            if(next === undefined){
                                alert('The test completed successfully.')
                            }
                            else{
                                next()
                            }
                        }
                        else{
                            alert("Received " + response + " instead of the expected " + randomNumber)
                        }
                    }).catch(err => {
                        alert('The request failed with an error: ' + err)
                    })
                }

                document.querySelector('button#add-log-entry').onclick = <?=$this->getTestAjaxJavascript()?>

                document.querySelector('button#ajax-request').onclick = () =>{
                    const randomNumber = createRandomString()

                    handleRequest(
                        module.ajax('example-action', randomNumber),
                        randomNumber
                    )                      
                }

                document.querySelectorAll('button.ajax').forEach((button) => {
                    button.addEventListener('click', (e) => {
                        const data = new URLSearchParams()
                
                        let url
                        if(button.dataset.includeCsrfToken !== undefined){
                            data.append('redcap_csrf_token', <?=json_encode($this->getCSRFToken())?>)
                            
                            if(button.dataset.apiUrl !== undefined){
                                url = <?=json_encode($this->getUrl('ajax-test.php', false, true))?>;
                            }
                            else{
                                url = <?=json_encode($this->getUrl('ajax-test.php'))?>;
                            }
                
                            if(button.dataset.noauth !== undefined){
                                url += '&NOAUTH'
                            }
                        }
                        else{
                            url = <?=json_encode($this->getUrl('ajax-test-no-csrf.php'))?>;
                        }
                
                        fetch(url, {
                            method: 'POST',
                            credentials: 'same-origin',
                            body: data
                        })
                        .then(response => response.text())
                        .then(data => {
                            if(data === 'success'){
                                alert('POST was successful!')
                            }
                            else{
                                alert('The POST failed with the following response: ' + data)
                            }
                        })
                    })
                })

                <?php if(isset($_GET['NOAUTH'])) { ?>
                    const ajaxAfterLegacyGetButton = document.createElement('button')
                    ajaxAfterLegacyGetButton.innerHTML = 'Test module.ajax() After Legacy AJAX GET'
                    ajaxAfterLegacyGetButton.onclick = () => {
                        const makeFirstRequest = () => {
                            const randomNumber = createRandomString()
                            handleRequest(
                                fetch(<?=json_encode($this->getUrl('example-action.php', true))?> + '&randomNumber=' + randomNumber, {
                                    method: 'GET',
                                    credentials: 'same-origin',
                                }).then(response => response.text()),
                                randomNumber,
                                makeSecondRequest
                            )
                        }

                        const makeSecondRequest = () => {
                            const randomNumber = createRandomString()
                            handleRequest(
                                module.ajax('example-action', randomNumber),
                                randomNumber
                            )
                        }

                        makeFirstRequest()
                    }

                    document.currentScript.insertAdjacentElement('beforebegin', ajaxAfterLegacyGetButton)
                <?php } ?>
            })()
        </script>
        <?php
    }

    function getTestAjaxJavascript(){
        return "
            () => {
                module
                    .log('test log from configuration example module')
                    .then(logId => {
                        alert('A log with ID ' + logId + ' was successfully added!')
                    }).catch(err => {
                        console.error(err)
                        alert('An error occurred while adding the log entry!  See the browser console for details.')
                    })
            }
        ";
    }

    /**
     * @psalm-suppress PossiblyUnusedParam
     */
    function redcap_module_ajax($action, $payload, $project_id, $record, $instrument, $event_id, $repeat_instance, $survey_hash, $response_id, $survey_queue_hash, $page, $page_full, $user_id, $group_id){
        if($action === 'example-action'){
            return $payload;
        }
        else{
            return 'Unknown ajax action!';
        }
    }

    function redcap_survey_page(){
        $this->initializeJavascriptModuleObject();
        ?>
        <script>
            (() => {
                const module = <?=$this->getJavascriptModuleObjectName()?>;
                module.testAjax = <?=$this->getTestAjaxJavascript()?>;

                console.log('Run "<?=$this->getJavascriptModuleObjectName()?>.testAjax()" to test module ajax requests from this survey.')
            })()
        </script>
        <?php
    }

    function redcap_module_api_before($project_id, $post){
        // This example also functions as a pseudo unit in REDCap core test for this hook.
        if(((int)$project_id != $project_id)){
            return 'API request failed likely due to invalid project ID detection in REDCap core.';
        }
        else if($post['some_key_that_disallows_this_request']){
            return 'This API request is not allowed.';
        }
    }
}