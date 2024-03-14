<script>
    // global js variables
    var redcap_version = '{{$REDCAP_VERSION}}';
    var app_path_webroot = "{{$APP_PATH_WEBROOT}}";
    var app_path_webroot_full = "{{$APP_PATH_WEBROOT_FULL}}";
    var redcap_csrf_token = "{{$redcap_csrf_token}}";
    var app_path_images = "{{$APP_PATH_IMAGES}}"
    var page = location.pathname.replace('/', '');

    // Determine if a mobile device based on screen size. Return true if a mobile device.
    function isMobileDeviceFunc() {
        var scrollBarWidth = ($(document).height() > $(window).height()) ? getScrollBarWidth() : 0;
        return ($(window).width()+scrollBarWidth <= maxMobileWidth ? 1 : 0);
    }
    var maxMobileWidth = 767;
    var isMobileDevice = isMobileDeviceFunc();
</script>
