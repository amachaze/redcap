@extends('layout')

@section('title', 'EHR Launcher - Standalone Launch')

@section('content')

    <div>
        <h3>Choose Your FHIR System</h3>
        <p>REDCap is configured to work with multiple FHIR systems.<br>
        To proceed, please select the FHIR system you wish to engage with for your session.</p>

        @if(count($ehrSystems)===1)
        <a class="btn btn-primary btn-sm text-white" href="{{$currentURL}}&ehr_id={{$ehrSystems[0]->ehr_id}}" ><i class="fas fa-fire"></i> standalone launch</a>
        @else
        <div class="dropdown">
            <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-fire"></i> Select FHIR System...
            </button>
            <ul class="dropdown-menu">
                @foreach ($ehrSystems as $ehrSystem)
                <li><a class="dropdown-item" href="{{$currentURL}}&ehr_id={{$ehrSystem->ehr_id}}">{{$ehrSystem->ehr_name}}</a></li>
                @endforeach
            </ul>
        </div>
        @endif
    </div>

<style>
</style>

@endsection
