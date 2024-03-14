var message;
$(document).ready(function() {
    jQuery('[data-toggle="popover"]').popover({
        html : true,
        content: function() {
            return $(jQuery(this).data('target-selector')).html();
        },
        title: function(){
            return '<span style="padding-top:0px;">'+jQuery(this).data('title')+'<span class="close" style="line-height: 0.5;padding-top:0px;padding-left: 10px">&times;</span></span>';
        }
    }).on('shown.bs.popover', function(e){
        var popover = jQuery(this);
        jQuery(this).parent().find('div.popover .close').on('click', function(e){
            popover.popover('hide');
        });
        $('div.popover .close').on('click', function(e){
            popover.popover('hide');
        });

    });
    //We add this or the second time we click it won't work. It's a bug in bootstrap
    $('[data-toggle="popover"]').on("hidden.bs.popover", function() {
        //BOOTSTRAP 4
        $(this).data("bs.popover")._activeTrigger.click = false;
    });

    //To prevent the popover from scrolling up on click
    $("a[rel=popover]")
        .popover()
        .click(function(e) {
            e.preventDefault();
        });
    // Load image in preview for selected System image
    $('#system_image').change(function(){
        var selected_img_type = $(this).val();
        var url_img = app_path_images+systemImages[selected_img_type]+'.png';
        $('#image_div').find("img").attr('src',url_img);
        $('#image_div').show();
    });

    // Remove existing image to upload new custom image
    $('.remove-image').click(function() {
        if (confirm(lang.mycap_mobile_app_21)) {
            $("#new_image_div").css({"display":"block"});
            $("#old_image_div").css({"display":"none"});
            $("#old_image").val("");
        }
    });

    // Save Page information form
    $('#savePage').submit(function () {
        if (validatePageInfoForm()) {
            //close confirmation modal
            var index = $('#index_modal_update').val();
            $('#external-modules-configure-modal').modal('hide');
            var data = new FormData(document.getElementById("savePage"));
            submitForm(data,app_path_webroot+'MyCapMobileApp/update.php?pid='+pid+'&action=savePage',(index == "" ? "A" : "U"));
        }
        return false;
    });

    var message_letter = getParameterByName('message');
    if (message_letter != '') {
        // Modify the URL
        var url = window.location.href;
        // Remove 'message=?' from current url
        modifyURL(url.split( '&message=' )[0]);
    }
    //Messages on reload
    if(message != "") {
        $("#succMsgContainer").html(message);
        var msgBox = $("#succMsgContainer");
        setTimeout(function(){
            msgBox.slideToggle('normal');
        },300);
        setTimeout(function(){
            msgBox.slideToggle(1200);
        }, 5000);
    }

    $(".color-scheme-letter").each(function(){
        $(this).tooltip2({ tipClass: 'tooltip1', position: 'top center'});
    });
    $(".system-theme").each(function(){
        $(this).tooltip2({ tipClass: 'tooltip3', position: 'top center'});
    });

    $(".link-icon").click(function() {
        $(".link-icon").removeClass('selected');
        $(".link-icon i").hide();
        $(this).addClass('selected');
        $( this ).children( 'i.fa-check' ).show();
        $("#selected_icon").val($(this).attr("data-value"));
    });

    // Save Link information form
    $('#saveLink').submit(function () {
        if (validateLinkInfoForm()) {
            //close confirmation modal
            var index = $('#index_modal_update').val();
            $('#external-modules-configure-modal-link').modal('hide');
            var data = new FormData(document.getElementById("saveLink"));

            submitForm(data,app_path_webroot+'MyCapMobileApp/update.php?pid='+pid+'&action=saveLink',(index == "" ? "AL" : "UL"));
        }
        return false;
    });

    // Save Contact information form
    $('#saveContact').submit(function () {
        if (validateContactInfoForm()) {
            //close confirmation modal
            var index = $('#index_modal_update').val();
            $('#external-modules-configure-modal-contact').modal('hide');
            var data = new FormData(document.getElementById("saveContact"));

            submitForm(data,app_path_webroot+'MyCapMobileApp/update.php?pid='+pid+'&action=saveContact',(index == "" ? "AC" : "UC"));
        }
        return false;
    });

    // Links List: Enable drag n drop on link list table
    if ($('table#table-links_list').length) {
        enableLinkListTable();
    }

    // Contacts List: Enable drag n drop on contacts list table
    if ($('table#table-contacts_list').length) {
        enableContactListTable();
    }

    var params = new window.URLSearchParams(window.location.search);
    if (params.get('theme') == 1) {
        $(".color-picker").ColorPickerSliders({
            previewformat: 'hex',
            placement: 'top',
            swatches: false,
            sliders: false,
            hsvpanel: true,
            title: $(this).attr('title'),
            invalidcolorsopacity: 0
        });
    }

    // Save Task information form
    $('button#taskSettingsSubmit').click(function() {
        submitTaskSettingsForm();
    });

    $('#schedule_end_date').datepicker({
        onSelect: function(){
            $(this).focus();
            if ($(this).val() != '') {
                $('input[name="schedule_ends"][value="'+onDate+'"]').prop('checked', true);
            }
        },
        buttonText: 'Click to select a date', yearRange: '-50:+10', showOn: 'both', buttonImage: app_path_images+'date.png',
        buttonImageOnly: true, changeMonth: true, changeYear: true, dateFormat: user_date_format_jquery, constrainInput: false
    });

    $('.schedule_type_sel').click(function() {
        var selectionVal = '';
        if ($(this).is(':checked')){
            selectionVal = $(this).val();

            var infiniteSchedule = false;
            if (selectionVal == infiniteType || selectionVal == repeatingType) {
                var label = selectionVal.substring(1, selectionVal.length); // Remove "." from ".Infinite" or ".Repeating"
                if (label == "Repeating") {
                    $("#scheduleRepeatingFields").removeClass("disableInputs");
                    $("#scheduleFixedFields").addClass("disableInputs");
                } else if (label == "Infinite") {
                    $("#scheduleRepeatingFields").addClass("disableInputs");
                    $("#scheduleFixedFields").addClass("disableInputs");
                    infiniteSchedule = true;
                }
                $("#endTaskFields").show();
                $("#typeSelection").html(label);
            } else {
                if (selectionVal == fixedType) {
                    $("#scheduleFixedFields").removeClass("disableInputs");
                    $("#scheduleRepeatingFields").addClass("disableInputs");
                } else if (selectionVal == oneTimeType) {
                    $("#scheduleRepeatingFields").addClass("disableInputs");
                    $("#scheduleFixedFields").addClass("disableInputs");
                }
                $("#endTaskFields").hide();
            }
            if (infiniteSchedule == true) {
                // Disable setting "Allow retroactive completion?" for infinite tasks
                $('#allow_retroactive_completion').prop( "disabled", "disabled");
                $('#allow_retro_completion_row').css({ 'opacity' : 0.6 });
            } else {
                // Disable setting "Allow retroactive completion?" for infinite tasks
                $('#allow_retroactive_completion').removeAttr( "disabled");
                $('#allow_retro_completion_row').css("opacity","");
            }
        }
    });

    $(".schedule_frequency_sel").change(function(){
        var selFreq = $(this).val();
        if (selFreq == dailyFreqVal) {
            $("#schedulePrefix, #scheduleFreqWeekFields, #scheduleDaysOfWeekFields, #scheduleFreqMonthFields, #scheduleDaysOfMonthFields").hide();
        } else if (selFreq == weeklyFreqVal) {
            $("#schedulePrefix, #scheduleFreqMonthFields, #scheduleDaysOfMonthFields").hide();
            $("#schedulePrefix, #scheduleFreqWeekFields, #scheduleDaysOfWeekFields").show();
        } else if (selFreq == monthlyFreqVal) {
            $("#schedulePrefix, #scheduleFreqWeekFields, #scheduleDaysOfWeekFields").hide();
            $("#schedulePrefix, #scheduleFreqMonthFields, #scheduleDaysOfMonthFields").show();
        }
    });

    $(':input[name="schedule_frequency"], :input[name="schedule_interval_week"], :input[name="schedule_days_of_the_week[]"], :input[name="schedule_interval_month"],  :input[name="schedule_days_of_the_month"]').change(function(){
        if ($(this).val() != '') {
            $('input[name="schedule_type"][value="'+repeatingType+'"]').prop('checked', true);
            $('input[name="schedule_type"][value="'+repeatingType+'"]').click();
        }
    });
    $(':input[name="schedule_days_fixed"]').change(function(){
        if ($(this).val() != '') {
            $('input[name="schedule_type"][value="'+fixedType+'"]').prop('checked', true);
            $('input[name="schedule_type"][value="'+fixedType+'"]').click();
        }
    });
    $(':input[name="schedule_end_count"]').change(function(){
        if ($(this).val() != '') {
            $('input[name="schedule_ends"][value="'+afterCount+'"]').prop('checked', true);
        }
    });
    $(':input[name="schedule_end_after_days"]').change(function(){
        if ($(this).val() != '') {
            $('input[name="schedule_ends"][value="'+afterDays+'"]').prop('checked', true);
        }
    });

    $("button#pagesPreview").click(function(){
        // clear previous preview
        $('#previewContent').html('');

        bioMp(document.getElementById('previewContent'), {
            url: app_path_webroot+'MyCapMobileApp/preview.php?pid='+pid+'&section=about',
            view: 'front',
            image: app_path_images+'iphone6_front_black.png',
            width: 300
        });
    });

    $("button#contactsPreview").click(function(){
        // clear previous preview
        $('#previewContent').html('');

        bioMp(document.getElementById('previewContent'), {
            url: app_path_webroot+'MyCapMobileApp/preview.php?pid='+pid+'&section=contacts',
            view: 'front',
            image: app_path_images+'iphone6_front_black.png',
            width: 300
        });
    });

    $('body').on('click', '#div_initial_setup_instr_show_link', function() {
        $(this).hide();$('#div_initial_setup_instr').show('fade'); fitDialog($('#migrateMyCapDialog'));
    });
    $('body').on('click', '#div_initial_setup_instr_hide_link', function() {
        $('#div_initial_setup_instr').hide('fade'); fitDialog($('#migrateMyCapDialog'));
        $('#div_initial_setup_instr_show_link').show();
    });
    $('body').on('click', '#participant_id_custom_chk', function() {
        if ($(this).prop('checked')) {
            $('#participant_id_custom_div').fadeTo('slow', 1);
            $('#participant_id_div').fadeTo('fast', 0.3);
            $('#participant_custom_field').attr('disabled', true);
            $('#participant_custom_label').attr('disabled', false);
        } else {
            $('#participant_id_custom_div').fadeTo('fast', 0.3);
            $('#participant_id_div').fadeTo('slow', 1);
            $('#participant_custom_field').attr('disabled', false);
            $('#participant_custom_label').attr('disabled', true);
        }
    });
    // Copy-to-clipboard action
    $('.btn-clipboard').click(function(){
        copyUrlToClipboard(this);
    });

    // Set datetime pickers
    $('.filter_datetime_mdy').datetimepicker({
        yearRange: '-100:+10', changeMonth: true, changeYear: true, dateFormat: user_date_format_jquery,
        hour: currentTime('h'), minute: currentTime('m'), buttonText: lang.alerts_42,
        timeFormat: 'hh:mm', constrainInput: true
    });

    $('#deleted_participants').click(function() {
        // Start "working..." progress bar
        showProgress(1,0);
        if ($(this).is(":checked") == true) {
            window.location.href = app_path_webroot+"MyCapMobileApp/index.php?participants=1&deleted=1&pid="+pid;
        } else {
            window.location.href = app_path_webroot+"MyCapMobileApp/index.php?participants=1&pid="+pid;
        }
    });

    $('[name="template-type"]').click(function(e){
        $.get(app_path_webroot + 'MyCap/participant_info.php?pid='+pid+'&record='+$('#recordVal').val()+'&event_id='+$('#eventVal').val()+'&action=getHTMLByType',
            { type: $('[name="template-type"]:checked').val() },
            function(data) {
                $('#html-message-generated, #textboxTemplate').html(data);
            }
        );
    });

    // Save Announcement form
    $('#saveAnnouncement').submit(function () {
        if (validateAnnouncementInfoForm()) {
            //close confirmation modal
            var index = $('#index_modal_update').val();
            $('#external-modules-configure-modal-ann').modal('hide');
            var data = new FormData(document.getElementById("saveAnnouncement"));

            submitForm(data,app_path_webroot+'MyCapMobileApp/messaging.php?pid='+pid+'&action=saveAnnouncement',(index == "" ? "AA" : "UA"));
        }
        return false;
    });

    $('#removeButton').click(function() {
        $('#delete-announcement-modal').modal('show');
        $('#delete-announcement-modal-body-submit').attr('onclick','removeAnnouncement("'+$('#index_modal_update').val()+'");return false;');
    });

    // Prevent sorting on click of button in column header
    $('#display-baselinedate-settings').on('click', function(e){
        e.stopPropagation();
        displayBaselineDateSettingsPopup();
    });

    $('#set-identifier').on('click', function(e){
        e.stopPropagation();
        displaySetUpParticpantLablesPopup();
    });

    var textbox = $("#textboxTemplate");
    var textarea = $("#html-message-generated");

    $("#change").click(function() {
        var el = this;
        return (el.tog^=1) ? turnOff(el) : turnOn(el);
    });
    function turnOn(el){
        $('#change').html('<i class=\'fas fa-code\'></i> View HTML');
        $('#html-message-generated').hide();
        $('#textboxTemplate').show();
        $('#messageQR_dialog .btn-clipboard').attr('data-clipboard-target', '#textboxTemplate');
    };
    function turnOff(el){
        $('#change').html('<i class=\'fas fa-magnifying-glass\'></i> Preview Text');
        $('#textboxTemplate').hide();
        $('#html-message-generated').show();
        $('#messageQR_dialog .btn-clipboard').attr('data-clipboard-target', '#html-message-generated');
    };

    $('[data-bs-toggle="popover"], [data-toggle="popover"]').hover(function(e) {
        // Show popup
        popover = new bootstrap.Popover(e.target, {
            html: true,
            title: $(this).data('title'),
            content: $(this).data('content')
        });
        popover.show();
    }, function() {
        // Hide popup
        bootstrap.Popover.getOrCreateInstance(this).dispose();
    });

    $('body').on('click', '#show_issues_list', function() {
        $(this).hide();
        $('#div_errors_list, #div_warnings_list').show('fade');
        $('#hide_issues_list').show();
    });
    $('body').on('click', '#hide_issues_list', function() {
        $(this).hide();
        $('#div_errors_list, #div_warnings_list').hide('fade');
        $('#show_issues_list').show();
    });

    // Update schedule description on change of schedule relative to value
    $('input[type=radio][name=schedule_relative_to]').change(function() {
        if ($(this).attr("id") == 'install_date') {
            $(".scheduleToText").html("Install Date");
        }
        else if ($(this).attr("id") == 'baseline_date') {
            $(".scheduleToText").html("Baseline Date");
        }
    });
    $(".enableSchedule, .disableSchedule").tooltip({ tipClass: 'tooltip4sm', position: 'top center' });

    $(".active-task-list-tab").click(function() {
        var showId = $(this).attr('id');
        if (showId == 'researchKitTasks') {
            $(this).closest( "li").addClass('active');
            $('#mtbTasks').closest( "li").removeClass('active');
            $('#List_mtbTasks').hide();
            $('#List_researchKitTasks').show();
        } else {
            $('#researchKitTasks').closest( "li").removeClass('active');
            $(this).closest( "li").addClass('active');
            $('#List_researchKitTasks').hide();
            $('#List_mtbTasks').show();
        }
    });
});

// Place Migrate to REDCap button in front of MyCap link at left panel
function placeMyCapMigrationButton(obj) {
    obj.after('<button type="button" ' +
        'id="migrateMyCap" ' +
        'onclick="showMyCapMigrationDialog();"' +
        'class="btn btn-defaultrc btn-xs fs11"' +
        'style="color:#800000;float:right;padding:1px 5px 0;position:relative;top:-1px;"><i style="color:#A00000;" class="fa-solid fa-circle-arrow-right"></i> Migrate to REDCap</button>');
}

// Open mycap migration dialog (to see info/notes/proceed button)
function showMyCapMigrationDialog(flag = '') {
    showProgress(1, 0);
    // Id of dialog
    var dlgid = 'migrateMyCapDialog';
    // Display "migrate" button only for admins
    if (super_user_not_impersonator) {
        var btns = [{
            text: "Cancel", click: function () {
                $(this).dialog('close');
            }
        },
        {
            text: "Begin Migration", click: function () {
                proceedMyCapMigration();
            }
        }];
    } else {
        var btns = [{
            text: "Close", click: function () {
                $(this).dialog('close');
            }
        }];
    }
    // Get content via ajax
    $.post(app_path_webroot + 'MyCap/migrate_mycap.php?action=showDetails&flag='+flag+'&pid=' + pid, {}, function (data) {
        showProgress(0, 0);
        if (data == "0") {
            alert(woops);
            return;
        }
        // Decode JSON
        var json_data = JSON.parse(data);
        // Add html
        initDialog(dlgid);
        $('#' + dlgid).html(json_data.content);
        // Display dialog
        $('#' + dlgid).dialog({
            title: json_data.title, bgiframe: true, modal: true, width: 800, open: function () {
                fitDialog(this);
            }, close: function () {
                $(this).dialog('destroy');
            },
            buttons: btns
        });
    });
}

// Proceed to MyCap EM Migration
function proceedMyCapMigration() {
    // Display progress bar
    showProgress(1);
    if ($('#migrateMyCapDialog').hasClass('ui-dialog-content')) $('#migrateMyCapDialog').dialog('destroy');

    $.post(app_path_webroot+'MyCap/migrate_mycap.php?action=proceedMigration&pid='+pid, {}, function(data){
        var json_data = jQuery.parseJSON(data);
        showProgress(0,0);
        if (json_data.success == 1) {
            Swal.fire({
                title: json_data.title,
                html: json_data.content,
                icon: 'success'
            }).then(function(){
                showProgress(1);
                window.location.href = app_path_webroot+'ProjectSetup/index.php?pid='+pid
            });
        } else {
            Swal.fire({
                title: json_data.title,
                html: json_data.content,
                icon: 'error'
            });
        }
    });
}

// Copy-to-clipboard action
try {
    var clipboard = new Clipboard('.btn-clipboard');
} catch (e) {}

// Copy the html message to the user's clipboard
function copyUrlToClipboard(ob) {
    // Create progress element that says "Copied!" when clicked
    var rndm = Math.random()+"";
    var copyid = 'clip'+rndm.replace('.','');
    $('.clipboardSaveProgress').remove();
    var clipSaveHtml = '<span class="clipboardSaveProgress" id="'+copyid+'">Copied!</span>';
    $(ob).after(clipSaveHtml);
    $('#'+copyid).toggle('fade','fast');
    setTimeout(function(){
        $('#'+copyid).toggle('fade','fast',function(){
            $('#'+copyid).remove();
        });
    },2000);
}

/**
 * Validate add/edit task settings - Basic info, Optional Settings and Task Schedule sections (EXCLUDING Active task extended config settings)
 */
function validateOtherActiveTaskParams() {
    var errMsgBasic = [];
    var errMsgOptional = [];
    var errMsgSchedule = [];
    // Validate Task Title
    if ($('input[name=task_title]').val() == "") {
        errMsgBasic.push(setTaskTitle);
        $('input[name=task_title]').addClass('error-field');
    } else {
        $('input[name=task_title]').removeClass('error-field');
    }

    // Validate chart fields if selected option is "Chart"
    if ($('#chart:checked').length > 0) {
        if ($('select[name=x_date_field]').val() == "") {
            errMsgBasic.push(setDateField);
            $('select[name=x_date_field]').addClass('error-field');
        } else {
            $('select[name=x_date_field]').removeClass('error-field');
        }

        if ($('select[name=x_time_field]').val() == "") {
            errMsgBasic.push(setTimeField);
            $('select[name=x_time_field]').addClass('error-field');
        } else {
            $('select[name=x_time_field]').removeClass('error-field');
        }

        if ($('select[name=y_numeric_field]').val() == "") {
            errMsgBasic.push(setNumField);
            $('select[name=y_numeric_field]').addClass('error-field');
        } else {
            $('select[name=y_numeric_field]').removeClass('error-field');
        }
    }

    if ($('#instruction_step').is(':checked')) {
        if ($('input[name=instruction_step_title]').val() == "") {
            errMsgOptional.push(setInstrTitle);
            $('input[name=instruction_step_title]').addClass('error-field');
        } else {
            $('input[name=instruction_step_title]').removeClass('error-field');
        }

        if ($('textarea[name=instruction_step_content]').val() == "") {
            errMsgOptional.push(setInstrContent);
            $('textarea[name=instruction_step_content]').addClass('error-field');
        } else {
            $('textarea[name=instruction_step_content]').removeClass('error-field');
        }
    }

    if ($('#completion_step').is(':checked')) {
        if ($('input[name=completion_step_title]').val() == "") {
            errMsgOptional.push(setCompTitle);
            $('input[name=completion_step_title]').addClass('error-field');
        } else {
            $('input[name=completion_step_title]').removeClass('error-field');
        }

        if ($('textarea[name=completion_step_content]').val() == "") {
            errMsgOptional.push(setCompContent);
            $('textarea[name=completion_step_content]').addClass('error-field');
        } else {
            $('textarea[name=completion_step_content]').removeClass('error-field');
        }
    }

    if (isLongitudinal == 1) {
        var checkedEventsCount = $(".event-enabled:checked").length;
        if (checkedEventsCount == 0) {
            errMsgSchedule.push(enableEvent);
        }
    } else {
        if ($('#repeating').is(':checked')) {
            $('input[name="schedule_days_fixed"]').removeClass('error-field');
            if ($('select[name=schedule_frequency]').val() == weeklyFreqVal) {
                var checkedDays = $('input[name="schedule_days_of_the_week[]"]:checked').length;
                if (checkedDays == 0) {
                    errMsgSchedule.push(setWeeklyDays);
                }
            }
            if ($('select[name=schedule_frequency]').val() == monthlyFreqVal) {
                var checkedDays = $('input[name="schedule_days_of_the_month"]').val();
                var errText = setMonthlyDays;
                var errorDesc = "";
                if (checkedDays == "") {
                    errMsgSchedule.push(errText);
                    $('input[name="schedule_days_of_the_month"]').addClass('error-field');
                } else {
                    var nums = checkedDays.split(",");
                    var isError = false;
                    for (var i in nums) {
                        if (isNaN(nums[i])) {
                            errorDesc = foundInvlid+nums[i];
                            isError = true;
                            break;
                        } else {
                            if (nums[i] < 1 || nums[i] > 31) {
                                errorDesc = foundInvlid+nums[i];
                                isError = true;
                                break;
                            }
                        }

                    }
                    if (isError) {
                        errMsgSchedule.push(errText+" "+errorDesc);
                        $('input[name="schedule_days_of_the_month"]').addClass('error-field');
                    } else {
                        $('input[name="schedule_days_of_the_month"]').removeClass('error-field');
                    }
                }
            }
        }

        if ($('#fixed').is(':checked')) {
            $('input[name="schedule_days_of_the_month"]').removeClass('error-field');
            var checkedDays = $('input[name="schedule_days_fixed"]').val();
            var errText = setFixedDays;
            if (checkedDays == "") {
                errMsgSchedule.push(errText);
                $('input[name="schedule_days_fixed"]').addClass('error-field');
            } else {
                var nums = checkedDays.split(",");

                var isError = false;
                var errorDesc = "";
                for (var i in nums) {
                    if (isNaN(nums[i])) {
                        errorDesc = foundInvlid+nums[i];
                        isError = true;
                        break;
                    }
                }
                if (isError) {
                    errMsgSchedule.push(errText+" "+errorDesc);
                    $('input[name="schedule_days_fixed"]').addClass('error-field');
                } else {
                    $('input[name="schedule_days_fixed"]').removeClass('error-field');
                }
            }
        }

        // Validate "Number of days to delay"
        if($("input[name=schedule_relative_offset]").length) {
            if ($('input[name=schedule_relative_offset]').val() == "") {
                errMsgSchedule.push(delayMsg+" "+numeric);
                $('input[name="schedule_relative_offset"]').addClass('error-field');
            } else {
                $('input[name="schedule_relative_offset"]').removeClass('error-field');
                var delay = $('input[name=schedule_relative_offset]').val();
                if (isNaN(delay)) {
                    errMsgSchedule.push(delayMsg+" "+numeric+ foundInvlid +delay);
                    $('input[name="schedule_relative_offset"]').addClass('error-field');
                } else if (delay < 0) {
                    errMsgSchedule.push(delayMsg+" "+numeric+" "+gte+" 0."+ foundInvlid +delay);
                    $('input[name="schedule_relative_offset"]').addClass('error-field');
                }
            }
        }

        if ($('#infinite').is(':checked') || $('#repeating').is(':checked')) {
            if ($('#schedule_ends_after_count').is(':checked')) {
                $('input[name="schedule_end_after_days"]').removeClass('error-field');
                $('input[name="schedule_end_date"]').removeClass('error-field');
                var element = $('input[name="schedule_end_count"]');
                var times = element.val();
                var errText = endsAfterNums;
                if (times == "") {
                    errMsgSchedule.push(errText);
                    element.addClass('error-field');
                } else {
                    if (isNaN(times)) {
                        errorDesc = foundInvlid+times;
                        isError = true;
                    } else if (times <= 0) {
                        errorDesc = gte+" 1."+foundInvlid+times;
                        isError = true;
                    }
                    if (isError) {
                        errMsgSchedule.push(errText+" "+errorDesc);
                        element.addClass('error-field');
                    } else {
                        element.removeClass('error-field');
                    }
                }
            }

            if ($('#schedule_ends_after_days').is(':checked')) {
                $('input[name="schedule_end_count"]').removeClass('error-field');
                $('input[name="schedule_end_date"]').removeClass('error-field');
                var element = $('input[name="schedule_end_after_days"]');
                var days = element.val();
                var errText = endsAfterDays;
                if (days == "") {
                    errMsgSchedule.push(errText);
                    element.addClass('error-field');
                } else {
                    if (isNaN(days)) {
                        errorDesc = foundInvlid+days;
                        isError = true;
                    } else if (days <= 0) {
                        errorDesc = gte+" 1."+foundInvlid+days;
                        isError = true;
                    }
                    if (isError) {
                        errMsgSchedule.push(errText+" "+errorDesc);
                        element.addClass('error-field');
                    } else {
                        element.removeClass('error-field');
                    }
                }
            }

            if ($('#schedule_ends_on_date').is(':checked')) {
                $('input[name="schedule_end_count"]').removeClass('error-field');
                $('input[name="schedule_end_after_days"]').removeClass('error-field');
                var element = $('input[name="schedule_end_date"]');
                var date = element.val();
                if (date == "") {
                    errMsgSchedule.push(endsOnDate);
                    element.addClass('error-field');
                } else {
                    element.removeClass('error-field');
                }
            }
        }
    }

    var errMsg = new Object();

    var errMsg1 = '';
    var errMsg2 = '';
    var errMsg3 = '';

    // Generate error text in basic task info section
    if (errMsgBasic.length > 0) {
        errMsg1 += '<div><b>'+errBasicHeading+'</b></div><ul>';
        $.each(errMsgBasic, function (i1, e1) {
            errMsg1 += '<li>' + e1 + '</li>';
        });
        errMsg1 += '</ul>';
    }
    errMsg['basic'] = errMsg1;

    // Generate error text in Optional settings section
    if (errMsgOptional.length > 0) {
        errMsg2 +='<div><b>'+errOptionalHeading+'</b></div><ul>';
        $.each(errMsgOptional, function (i2, e2) {
            errMsg2 += '<li>' + e2 + '</li>';
        });
        errMsg2 += '</ul>';
    }
    errMsg['optional'] = errMsg2;

    // Generate error text in Set up task schedule section
    if (errMsgSchedule.length > 0) {
        errMsg3 += '<div><b>'+errScheduleHeading+'</b></div><ul>';
        $.each(errMsgSchedule, function (i3, e3) {
            errMsg3 += '<li>' + e3 + '</li>';
        });
        errMsg3 += '</ul>';
        // Hide same error displayed on page to avoid duplicate errors on same page
        $('.red').hide();
    }
    errMsg['schedule'] = errMsg3;

    // Return object with basic, optinal and schedule sections error texts
    return errMsg;
}

/**
 * Validate add/edit task settings - If active task, validate via ajax call
 */
function submitTaskSettingsForm() {

    $('#errMsgContainerModal').empty();
    $('#errMsgContainerModal').hide();

    if ($("#is_active_task").val() == 1) {
        var errorsActiveTask = '';
        // Send ajax call to validate Active task extended config inputs and then combine with other sections error messages
        var formData = new FormData(document.getElementById("saveTaskSettings"));
        formData.append('action', 'validateActiveTask');
        $.ajax({
            type: "POST",
            url: app_path_webroot+'MyCap/create_activetask.php?pid='+pid,
            data:  formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            dataType: "json",
            success: function(jsonAjax)
            {
                if(jsonAjax.status == 'success'){
                    //refresh page to show changes
                    if(jsonAjax.message != '' && jsonAjax.message != undefined) {
                        errorsActiveTask += '<div><b>'+errorsIn+" "+$("#activeTaskHeading").html()+'</b></div><ul>';
                        errorsActiveTask += jsonAjax.message;
                        errorsActiveTask += '</ul>';
                    }
                } else {
                    alert(woops);
                }
            },
            complete: function (data) {
                processErrorsDisplay(errorsActiveTask);
            }
        });
    } else {
        processErrorsDisplay("");
    }
}

/**
 * Process error displaying and if no errors, submit task settings form
 */
function processErrorsDisplay(errorsActiveTask) {
    var otherErrors = validateOtherActiveTaskParams();
    // Combine other errors + active task errors in sequence they are in UI of add/edit task settings
    var errMsg = otherErrors['basic'] + otherErrors['optional'] + errorsActiveTask + otherErrors['schedule'];
    if (errMsg != '') {
        $('#errMsgContainerModal').empty();
        $('#errMsgContainerModal').append(errMsg);
        $('#errMsgContainerModal').show();
        $('html,body').scrollTop(0);
        return false;
    } else {
        $("#saveTaskSettings").submit();
        return true;
    }
    return false;
}

/**
 * Validate edit active task settings
 */
function validateActiveTaskSettings() {
    var formData = new FormData(document.getElementById("saveTaskSettings"));//new FormData();
    formData.append('action', 'validateActiveTask');
    $.ajax({
        type: "POST",
        url: app_path_webroot+'MyCap/create_activetask.php?pid='+pid,
        data:  formData,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        dataType: "json",
        success: function(jsonAjax)
        {
            if(jsonAjax.status == 'success'){
                //refresh page to show changes
                if(jsonAjax.message != '' && jsonAjax.message != undefined){
                    return jsonAjax.message;
                }
                return '';
            } else {
                alert(woops);
            }
        }
    });
}
/**
 * Display confirm message for deleting the task settings for REDCap instrument
 */
function deleteMyCapSettings(task_id, page) {
    simpleDialog(lang.mycap_mobile_app_448,lang.mycap_mobile_app_449,null,600,null,lang.global_53,"deleteMyCapSettingsSave("+task_id+", '"+page+"');",lang.mycap_mobile_app_450);
}

/**
 * Delete the task settings for REDCap instrument
 */
function deleteMyCapSettingsSave(task_id, page) {
    $.post(app_path_webroot+'MyCap/delete_task.php?pid='+pid+'&task_id='+task_id+'&page='+page,{ },function(data){
        if (data != '1') {
            alert(woops);
        } else {
            simpleDialog(lang.mycap_mobile_app_398, lang.mycap_mobile_app_399,null,null,"window.location.href='"+app_path_webroot+"Design/online_designer.php?pid="+pid+"';");
        }
    });
}

/**
 * Enable link list table if links data exists
 */
function enableLinkListTable() {
    // Add dragHandle to first cell in each row
    $("table#table-links_list tr").each(function() {
        var link_id = trim($(this.cells[0]).text());
        $(this).prop("id", "linkrow_"+link_id).attr("linkid", link_id);
        if (isNumeric(link_id)) {
            // User-defined links (draggable)
            $(this.cells[0]).addClass('dragHandle');
        } else {
            $(this).addClass("nodrop").addClass("nodrag");
        }
    });
    // Restripe the link list rows
    restripeLinkListRows();
    if ($('[id^=linkrow_]').length > 2) {
        // Enable drag n drop
        $('table#table-links_list').tableDnD({
            onDrop: function (table, row) {
                // Loop through table
                var ids = "";
                var this_id = $(row).prop('id');
                $("table#table-links_list tr").each(function () {
                    // Gather form_names
                    var row_id = $(this).attr("linkid");
                    if (isNumeric(row_id)) {
                        ids += row_id + ",";
                    }
                });
                // Save new order via ajax
                $.post(app_path_webroot + 'MyCapMobileApp/update.php?pid=' + pid + '&action=reorderLink', {link_ids: ids}, function (returnData) {
                    jsonAjax = jQuery.parseJSON(returnData);
                    redirectToPage(jsonAjax, 'ML');
                });
                // Reset link order numbers in report list table
                resetLinkOrderNumsInTable();
                // Restripe table rows
                restripeLinkListRows();
                // Highlight row
                setTimeout(function () {
                    var i = 1;
                    $('tr#' + this_id + ' td').each(function () {
                        if (i++ != 1) $(this).effect('highlight', {}, 2000);
                    });
                }, 100);
            },
            dragHandle: "dragHandle"
        });
    }
    // Create mouseover image for drag-n-drop action and enable button fading on row hover
    $("table#table-links_list tr:not(.nodrag)").mouseenter(function() {
        $(this.cells[0]).css('background','#ffffff url("'+app_path_images+'updown.gif") no-repeat center');
        $(this.cells[0]).css('cursor','move');
    }).mouseleave(function() {
        $(this.cells[0]).css('background','');
        $(this.cells[0]).css('cursor','');
    });
    // Set up drag-n-drop pop-up tooltip
    var first_hdr = $('#links_list .hDiv .hDivBox th:first');
    first_hdr.prop('title',lang.mycap_mobile_app_66);
    first_hdr.tooltip2({ tipClass: 'tooltip4sm', position: 'top center', offset: [25,0], predelay: 100, delay: 0, effect: 'fade' });
    $('.dragHandle').mouseenter(function() {
        first_hdr.trigger('mouseover');
    }).mouseleave(function() {
        first_hdr.trigger('mouseout');
    });
}

/**
 * Restripe the rows of the link list table
 */
function restripeLinkListRows() {
    var i = 1;
    $("table#table-links_list tr").each(function() {
        // Restripe table
        if (i++ % 2 == 0) {
            $(this).addClass('erow');
        } else {
            $(this).removeClass('erow');
        }
    });
}

/**
 * Reset link order numbers in links list table
 */
function resetLinkOrderNumsInTable() {
    var i = 1;
    $("table#table-links_list tr:not(.nodrag)").each(function(){
        $(this).find('td:eq(1) div').html(i++);
    });
}

/**
 * Function that shows the modal with the page information to modify it
 * @param modal, array with the data from a specific page
 * @param index, the page id
 * @param pageNum, the page number
 */
function editAboutPage(modal, index, pageNum)
{
    $('input, textarea').removeClass('error-field');
    if (pageNum == 0 && index != '') {
        $("#info-page-msg").hide();
        $("#home-page-msg").show();

        // Only custom option is available for image type selection for homepage
        $("#type-system").removeClass("d-inline");
        $("#image-type-custom").hide();
        $("#type-system").hide();
        $("#home-page-note").addClass("d-inline");
        $("#home-page-note").show();
    } else {
        $("#home-page-msg").hide();
        $("#info-page-msg").show();
        // Both options - system, custom is available for image type selection
        $("#type-system").addClass("d-inline");
        $("#image-type-custom").show();
        $("#type-system").show();
        $("#home-page-note").removeClass("d-inline");
        $("#home-page-note").hide();


    }
    // Remove nulls
    for (var key in modal) {
        if (modal[key] == null) modal[key] = "";
    }

    $("#index_modal_update").val(index);

    var imageType, imageName, customImageName, customImageSrc;
    if (index == '') {
        $('#add-edit-title-text').html(lang.mycap_mobile_app_07);
        $('input[name=old_image]').val('');
        imageType = '.System';
        imageName = '';
        customImageName = '';
    } else {
        $('#add-edit-title-text').html(lang.mycap_mobile_app_08+' #' + (pageNum+1));
        imageType = modal['image-type'];
        if (imageType == ".System") {
            imageName = modal['system-image-name'];
            customImageName = '';
            customImageSrc = '';
        } else {
            imageName = '';
            customImageName = modal['custom-logo'];
            customImageSrc = modal['imgSrc'];
        }
    }

    //Add values
    $('input[name="page_title"]').val(modal['page-title']);
    $('textarea[name="page_content"]').val(modal['page-content']);
    $('input[name="image_type"][value="'+imageType+'"]').prop('checked',true);
    $('input[name=logo]').val('');

    setImageLayout(imageType, imageName, customImageName, customImageSrc);

    //clean up error messages
    $('#errMsgContainerModal').empty();
    $('#errMsgContainerModal').hide();

    //Show modal
    $('[name=external-modules-configure-modal]').modal('show');
}

/**
 * Function that set either "system" image selection dropdown or "custom" image upload UI
 * @param imageType, either system or custom
 * @param systemImageName, system image name
 * @param customImageName, custom image name
 * @param customImageSrc, custom image path
 */
function setImageLayout(imageType, systemImageName, customImageName, customImageSrc) {
    if (imageType == '.System') {
        // Select from existing system images
        $('select[name="system_image"] option[value="' + systemImageName + '"]').prop("selected", true)
        $('#system_image').change();

        $('#systemImageRow').show();
        $('#customImageRow').hide();
        $('#old_image_div').hide();
        $('#new_image_div').hide();
    } else {
        // Custom Image upload
        $('#systemImageRow').hide();
        $('#customImageRow').show();
        if (customImageName != '') {
            $('#old_image_div').show();
            $("#old_image").val(customImageName);
            $('#old_image_div').find("img").attr('src',customImageSrc);
            $('#new_image_div').hide()
        } else {
            $('#new_image_div').show();
        }
    }
}

/**
 * Function that checks if all required fields form the pages are filled @param errorContainer
 * @returns {boolean}
 */
function validatePageInfoForm()
{
    $('#succMsgContainer').hide();
    $('#errMsgContainerModal').empty();
    $('#errMsgContainerModal').hide();

    var errMsg = [];
    if ($('input[name=page_title]').val() == "") {
        errMsg.push(lang.mycap_mobile_app_22);
        $('input[name=page_title]').addClass('error-field');
    } else {
        $('input[name=page_title]').removeClass('error-field');
    }

    if ($('textarea[name=page_content]').val() == "") {
        errMsg.push(lang.mycap_mobile_app_23);
        $('textarea[name=page_content]').addClass('error-field');
    } else {
        $('textarea[name=page_content]').removeClass('error-field');
    }
    $('input[name=image_type]').each(function() {
        if ($(this).prop('checked') === true) {
            if ($(this).val() == '.Custom') {
                // Validate Custom Image upload
                var fileVal = $('input[name=logo]').val();
                if ($('input[name=old_image]').val() == ""
                    && fileVal == "") {
                    errMsg.push(lang.mycap_mobile_app_42);
                } else if (fileVal != "") {
                    var extension = getfileextension(fileVal);
                    extension = extension.toLowerCase();
                    if (extension != "jpeg" && extension != "jpg" && extension != "gif" && extension != "png" && extension != "bmp") {
                        errMsg.push(lang.mycap_mobile_app_43);
                    }
                }
            }
        }
    });

    if (errMsg.length > 0) {
        $('#errMsgContainerModal').empty();
        $.each(errMsg, function (i, e) {
            $('#errMsgContainerModal').append('<div>' + e + '</div>');
        });
        $('#errMsgContainerModal').show();
        $('html,body').scrollTop(0);
        $('[name=external-modules-configure-modal]').scrollTop(0);
        return false;
    }
    else {
        return true;
    }
}

/**
 * Function that submits add/edit form
 * @param data
 * @param url
 * @param message
 */
function submitForm(data, url, message){

    $.ajax({
        type: "POST",
        url: url,
        data:  data,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        dataType: "json",
        success: function(jsonAjax)
        {
            redirectToPage(jsonAjax, message);
        }
    });
}

/**
 * Function that redirects to the page and appends the message letter
 * @param jsonAjax
 * @param message
 */
function redirectToPage(jsonAjax, message) {
    if(jsonAjax.status == 'success'){
        //refresh page to show changes
        if(jsonAjax.message != '' && jsonAjax.message != undefined){
            message = jsonAjax.message;
        }
        var newUrl = getUrlMessageParam(message);
        if (newUrl.substring(newUrl.length-1) == "#")
        {
            newUrl = newUrl.substring(0, newUrl.length-1);
        }
        window.location.href = newUrl;
    } else {
        alert(woops);
    }
}

/**
 * Function that reloads the page and updates the success message
 * @param letter
 * @returns {string}
 */
function getUrlMessageParam(letter){
    var url = window.location.href;
    if (letter == '') return url;
    if (url.substring(url.length-1) == "#")
    {
        url = url.substring(0, url.length-1);
    }
    if(window.location.href.match(/(&message=)([A-Z]{1})/)){
        url = url.replace( /(&message=)([A-Z]{1})/, "&message="+letter );
    }else{
        url = url + "&message="+letter;
    }
    return url;
}

/**
 * Function that delete page
 * @param this_page_id, page id of page which is deleted
 * @param this_page_name, the page name
 */
function deleteAboutPage(this_page_id, this_page_name) {
    var delPageAjax = function(){
        var url = app_path_webroot+'MyCapMobileApp/update.php?pid='+pid+'&action=deletePage';
        $.post(url, { page: this_page_id }, function(returnData){
            jsonAjax = jQuery.parseJSON(returnData);
            redirectToPage(jsonAjax, 'D');
        });
    };
    simpleDialog(lang.mycap_mobile_app_26+' "<b>'+this_page_name+'</b>"'+lang.questionmark,lang.mycap_mobile_app_25,null,null,null,lang.global_53,delPageAjax,lang.global_19);
}

/**
 * Function that move a page
 * @param page_id, page id of page which is moved
 */
function moveAboutPage(page_id) {
    // Get dialog content via ajax
    $.post(app_path_webroot+'MyCapMobileApp/update.php?pid='+pid+'&action=movePage',{ page_id: JSON.stringify(page_id), param: 'view'},function(data){
        var json_data = jQuery.parseJSON(data);
        if (json_data.length < 1) {
            alert(woops);
            return false;
        }
        // Add dialog content and set dialog title
        $('#move_page_popup').html(json_data.payload);
        // Open the "move page" dialog
        $('#move_page_popup').dialog({ title: json_data.title, bgiframe: true, modal: true, width: 700, open: function(){fitDialog(this)},
            buttons: [
                { text: window.lang.global_53, click: function () { $(this).dialog('close'); } },
                { text: langSave, click: function () {
                        // Make sure we have a field first
                        if ($('#move_after_page').val() == '') {
                            simpleDialog(pleaseSelectPage);
                            return;
                        }
                        // Save new position via ajax
                        showProgress(1);
                        $.post(app_path_webroot+'MyCapMobileApp/update.php?pid='+pid+'&action=movePage',{ page_id: JSON.stringify(page_id), param: 'save', move_after_page: $('#move_after_page').val() },function(data){
                            $('#move_page_popup').dialog("close");
                            var newUrl = window.location.href;
                            if (newUrl.substring(newUrl.length-1) == "#")
                            {
                                newUrl = newUrl.substring(0, newUrl.length-1);
                            }
                            window.location.href = newUrl;
                        });
                    }
                }
            ]
        });
    });
}

/**
 * Function that shows the modal with the page information to modify it
 * @param modal, array with the data from a specific link
 * @param index, the link id
 * @param linkNum, the link number
 */
function editLink(modal, index, linkNum)
{
    // Remove nulls
    for (var key in modal) {
        if (modal[key] == null) modal[key] = "";
    }

    $("#index_modal_update").val(index);

    if (index == '') {
        $('#add-edit-title-text').html(lang.mycap_mobile_app_47);
    } else {
        $('#add-edit-title-text').html(lang.mycap_mobile_app_54+' #' + (linkNum+1));
    }

    //Add values
    $('input[name="link_name"]').val(modal['link-name']);
    $('input[name="link_url"]').val(modal['link-url']);

    if (modal['append-project-code'] == '1') {
        $('input[name="append_project_code"]').prop('checked', true);
    } else {
        $('input[name="append_project_code"]').prop('checked', false);
    }

    if (modal['append-participant-code'] == '1') {
        $('input[name="append_participant_code"]').prop('checked', true);
    } else {
        $('input[name="append_participant_code"]').prop('checked', false);
    }
    $('input[name="selected_icon"]').val(modal['link-icon']);
    $(".link-icon").removeClass('selected');
    $(".link-icon").children( 'i.fa-check' ).hide();
    $('li[data-value=' + modal['link-icon'] + ']').addClass( 'selected' );
    $('li[data-value=' + modal['link-icon'] + ']').children( 'i.fa-check' ).show();
    //clean up error messages
    $('#errMsgContainerModal').empty();
    $('#errMsgContainerModal').hide();

    //Show modal
    $('[name=external-modules-configure-modal-link]').modal('show');
}

/**
 * Function that checks if all required fields form the pages are filled @param errorContainer
 * @returns {boolean}
 */
function validateLinkInfoForm()
{
    $('#succMsgContainer').hide();
    $('#errMsgContainerModal').empty();
    $('#errMsgContainerModal').hide();

    var errMsg = [];
    if ($('input[name=link_name]').val() == "") {
        errMsg.push(lang.mycap_mobile_app_56);
        $('input[name=link_name]').addClass('error-field');
    } else {
        $('input[name=link_name]').removeClass('error-field');
    }
    var linkURLElement = $('input[name=link_url]');
    if (linkURLElement.val() == "") {
        errMsg.push(lang.mycap_mobile_app_57);
        $('input[name=link_url]').addClass('error-field');
    } else {
        var pattern = new RegExp('^((https|http|ftp)?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        if(pattern.test(linkURLElement.val()) == false){
            errMsg.push(lang.mycap_mobile_app_65);
            $('input[name=link_url]').addClass('error-field');
        } else {
            $('input[name=link_url]').removeClass('error-field');
        }
    }

    if ($('input[name=selected_icon]').val() == "") {
        errMsg.push(lang.mycap_mobile_app_58);
        $('input[name=selected_icon]').addClass('error-field');
    } else {
        $('input[name=selected_icon]').removeClass('error-field');
    }

    if (errMsg.length > 0) {
        $('#errMsgContainerModal').empty();
        $.each(errMsg, function (i, e) {
            $('#errMsgContainerModal').append('<div>' + e + '</div>');
        });
        $('#errMsgContainerModal').show();
        $('html,body').scrollTop(0);
        $('[name=external-modules-configure-modal-link]').scrollTop(0);
        return false;
    }
    else {
        return true;
    }
}

/**
 * Function that delete link
 * @param this_link_id, link id of link which is deleted
 * @param this_link_name, the link name
 */
function deleteLink(this_link_id, this_link_name) {
    var delLinkAjax = function(){
        var url = app_path_webroot+'MyCapMobileApp/update.php?pid='+pid+'&action=deleteLink';
        $.post(url, { link: this_link_id }, function(returnData){
            jsonAjax = jQuery.parseJSON(returnData);
            redirectToPage(jsonAjax, 'DL');
        });
    };
    simpleDialog(lang.mycap_mobile_app_63+' "<b>'+this_link_name+'</b>"'+lang.questionmark,lang.mycap_mobile_app_64,null,null,null,lang.global_53,delLinkAjax,lang.global_19);
}

/**
 * Function that shows the modal with the contact information to modify it
 * @param modal, array with the data from a specific contact
 * @param index, the contact id
 * @param contactNum, the contact number
 */
function editContact(modal, index, contactNum)
{
    $('input, textarea').removeClass('error-field');
    // Remove nulls
    for (var key in modal) {
        if (modal[key] == null) modal[key] = "";
    }

    $("#index_modal_update").val(index);

    if (index == '') {
        $('#add-edit-title-text').html(lang.mycap_mobile_app_72);
    } else {
        $('#add-edit-title-text').html(lang.mycap_mobile_app_73+' #' + (contactNum+1));
    }

    //Add values
    $('input[name="header"]').val(modal['contact-header']);
    $('input[name="title"]').val(modal['contact-title']);
    $('input[name="phone"]').val(modal['phone-number']);
    $('input[name="email"]').val(modal['email']);
    $('input[name="weburl"]').val(modal['website']);
    $('textarea[name="info"]').val(modal['additional-info']);

    //clean up error messages
    $('#errMsgContainerModal').empty();
    $('#errMsgContainerModal').hide();

    //Show modal
    $('[name=external-modules-configure-modal-contact]').modal('show');
}

/**
 * Function that checks if all required fields form the contacts are filled
 * @returns {boolean}
 */
function validateContactInfoForm()
{
    $('#succMsgContainer').hide();
    $('#errMsgContainerModal').empty();
    $('#errMsgContainerModal').hide();

    var errMsg = [];
    if ($('input[name=header]').val() == "") {
        errMsg.push(lang.mycap_mobile_app_74);
        $('input[name=header]').addClass('error-field');
    } else {
        $('input[name=header]').removeClass('error-field');
    }

    if (errMsg.length > 0) {
        $('#errMsgContainerModal').empty();
        $.each(errMsg, function (i, e) {
            $('#errMsgContainerModal').append('<div>' + e + '</div>');
        });
        $('#errMsgContainerModal').show();
        $('html,body').scrollTop(0);
        $('[name=external-modules-configure-modal-contact]').scrollTop(0);
        return false;
    }
    else {
        return true;
    }
}

/**
 * Function that delete contact
 * @param this_contact_id, contact id of contact which is deleted
 * @param this_contact_name, the contact name
 */
function deleteContact(this_contact_id, this_contact_name) {
    var delContactAjax = function(){
        var url = app_path_webroot+'MyCapMobileApp/update.php?pid='+pid+'&action=deleteContact';
        $.post(url, { contact: this_contact_id }, function(returnData){
            jsonAjax = jQuery.parseJSON(returnData);
            redirectToPage(jsonAjax, 'DC');
        });
    };
    simpleDialog(lang.mycap_mobile_app_75+' "<b>'+this_contact_name+'</b>"'+lang.questionmark,lang.mycap_mobile_app_76,null,null,null, lang.global_53, delContactAjax, lang.global_19);
}

/**
 * Function that enable contact list table
 */
function enableContactListTable() {
    // Add dragHandle to first cell in each row
    $("table#table-contacts_list tr").each(function() {
        var contact_id = trim($(this.cells[0]).text());
        $(this).prop("id", "contactrow_"+contact_id).attr("contactid", contact_id);
        if (isNumeric(contact_id)) {
            // User-defined contacts (draggable)
            $(this.cells[0]).addClass('dragHandle');
        } else {
            $(this).addClass("nodrop").addClass("nodrag");
        }
    });
    // Restripe the contact list rows
    restripeContactListRows();
    if ($('[id^=contactrow_]').length > 2) {
        // Enable drag n drop
        $('table#table-contacts_list').tableDnD({
            onDrop: function(table, row) {
                // Loop through table
                var ids = "";
                var this_id = $(row).prop('id');
                $("table#table-contacts_list tr").each(function() {
                    // Gather form_names
                    var row_id = $(this).attr("contactid");
                    if (isNumeric(row_id)) {
                        ids += row_id + ",";
                    }
                });
                // Save new order via ajax
                $.post(app_path_webroot+'MyCapMobileApp/update.php?pid='+pid+'&action=reorderContact', { contact_ids: ids }, function(returnData) {
                    jsonAjax = jQuery.parseJSON(returnData);
                    redirectToPage(jsonAjax, 'MC');
                });
                // Reset contact order numbers in contact list table
                resetContactOrderNumsInTable();
                // Restripe table rows
                restripeContactListRows();
                // Highlight row
                setTimeout(function(){
                    var i = 1;
                    $('tr#'+this_id+' td').each(function(){
                        if (i++ != 1) $(this).effect('highlight',{},2000);
                    });
                },100);
            },
            dragHandle: "dragHandle"
        });
    }

    // Create mouseover image for drag-n-drop action and enable button fading on row hover
    $("table#table-contacts_list tr:not(.nodrag)").mouseenter(function() {
        $(this.cells[0]).css('background','#ffffff url("'+app_path_images+'updown.gif") no-repeat center');
        $(this.cells[0]).css('cursor','move');
    }).mouseleave(function() {
        $(this.cells[0]).css('background','');
        $(this.cells[0]).css('cursor','');
    });
    // Set up drag-n-drop pop-up tooltip
    var first_hdr = $('#contacts_list .hDiv .hDivBox th:first');
    first_hdr.prop('title',lang.mycap_mobile_app_66);
    first_hdr.tooltip2({ tipClass: 'tooltip4sm', position: 'top center', offset: [25,0], predelay: 100, delay: 0, effect: 'fade' });
    $('.dragHandle').mouseenter(function() {
        first_hdr.trigger('mouseover');
    }).mouseleave(function() {
        first_hdr.trigger('mouseout');
    });
}

/**
 * Function that restripe the rows of the contact list table
 */
function restripeContactListRows() {
    var i = 1;
    $("table#table-contacts_list tr").each(function() {
        // Restripe table
        if (i++ % 2 == 0) {
            $(this).addClass('erow');
        } else {
            $(this).removeClass('erow');
        }
    });
}

/**
 * Function that Reset contact order numbers in contact list table
 */
function resetContactOrderNumsInTable() {
    var i = 1;
    $("table#table-contacts_list tr:not(.nodrag)").each(function(){
        $(this).find('td:eq(1) div').html(i++);
    });
}

/**
 * Function that saves a theme
 * @param formId, form id to identify which is theme system/custom
 */
function saveThemeForm(formId) {
    var data = new FormData(document.getElementById("form_theme_"+formId));
    submitForm(data,app_path_webroot+'MyCapMobileApp/update.php?pid='+pid+'&action=saveTheme', "UT");
    return false;
}

/**
 * Function that display publish config confirm dialog
 * @param content, content of dialog box
 * @param title, title of dialog box
 * @param btnClose, Close button text
 * @param btnDelete, Delete button text
 */
function publishConfigConfirm(content, title, btnClose, btnDelete) {
    showProgress(1);
    $.get(app_path_webroot + 'MyCap/tasks_issues.php?pid='+pid,
        function(data) {
            content += data;
            showProgress(0);
            simpleDialog(content, lang.mycap_mobile_app_92+lang.questionmark, null, 520, null, lang.global_53, function(){
                publishMyCapVersion();
            }, lang.mycap_mobile_app_95);
        }
    );
    showProgress(0);
}

/**
 * Function that publish config
 */
function publishMyCapVersion() {
    showProgress(1);

    $.post(app_path_webroot+'MyCapMobileApp/update.php?pid='+pid+'&action=publishVersion', {}, function(data){
        var json_data = jQuery.parseJSON(data);
        var msg = $('div.versionPublishMsg').html();
        if (json_data.status == 'success' || json_data.status == 'warning') {
            var newVersion = parseInt($("#versionNum").html()) + 1;
            $("#versionNum").html(newVersion);
            $('.mycap-config-outofdate').addClass('invisible');
        }
        if (json_data.status == 'warning') {
            msg += '<br /><br />' + langWarningTasksWithErrors;
        }
        showProgress(0,0);
        simpleDialog(msg, langNewFormRights2, null, 650, "showProgress(1);window.location.reload();", "Close");
    });
}

/**
 * Function that displays setup participant labels popup
 */
function displaySetUpParticpantLablesPopup() {
    showProgress(1,0);
    // Id of dialog
    var dlgid = 'participantIdentifier_dialog';
    // Get content via ajax
    $.post(app_path_webroot+'MyCap/participant_info.php?action=setIdentifier&pid='+pid,{ }, function(data) {
        showProgress(0,0);
        if (data == "0") {
            alert(woops);
            return;
        }
        // Decode JSON
        var json_data = JSON.parse(data);
        // Add html
        initDialog(dlgid);
        $('#'+dlgid).html(json_data.content);
        // Display dialog
        $('#'+dlgid).dialog({ title: json_data.title, bgiframe: true, modal: true, width: 800, open:function(){ fitDialog(this); }, close:function(){ $(this).dialog('destroy'); },
            buttons: [{ text: "Cancel", click: function(){ $(this).dialog('close'); } },
                      { text: "Save", click: function(){ saveParticipantIdentifier(); }
                     }]
        });
        $('#'+dlgid).parent().find('div.ui-dialog-buttonpane button:eq(1)').css({'font-weight':'bold','color':'#222'});
        // Init buttons
        initButtonWidgets();
    });
}

/**
 * Save the participant identifier for project
 */
function saveParticipantIdentifier() {
    var json_ob = $('form#setuplabelsform').serializeObject();
    json_ob.action = 'setparticipantid';
    // Save via ajax
    $.post(app_path_webroot+'ProjectGeneral/edit_project_settings.php?pid='+pid, json_ob,function(data){
        if (data=='[]') alert(woops);
        else {
            var json_data = jQuery.parseJSON(data);
            if ($('#participantIdentifier_dialog').hasClass('ui-dialog-content')) $('#participantIdentifier_dialog').dialog('destroy');
            simpleDialog(json_data.content, json_data.title, null, 500, "showProgress(1);window.location.reload();");
            setTimeout("showProgress(1);window.location.reload();", 2000);
        }
    });
}

/**
 * Generate a participant QR Code and open dialog window
 * @param record, current participants record
 */
function getQRCode(record, eventId) {
    if (eventId == undefined) {
        eventId = "";
    }
    showProgress(1,0);
    // Id of dialog
    var dlgid = 'genQR_dialog';
    // Get content via ajax
    $.post(app_path_webroot+'MyCap/participant_info.php?pid='+pid+'&record='+record+'&event_id='+eventId,{ }, function(data) {
        showProgress(0,0);
        if (data == "0") {
            alert(woops);
            return;
        }
        // Decode JSON
        var json_data = JSON.parse(data);
        // Add html
        initDialog(dlgid);
        $('#'+dlgid).html(json_data.content);
        // If QR codes are not being displayed, then make the dialog less wide
        var dwidth = ($('#'+dlgid+' #qrcode-info').length) ? 800 : 600;
        // Display dialog
        $('#'+dlgid).dialog({ title: json_data.title, bgiframe: true, modal: true, width: dwidth, open:function(){ fitDialog(this); }, close:function(){ $(this).dialog('destroy'); },
            buttons: [{
                text: "Close", click: function(){ $(this).dialog('close'); }
            }]
        });
        // Init buttons
        initButtonWidgets();
    });
}

/**
 * Open a popup to copy html message to send via alerts and notification
 * @param record, current participants record
 * @param template_type, possible values are qr, link or both
 */
function openEmailTemplatePopup(record, eventId, template_type) {
    showProgress(1,0);
    // Id of dialog
    var dlgid = 'messageQR_dialog';
    // Get content via ajax
    $.post(app_path_webroot+'MyCap/participant_info.php?action=getHTML&pid='+pid+'&record='+record+'&event_id='+eventId+'&type='+template_type,{ }, function(data){
        showProgress(0,0);
        if (data == "0") {
            alert(woops);
            return;
        }
        // Decode JSON
        var json_data = JSON.parse(data);
        // Add html
        initDialog(dlgid);
        $('#'+dlgid).html(json_data.content);
        // If QR codes are not being displayed, then make the dialog less wide
        var dwidth = 900;
        // Display dialog
        $('#'+dlgid).dialog({ title: json_data.title, bgiframe: true, modal: true, width: dwidth, open:function(){ fitDialog(this); }, close:function(){ $(this).dialog('destroy'); },
            buttons: [{
                text: "Close", click: function(){ $(this).dialog('close'); }
            }]
        });
        // Init buttons
        initButtonWidgets();
    });
}

/**
 * Delete/Undelete a participant from list
 * @param record, current participants record
 * @param part_id, participant ID
 * @param flag, possible values are delete or undelete
 */
function deleteMyCapParticipant(record, part_id, flag) {
    var content = window.lang.mycap_mobile_app_363;
    var title = window.lang.survey_360;
    var buttonText = window.lang.scheduling_57;
    if (flag == 'undelete') {
        content = window.lang.mycap_mobile_app_370;
        title = window.lang.mycap_mobile_app_371;
        buttonText = window.lang.mycap_mobile_app_372;
    }
    simpleDialog(content, title,null,null,null, window.lang.global_53,
    "deleteParticipantDo('"+record+"','"+part_id+"','"+flag+"');", buttonText);
}

/**
 * Delete participant from list
 * @param record, current participants record
 * @param part_id, participant ID
 * @param flag, possible values are delete or undelete
 */
function deleteParticipantDo(record, part_id, flag) {
    $.post(app_path_webroot+'MyCapMobileApp/update.php?pid='+pid+'&action=deleteParticipant&flag='+flag, { participant_id: part_id, record: record}, function(returnData){
        jsonAjax = jQuery.parseJSON(returnData);
        redirectToPage(jsonAjax, 'DP');
    });
}

/**
 * Reload the Participants for another "page" when paging
 * @param pagenum, page number
 */
function loadParticipantList(pagenum) {
    showProgress(1);
    var filterBBTime = '';
    if ($('#filterBBeginTime').val() != undefined) {
        filterBBTime = $('#filterBBeginTime').val();
    }
    var filterBETime = '';
    if ($('#filterBEndTime').val() != undefined) {
        filterBETime = $('#filterBEndTime').val();
    }
    window.location.href = app_path_webroot+'MyCapMobileApp/index.php?participants=1&pid='+pid+'&pagenum='+pagenum+
        '&filterIBeginTime='+$('#filterIBeginTime').val()+'&filterIEndTime='+$('#filterIEndTime').val()+'&filterBBeginTime='+filterBBTime+'&filterBEndTime='+filterBETime+'&filterRecord='+$('#filterRecord').val()+'&filterParticipant='+$('#filterParticipant').val();
}

/**
 * Display the pop-up for setting up allow participants logic condition
 */
function displayParticipantsLogicPopup() {
    showProgress(1,0);
    $.post(app_path_webroot+'MyCapMobileApp/participants_allow_logic_setup.php?pid='+pid,{action: 'view'},function(data){
        showProgress(0,0);
        if (data=='[]') alert(woops);
        else {
            var json_data = jQuery.parseJSON(data);
            // Open dialog
            initDialog('LogicSetupDialog');
            $('#LogicSetupDialog').html(json_data.content);

            isPopupOpened = true;

            $('#LogicSetupDialog').dialog({ title: json_data.title, bgiframe: true, modal: true, width: 920, open:function(){fitDialog(this);}, buttons: [
                    { text: lang.global_53, click: function () { isPopupOpened = false; $(this).dialog('destroy'); } },
                    { text: lang.designate_forms_13, click: function () {
                            saveAllowParticipantLogic();
                        }
                    }]
            });
        }
    });
}

/**
 * Save the values in the pop-up when setting up of allow participant Logic
 */
function saveAllowParticipantLogic() {
    var json_ob = $('form#LogicForm').serializeObject();
    json_ob.action = 'save';
    // Save via ajax
    $.post(app_path_webroot+'MyCapMobileApp/participants_allow_logic_setup.php?pid='+pid, json_ob,function(data){
        if (data=='[]') alert(woops);
        else {
            var json_data = jQuery.parseJSON(data);
            if ($('#LogicSetupDialog').hasClass('ui-dialog-content')) $('#LogicSetupDialog').dialog('destroy');
            simpleDialog(json_data.content, json_data.title, null, 600, "showProgress(1);window.location.reload();");
            setTimeout("showProgress(1);window.location.reload();", 2000);
        }
    });
}

/**
 * Open print window when clicked on "Print for participant" button
 */
function printQRCode(record) {
    window.open(app_path_webroot+'ProjectGeneral/print_page.php?pid='+pid+'&action=mycapqrcode&record='+record,'myWin','width=850, height=600, toolbar=0, menubar=1, location=0, status=0, scrollbars=1, resizable=1');
}

/**
 * Function that shows the modal with the announcement to modify it
 * @param modal, array with the data from a specific announcement
 * @param index, the announcement id
 * @param annNum, the announcement number
 */
function editAnnouncement(modal, index, annNum)
{
    $('input, textarea').removeClass('error-field');
    // Remove nulls
    for (var key in modal) {
        if (modal[key] == null) modal[key] = "";
    }

    $("#index_modal_update").val(index);

    if (index == '') { // Add Form
        $('#add-edit-title-text').html(lang.mycap_mobile_app_422);
        $('#removeButton, #warningBox').hide();
    } else { // Edit Form
        $('#add-edit-title-text').html(lang.mycap_mobile_app_423);
        $('#removeButton, #warningBox').show();
    }
    //Add values
    $('input[name="title"]').val(modal['title']);
    $('textarea[name="announcement_msg"]').val(modal['body']);

    //clean up error messages
    $('#errMsgContainerModal').empty();
    $('#errMsgContainerModal').hide();

    //Show modal
    $('[name=external-modules-configure-modal-ann]').modal('show');
}

/**
 * Function that checks if all required fields form the announcement are filled
 * @returns {boolean}
 */
function validateAnnouncementInfoForm()
{
    $('#succMsgContainer').hide();
    $('#errMsgContainerModal').empty();
    $('#errMsgContainerModal').hide();

    var errMsg = [];

    if ($('textarea[name=announcement_msg]').val() == "") {
        errMsg.push(lang.mycap_mobile_app_429);
        $('textarea[name=announcement_msg]').addClass('error-field');
    } else {
        $('textarea[name=announcement_msg]').removeClass('error-field');
    }

    if (errMsg.length > 0) {
        $('#errMsgContainerModal').empty();
        $.each(errMsg, function (i, e) {
            $('#errMsgContainerModal').append('<div>' + e + '</div>');
        });
        $('#errMsgContainerModal').show();
        $('html,body').scrollTop(0);
        $('[name=external-modules-configure-modal-ann]').scrollTop(0);
        return false;
    }
    else {
        return true;
    }
}

/**
 * Reload the Announcements for another "page" when paging
 * @param pagenum, page number
 */
function loadAnnouncementList(pagenum) {
    showProgress(1);
    window.location.href = app_path_webroot+'MyCapMobileApp/index.php?announcements=1&pid='+pid+'&pagenum='+pagenum;
}

/**
 * Reload the Inbox Messages for another "page" when paging
 * @param pagenum, page number
 */
function loadInboxMessagesList(pagenum) {
    showProgress(1);
    window.location.href = app_path_webroot+'MyCapMobileApp/index.php?messages=1&pid='+pid+'&pagenum='+pagenum+
        '&filterBeginTime='+$('#filterBeginTime').val()+'&filterEndTime='+$('#filterEndTime').val()+'&filterParticipant='+$('#filterParticipant').val();
}

/**
 * Reload the Sent Messages for another "page" when paging
 * @param pagenum, page number
 */
function loadOutboxMessagesList(pagenum) {
    showProgress(1);
    window.location.href = app_path_webroot+'MyCapMobileApp/index.php?outbox=1&pid='+pid+'&pagenum='+pagenum+
        '&filterBeginTime='+$('#filterBeginTime').val()+'&filterEndTime='+$('#filterEndTime').val()+'&filterUser='+$('#filterUser').val()+'&filterParticipant='+$('#filterParticipant').val();
}

/**
 * Open popup to display messages history of selected participant
 * @param participantCode, Participant Code
 * @param messageId, Message to hightlight
 */
function openMessagesHistory(participantCode, messageId = "") {
    showProgress(1,0);
    $.post(app_path_webroot+'MyCapMobileApp/messaging.php?pid='+pid,{action: 'view', participantCode: participantCode},function(data){
        showProgress(0,0);
        if (data=='[]') alert(woops);
        else {
            var json_data = jQuery.parseJSON(data);
            // Open dialog
            initDialog('MessagesHistoryDialog');
            $('#MessagesHistoryDialog').html(json_data.content);
            isPopupOpened = true;

            $('#MessagesHistoryDialog').dialog({ title: json_data.title, bgiframe: true, modal: true, width: 920, open:function() {
                    fitDialog(this);
                    if (messageId != '') {
                        // Highlight Message block
                        var scrollPos = $(window).scrollTop();
                        $(this).animate({ scrollTop: ($('div#message_'+messageId).offset().top - (scrollPos + 150)) }, "normal");
                        $('#messageTimeline div#message_'+messageId+':visible').effect('highlight',{},4000);
                    }
                }, close:function(){ isPopupOpened = false; $(this).dialog('destroy'); window.location.reload(); }, buttons: [{ text: lang.calendar_popup_01, click: function () { isPopupOpened = false; $(this).dialog('destroy'); window.location.reload(); } }]
            });
        }
    });
}

/**
 * Send New message to participant
 * @param this_participant, Participant Identifier
 */
function sendNewMessage(this_participant) {
    var body = $('#body').val();
    if ($.trim(body) == "") {
        simpleDialog(lang.mycap_mobile_app_439, lang.global_01);
        return;
    }

    var sendNewMessageAjax = function(){
        showProgress(1);
        var json_ob = $('form#newMessageForm').serializeObject();
        json_ob.action = 'send';
        // Save via ajax
        $.post(app_path_webroot+'MyCapMobileApp/messaging.php?pid='+pid, json_ob,function(data){
            if (data=='[]') alert(woops);
            else {
                var json_data = jQuery.parseJSON(data);
                if (json_data.liHTML != '') {
                    var li = $("ul#messageTimeline li:last-child");
                    li.before(json_data.resultHtml);
                    li.prev().slideDown();
                    $('textarea[name="body"]').val('');
                }
                showProgress(0);
            }
        });
    };
    simpleDialog(lang.mycap_mobile_app_438+" <b>"+this_participant+"</b>"+lang.questionmark, lang.mycap_mobile_app_440,null,null,null,lang.global_53, sendNewMessageAjax, lang.survey_180);
}

/**
 * Process Action Needed paramter for message
 * @param obj, checkbox element indicating action needed
 * @param messageId, message for which action needed is processing
 */
function processActionNeeded(obj, messageId) {
    if (messageId != '') {
        var isActionNeeded = $(obj).prop('checked');
        showProgress(1);
        $.post(app_path_webroot+'MyCapMobileApp/messaging.php?pid='+pid, { action: 'saveActionNeeded', message_id: messageId, is_action_needed: isActionNeeded }, function(data) {
            var json_data = jQuery.parseJSON(data);
            if (json_data.resultHtml != '') {
                $(obj).next().after(json_data.resultHtml);

                if($('#action_needed_'+messageId).length) { // This element only exists on inbox messages listing row under "Action Needed?" column
                    var isActionNeededText = lang.design_100;
                    if (isActionNeeded == false) {
                        isActionNeededText = lang.design_99;
                    }
                    $('#action_needed_'+messageId).html(isActionNeededText);
                }
                setTimeout(function(){
                    $('#saveStatus').remove();
                },1500);
            }
        });
        showProgress(0);
    }
}

/**
 * Process Action Needed paramter for message
 * @param this_announcement_id, announcement to remove
 */
function removeAnnouncement(this_announcement_id) {
    var url = app_path_webroot+'MyCapMobileApp/messaging.php?pid='+pid+'&action=removeAnnouncement';
    $.post(url, { announcememt_id: this_announcement_id }, function(returnData){
        jsonAjax = jQuery.parseJSON(returnData);
        redirectToPage(jsonAjax, 'DA');
    });
}

/**
 * Display the pop-up for setting up baseline date settings
 */
function displayBaselineDateSettingsPopup() {
    showProgress(1,0);
    $.post(app_path_webroot+'MyCapMobileApp/baseline_date_setup.php?pid='+pid,{action: 'view'},function(data){
        showProgress(0,0);
        if (data=='[]') alert(woops);
        else {
            var json_data = jQuery.parseJSON(data);
            // Open dialog
            initDialog('BaselineDateSetupDialog');
            $('#BaselineDateSetupDialog').html(json_data.content);

            isPopupOpened = true;

            var origForm = $("#BaselineDateSetupForm").serialize();
            $('#BaselineDateSetupDialog').dialog({ title: json_data.title, bgiframe: true, modal: true, width: 920, open:function(){fitDialog(this); initBaselineSettings();}, buttons: [
                    { text: lang.global_53, click: function () { isPopupOpened = false; $(this).dialog('destroy'); } },
                    { text: lang.folders_11, click: function () {
                            // Validate form
                            if (validationBaselineDateSetupForm()) return false;

                            // If form values are updated, get confirmation from user
                            if ($("#BaselineDateSetupForm").serialize() !== origForm && baselineDateExists == true) {
                                simpleDialog(lang.mycap_mobile_app_595, lang.mycap_mobile_app_594,null,null,null, window.lang.global_53,
                                    "saveBaselineDateSettings();", lang.folders_11);
                            } else {
                                saveBaselineDateSettings();
                            }
                        }
                    }]
            });
        }
    });
}

/**
 * Initialize js for baseline date settings pop-up
 */
function initBaselineSettings() {
    $('#use_baseline_chk').click(function(){
        if ($(this).prop('checked')) {
            $('#baseline_date_id_div').fadeTo('slow', 1);
            $('#baseline_date_field').prop('disabled', false);
            $('#div_notice, #div_baseline_settings, #div_include_instructions').show('fade',function() {

                if ($('#include_instructions_chk').prop('checked')) {
                    $('#div_instruction_steps').show();
                }
                // Try to reposition each dialog (depending on which page we're on)
                if ($('#BaselineDateSetupDialog').length) {
                    fitDialog($('#BaselineDateSetupDialog'));
                    $('#BaselineDateSetupDialog').dialog('option','position','center');
                }
            });
        } else {
            $('#baseline_date_id_div').fadeTo('fast', 0.3);
            $('#baseline_date_field').prop('disabled', true);
            $('#div_notice, #div_baseline_settings, #div_include_instructions').hide('fade',{ },200);
            if ($('#div_instruction_steps').length) {
                $('#div_instruction_steps').hide('fade',{ },200);
            }
        }
    });

    $('#include_instructions_chk').click(function(){
        if ($(this).prop('checked')) {
            $('#div_instruction_steps').show('fade',function() {
                // Try to reposition each dialog (depending on which page we're on)
                if ($('#BaselineDateSetupDialog').length) {
                    fitDialog($('#BaselineDateSetupDialog'));
                    $('#BaselineDateSetupDialog').dialog('option','position','center');
                }
            });
        } else {
            $('#div_instruction_steps').hide('fade',{ },200);
            $('input[name=instruction_title]').val('');
            $('textarea[name=instruction_content]').val('');
        }
    });
}

/**
 * Validate Baseline Date setup form
 */
function validationBaselineDateSetupForm() {
    // Make sure all visible fields have a value
    var errMsg = [];
    if ($('#use_baseline_chk').prop('checked')) {
        if ($('select[name=baseline_date_field]').val() == "") {
            errMsg.push(lang.mycap_mobile_app_480);
            $('select[name=baseline_date_field]').addClass('error-field');
        } else {
            $('select[name=baseline_date_field]').removeClass('error-field');
        }

        if ($('input[name=title]').val() == "") {
            errMsg.push(lang.create_project_20+" "+lang.mycap_mobile_app_108);
            $('input[name=title]').addClass('error-field');
        } else {
            $('input[name=title]').removeClass('error-field');
        }

        if ($('input[name=yesnoquestion]').val() == "") {
            errMsg.push(lang.create_project_20+" "+lang.mycap_mobile_app_457);
            $('input[name=yesnoquestion]').addClass('error-field');
        } else {
            $('input[name=yesnoquestion]').removeClass('error-field');
        }

        if ($('input[name=datequestion]').val() == "") {
            errMsg.push(lang.create_project_20+" "+lang.mycap_mobile_app_458);
            $('input[name=datequestion]').addClass('error-field');
        } else {
            $('input[name=datequestion]').removeClass('error-field');
        }

        if ($('#include_instructions_chk').prop('checked')) {
            if ($('input[name=instruction_title]').val() == "") {
                errMsg.push(lang.create_project_20+" "+lang.mycap_mobile_app_481);
                $('input[name=instruction_title]').addClass('error-field');
            } else {
                $('input[name=instruction_title]').removeClass('error-field');
            }

            if ($('textarea[name=instruction_content]').val() == "") {
                errMsg.push(lang.create_project_20+" "+lang.mycap_mobile_app_482);
                $('textarea[name=instruction_content]').addClass('error-field');
            } else {
                $('textarea[name=instruction_content]').removeClass('error-field');
            }
        }
    }
    if (errMsg.length > 0) {
        $('#errMsgContainerModal').empty();
        $.each(errMsg, function (i, e) {
            $('#errMsgContainerModal').append('<div>' + e + '</div>');
        });
        $('#errMsgContainerModal').show();
        $('html,body').scrollTop(0);
        return true;
    } else {
        return false;
    }
}


/**
 * Function that saves baseline date settings to database via ajax call
 */
function saveBaselineDateSettings() {
    var json_ob = $('form#BaselineDateSetupForm').serializeObject();
    json_ob.action = 'save';
    $.post(app_path_webroot+'MyCapMobileApp/baseline_date_setup.php?pid='+pid,json_ob,function(data) {
        var json_data = jQuery.parseJSON(data);
        if ($('#BaselineDateSetupDialog').hasClass('ui-dialog-content')) $('#BaselineDateSetupDialog').dialog('destroy');
        simpleDialog(json_data.content, json_data.title, null, 600, "showProgress(1);window.location.reload();");
        setTimeout("showProgress(1);window.location.reload();", 2000);
    });
}

/**
 * Open popup to display sync issue details
 * @param projectCode, Project Code
 * @param participantCode, Participant Code
 * @param issueId, Issue to hightlight
 */
function openSyncIssueDetails(projectCode, participantCode, issueId) {
    showProgress(1,0);
    $.post(app_path_webroot+'MyCapMobileApp/sync_issues.php?pid='+pid,{action: 'view', projectCode: projectCode, participantCode: participantCode, issueId: issueId},function(data){
        showProgress(0,0);
        if (data=='[]') alert(woops);
        else {
            var json_data = jQuery.parseJSON(data);
            // Open dialog
            initDialog('SyncIssueDialog');
            $('#SyncIssueDialog').html(json_data.content);
            isPopupOpened = true;

            $('#SyncIssueDialog').dialog({ title: json_data.title, bgiframe: true, modal: true, width: 1000, open:function() {
                    fitDialog(this);
                }, buttons: [{ text: lang.global_53, click: function () { isPopupOpened = false; $(this).dialog('destroy'); } },
                    { text: lang.pub_085, click: function(){ saveResolution(); }
                    }]
            });
        }
    });
}

/**
 * Save the resolution status and comment for sync issue
 */
function saveResolution() {
    showProgress(1);
    var json_ob = $('form#SyncIssueSetupForm').serializeObject();
    json_ob.action = 'save';
    // Save via ajax
    $.post(app_path_webroot+'MyCapMobileApp/sync_issues.php?pid='+pid, json_ob,function(data){
        showProgress(0);
        if (data=='[]') alert(woops);
        else {
            var json_data = jQuery.parseJSON(data);
            if ($('#SyncIssueDialog').hasClass('ui-dialog-content')) $('#SyncIssueDialog').dialog('destroy');
            simpleDialog(json_data.content, json_data.title, null, 600, "showProgress(1);window.location.reload();");
            setTimeout("showProgress(1);window.location.reload();", 2000);
        }
    });
}

/**
 * Reload the Sync Issues for another "page" when paging
 * @param pagenum, page number
 */
function loadIssuesList(pagenum) {
    showProgress(1);
    window.location.href = app_path_webroot+'MyCapMobileApp/index.php?syncissues=1&pid='+pid+'&pagenum='+pagenum+
        '&filterBeginTime='+$('#filterBeginTime').val()+'&filterEndTime='+$('#filterEndTime').val()+'&filterStatus='+$('#filterStatus').val()+'&filterParticipant='+$('#filterParticipant').val();
}

/**
 * Function that display all tasks enabled for MyCap with info
 */
function displayTasksListing() {
    showProgress(1);

    $.post(app_path_webroot+'MyCap/tasks_list.php?pid='+pid, {}, function(data){
        var json_data = jQuery.parseJSON(data);
        showProgress(0,0);
        simpleDialog(json_data.content, json_data.title, null, 920);
    });
}

/**
 * Function to display Active Task listing dialog (upon clicking of "Create Active Task" button)
 */
function openActiveTasksListing() {
    // AJAX call to get active tasks values for pre-filling
    simpleDialog(null, langAT01, "activetask_list",850, "");
    fitDialog($('#activetask_list'));
}

/**
 * Function to display add Active Task dialog (upon clicking of "Add" button)
 */
function addNewActiveTask(activeTask, taskName) {
    $('#activetask_instrument_label').html(taskName);
    $('#instrument_new_name').val('');
    // Open popup
    $('#activetask_add').dialog({ bgiframe: true, modal: true, width: 500,
        buttons: [
            { text: window.lang.calendar_popup_01, click: function () { $(this).dialog('close'); } },
            { text: langCreateActiveTask, click: function () {
                    var newForm = $('#instrument_new_name').val();
                    // Remove unwanted characters
                    newForm = newForm.replace(/^\s+|\s+$/g,'');
                    // Make sure instrument title is given
                    if (newForm == '') {
                        simpleDialog(langActiveTaskInstr);
                        return false;
                    }
                    // Ajax request to copy instrument
                    $.post(app_path_webroot+'MyCap/create_activetask.php?pid='+pid,{ selected_active_task:activeTask, new_form_label: newForm }, function(data) {
                        if (data == "0") { alert(woops); return; }
                        // Set dialog title/content
                        try {
                            var json_data = jQuery.parseJSON(data);
                            $('#activetask_add').dialog('close');
                            simpleDialogAlt("<div style='color:green;font-size:13px;'><img src='"+app_path_images+"tick.png'> "+langActiveTaskInstr1+"</div>", 300, 400);
                            setTimeout(function(){
                                showProgress(1);
                                window.location.href = app_path_webroot+'MyCap/edit_task.php?pid='+pid+'&view=showform&page='+json_data.instrument_name+'&redirectDesigner=1';
                            },3000);
                            initWidgets();
                        } catch(e) {
                            alert(woops);
                        }
                    });
                }
            }
        ]
    });
}

/**
 * Function to Set the MyCap task title to be the same as the form label value
 */
function setMyCapTaskTitleAsFormLabel(form) {

    $.post(app_path_webroot+'Design/set_task_title_as_form_name.php?pid='+pid,{ form: form },function(data) {
        if (data == '0') {
            alert(woops);
        } else {
            simpleDialog(langSetTaskTitleAsForm5+' "<b>'+data+'</b>"'+langPeriod,langSetTaskTitleAsForm6,null,null,"window.location.reload();");
        }
    });
}

/**
 * Function to display list of all MyCap issues in popup for instrument
 */
function showMyCapIssues(form) {
    showProgress(1,0);
    if (!$('#myCapIssues').length) $('body').append('<div id="myCapIssues" style="display:none;"></div>');
    $.post(app_path_webroot+'Design/mycap_task_issues.php?pid='+pid,{ page: form, action: 'list_issues' },function(data) {
        var json_data = jQuery.parseJSON(data);
        if (json_data.length < 1) {
            alert(woops);
            return false;
        }
        showProgress(0);
        // Add dialog content and set dialog title
        $('#myCapIssues').html(json_data.payload);

        $('#myCapIssues').dialog({
            bgiframe: true, modal: true, width: 600, open: function () {
                fitDialog(this)
            },
            title: json_data.title,
            buttons: [{
                text: 'Close',
                click: function() {
                    $(this).dialog('close');
                }
            }]
        });
        if (json_data.count == 0 ) {
            $('#fixBtn').hide();
        }
    });
    return false;
}

/**
 * Function to fix all listed MyCap issues in popup/instrument design page for instrument
 */
function fixMyCapIssues(form) {
    showProgress(1, 0);
    $.post(app_path_webroot+'Design/mycap_task_issues.php?pid='+pid,{ page: form, action: 'fix_issues' },function(data){
        // Set dialog title/content
        try {
            var json_data = jQuery.parseJSON(data);
            if (json_data.length < 1) {
                alert(woops);
                return false;
            }
            showProgress(0);
            $("#myCapIssues").remove();
            simpleDialogAlt(json_data.payload, 300, 400);
            setTimeout(function(){
                showProgress(1);
                var url = app_path_webroot+page+'?pid='+pid;
                if (getParameterByName('page') != '') {
                    url += '&page='+getParameterByName('page');
                }
                window.location.href = url;
            },3000);
            initWidgets();
        } catch(e) {
            alert(woops);
        }
    });
}

// Dialog to open modify project title in app form
function dialogModifyAppProjectTitle() {
    $.post(app_path_webroot+'MyCapMobileApp/update.php?pid='+pid+'&action=renderProjectTitleSetup', { }, function(data){
        if (data == '0') {
            alert(woops);
            return;
        }
        initDialog('projTitleDialog');
        $('#projTitleDialog').html(data);
        $('#projTitleDialog').dialog({ bgiframe: true, modal: true, width: 700, open: function(){ fitDialog(this) }, title: lang.mycap_mobile_app_691, buttons: {
                'Close': function() {
                    $(this).dialog('close');
                },
                'Save': function() {
                    // Check values before submission on Project form, stop here if basic form info are not valid
                    if ($('#project_title').val().length < 1) {
                        simpleDialog('Please provide a project title.','Missing title');
                        return false;
                    }
                    // Save via ajax
                    $('#projTitleDialog').dialog('close');
                    $.post(app_path_webroot+'MyCapMobileApp/update.php?pid='+pid+'&action=saveProjectTitle',$('#project_title_setup_form').serializeObject(),function(data){
                        if (data == '0') {
                            alert(woops);
                            return;
                        }
                        $('#projTitleDialog').remove();
                        simpleDialog('<img src="'+app_path_images+'tick.png"> <span style="font-size:14px;color:green;">'+lang.mycap_mobile_app_693+'</span>',lang.survey_605,null,null,function(){ window.location.reload(); },'Close');
                        setTimeout(function(){ window.location.reload(); },2500);
                    });
                }
            }});
    });
}

// MyCap Task setup: Adjust bgcolor of cells and inputs when activating/deactivating a task for event
function taskSetupActivate(activate, event_id) {
    if (activate) {
        // Activate this task setup
        $('#tstr-'+event_id+' td').removeClass('opacity35').addClass('darkgreen');
        // Enable all inputs
        $('#tstr-'+event_id+' textarea, #tstr-'+event_id+' input, #tstr-'+event_id+' select').prop('disabled', false);
        $('#tsactive-'+event_id).prop('checked', true);
        // Show/hide activation icons/text
        $('#div_ts_icon_enabled-'+event_id).show();
        $('#div_ts_icon_disabled-'+event_id).hide();
    } else {
        // Deactivate this task setup
        // Remove bgcolors
        $('#tstr-'+event_id+' td').removeClass('darkgreen');
        $('#tstr-'+event_id+' td:eq(2), #tstr-'+event_id+' td:eq(3)').addClass('opacity35');
        // Disable all inputs and remove their values
        $('#tstr-'+event_id+' input[type="checkbox"]').prop('checked', false);
        $('#tstr-'+event_id+' textarea, #tstr-'+event_id+' input, #tstr-'+event_id+' select').prop('disabled', true);
        $('#tsactive-'+event_id).prop('checked', false);
        // Show/hide activation icons/text
        $('#div_ts_icon_enabled-'+event_id).hide();
        $('#div_ts_icon_disabled-'+event_id).show();
    }
}

// Transition project to Flutter App
function transitionToFlutter(doBtn,cancelBtn,title,content) {
    simpleDialog(content,title,null,500,null,cancelBtn,'transitionToFlutterDo();',doBtn);
}
function transitionToFlutterDo() {
    // Display progress bar
    showProgress(1);
    if ($('#migrateMyCapDialog').hasClass('ui-dialog-content')) $('#migrateMyCapDialog').dialog('destroy');

    $.post(app_path_webroot+'ProjectSetup/modify_project_setting_ajax.php?pid='+pid, { action: 'convert', setting: 'flutter_conversion' }, function(data){

        showProgress(0,0);
        if (data == '0') {
            alert(woops);
            return;
        } else {
            // Hide Transition to Flutter Notice
            $('#flutterNotice').hide();

            $('.flutterConversionMsg').show();
            $("#flutterNoticeImg").attr("src", app_path_images+'tick_small_circle.png');

            // Show message
            simpleDialog(data, lang.global_79, null, 600);
        }
    });
}