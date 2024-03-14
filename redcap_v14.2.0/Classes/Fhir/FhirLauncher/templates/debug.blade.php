@php

@endphp

@extends('layout')

@section('title', 'FHIR Debug')

@section('content')

<h3>Debug</h3>


<style>

</style>

<script>
    document.addEventListener('DOMContentLoaded', function(e) {
        console.log("debug")
    })
</script>
@endsection