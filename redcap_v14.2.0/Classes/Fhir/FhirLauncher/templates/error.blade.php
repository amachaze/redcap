@php

function printPng($path) {
    $finfo = new finfo(FILEINFO_MIME);
    $type  = $finfo->file($path);
    $imageData = base64_encode(file_get_contents($path));
    // Format the image SRC:  data:{mime};base64,{data};
    $src = 'data: '.$type.';base64,'.$imageData;
    // Echo out a sample image
    print( '<img src="' . $src . '">');
}
function printSvg($path) {
    $imageData = file_get_contents($path);
    print($imageData);
}

function printImage($path) {
    if(preg_match('/svg$/', $path)===1) {
        printSvg($path);
    }else {
        printPng($path);
    }
}
@endphp

@extends('layout')

@section('title', 'FHIR Error')

@section('content')
<h3>Error</h3>

<div>
    <ul>
    @foreach ($errors as $error)
        @php
        /** @var Throwable $error */
        $message = $error->getMessage();
        $code = $error->getCode();
        $stackTrace = $error->getTraceAsString();
        @endphp
        <p>{{$message}} - <span>Error code: {{$code}}</span></p>
        {{-- @if(true)
        <details>
            <summary>Stack trace</summary>
            <div>{{$stackTrace}}</div>
        </details>
        @endif --}}
    @endforeach
    </ul>
</div>
<a href="{{$redirectURL}}" class="btn btn-xs btn-secondary text-white">Retry</a>
@if($launchDiagram)
<div class="card my-2">
    <h2 class="card-header">
        <span>Expected workflow</span>
    </h2>
    <div class="card-body">
        <span class="diagram">{!! printImage( $launchDiagram ) !!}</span>
    </div>
</div>
@endif

@if($logs)
<div class="accordion" id="logsAccordion">
    <div class="card">
        <h2 class="card-header">
            <button class="btn btn-link btn-block text-start" type="button" data-toggle="collapse" data-target="#collapseLogs">
                Logs
            </button>
        </h2>
        <div id="collapseLogs" class="collapse" data-parent="#logsAccordion">
            <div class="card-body">
                <ul>
                    @foreach ($logs as $log)
                        <li>{{$log}} </li>
                    @endforeach
                </ul>
            </div>
        </div>
    </div>
</div>
@endif

<h6 class="my-2">Explanation of common errors</h6>
<div class="accordion" id="commonErrorExamples">
    <div class="card">
        <h2 class="card-header">
            <button class="btn btn-link btn-block text-start" type="button" data-toggle="collapse" data-target="#collapse1">
                OAuth2 errors
            </button>
        </h2>
        <div id="collapse1" class="collapse" data-parent="#commonErrorExamples">
            <div class="card-body">
                <ul>
                    <li>invalid_request – The request is missing a parameter so the server can’t proceed with the request. This may also be returned if the request includes an unsupported parameter or repeats a parameter.</li>
                    <li>invalid_client – Client authentication failed, such as if the request contains an invalid client ID or secret. Send an HTTP 401 response in this case.</li>
                    <li>invalid_grant – The authorization code (or user’s password for the password grant type) is invalid or expired. This is also the error you would return if the redirect URL given in the authorization grant does not match the URL provided in this access token request.</li>
                    <li>invalid_scope – For access token requests that include a scope (password or client_credentials grants), this error indicates an invalid scope value in the request.</li>
                    <li>unauthorized_client – This client is not authorized to use the requested grant type. For example, if you restrict which applications can use the Implicit grant, you would return this error for the other apps.</li>
                    <li>unsupported_grant_type – If a grant type is requested that the authorization server doesn’t recognize, use this code. Note that unknown grant types also use this specific error code rather than using the invalid_request above.</li>
                </ul>
                <span class="small">(<a href="https://oauth.com" target="_blank">more info...</a>)</span>
            </div>
        </div>
    </div>

    <div class="card">
        <h2 class="card-header">
            <button class="btn btn-link btn-block text-start" type="button" data-toggle="collapse" data-target="#collapse2">
                token endpoint errors
            </button>
        </h2>
        <div id="collapse2" class="collapse" data-parent="#commonErrorExamples">
            <div class="card-body">
                <ul>
                    <li>400 invalid_grant - with missing grant_type parameter</li>
                    <li>400 unsupported_grant_type - with invalid grant_type parameter</li>
                    <li>400 invalid_request - with missing client_assertion_type param</li>
                    <li>400 invalid_request - with invalid client_assertion_type param</li>
                    <li>400 invalid_request - with missing invalid_client_details_token param</li>
                    <li>400 invalid_request - with invalid invalid_client_details_token param</li>
                    <li>400 invalid_request - if the token does not contain valid client_id (sub) token</li>
                    <li>400 invalid_grant - if the id token contains {err:'token_expired_registration_token'} (simulated error)</li>
                    <li>400 invalid_grant - if the auth token 'aud' is wrong</li>
                    <li>400 invalid_grant - if the auth token 'iss' does not match the aud</li>
                    <li>400 invalid_grant - if the id token contains {err:'invalid_jti'} (simulated error)</li>
                    <li>400 invalid_scope - if the scope is invalid</li>
                    <li>400 invalid_scope - if the id token contains {err:'token_invalid_scope'} (simulated error)</li>
                    <li>400 invalid_grant - if the auth token jku is not whitelisted</li>
                    <li>400 invalid_grant - if local jwks has no keys</li>
                    <li>400 invalid_grant - if no jwks or jwks_url can be found</li>
                    <li>400 invalid_grant - if no public keys can be found</li>
                    <li>400 invalid_grant - if none of the public keys can decrypt the token</li>
                    <li>401 invalid_client - if the id token contains {err:'token_invalid_token'} (simulated error)</li>
                </ul>
                <span class="small">(<a href="https://github.com/smart-on-fhir/bulk-data-server/issues/11#issuecomment-422826319" target="_blank">more info...</a>)</span>
            </div>
        </div>
    </div>

    <div class="card">
        <h2 class="card-header">
            <button class="btn btn-link btn-block text-start" type="button" data-toggle="collapse" data-target="#collapse3">
                registration endpoint errors
            </button>
        </h2>
        <div id="collapse3" class="collapse" data-parent="#commonErrorExamples">
            <div class="card-body">
                <ul>
                    <li>400 invalid_request - if no 'Content-type: application/x-www-form-urlencoded' header is sent</li>
                    <li>400 invalid_request - with invalid 'dur' parameter</li>
                    <li>400 invalid_request - if both 'jwks' and 'jwks_url' are missing</li>
                    <span class="small">(<a href="https://github.com/smart-on-fhir/bulk-data-server/issues/11#issuecomment-422826319" target="_blank">more info...</a>)</span>
                </ul>
            </div>
        </div>
    </div>
</div>


<style>

/* responsive diagram */
.diagram > * {
    width: 100%;
    height: auto;
}

.logs-wrapper {
    word-break:break-all;
}
</style>

@endsection