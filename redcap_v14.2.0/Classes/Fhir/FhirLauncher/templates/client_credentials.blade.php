@extends('layout')

@section('title', 'EHR Launcher - Client Credentials')

@section('content')

<div>
    <h3>Client credentials flow</h3>
    <p>The OAuth 2.0  <strong>client credentials</strong> grant flow permits a web service (confidential client)
        to use its own credentials, instead of impersonating a user,
        to authenticate when calling another web service. In this scenario,
        the client is REDCap.</p>
    <pre>
    +---------------+       +---------------+
    |               |       |               |
    |   SMART       +-(1)--->               |
    |  Application  |       | FHIR Resource |
    |               <-(2)---+ Server        |
    |               |       |               |
    |               +-(5)--->               |  
    |               |       |               |
    |               <-(6)---+               |
    |               |       |               |
    |               +       +---------------+
    |               |
    |               +       +---------------+
    |               |       |               |
    |               +-(3)---> Authorization |
    |               |       | Server        |
    |               <-(4)---+               |
    |               |       |               |
    +---------------+       +---------------+</pre>
    <ul style="list-style-type:decimal;">
        <li>The SMART application performs discovery by requesting the FHIR® server’s conformance statement. The mechanism for how the SMART application is provided the URL for the FHIR® server is not defined by this specification.</li>
        <li>The FHIR® server returns the conformance statement, which provides the needed endpoint for step 3.</li>
        <li>The SMART application requests an access token using its client credentials.</li>
        <li>The authorization server returns the access token.</li>
        <li>The SMART application utilizes the access token to request a FHIR® resource.</li>
        <li>The FHIR® resource server returns the desired resource.</li>
    </ul>
    <div class="alert alert-dark p">
        <p>This authentication method is currently <strong>supported only by Cerner</strong></p>
    </div>
    <a class="btn btn-primary btn-sm" href="{{$APP_PATH_WEBROOT}}ehr.php?client_credentials=1"><i class="fas fa-rocket"></i> client credentials</a>
</div>