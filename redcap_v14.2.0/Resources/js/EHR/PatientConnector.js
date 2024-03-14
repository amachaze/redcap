
function PatientConnector(browserSupported) {
	this.newRecord = null;
	this.browserSupported = (browserSupported===true) ? true : false;

	 this.constructor = function() {
		// Check record name for invalid characters
		$('#addPatientDialog #newRecordName').blur(function(){
			var input = $(this);
			input.val( input.val().trim() );
			var validRecordName = recordNameValid(input.val());
			if (validRecordName !== true) {
				alert(validRecordName);
				input.focus();
				return false;
			}
		});
	}
	this.constructor.apply(this)


	this.getRequestError = function(error) {
		console.log(error)
		if (error.response) {
			var errorMessage = 'unexpected error'
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			// console.log(error.response.data);
			// console.log(error.response.status);
			// console.log(error.response.headers);
			if(error.response===null) return errorMessage
			if(error.response.data===null) return errorMessage
			if(error.response.data.message===null) return errorMessage
			return error.response.data.message
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			// console.log(error.request);
			return error.request.responseText;
		} else {
			// Something happened in setting up the request that triggered an Error
			// console.log('Error', error.message);
			return error.message
		}
	}

	this.getRedCapQueryParams = function() {
		var params = {}
		var search = location.search.slice(1) // all but ?
		var paramsAsStrings = search.split("&")
		paramsAsStrings.forEach(function(paramsAsString) {
			var keyValue = paramsAsString.split("=")
			var key = keyValue[0]
			var value = keyValue[1]
			params[key] = value ? value : ''
		});

		// get PID, record ID and event ID and all query params from current location
		var query_params = {}
		Object.keys(params).forEach(function(key) {
			query_params[key] = params[key]
		})
		if(window.redcap_csrf_token) query_params.redcap_csrf_token = window.redcap_csrf_token // csrf token for post requests
		return query_params
	}

	this.extractQueryParams = function () {
		var match,
			pl     = /\+/g,  // Regex for replacing addition symbol with a space
			search = /([^&=]+)=?([^&]*)/g,
			decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
			query  = window.location.search.substring(1);
	  
		urlParams = {};
		while (match = search.exec(query)) {
			urlParams[decode(match[1])] = decode(match[2]);
		}
		return urlParams
	}

	this.createRequest = function(queryParams) {
		if(typeof queryParams !== 'object') queryParams = {};
		var getQueryParams = function() {
			var defaultQueryParams = this.getRedCapQueryParams();
			Object.keys(queryParams).forEach(function(key) {
				defaultQueryParams[key] = queryParams[key];
			})
			return defaultQueryParams;
		}

		var applyQueryParams = function(url, params) {
			// adjust URL if the ? is present or not
			url.match(/\?/) ? url += '&' : url += '?';
			var search = Object.keys(params).map(function(key) {
				return key+'='+params[key];
			}).join('&');
	
			url += search;
			return url;
		}

		var app_path_webroot_full = window.app_path_webroot_full;
		var redcap_version = window.redcap_version;
		var url = app_path_webroot_full+'redcap_v'+redcap_version+'/';
		
		var queryParams = getQueryParams.apply(this);
		url = applyQueryParams(url, queryParams);

		var request = function(params) {
			var ajaxParams = {
				url: url,
				headers: {'X-Requested-With': 'XMLHttpRequest'},
				xhrFields: {
					withCredentials: true,
				},
			};
			Object.keys(params).forEach(function(key) {
				var value = params[key];
				if(key==='data' && (typeof value==='object')) {
					value = JSON.stringify(value);
					// ajaxParams.contentType = "application/json";
				}
				ajaxParams[key] = value;
			});
			return $.ajax(ajaxParams);
		}
		return request;
	}

	this.addProject = function(pid) {
		var params = {
			route: 'FhirPatientPortalController:addProject',
			// XDEBUG_SESSION: 1,
		};
		var data = {pid:pid};
		var self = this;

		var request = this.createRequest(params);
		request({type:'POST', data:data}).done(function(response) {
			location.reload();
		}).fail(function(e) {
			var error = self.getRequestError(e);
			alert(error);
		});

	}

	this.removeProject = function(pid) {
		var params = {
			route: 'FhirPatientPortalController:removeProject',
			// XDEBUG_SESSION: 1,
		};
		var data = {pid:pid};
		var request = this.createRequest(params);
		var self = this;

		request({type:'POST', data:data}).done(function(response) {
			location.reload();
		}).fail(function(e) {
			var error = self.getRequestError(e);
			alert(error);
		})
	}

	this.showRecord = function(projectID, recordID) {
		var makeQueryParam = function(params) {
			var queryParams = [];
			for (var key in params) {
				var value = params[key];
				var pair = [key,encodeURIComponent(value)];
				queryParams.push(pair.join('='));
			}
			var queryParam = queryParams.join('&');
			return queryParam;
		}

		/* var params = this.extractQueryParams()
		params.pid = projectID
		params.id = recordID */
		var params = {
			pid: projectID,
			id: recordID,
		};


		var queryParam = makeQueryParam(params);

		var url = app_path_webroot+'DataEntry/record_home.php?'+queryParam;
		if(!this.browserSupported) {
			alert('this feature is not supported in this browser');
			return;
		}
		window.location.href = url;
	}

 	this.addPatientToProject = function(pid, mrn, record_auto_numbering) {
		var createRecordRequest = function() {
			var params = {
				route: 'FhirPatientPortalController:createPatientRecord',
				pid: pid,
			};
			var data = {
				pid: pid,
				mrn: mrn,
				// fhirPatient: getParameterByName('fhirPatient'),
				record: $('#addPatientDialog #newRecordName').val(),
			};

			var request = this.createRequest(params);
			if(!request) return;
			var deferred = $.Deferred();
			request({type:'POST', data:data}).done(function(response) {
				deferred.resolve(response);
			}).fail(function(e) {
				var error = this.getRequestError(e)
				deferred.reject(error);
			})
			return deferred;
		};
		var self = this;
		// If auto-numbering is not enabled for new records, then add input for user to provide record name
		if (record_auto_numbering == '1') {
			$('#addPatientDialog #newRecordNameDiv, #addPatientDialog #newRecordNameAutoNumText').hide();
		} else {
			$('#addPatientDialog #newRecordNameDiv, #addPatientDialog #newRecordNameAutoNumText').show();
		}
		$('#addPatientDialog #newRecordName').val('');
		var projectTitle = $('.ehr-project-title-'+pid).text();
		$('#addPatientDialog #newRecordNameProjTitle').html(projectTitle);
		
		$('#addPatientDialog').dialog({ bgiframe: true, modal: true, width: 500, buttons: { 
			'Cancel': function() { 
				$(this).dialog('close');
			},
			'Create record': function() { 			
				if (record_auto_numbering == '0' && $('#addPatientDialog #newRecordName').val() == '') {
					setTimeout(function(){
						self.addPatientToProject(pid, mrn, record_auto_numbering);
						simpleDialog('Please enter a record name for the new record.');
					},100);
					return false;
				}
				showProgress(1);
				createRecordRequest.apply(self).then(function(response) {

					var data = response;
					showProgress(0,0);
					if (data.indexOf('ERROR') > -1) {
						setTimeout(function() {
							self.addPatientToProject(pid, mrn, record_auto_numbering);
							simpleDialog(data);
						},100);
						$('#addPatientDialog').dialog('close');
						return;
					}
					initDialog('ehr-add-record-success');
					$('#ehr-add-record-success').html(data);			
					var newRecord = $('#ehr-add-record-success #newRecordCreated').val();

					var buttons = { 
						'Close': function() { 
							window.location.reload();
						},
						'View patient in project': function() {
							self.showRecord(pid, newRecord);
							// window.location.href = app_path_webroot+'DataEntry/record_home.php?pid='+pid+'&id='+newRecord;
						}
					};
					if(!self.browserSupported) {
						// delete buttons['View patient in project']; // remove view patient button if browser not supported
						var adjudicationLink = document.getElementById('data-adjudication-link');
						if(adjudicationLink) adjudicationLink.parentElement.removeChild(adjudicationLink);
					}

					$('#ehr-add-record-success').dialog({ bgiframe: true, modal: true, width: 500, title: 'SUCCESS!', buttons: buttons });
					$('#addPatientDialog').dialog('close');
				})
			}
		}})
	}

}