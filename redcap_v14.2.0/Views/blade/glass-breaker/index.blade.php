<noscript>
  <strong>We're sorry but this feature doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
</noscript>

@if(!$browser_supported)
<h3>
  <i class="fas fa-exclamation-triangle"></i>
  <span>This feature is not available for your browser.</span>
</h3>

@else

<div id="break-the-glass-container" class="hidden">
  <span class="small text-muted"><i class="fas fa-check-circle text-success"></i> Break the glass enabled</span>
  <div id="break-the-glass-target"></div>
</div>


{{ loadJS('vue/vue-factory/dist/js/app.js') }}
{{ loadJS('vue/glass-breaker/dist/glass_breaker_vue.umd.js') }}

<script>
    window.addEventListener('DOMContentLoaded', function(event) {
      /**
      * move the app container into the target (left menu of the project)
      */
      const outerContainer = document.querySelector('#break-the-glass-container')
      // const target = 	document.querySelector('#west > div:nth-child(2) > div.x-panel-bwrap > div > div > div')
      const target = 	document.querySelector('#west #cdis_panel > div.x-panel-bwrap > div > div > div')
      target.appendChild(outerContainer)
      const appContainer = outerContainer.querySelector('div:first-of-type')

      const componentPromise = window.renderVueComponent(glass_breaker_vue, appContainer)
      componentPromise.then(component => {
        outerContainer.classList.remove('hidden')
        window.addEventListener('click', function (evt) {
            if (evt.detail === 7) { component.toggleDebug() }
        })
          // console.log('glass breaker is ready')
      })
    })
</script>


<style>
/* .glass-breaker-container {
  position: fixed;
  top: 5px;
  right: 5px;
  z-index: 10;
} */
</style>
@endif
