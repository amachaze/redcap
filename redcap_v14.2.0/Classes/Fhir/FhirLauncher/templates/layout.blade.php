
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>REDCap - @yield('title')</title>
    
    <link rel="stylesheet" type="text/css" href="{{$APP_PATH_JS}}EHR/bootstrap.min.css" media="screen,print">
    @php(loadJS('EHR/jquery.js'))
    @php(loadJS('EHR/popper.min.js'))
    @php(loadJS('EHR/bootstrap.js'))
    @php(loadJS('EHR/jquery-ui.min.js'))

    <link rel="stylesheet" type="text/css" href="{{$APP_PATH_WEBPACK}}css/bundle.css" media="screen,print">
    <link rel="stylesheet" type="text/css" href="{{$APP_PATH_WEBPACK}}css/fontawesome/css/all.min.css" media="screen,print">
    <link rel="stylesheet" type="text/css" href="{{$APP_PATH_CSS}}style.css" media="screen,print">
    {{-- <link rel="stylesheet" type="text/css" href="{{$APP_PATH_CSS}}home.css" media="screen,print"> --}}
    {{-- <script src="{{$APP_PATH_WEBPACK}}js/bundle.js" defer></script> --}}
    {{-- <script src="{{$APP_PATH_JS}}base.js" defer></script> --}}
    <link rel="shortcut icon" href="{{$APP_PATH_IMAGES}}favicon.ico" type="image/x-icon">
</head>
<body>
    
    @include('partials.global-js-variables')

    <style>
    body {
        margin: 10px auto;
    }
    </style>
    <div class="container">
        @section('header')
        {{-- here goes sidebar content --}}
        <header>
            <a href="{{$APP_PATH_WEBROOT_PARENT}}">
                <img src="{{$APP_PATH_IMAGES}}redcap-logo.png" title="REDCap" style="height:45px;">
            </a>
        </header>
        @show

        <div class="content">
            @yield('content')
        </div>
    </div>
</body>
</html>