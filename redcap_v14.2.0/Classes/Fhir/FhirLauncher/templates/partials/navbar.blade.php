<nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="{{$APP_PATH_WEBROOT_FULL}}ehr.php?state={{@$session->state}}&fhirPatient={{urlencode(@$patientData->ID)}}">
    <img src="{{$APP_PATH_IMAGES}}redcap-logo-small.png" style="height:22px;">
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">

    <div class="p-1 border">
        <span class="nav-text">
            @if(empty(@$patientData->MRN))
            <span>Patient <span style="color:#C00000;">{{@$patientData->ID}}</span></span>
            @else
            <span>MRN <span style="color:#C00000;">{{@$patientData->MRN}}</span></span>
            @endif
            <span>: <b>{{@$patientData->FirstName}}, {{@$patientData->LastName}}</b> (DOB {{@$patientData->BirthDate}})</span>
        </span>
    </div>

    <ul class="navbar-nav mr-auto">
        @if($identifiers = @$patientData->identifiers)
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Identifier strings
            </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            @foreach ($identifiers as $identifier)
                @php
                $value = $identifier['value'] ??  null;
                $system = $identifier['system'] ??  null;
                if(empty($value) || empty($system)) continue;
                @endphp
                <a class="dropdown-item" href="#" data-copy="{{$system}}"><strong>{{$value}}</strong> => {{$system}}</a>
            @endforeach
        </div>
      </li>
      @endif
    </ul>

    <span class="navbar-text">
      Logged in as <b>{{$fhirUser}}</b> / <b>{{$username}}</b>
    </span>
    
    <button class="border ms-2 btn btn-secondary btn-xs close p-1" type="button" data-clear-session style="display: none">x</button>
    {{-- @if(isset($app_title) && $app_title)
        <div class="clearfix" style="font-size:14px;">
            <div class="float-start" style="width:100px;"><a href="{{$APP_PATH_WEBROOT}}ehr.php?fhirPatient={{urlencode(@$patientData->ID)}}" style="margin-left:5px;font-size:12px;text-decoration:underline;">{{$lang['home_22']}}</a></div>
            <div class="float-start">{{$lang['create_project_87']}} <span style="font-weight:700;color:#C00000;">{{strip_tags($app_title)}}</span></div>
        </div>
    @endif --}}
  </div>
</nav>

<div class="modal fade" id="EHRModal" tabindex="-1" role="dialog" aria-labelledby="EHRModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="EHRModalLabel">New message</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        {{-- <button type="button" class="btn btn-primary">Send message</button> --}}
      </div>
    </div>
  </div>
</div>

<script>

(function() {

  var Clippy = function() {
    
    this.dummyDOMElement = null

    this.constructor = function() {
        // used to register and dispatch events
        this.dummyDOMElement = document.createElement('div')
    }
    this.constructor.apply(this)

    this.copy = function(text) {
      var self = this
      var data = [new ClipboardItem({ "text/plain": new Blob([text], { type: "text/plain" }) })]
      navigator.clipboard.write(data).then(function() {
          var event = new CustomEvent('clipboard-write', { detail: text })
          self.dummyDOMElement.dispatchEvent(event)
      }, function() {
          var event = new CustomEvent('clipboard-write-error', { detail: text })
          self.dummyDOMElement.dispatchEvent(event)
      });
    };

    // use dummy DOM element to enable events for class instances
    this.addEventListener = function(event, callback) { this.dummyDOMElement.addEventListener(event, callback) }
    this.removeEventListener = function(event, callback) { this.dummyDOMElement.removeEventListener(event, callback) }
  }


  function getCopyStrategy() {
    var copyStrategy = { run: function() {} };

    if(window.hasOwnProperty('ClipboardItem')) {
      var clippy = new Clippy();
      clippy.addEventListener('clipboard-write', function(e) {
          var text = e.detail;
          var modal = document.querySelector('#EHRModal');
          updateEhrModal(modal, 'Success', 'Copied to clipboard successfully: "'+text+'"');
          $(modal).modal('show');
      })
      clippy.addEventListener('clipboard-write-error', function(e) {
          var text = e.detail;
          var modal = document.querySelector('#EHRModal');
          updateEhrModal(modal, 'Error', 'Unable to write to clipboard');
          $(modal).modal('show');
      })
      copyStrategy.run = clippy.copy.bind(clippy);
    }else {
      copyStrategy.run = function(data) {
        var message = "please insert this patient string identifier in your CDIS settings page";
        window.prompt(message, data);
      }
    }
    return copyStrategy;
  }

  function updateEhrModal(modal, title, message) {
      modal.querySelector('.modal-title').innerHTML = title
      modal.querySelector('.modal-body').innerHTML = message
  }

  var inIframe = function() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  var initCopyables = function() {
    var copyStrategy = getCopyStrategy();
    var copyables = document.querySelectorAll('[data-copy]');

    for (var index = 0; index < copyables.length; index++) {
      var copyable = copyables[index];
      copyable.addEventListener('click', function(e) {
        var element = e.currentTarget;
        var data = element.getAttribute('data-copy');
        copyStrategy.run(data);
      });
    }
  }

  var destroyFhirSession = function() {
    var URL = app_path_webroot_full+'redcap_v'+redcap_version+'/';
		var bodyParams = {};
    var params = new URLSearchParams();
		params.append('route', 'FhirPatientPortalController:removeFhirLaunchContext');
		params.append('redcap_csrf_token', window.redcap_csrf_token);
    var fullURL = URL+'?'+params;
		fetch(fullURL, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				// 'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: bodyParams // body data type must match "Content-Type" header
		}).then(function(response) { location.reload() });
	}

  document.addEventListener('DOMContentLoaded', function() {

    initCopyables();

    if(!inIframe()) {
      var clearSessionButton = document.querySelector('[data-clear-session]')
      clearSessionButton.style.display = 'inline-block';
      clearSessionButton.addEventListener('click', function() {destroyFhirSession()})
    }


  })
}())


</script>