@php
$objHtmlPage = new HtmlPage();
@endphp

 @if(!$browser_supported)
<h3>
    <i class="fas fa-exclamation-triangle"></i>
    <span>This feature is not available for your browser.</span>
</h3>

@elseif($datamart_enabled)
{{-- <script src="{{$app_path_js}}vue.min.js"></script> --}}
{{-- <script src="https://unpkg.com/vue"></script> --}}




<link rel="stylesheet" href="{{$objHtmlPage->CacheBuster($app_path_js.'vue-factory/dist/css/chunk-vendors.css')}}">
{{loadJS('vue-factory/dist/js/chunk-vendors-legacy.js')}}
{{loadJS('vue-factory/dist/js/app-legacy.js')}}


<script>

</script>



{{loadJS('datamart-design-checker/dist/datamart_design_checker.umd.js')}}
{{-- <link rel="stylesheet" href="{{$objHtmlPage->CacheBuster($app_path_js.'datamart-design-checker/dist/datamart_design_checker.css')}}"> --}}
<div id="designCheckerApp"></div>

<script>
(function(window,document) {
    
    window.addEventListener('DOMContentLoaded', function(event) {
        const render = window.VueFactory.init(datamart_design_checker)
        render('#designCheckerApp')
    })
}(window,document))
</script>



<div id="datamart"></div>

{{-- include javascript and CSS --}}
{{-- {{loadJS('datamart/dist/datamart_vue.umd.min.js')}}
<link rel="stylesheet" href="{{$objHtmlPage->CacheBuster($app_path_js.'datamart/dist/datamart_vue.css')}}">

<script>
(function(window,document, Vue) {
    window.addEventListener('DOMContentLoaded', function(event) {
         new Vue(datamart_vue).$mount('#datamart')
    })
}(window,document, Vue))
</script> --}}


@else
<h3>
    <i class="fas fa-info-circle"></i>
    <span>This is not a Datamart Project!</span>
</h3>
@endif