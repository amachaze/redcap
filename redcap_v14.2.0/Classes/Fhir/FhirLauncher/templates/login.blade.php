@extends('layout')

@section('title', 'EHR Launcher - Login')

@section('content')

<div id="login-wrapper">
    <p>Please login to complete the smart on FHIR process</p>
    <form id="loginForm" action="" method="POST">
        <label for="username">Username</label>
        <input class="ms-2" type="text" name="username" id="username">

        <label for="password">Password</label>
        <input class="ms-2" type="password" name="password" id="password">

        <button class="btn btn-xs btn-secondary mt-2" type="reset">Reset</button>
        <button class="btn btn-xs btn-primary ms-2 mt-2" type="submit">Login</button>
    </form>
</div>


<style>
    #login-wrapper {
        max-width: 300px;
        margin: auto;
    }
    #loginForm {
        display: grid;
        grid-template-columns: min-content 1fr;
    }
</style>
@endsection
