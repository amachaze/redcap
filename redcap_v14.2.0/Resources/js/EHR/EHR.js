/**
 * subset of the core REDCap functions extracted for the "launch from EHR"
 * environment and meant to be compatible with IE 10/11
 */

// Check for invalid characters in record names
// Returns TRUE if valid, else returns error message.
function recordNameValid(id) {
	var valid = true;
	// Don't allow pound signs in record names
	if (/#/g.test(id)) {
		valid = "Pound signs (#) are not allowed in record names! Please enter another record name.";
	}
	// Don't allow apostrophes in record names
	if (/'/g.test(id)) {
		valid = "Apostrophes (') are not allowed in record names! Please enter another record name.";
	}
	// Don't allow ampersands in record names
	if (/&/g.test(id)) {
		valid = "Ampersands (&) are not allowed in record names! Please enter another record name.";
	}
	// Don't allow plus signs in record names
	if (/\+/g.test(id)) {
		valid = "Plus signs (+) are not allowed in record names! Please enter another record name.";
	}
	// Don't allow tabs in record names
	if (/\t/g.test(id)) {
		valid = "Tab characters are not allowed in record names! Please enter another record name.";
	}
	return valid;
}

//Display "Working" div as progress indicator
function showProgress(show,ms) {
	// Set default time for fade-in/fade-out
	if (ms == null) ms = 500;
	if (!$("#working").length) 	$('body').append('<div id="working"><img alt="Working..." src="'+app_path_images+'progress_circle.gif">&nbsp; Working...</div>');
	if (!$("#fade").length) 	$('body').append('<div id="fade"></div>');
	if (show) {
		$('#fade').addClass('black_overlay').show();
		$('#working').center().fadeIn(ms);
	} else {
		setTimeout(function(){
			$("#fade").removeClass('black_overlay').hide();
			$("#working").fadeOut(ms);
		},ms);
	}
}

// Creates hidden div needed for jQuery UI dialog box. If div exists and is a dialog already, removes as existing dialog.
function initDialog(div_id,inner_html) {
	if ($('#'+div_id).length) {
		if ($('#'+div_id).hasClass('ui-dialog-content')) $('#'+div_id).dialog('destroy');
		$('#'+div_id).addClass('simpleDialog');
	} else {
		$('body').append('<div id="'+div_id+'" class="simpleDialog"></div>');
	}
	$('#'+div_id).html((inner_html == null ? '' : inner_html));
}

// Fit a jQuery UI dialog box on the page if too tall.
function fitDialog(ob) {
    try {
        var winh = $(window).height();
        var isSurvey = (page == 'surveys/index.php');
        var hasNavBar = (!isSurvey && $('.navbar.navbar-light.fixed-top').css('display') != 'none');
        if (hasNavBar) winh -= $('.navbar.navbar-light.fixed-top').height() + 30;
        var thisHeight = $(ob).height();
        var dialogCollapsedOnMobile = (isMobileDevice && thisHeight < 20);
        if ($(ob).hasClass('ui-dialog-content') && ((thisHeight + 110) >= winh || dialogCollapsedOnMobile)) {
            // Set new height to be slightly smaller than window size
            $(ob).dialog('option', 'height', winh - (isMobileDevice ? 130 : 30));
            // If height somehow ends up as 0 (tends to happen on mobile devices)
            if (dialogCollapsedOnMobile) {
                $(ob).height(winh - 85);
            }
            // Center it
            $(ob).dialog('option', 'position', ["center", 10]);
        } else {
            // Center it
            $(ob).dialog('option', 'position', {my: 'center', at: 'center', of: window});
        }
    } catch(e){
		console.log(e)
	 }
}


// Center a jQuery object via .center()
jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
                                                $(window).scrollLeft()) + "px");
    return this;
}

// This will override the function used when setting jQuery UI dialog titles, allowing it to contain HTML.
jQuery.widget("ui.dialog", jQuery.extend({}, $.ui.dialog.prototype, {
    _title: function(title) {
        if (!this.options.title ) {
            title.html("&#160;");
        } else {
            title.html(this.options.title);
        }
    }
}));

// Display DDP explanation dialog
function ddpExplainDialog(fhir) {
    initDialog('ddpExplainDialog');
    var dialogHtml = $('#ddpExplainDialog').html();
    if (dialogHtml.length > 0) {
        $('#ddpExplainDialog').dialog('open');
    } else {
        fhir = (fhir == '1') ? '?type=fhir' : '';
        $.get(app_path_webroot+'DynamicDataPull/info.php'+fhir,{ },function(data) {
            var json_data = JSON.parse(data);
            $('#ddpExplainDialog').html(json_data.content).dialog({ bgiframe: true, modal: true, width: 750, title: json_data.title,
                open: function(){ fitDialog(this); },
                buttons: {
                    Close: function() { $(this).dialog('close'); }
                }
            });
        });
    }
}

