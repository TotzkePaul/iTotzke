/*!
 * Dash JavaScript Library
 * Version 0.2.1
 *
 * Copyright 2011, Eric Boll
 * Licensed under the GNU Lesser General Public License.
 * http://www.gnu.org/licenses/lgpl.html
 *
 * Fork by Paul Totzke
 *
 * Uses the JQuery JavaScript Library under the MIT License
 * Copyright 2011, John Resig
 * http://jquery.org/license
 *
 * Uses the JQuery DataTables Plugin under the BSD (3-Point) License
 * Copyright (c) 2008-2011, Allan Jardine
 * All rights reserved.
 * http://datatables.net/license_bsd
 *
 * Uses the JQuery Timepicker Addon under the MIT License
 * Copyright 2011 Trent Richardson
 * http://trentrichardson.com/Impromptu/MIT-LICENSE.txt
 *
 * Uses the FullCalendar Addon under the MIT License
 * Copyright 2011 Adam Shaw
 * http://arshaw.com/fullcalendar/
 */
$(function ()
{
    Dash.Init();
});

var Dash = new function() {
    var defaults =
    {
        accordion:
        {
            "autoHeight": false,
            "collapsible": true
        },
        autocomplete:
        {
            "source": null
        },
        button:
        {
            "icon": "",
            "text": true
        },
        datatable:
        {
            "aaSorting": [],
            "aaSortingFixed": [],
            "aoColumnDefs": [],
            "bAutoWidth": false,
            "bDestroy": true,
            "bFilter": true,
            "bJQueryUI": true,
            "bLengthChange": true,
            "bSort": true,
            "fnDrawCallback": function() {
                $("tr", this).removeClass("ui-state-default");
                $("tr.odd").addClass("ui-state-default");
            },
            "fnRowCallback": null,
            "fnServerData": function(sSource, aoData, fnCallback) {
                $.ajax(
                    {
                        "type": "POST",
                        "contentType": "application/json; charset=utf-8",
                        "dataType": "json",
                        "url": sSource,
                        "success": function(result) {
                            fnCallback({ "aaData": result.d });
                        },
                    });
            },
            "iDisplayLength": 10,
            "sAjaxSource": null,
            "sPaginationType": "two_button"
        },
        datepicker:
        {
            "changeMonth": false,
            "changeYear": false,
            "yearRange": null,
            "minDate": null,
            "maxDate": null
        },
        timepicker:
        {
            "ampm": true,
            "stepMinute": 5,
            "onSelect": null
        },
        datetimepicker:
        {
            "changeMonth": false,
            "changeYear": false,
            "yearRange": null,
            "resizable": false
        },
        dialog:
        {
            "autoOpen": false,
            "draggable": false,
            "height": "auto",
            "maxDate": null,
            "minDate": null,
            "modal": true,
            "resizable": false,
            "title": "",
            "width": "auto",
            "yearRange": null
        },
        tab:
        {			
            
        }		
    };

    // Contains custom defaults that can be applied with the data-dash-custom="" attribute
    var custom =
    {
        "frontPageTable":
        {
            datatable:
            {
                "bLengthChange": false
            }
        },

        "smallButton":
        {
            button:
            {
                "text": false,
                "icon": ""
            }
        }
    };

    /**
    * Init all the things!
    */
    this.Init = function() {
        this.InitAccordions($("div[data-accordion^='true']"));
        this.InitAutocompletes($(":input[data-autocomplete^='true']"));
        this.InitButtons($("[data-button^='true']"));
        this.InitDataTables($("table[data-table^='true']"));
        this.InitDatepickers($("input[data-datepicker^='true']"));
        this.InitDatetimepickers($("input[data-datetimepicker^='true']"));
        this.InitTimepickers($("input[data-timepicker^='true']"));
        this.InitDialogs($("[data-dialog^='true']"));
        this.InitTabs($("div[data-tabs^='true']"));
    };

    /**
    * Creates all of the accordions
    */
    this.InitAccordions = function(accordions) {
        $(accordions).each(function() {
            var def = loadCustomDefaults(this);
            var autoHeight = $(this).attr("data-accordion-auto-height");
            autoHeight = (autoHeight != null) ? (autoHeight == "true") : def.accordion["autoHeight"];
            var collapsible = $(this).attr("data-accordion-collapsible");
            collapsible = (collapsible != null) ? collapsible == "true" : def.accordion["collapsible"];

            $(this).accordion(
                {
                    autoHeight: autoHeight,
                    collapsible: collapsible
                });
        });
    };

    /**
    * Creates all of the autocompletes
    */
    this.InitAutocompletes = function(autocompletes) {
        var def = loadCustomDefaults(this);

        var source = resolveNamespace($(this).attr("data-autocomplete-source"));
        source = source || $(this).attr("data-autocomplete-source") || def.autocomplete["source"];

        $(autocompletes).each(function() {
            $(this).autocomplete({
                source: source
            });
        });
    };

    /**
    * Creates all of the jquery buttons
    */
    this.InitButtons = function(buttons) {
        var escapeClicks = function(button) {
            var currentClick = button.getAttribute("onclick");
            button.setAttribute("onclick", currentClick == null ? "return false;" : currentClick + ";return false;");
        };

        $(buttons).each(function() {
            var def = loadCustomDefaults(this);
            var icon = $(this).attr("data-button-icon") || def.button["icon"];
            var text = $(this).attr("data-button-text") || def.button["text"];

            $(this).button({
                icons: { primary: icon },
                text: text
            }),
            escapeClicks(this);
        });
    };

    /**
    * Creates datatables
    *
    * Remember, the function given to fnRowCallback MUST return the row that is passed into it
    */
    this.InitDataTables = function(tables) {
        // Parses the column defs
        var getColumnDefs = function(table) {
            var columnDefs = [];
            var headerList = $("th", table);

            if (headerList == null) {
                return null;
            }

            var hiddenList = [];
            var noSortList = [];

            for (var i = 0; i < headerList.length; i++) {
                // Hidden Columns List
                if ($(headerList[i]).attr("data-table-hidden") == "true") {
                    hiddenList.push(i);
                }

                // No Sort List
                if ($(headerList[i]).attr("data-table-sort") == "false") {
                    noSortList.push(i);
                }

                // Searching
                if ($(headerList[i]).attr("data-table-searchable")) {
                    columnDefs.push({ "bSearchable": $(headerList[i]).attr("data-table-searchable") == "true", "aTargets": [i] });
                }

                // mDataProp
                if ($("th[data-table-data-prop]").length != 0) {
                    columnDefs.push({ "mDataProp": $(headerList[i]).attr("data-table-data-prop") || null, "aTargets": [i] });
                }

                // Width
                if ($(headerList[i]).attr("data-table-width")) {
                    columnDefs.push({ "sWidth": $(headerList[i]).attr("data-table-width"), "aTargets": [i] });
                }

                // Class
                if ($(headerList[i]).attr("data-table-class")) {
                    columnDefs.push({ "sClass": $(headerList[i]).attr("data-table-class"), "aTargets": [i] });
                }
            }

            if (hiddenList.length > 0)
                columnDefs.push({ "bVisible": false, "aTargets": hiddenList });

            if (noSortList.length > 0)
                columnDefs.push({ "bSortable": false, "aTargets": noSortList });

            return columnDefs;
        };

        // Gets the list for the aaSortingFixed parameter
        var getSortingFixed = function(table) {
            var fixedSortList = [];
            var headerList = $("th", table);
            for (var i = 0; i < headerList.length; i++) {
                if ($(headerList[i]).attr("data-table-sort-fixed")) {
                    fixedSortList.push([i, $(headerList[i]).attr("data-table-sort-fixed")]);
                }
            }

            return fixedSortList;
        };

        // Gets the list for the aaSorting parameter
        var getSortingDefault = function(table) {
            var defaultSortList = [];
            var headerList = $("th", table);
            for (var i = 0; i < defaultSortList.length; i++) {
                if ($(defaultSortList[i]).attr("data-table-sort-default")) {
                    defaultSortList.push([i, $(headerList[i]).attr("data-table-sort-default")]);
                }
            }

            return defaultSortList;
        };

        // Init datatables
        $(tables).each(function() {
            var def = loadCustomDefaults(this);
            debugger;
            var aaSorting = getSortingDefault(this);
            aaSorting = aaSorting.length > 0 ? aaSorting : def.datatable["aaSorting"];
            var aaSortingFixed = getSortingFixed(this);
            aaSortingFixed = aaSortingFixed.length > 0 ? aaSortingFixed : def.datatable["aaSortingFixed"];
            var aoColumnDefs = getColumnDefs(this);
            aoColumnDefs = aoColumnDefs.length > 0 ? aoColumnDefs : def.datatable["aoColumnDefs"];
            var bAutoWidth = $(this).attr("data-table-auto-width");
            bAutoWidth = bAutoWidth != null ? bAutoWidth == "true" : def.datatable["bAutoWidth"];
            var bDestroy = $(this).attr("data-table-destroy");
            bDestroy = bDestroy != null ? bDestroy == "true" : def.datatable["bDestroy"];
            var bFilter = $(this).attr("data-table-filter");
            bFilter = bFilter != null ? bFilter == "true" : def.datatable["bFilter"];
            var bJQueryUI = $(this).attr("data-table-jqueryui");
            bJQueryUI = bJQueryUI != null ? bJQueryUI == "true" : def.datatable["bJQueryUI"];
            var bLengthChange = $(this).attr("data-table-length-change");
            bLengthChange = bLengthChange != null ? bLengthChange == "true" : def.datatable["bLengthChange"];
            var bSort = $(this).attr("data-table-sort");
            bSort = bSort != null ? bSort == "true" : def.datatable["bSort"];
            var fnDrawCallback = resolveNamespace($(this).attr("data-table-draw-callback"));
            fnDrawCallback = fnDrawCallback || def.datatable["fnDrawCallback"];
            var fnRowCallback = resolveNamespace($(this).attr("data-table-row-callback"));
            fnRowCallback = fnRowCallback || def.datatable["fnRowCallback"];
            var fnServerData = resolveNamespace($(this).attr("data-table-server-data"));
            fnServerData = fnServerData || def.datatable["fnServerData"];
            var iDisplayLength = $(this).attr("data-table-length");
            iDisplayLength = iDisplayLength != null ? parseInt(iDisplayLength) : def.datatable["iDisplayLength"];
            var sAjaxSource = resolveNamespace($(this).attr("data-table-ajax-source"));
            sAjaxSource = sAjaxSource || def.datatable["sAjaxSource"];
            var sPaginationType = $(this).attr("data-table-page-type") || def.datatable["sPaginationType"];
            var sDom = $(this).attr("data-table-sdom");
            sDom = sDom || def.datatable["sDom"]

            $(this).dataTable({
                "aaSorting": aaSorting,
                "aaSortingFixed": aaSortingFixed,
                "aoColumnDefs": aoColumnDefs,
                "bAutoWidth": bAutoWidth,
                "bDestroy": bDestroy,
                "bFilter": bFilter,
                "bAutoWidth": false,
                "bJQueryUI": bJQueryUI,
                "bLengthChange": bLengthChange,
                "bSort": bSort,
                "fnDrawCallback": fnDrawCallback,
                "fnRowCallback": fnRowCallback,
                "fnServerData": fnServerData,
                "iDisplayLength": iDisplayLength,
                "sAjaxSource": sAjaxSource,
                "sDom": sDom,
                "sPaginationType": sPaginationType
            }).css("width", "100%");
        });
    };

    /* 
    * Inits dialogs (popups)
    */
    this.InitDialogs = function(dialogs) {
        $(dialogs).each(function() {
            var def = loadCustomDefaults(this);

            var autoOpen = $(this).attr("data-dialog-auto-open");
            autoOpen = autoOpen != null ? autoOpen == "true" : def.dialog["autoOpen"];
            var draggable = $(this).attr("data-dialog-draggable");
            draggable = draggable != null ? draggable == "true" : def.dialog["draggable"];
            var height = $(this).attr("data-dialog-height") || def.dialog["height"];
            var modal = $(this).attr("data-dialog-modal");
            modal = modal != null ? modal == "true" : def.dialog["modal"];
            var resizable = $(this).attr("data-dialog-resize");
            resizable = resizable != null ? resizable == "true" : def.dialog["resizable"];
            var title = $(this).attr("data-dialog-title") || def.dialog["title"];
            var width = $(this).attr("data-dialog-width") || def.dialog["width"];

            $(this).dialog({
                "autoOpen": autoOpen,
                "draggable": draggable,
                "height": height,
                "modal": modal,
                "resizable": resizable,
                "title": title,
                "width": width
            });
        });
    };

    /*
    * Init datepickers
    */
    this.InitDatepickers = function(datepickers) {
        $(datepickers).each(function() {
            var def = loadCustomDefaults(this);

            var changeMonth = $(this).attr("data-datepicker-change-month");
            changeMonth = changeMonth != null ? changeMonth == "true" : def.dialog["changeMonth"];
            var changeYear = $(this).attr("data-datepicker-change-year");
            changeYear = changeYear != null ? changeYear == "true" : def.dialog["changeYear"];
            var yearRange = $(this).attr("data-datepicker-year-range") || def.dialog["yearRange"];
            var minDate = $(this).attr("data-datepicker-min-date") || def.dialog["minDate"];
            var maxDate = $(this).attr("data-datepicker-max-date") || def.dialog["maxDate"];

            $(this).datepicker(
                {
                    changeMonth: changeMonth,
                    changeYear: changeYear,
                    minDate: minDate,
                    maxDate: maxDate,
                    yearRange: yearRange
                });
        });
    }

    /**
	* Creates all the datetimepickers
	*/
    this.InitDatetimepickers = function(datetimepickers) {
        $(datetimepickers).each(function() {
            var def = loadCustomDefaults(this);

            var changeMonth = $(this).attr("data-datepicker-change-month");
            changeMonth = changeMonth != null ? changeMonth == "true" : def.dialog["changeMonth"];
            var changeYear = $(this).attr("data-datepicker-change-year");
            changeYear = changeYear != null ? changeYear == "true" : def.dialog["changeYear"];
            var yearRange = $(this).attr("data-datepicker-year-range") || def.dialog["yearRange"];

            $(this).datetimepicker(
                {
                    changeMonth: changeMonth,
                    changeYear: changeYear,
                    yearRange: yearRange
                });
        });
    }

    /**
	* Creates all the timepickers
	*/
    this.InitTimepickers = function(timepickers) {
        $(timepickers).each(function() {
            var def = loadCustomDefaults(this);

            var ampm = $(this).attr("data-timepicker-ampm");
            ampm = ampm != null ? ampm == "true" : def.timepicker["ampm"];
            var stepMinute = $(this).attr("data-timepicker-step-minute") || def.timepicker["stepMinute"];
            var onSelect = $(this).attr("data-timepicker-on-select");

            $(this).timepicker(
                {
                    ampm: ampm,
                    onSelect: onSelect,
                    stepMinute: stepMinute,
                    timeOnly: true
                });
        });
    };

    /**
    * Creates all of the jquery tabs
    */
    this.InitTabs = function(tabs) {
        $(tabs).tabs();
    }

    // Retrieves the settings for an object with custom defaults
    var loadCustomDefaults = function(element) {
        var customAttr = $(element).attr("data-dash-custom");
        var merged = $.extend(true, {}, defaults);
        if (customAttr != null) {
            customAttr = customAttr.split(" ");
            for (var i = 0; i < customAttr.length; i++) {
                if (custom.hasOwnProperty(customAttr[i])) {
                    $.extend(true, merged, custom[customAttr[i]]);
                }
            }
        }
        return merged;
    };

    /**
    * Given a string of the form "GlobalFunctionName" or "Namespace.FunctionName", this will
    * find the function or object by traversing through the DOM. Note that you can use as many nested
    * namespaces as you want so "Foo.Bar.Bacon.Test.Jeff.McJefferson.Init" will work.
    *
    * Do NOT put parenthesis () after the function or variable name
    */
    var resolveNamespace = function(string) {
        if (string == null) {
            return null;
        }

        string = string.split(".");
        var resolvedObject = window;

        try {
            for (var i = 0; i < string.length; i++) {
                resolvedObject = resolvedObject[string[i]];
            }
        } catch(e) {
            // What they passed in did not resolve to anything
            return null;
        }

        return resolvedObject;
    };
};
