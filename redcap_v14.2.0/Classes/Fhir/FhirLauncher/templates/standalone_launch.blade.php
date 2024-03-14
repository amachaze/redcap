@extends('layout')

@section('title', 'EHR Launcher - Standalone Launch')

@section('content')

    <div>
        <h3>Standalone Launch</h3>
        <p>SMART supports EHR launch and standalone launch.</p>
        <p>The standalone application does not need to be launched by an EHR.
            The app can launch and access FHIR data on its own, provided the app is authorized and given the iss URL.</p>
        <p>Once an app receives a launch request, it requests authorization to access
        a FHIR resource by causing the browser to navigate to the EHR’s authorization endpoint.
        Based on pre-defined rules and possibly end-user authorization,
        the EHR authorization server either grants the request by returning
        an authorization code to the app’s redirect URL, or denies the request.
        The app then exchanges the authorization code for an access token,
        which the app presents to the EHR’s resource server to access requested
        FHIR resources. If a refresh token is returned along with the access token,
        the app may use this to request a new access token, with the same scope,
        once the access token expires.</p>

        @if(count($ehrSystems)===1)
        <a class="btn btn-primary btn-sm text-white" href="{{$standaloneLaunchURL}}&ehr_id={{$ehrSystems[0]->ehr_id}}" ><i class="fas fa-rocket"></i> standalone launch</a>
        @else
        <div class="dropdown">
            <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-rocket"></i> standalone launch
            </button>
            <ul class="dropdown-menu">
                @foreach ($ehrSystems as $ehrSystem)
                <li><a class="dropdown-item" href="{{$standaloneLaunchURL}}&ehr_id={{$ehrSystem->ehr_id}}">{{$ehrSystem->ehr_name}}</a></li>
                @endforeach
            </ul>
        </div>
        @endif
    </div>

<style>

</style>

{{-- destroy the FHIR session data if the user presses shift+alt+d --}}
<script src="{{$APP_PATH_WEBROOT}}Resources/js/Libraries/axios.min.js"></script>
<script>
(function(document, window){

    document.addEventListener("DOMContentLoaded", function() {
        var destroyerForm = document.querySelector('#fhir-session-destroyer')
        var deleteKeyCode = 'KeyD'
        
        document.addEventListener('keypress', function(e){
            var shiftPressed = e.shiftKey
            var altPressed = e.altKey
            var keyCode = e.code
            if(shiftPressed && altPressed && keyCode==deleteKeyCode) {
                try {
                    var params = new URLSearchParams()
                    params.append('action', 'destroy_fhir_session')
                    axios.post('', params)
                }catch(error) {
                    console.log(error)
                }
            }
        })
    });
}(document, window))
</script>

@endsection
