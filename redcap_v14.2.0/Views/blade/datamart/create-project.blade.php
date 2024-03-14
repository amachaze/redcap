
 @if(!$browser_supported)
<h3>
    <i class="fas fa-exclamation-triangle"></i>
    <span>This feature is not available for your browser.</span>
</h3>
@else

{{ loadJS('vue/vue-factory/dist/js/app.js') }}
{{ loadJS('vue/datamart/dist/datamart_vue.umd.js') }}
<script>
/**
 * launch the DataMart and return a reference to the app
 */
 let datamart_app
function launchDataMart(selector) {
    var componentPromise = window.renderVueComponent(datamart_vue, selector)
    componentPromise.then(component => {
        datamart_app = component
        datamart_app.$on('load', function(){
            @if($route==='review')
            datamart_app.goToReviewProjectPage()
            @else
            datamart_app.goToCreateProjectPage()
            @endif
        })
    })
}
</script>
@endif