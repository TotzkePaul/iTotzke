/*!
 * Dash JavaScript Library
 * Version 0.3.0
 *
 * Copyright 2011, Eric Boll
 * Licensed under the GNU Lesser General Public License.
 * http://www.gnu.org/licenses/lgpl.html
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
(function (n) {
    n.fn.dash = function (t, i) {
        return n.fn.dash.methods[t] ? n.fn.dash.methods[t].call(this, i) : typeof t != "object" && t ? (n.error("Method " + t + " does not exist in jQuery.dash"), this) : n.fn.dash.methods.init.call(null, t)
    }, n.fn.dash.methods = {
        init: function (t) {
            this == window && n.extend(n.fn.dash.defaults, t);
            for (var i in n.fn.dash.initializerInfo) n.fn.dash.dev.initializeDashElements.call(this, n.fn.dash.initializerInfo[i], t);
            return this
        },
        destroy: function () {
            return n(this).each(function () {
                var t = n(this).data("destroy");
                t != null && (t.call(this, n(this)), n(this).removeData("destroy"))
            }), this
        }
    }, n.fn.dash.initializerInfo = [{
        dashAttr: "data-accordion",
        initFnName: "accordion",
        extraPropsFn: n.noop,
        destroyFn: function () {
            n(this).accordion("destroy")
        },
        postInitFn: n.noop,
        propertyTypes: {
            collapsible: ["boolean"],
            autoHeight: ["boolean"]
        }
    }, {
        dashAttr: "data-autocomplete",
        initFnName: "autocomplete",
        extraPropsFn: n.noop,
        destroyFn: function () {
            n(this).autocomplete("destroy")
        },
        postInitFn: n.noop,
        propertyTypes: {
            source: ["string", "object"]
        }
    }, {
        dashAttr: "data-button",
        initFnName: "button",
        extraPropsFn: n.noop,
        destroyFn: function () {
            n(this).button("destroy")
        },
        postInitFn: function () {
            if (n.fn.dash.defaults["data-button"].returnFalse && n(this).is(":not(a)")) {
                var t = this.getAttribute("onclick");
                this.setAttribute("onclick", t == null ? "return false;" : t + ";return false;")
            }
        },
        propertyTypes: {
            disabled: ["boolean"],
            text: ["boolean"],
            icons: {
                object: "object",
                custom: function (n) {
                    return {
                        primary: n
                    }
                }
            },
            label: ["string"]
        }
    }, {
        dashAttr: "data-calendar",
        initFnName: "fullCalendar",
        extraPropsFn: n.noop,
        destroyFn: function () {
            n(this).fullCalendar("destroy")
        },
        postInitFn: n.noop,
        propertyTypes: {
            allDaySlot: ["boolean"],
            buttonIcons: ["object"],
            events: ["object", "string"],
            eventClick: ["object"],
            eventMouseover: ["object"],
            header: ["object"],
            theme: ["boolean"]
        }
    }, {
        dashAttr: "data-table",
        initFnName: "dataTable",
        extraPropsFn: function () {
            var r = function (t) {
                var u = [],
                    r = n("th", t),
                    f, e, i;
                if (r == null) return null;
                for (f = [], e = [], i = 0; i < r.length; i++) n(r[i]).attr("data-table-hidden") == "true" && f.push(i), n(r[i]).attr("data-table-sort") == "false" && e.push(i), n(r[i]).attr("data-table-searchable") && u.push({
                    bSearchable: n(r[i]).attr("data-table-searchable") == "true",
                    aTargets: [i]
                }), n("th[data-table-data-prop]", t).length != 0 && u.push({
                    mData: n(r[i]).attr("data-table-data-prop") || null,
                    aTargets: [i]
                }), n(r[i]).attr("data-table-width") && u.push({
                    sWidth: n(r[i]).attr("data-table-width"),
                    aTargets: [i]
                }), n(r[i]).attr("data-table-class") && u.push({
                    sClass: n(r[i]).attr("data-table-class"),
                    aTargets: [i]
                });
                return f.length > 0 && u.push({
                    bVisible: !1,
                    aTargets: f
                }), e.length > 0 && u.push({
                    bSortable: !1,
                    aTargets: e
                }), u
            }, i = function (t) {
                for (var u = [], r = n("th", t), i = 0; i < r.length; i++) n(r[i]).attr("data-table-sort-fixed") && u.push([i, n(r[i]).attr("data-table-sort-fixed")]);
                return u
            }, t = function (t) {
                for (var u = [], r = n("th", t), i = 0; i < r.length; i++) n(r[i]).attr("data-table-sort-default") && u.push([i, n(r[i]).attr("data-table-sort-default")]);
                return u
            };
            return {
                aoColumnDefs: r(this),
                aaSorting: t(this),
                aaSortingFixed: i(this)
            }
        },
        destroyFn: function () {
            n(this).find("tr").removeClass().css("width", ""), n(this).dataTable().fnDestroy()
        },
        postInitFn: function () {
            n(this).css("width", "100%")
        },
        propertyTypes: {
            aaSorting: ["object"],
            aaSortingFixed: ["object"],
            aoColumnDefs: ["object"],
            bAutoWidth: ["boolean"],
            bDestroy: ["boolean"],
            bFilter: ["boolean"],
            bJQueryUI: ["boolean"],
            bLengthChange: ["boolean"],
            bPaginate: ["boolean"],
            bSort: ["boolean"],
            fnDrawCallback: ["object"],
            fnRowCallback: ["object"],
            fnServerData: ["object"],
            iDisplayLength: ["int"],
            sAjaxSource: ["object"],
            sPaginationType: ["string"],
            sDom: ["string"]
        }
    }, {
        dashAttr: "data-dialog",
        initFnName: "dialog",
        extraPropsFn: n.noop,
        destroyFn: function () {
            n(this).dialog("destroy")
        },
        postInitFn: n.noop,
        propertyTypes: {
            autoOpen: ["boolean"],
            draggable: ["boolean"],
            height: ["string"],
            modal: ["boolean"],
            resizable: ["boolean"],
            title: ["string"],
            width: ["string"]
        }
    }, {
        dashAttr: "data-tabs",
        initFnName: "tabs",
        extraPropsFn: n.noop,
        destroyFn: function () {
            n(this).tabs("destroy")
        },
        postInitFn: n.noop,
        propertyTypes: {}
    }, {
        dashAttr: "data-datepicker",
        initFnName: "datepicker",
        extraPropsFn: n.noop,
        destroyFn: function () {
            n(this).datepicker("destroy")
        },
        postInitFn: n.noop,
        propertyTypes: {
            ampm: ["boolean"],
            changeMonth: ["boolean"],
            changeYear: ["boolean"],
            minDate: ["string"],
            maxDate: ["string"],
            onSelect: ["object"],
            stepMinute: ["int"],
            yearRange: ["string"]
        }
    }, {
        dashAttr: "data-datetimepicker",
        initFnName: "datetimepicker",
        extraPropsFn: n.noop,
        destroyFn: function () {
            n(this).datetimepicker("destroy")
        },
        postInitFn: n.noop,
        propertyTypes: {
            ampm: ["boolean"],
            changeMonth: ["boolean"],
            changeYear: ["boolean"],
            minDate: ["string"],
            maxDate: ["string"],
            onSelect: ["object"],
            stepMinute: ["int"],
            yearRange: ["string"]
        }
    }, {
        dashAttr: "data-timepicker",
        initFnName: "timepicker",
        extraPropsFn: n.noop,
        destroyFn: function () {
            n(this).timepicker("destroy")
        },
        postInitFn: n.noop,
        propertyTypes: {
            ampm: ["boolean"],
            changeMonth: ["boolean"],
            changeYear: ["boolean"],
            minDate: ["string"],
            maxDate: ["string"],
            onSelect: ["object"],
            stepMinute: ["int"],
            yearRange: ["string"]
        }
    }], n.fn.dash.dev = function () { }, n.fn.dash.dev.initializeDashElements = function (t) {
        var i = n.fn.dash.dev.getCurrentElements.call(this, "[" + t.dashAttr + "^='true']");
        n(i).each(function () {
            var u = t.extraPropsFn.call(this),
                f = n.fn.dash.dev.parseProperties.call(this, t.dashAttr, t.propertyTypes),
                e = n.fn.dash.defaults[t.dashAttr],
                i = n.extend({}, e, u, f),
                r;
            i = n.fn.dash.dev.removeNullAttributes(i), r = n.fn.dash.dev.resolveNamespace(n(this).attr("data-dash-custom")), n.extend(i, r), typeof t.initFnName == "function" ? t.initFnName.call(this, i) : n(this)[t.initFnName](i), n(this).data("destroy", t.destroyFn), t.postInitFn.call(this)
        })
    }, n.fn.dash.dev.getCurrentElements = function (t) {
        return this == window ? n(t) : n(this).filter(t)
    }, n.fn.dash.dev.parseProperties = function (t, i) {
        var s = n(this)[0].attributes,
            h = n.grep(s, function (n) {
                return n.name.indexOf(t + "-") != -1
            }),
            o = n.map(h, function (n) {
                var i = {};
                return i[n.name.replace(t + "-", "")] = n.value, i
            }),
            e = n(this).attr(t),
            f = e.indexOf(":") != -1 ? e.substring(5).replace(/\s/g, "").split(";") : [],
            u, r;
        return (f = n.map(f, function (n) {
            var r = {}, t = n.split(":");
            if (t.length == 2) return r[t[0]] = t[1], r;
            if (t.length > 2) {
                for (var u = "", f = t.length - 1, i = 1; i < f;) u += t[i] += ":", i++;
                return u += t[i], r[t[0]] = u, r
            }
            return null
        }), u = n.merge([], o), n.merge(u, f), r = {}, u.length == 0 || u[0] == null) ? r : (n.each(u, function (t, u) {
            n.each(u, function (t, u) {
                var f = i[t],
                    e;
                f == null && (r[t] = u);
                n: for (e in f) {
                    switch (typeof f[e] == "function" ? "custom" : f[e]) {
                        case "boolean":
                            r[t] = u == "true";
                            break;
                        case "object":
                            r[t] = n.fn.dash.dev.resolveNamespace(u);
                            break;
                        case "custom":
                            r[t] = f.custom(u);
                            break;
                        case "int":
                            r[t] = parseInt(u);
                            break;
                        case null:
                            break;
                        default:
                            r[t] = u
                    }
                    if (r[t] != null && r[t] != u) break n
                }
                r[t] == null && delete r[t]
            })
        }), r)
    }, n.fn.dash.dev.removeNullAttributes = function (n) {
        var i = {}, t;
        for (t in n) n[t] != null && (i[t] = n[t]);
        return i
    }, n.fn.dash.dev.resolveNamespace = function (n) {
        var i, t;
        if (n == null) return null;
        n = n.split("."), i = window;
        try {
            for (t = 0; t < n.length; t++) i = i[n[t]]
        } catch (r) {
            return null
        }
        return i
    }, n.fn.dash.defaults = {
        "data-accordion": {
            autoHeight: !1,
            collapsible: !0
        },
        "data-autocomplete": {},
        "data-button": {
            text: !0,
            returnFalse: !1
        },
        "data-calendar": {
            theme: !0
        },
        "data-table": {
            aaSorting: [],
            aaSortingFixed: [],
            aoColumnDefs: [],
            bAutoWidth: !1,
            bDestroy: !0,
            bFilter: !0,
            bJQueryUI: !0,
            bLengthChange: !0,
            bSort: !0,
            fnDrawCallback: function () {
                n("tr", this).removeClass("ui-state-default"), n("tr.odd").addClass("ui-state-default")
            },
            fnServerData: function (t, i, r) {
                n.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: t,
                    success: function (n) {
                        r({
                            aaData: n
                        })
                    }
                })
            },
            iDisplayLength: 10,
            sPaginationType: "two_button"
        },
        "data-datepicker": {
            changeMonth: !1,
            changeYear: !1
        },
        "data-timepicker": {
            ampm: !0,
            stepMinute: 5,
            timeOnly: !0
        },
        "data-datetimepicker": {
            ampm: !0,
            changeMonth: !1,
            changeYear: !1,
            resizable: !1
        },
        "data-dialog": {
            autoOpen: !1,
            draggable: !1,
            height: "auto",
            modal: !0,
            resizable: !1,
            title: "",
            width: "auto"
        },
        "data-tabs": {}
    }
})(jQuery),
function (n) {
    var t;
    if (n.ui.timepicker = n.ui.timepicker || {}, !n.ui.timepicker.version) {
        n.extend(n.ui, {
            timepicker: {
                version: "1.3.1"
            }
        }), t = function () {
            this.regional = [], this.regional[""] = {
                currentText: "Now",
                closeText: "Done",
                amNames: ["AM", "A", "am", "a"],
                pmNames: ["PM", "P", "pm", "p"],
                timeFormat: "hh:mm tt",
                timeSuffix: "",
                timeOnlyTitle: "Choose Time",
                timeText: "Time",
                hourText: "Hour",
                minuteText: "Minute",
                secondText: "Second",
                millisecText: "Millisecond",
                microsecText: "Microsecond",
                timezoneText: "Time Zone",
                isRTL: !1
            }, this._defaults = {
                showButtonPanel: !0,
                timeOnly: !1,
                showHour: null,
                showMinute: null,
                showSecond: null,
                showMillisec: null,
                showMicrosec: null,
                showTimezone: null,
                showTime: !0,
                stepHour: 1,
                stepMinute: 1,
                stepSecond: 1,
                stepMillisec: 1,
                stepMicrosec: 1,
                hour: 0,
                minute: 0,
                second: 0,
                millisec: 0,
                microsec: 0,
                timezone: null,
                hourMin: 0,
                minuteMin: 0,
                secondMin: 0,
                millisecMin: 0,
                microsecMin: 0,
                hourMax: 23,
                minuteMax: 59,
                secondMax: 59,
                millisecMax: 999,
                microsecMax: 999,
                minDateTime: null,
                maxDateTime: null,
                onSelect: null,
                hourGrid: 0,
                minuteGrid: 0,
                secondGrid: 0,
                millisecGrid: 0,
                microsecGrid: 0,
                alwaysSetTime: !0,
                separator: " ",
                altFieldTimeOnly: !0,
                altTimeFormat: null,
                altSeparator: null,
                altTimeSuffix: null,
                pickerTimeFormat: null,
                pickerTimeSuffix: null,
                showTimepicker: !0,
                timezoneList: null,
                addSliderAccess: !1,
                sliderAccessArgs: null,
                controlType: "slider",
                defaultValue: null,
                parse: "strict"
            }, n.extend(this._defaults, this.regional[""])
        }, n.extend(t.prototype, {
            $input: null,
            $altInput: null,
            $timeObj: null,
            inst: null,
            hour_slider: null,
            minute_slider: null,
            second_slider: null,
            millisec_slider: null,
            microsec_slider: null,
            timezone_select: null,
            hour: 0,
            minute: 0,
            second: 0,
            millisec: 0,
            microsec: 0,
            timezone: null,
            hourMinOriginal: null,
            minuteMinOriginal: null,
            secondMinOriginal: null,
            millisecMinOriginal: null,
            microsecMinOriginal: null,
            hourMaxOriginal: null,
            minuteMaxOriginal: null,
            secondMaxOriginal: null,
            millisecMaxOriginal: null,
            microsecMaxOriginal: null,
            ampm: "",
            formattedDate: "",
            formattedTime: "",
            formattedDateTime: "",
            timezoneList: null,
            units: ["hour", "minute", "second", "millisec", "microsec"],
            support: {},
            control: null,
            setDefaults: function (n) {
                return r(this._defaults, n || {}), this
            },
            _newInst: function (i, r) {
                var u = new t,
                    a = {}, y = {}, c, l, o, h, f;
                for (o in this._defaults)
                    if (this._defaults.hasOwnProperty(o) && (h = i.attr("time:" + o), h)) try {
                        a[o] = eval(h)
                    } catch (w) {
                        a[o] = h
                    }
                c = {
                    beforeShow: function (t, r) {
                        if (n.isFunction(u._defaults.evnts.beforeShow)) return u._defaults.evnts.beforeShow.call(i[0], t, r, u)
                    },
                    onChangeMonthYear: function (t, r, f) {
                        u._updateDateTime(f), n.isFunction(u._defaults.evnts.onChangeMonthYear) && u._defaults.evnts.onChangeMonthYear.call(i[0], t, r, f, u)
                    },
                    onClose: function (t, r) {
                        u.timeDefined === !0 && i.val() !== "" && u._updateDateTime(r), n.isFunction(u._defaults.evnts.onClose) && u._defaults.evnts.onClose.call(i[0], t, r, u)
                    }
                };
                for (l in c) c.hasOwnProperty(l) && (y[l] = r[l] || null);
                u._defaults = n.extend({}, this._defaults, a, r, c, {
                    evnts: y,
                    timepicker: u
                }), u.amNames = n.map(u._defaults.amNames, function (n) {
                    return n.toUpperCase()
                }), u.pmNames = n.map(u._defaults.pmNames, function (n) {
                    return n.toUpperCase()
                }), u.support = e(u._defaults.timeFormat + (u._defaults.pickerTimeFormat ? u._defaults.pickerTimeFormat : "") + (u._defaults.altTimeFormat ? u._defaults.altTimeFormat : "")), typeof u._defaults.controlType == "string" ? (u._defaults.controlType == "slider" && typeof jQuery.ui.slider == "undefined" && (u._defaults.controlType = "select"), u.control = u._controls[u._defaults.controlType]) : u.control = u._defaults.controlType, f = [-720, -660, -600, -570, -540, -480, -420, -360, -300, -270, -240, -210, -180, -120, -60, 0, 60, 120, 180, 210, 240, 270, 300, 330, 345, 360, 390, 420, 480, 525, 540, 570, 600, 630, 660, 690, 720, 765, 780, 840], u._defaults.timezoneList !== null && (f = u._defaults.timezoneList);
                var p = f.length,
                    s = 0,
                    v = null;
                if (p > 0 && typeof f[0] != "object")
                    for (; s < p; s++) v = f[s], f[s] = {
                        value: v,
                        label: n.timepicker.timezoneOffsetString(v, u.support.iso8601)
                    };
                return u._defaults.timezoneList = f, u.timezone = u._defaults.timezone !== null ? n.timepicker.timezoneOffsetNumber(u._defaults.timezone) : (new Date).getTimezoneOffset() * -1, u.hour = u._defaults.hour < u._defaults.hourMin ? u._defaults.hourMin : u._defaults.hour > u._defaults.hourMax ? u._defaults.hourMax : u._defaults.hour, u.minute = u._defaults.minute < u._defaults.minuteMin ? u._defaults.minuteMin : u._defaults.minute > u._defaults.minuteMax ? u._defaults.minuteMax : u._defaults.minute, u.second = u._defaults.second < u._defaults.secondMin ? u._defaults.secondMin : u._defaults.second > u._defaults.secondMax ? u._defaults.secondMax : u._defaults.second, u.millisec = u._defaults.millisec < u._defaults.millisecMin ? u._defaults.millisecMin : u._defaults.millisec > u._defaults.millisecMax ? u._defaults.millisecMax : u._defaults.millisec, u.microsec = u._defaults.microsec < u._defaults.microsecMin ? u._defaults.microsecMin : u._defaults.microsec > u._defaults.microsecMax ? u._defaults.microsecMax : u._defaults.microsec, u.ampm = "", u.$input = i, u._defaults.altField && (u.$altInput = n(u._defaults.altField).css({
                    cursor: "pointer"
                }).focus(function () {
                    i.trigger("focus")
                })), (u._defaults.minDate === 0 || u._defaults.minDateTime === 0) && (u._defaults.minDate = new Date), (u._defaults.maxDate === 0 || u._defaults.maxDateTime === 0) && (u._defaults.maxDate = new Date), u._defaults.minDate !== undefined && u._defaults.minDate instanceof Date && (u._defaults.minDateTime = new Date(u._defaults.minDate.getTime())), u._defaults.minDateTime !== undefined && u._defaults.minDateTime instanceof Date && (u._defaults.minDate = new Date(u._defaults.minDateTime.getTime())), u._defaults.maxDate !== undefined && u._defaults.maxDate instanceof Date && (u._defaults.maxDateTime = new Date(u._defaults.maxDate.getTime())), u._defaults.maxDateTime !== undefined && u._defaults.maxDateTime instanceof Date && (u._defaults.maxDate = new Date(u._defaults.maxDateTime.getTime())), u.$input.bind("focus", function () {
                    u._onFocus()
                }), u
            },
            _addTimePicker: function (n) {
                var t = this.$altInput && this._defaults.altFieldTimeOnly ? this.$input.val() + " " + this.$altInput.val() : this.$input.val();
                this.timeDefined = this._parseTime(t), this._limitMinMaxDateTime(n, !1), this._injectTimePicker()
            },
            _parseTime: function (t, i) {
                var e, f, r;
                if (this.inst || (this.inst = n.datepicker._getInst(this.$input[0])), i || !this._defaults.timeOnly) {
                    e = n.datepicker._get(this.inst, "dateFormat");
                    try {
                        if (f = u(e, this._defaults.timeFormat, t, n.datepicker._getFormatConfig(this.inst), this._defaults), !f.timeObj) return !1;
                        n.extend(this, f.timeObj)
                    } catch (o) {
                        return n.timepicker.log("Error parsing the date/time string: " + o + "\ndate/time string = " + t + "\ntimeFormat = " + this._defaults.timeFormat + "\ndateFormat = " + e), !1
                    }
                    return !0
                }
                return (r = n.datepicker.parseTime(this._defaults.timeFormat, t, this._defaults), !r) ? !1 : (n.extend(this, r), !0)
            },
            _injectTimePicker: function () {
                var b = this.inst.dpDiv,
                    r = this.inst.settings,
                    u = this,
                    t = "",
                    s = "",
                    l = null,
                    v = {}, h = {}, k = null,
                    o = 0,
                    w = 0,
                    c, e, p, tt, a, nt, f, it, d, rt, g, y;
                if (b.find("div.ui-timepicker-div").length === 0 && r.showTimepicker) {
                    for (c = ' style="display:none;"', e = '<div class="ui-timepicker-div' + (r.isRTL ? " ui-timepicker-rtl" : "") + '"><dl><dt class="ui_tpicker_time_label"' + (r.showTime ? "" : c) + ">" + r.timeText + '</dt><dd class="ui_tpicker_time"' + (r.showTime ? "" : c) + "></dd>", o = 0, w = this.units.length; o < w; o++) {
                        if (t = this.units[o], s = t.substr(0, 1).toUpperCase() + t.substr(1), l = r["show" + s] !== null ? r["show" + s] : this.support[t], v[t] = parseInt(r[t + "Max"] - (r[t + "Max"] - r[t + "Min"]) % r["step" + s], 10), h[t] = 0, e += '<dt class="ui_tpicker_' + t + '_label"' + (l ? "" : c) + ">" + r[t + "Text"] + '</dt><dd class="ui_tpicker_' + t + '"><div class="ui_tpicker_' + t + '_slider"' + (l ? "" : c) + "></div>", l && r[t + "Grid"] > 0) {
                            if (e += '<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>', t == "hour")
                                for (p = r[t + "Min"]; p <= v[t]; p += parseInt(r[t + "Grid"], 10)) h[t]++, tt = n.datepicker.formatTime(this.support.ampm ? "hht" : "HH", {
                                    hour: p
                                }, r), e += '<td data-for="' + t + '">' + tt + "</td>";
                            else
                                for (a = r[t + "Min"]; a <= v[t]; a += parseInt(r[t + "Grid"], 10)) h[t]++, e += '<td data-for="' + t + '">' + (a < 10 ? "0" : "") + a + "</td>";
                            e += "</tr></table></div>"
                        }
                        e += "</dd>"
                    }
                    for (nt = r.showTimezone !== null ? r.showTimezone : this.support.timezone, e += '<dt class="ui_tpicker_timezone_label"' + (nt ? "" : c) + ">" + r.timezoneText + "</dt>", e += '<dd class="ui_tpicker_timezone" ' + (nt ? "" : c) + "></dd>", e += "</dl></div>", f = n(e), r.timeOnly === !0 && (f.prepend('<div class="ui-widget-header ui-helper-clearfix ui-corner-all"><div class="ui-datepicker-title">' + r.timeOnlyTitle + "</div></div>"), b.find(".ui-datepicker-header, .ui-datepicker-calendar").hide()), o = 0, w = u.units.length; o < w; o++) t = u.units[o], s = t.substr(0, 1).toUpperCase() + t.substr(1), l = r["show" + s] !== null ? r["show" + s] : this.support[t], u[t + "_slider"] = u.control.create(u, f.find(".ui_tpicker_" + t + "_slider"), t, u[t], r[t + "Min"], v[t], r["step" + s]), l && r[t + "Grid"] > 0 && (k = 100 * h[t] * r[t + "Grid"] / (v[t] - r[t + "Min"]), f.find(".ui_tpicker_" + t + " table").css({
                        width: k + "%",
                        marginLeft: r.isRTL ? "0" : k / (-2 * h[t]) + "%",
                        marginRight: r.isRTL ? k / (-2 * h[t]) + "%" : "0",
                        borderCollapse: "collapse"
                    }).find("td").click(function () {
                        var o = n(this),
                            s = o.html(),
                            r = parseInt(s.replace(/[^0-9]/g), 10),
                            e = s.replace(/[^apm]/ig),
                            f = o.data("for");
                        f == "hour" && (e.indexOf("p") !== -1 && r < 12 ? r += 12 : e.indexOf("a") !== -1 && r === 12 && (r = 0)), u.control.value(u, u[f + "_slider"], t, r), u._onTimeChange(), u._onSelectHandler()
                    }).css({
                        cursor: "pointer",
                        width: 100 / h[t] + "%",
                        textAlign: "center",
                        overflow: "hidden"
                    }));
                    this.timezone_select = f.find(".ui_tpicker_timezone").append("<select></select>").find("select"), n.fn.append.apply(this.timezone_select, n.map(r.timezoneList, function (t) {
                        return n("<option />").val(typeof t == "object" ? t.value : t).text(typeof t == "object" ? t.label : t)
                    })), typeof this.timezone != "undefined" && this.timezone !== null && this.timezone !== "" ? (it = new Date(this.inst.selectedYear, this.inst.selectedMonth, this.inst.selectedDay, 12).getTimezoneOffset() * -1, it == this.timezone ? i(u) : this.timezone_select.val(this.timezone)) : typeof this.hour != "undefined" && this.hour !== null && this.hour !== "" ? this.timezone_select.val(r.timezone) : i(u), this.timezone_select.change(function () {
                        u._onTimeChange(), u._onSelectHandler()
                    }), d = b.find(".ui-datepicker-buttonpane"), d.length ? d.before(f) : b.append(f), this.$timeObj = f.find(".ui_tpicker_time"), this.inst !== null && (rt = this.timeDefined, this._onTimeChange(), this.timeDefined = rt), this._defaults.addSliderAccess && (g = this._defaults.sliderAccessArgs, y = this._defaults.isRTL, g.isRTL = y, setTimeout(function () {
                        if (f.find(".ui-slider-access").length === 0) {
                            f.find(".ui-slider:visible").sliderAccess(g);
                            var t = f.find(".ui-slider-access:eq(0)").outerWidth(!0);
                            t && f.find("table:visible").each(function () {
                                var i = n(this),
                                    f = i.outerWidth(),
                                    e = i.css(y ? "marginRight" : "marginLeft").toString().replace("%", ""),
                                    r = f - t,
                                    o = e * r / f + "%",
                                    u = {
                                        width: r,
                                        marginRight: 0,
                                        marginLeft: 0
                                    };
                                u[y ? "marginRight" : "marginLeft"] = o, i.css(u)
                            })
                        }
                    }, 10)), u._limitMinMaxDateTime(this.inst, !0)
                }
            },
            _limitMinMaxDateTime: function (t, i) {
                var r = this._defaults,
                    e = new Date(t.selectedYear, t.selectedMonth, t.selectedDay),
                    u, s, f, o;
                if (this._defaults.showTimepicker && (n.datepicker._get(t, "minDateTime") !== null && n.datepicker._get(t, "minDateTime") !== undefined && e && (u = n.datepicker._get(t, "minDateTime"), s = new Date(u.getFullYear(), u.getMonth(), u.getDate(), 0, 0, 0, 0), (this.hourMinOriginal === null || this.minuteMinOriginal === null || this.secondMinOriginal === null || this.millisecMinOriginal === null || this.microsecMinOriginal === null) && (this.hourMinOriginal = r.hourMin, this.minuteMinOriginal = r.minuteMin, this.secondMinOriginal = r.secondMin, this.millisecMinOriginal = r.millisecMin, this.microsecMinOriginal = r.microsecMin), t.settings.timeOnly || s.getTime() == e.getTime() ? (this._defaults.hourMin = u.getHours(), this.hour <= this._defaults.hourMin ? (this.hour = this._defaults.hourMin, this._defaults.minuteMin = u.getMinutes(), this.minute <= this._defaults.minuteMin ? (this.minute = this._defaults.minuteMin, this._defaults.secondMin = u.getSeconds(), this.second <= this._defaults.secondMin ? (this.second = this._defaults.secondMin, this._defaults.millisecMin = u.getMilliseconds(), this.millisec <= this._defaults.millisecMin ? (this.millisec = this._defaults.millisecMin, this._defaults.microsecMin = u.getMicroseconds()) : (this.microsec < this._defaults.microsecMin && (this.microsec = this._defaults.microsecMin), this._defaults.microsecMin = this.microsecMinOriginal)) : (this._defaults.millisecMin = this.millisecMinOriginal, this._defaults.microsecMin = this.microsecMinOriginal)) : (this._defaults.secondMin = this.secondMinOriginal, this._defaults.millisecMin = this.millisecMinOriginal, this._defaults.microsecMin = this.microsecMinOriginal)) : (this._defaults.minuteMin = this.minuteMinOriginal, this._defaults.secondMin = this.secondMinOriginal, this._defaults.millisecMin = this.millisecMinOriginal, this._defaults.microsecMin = this.microsecMinOriginal)) : (this._defaults.hourMin = this.hourMinOriginal, this._defaults.minuteMin = this.minuteMinOriginal, this._defaults.secondMin = this.secondMinOriginal, this._defaults.millisecMin = this.millisecMinOriginal, this._defaults.microsecMin = this.microsecMinOriginal)), n.datepicker._get(t, "maxDateTime") !== null && n.datepicker._get(t, "maxDateTime") !== undefined && e && (f = n.datepicker._get(t, "maxDateTime"), o = new Date(f.getFullYear(), f.getMonth(), f.getDate(), 0, 0, 0, 0), (this.hourMaxOriginal === null || this.minuteMaxOriginal === null || this.secondMaxOriginal === null || this.millisecMaxOriginal === null) && (this.hourMaxOriginal = r.hourMax, this.minuteMaxOriginal = r.minuteMax, this.secondMaxOriginal = r.secondMax, this.millisecMaxOriginal = r.millisecMax, this.microsecMaxOriginal = r.microsecMax), t.settings.timeOnly || o.getTime() == e.getTime() ? (this._defaults.hourMax = f.getHours(), this.hour >= this._defaults.hourMax ? (this.hour = this._defaults.hourMax, this._defaults.minuteMax = f.getMinutes(), this.minute >= this._defaults.minuteMax ? (this.minute = this._defaults.minuteMax, this._defaults.secondMax = f.getSeconds(), this.second >= this._defaults.secondMax ? (this.second = this._defaults.secondMax, this._defaults.millisecMax = f.getMilliseconds(), this.millisec >= this._defaults.millisecMax ? (this.millisec = this._defaults.millisecMax, this._defaults.microsecMax = f.getMicroseconds()) : (this.microsec > this._defaults.microsecMax && (this.microsec = this._defaults.microsecMax), this._defaults.microsecMax = this.microsecMaxOriginal)) : (this._defaults.millisecMax = this.millisecMaxOriginal, this._defaults.microsecMax = this.microsecMaxOriginal)) : (this._defaults.secondMax = this.secondMaxOriginal, this._defaults.millisecMax = this.millisecMaxOriginal, this._defaults.microsecMax = this.microsecMaxOriginal)) : (this._defaults.minuteMax = this.minuteMaxOriginal, this._defaults.secondMax = this.secondMaxOriginal, this._defaults.millisecMax = this.millisecMaxOriginal, this._defaults.microsecMax = this.microsecMaxOriginal)) : (this._defaults.hourMax = this.hourMaxOriginal, this._defaults.minuteMax = this.minuteMaxOriginal, this._defaults.secondMax = this.secondMaxOriginal, this._defaults.millisecMax = this.millisecMaxOriginal, this._defaults.microsecMax = this.microsecMaxOriginal)), i !== undefined && i === !0)) {
                    var l = parseInt(this._defaults.hourMax - (this._defaults.hourMax - this._defaults.hourMin) % this._defaults.stepHour, 10),
                        a = parseInt(this._defaults.minuteMax - (this._defaults.minuteMax - this._defaults.minuteMin) % this._defaults.stepMinute, 10),
                        h = parseInt(this._defaults.secondMax - (this._defaults.secondMax - this._defaults.secondMin) % this._defaults.stepSecond, 10),
                        c = parseInt(this._defaults.millisecMax - (this._defaults.millisecMax - this._defaults.millisecMin) % this._defaults.stepMillisec, 10);
                    microsecMax = parseInt(this._defaults.microsecMax - (this._defaults.microsecMax - this._defaults.microsecMin) % this._defaults.stepMicrosec, 10), this.hour_slider && (this.control.options(this, this.hour_slider, "hour", {
                        min: this._defaults.hourMin,
                        max: l
                    }), this.control.value(this, this.hour_slider, "hour", this.hour - this.hour % this._defaults.stepHour)), this.minute_slider && (this.control.options(this, this.minute_slider, "minute", {
                        min: this._defaults.minuteMin,
                        max: a
                    }), this.control.value(this, this.minute_slider, "minute", this.minute - this.minute % this._defaults.stepMinute)), this.second_slider && (this.control.options(this, this.second_slider, "second", {
                        min: this._defaults.secondMin,
                        max: h
                    }), this.control.value(this, this.second_slider, "second", this.second - this.second % this._defaults.stepSecond)), this.millisec_slider && (this.control.options(this, this.millisec_slider, "millisec", {
                        min: this._defaults.millisecMin,
                        max: c
                    }), this.control.value(this, this.millisec_slider, "millisec", this.millisec - this.millisec % this._defaults.stepMillisec)), this.microsec_slider && (this.control.options(this, this.microsec_slider, "microsec", {
                        min: this._defaults.microsecMin,
                        max: microsecMax
                    }), this.control.value(this, this.microsec_slider, "microsec", this.microsec - this.microsec % this._defaults.stepMicrosec))
                }
            },
            _onTimeChange: function () {
                var t = this.hour_slider ? this.control.value(this, this.hour_slider, "hour") : !1,
                    f = this.minute_slider ? this.control.value(this, this.minute_slider, "minute") : !1,
                    u = this.second_slider ? this.control.value(this, this.second_slider, "second") : !1,
                    e = this.millisec_slider ? this.control.value(this, this.millisec_slider, "millisec") : !1,
                    r = this.microsec_slider ? this.control.value(this, this.microsec_slider, "microsec") : !1,
                    o = this.timezone_select ? this.timezone_select.val() : !1,
                    i = this._defaults,
                    l = i.pickerTimeFormat || i.timeFormat,
                    h = i.pickerTimeSuffix || i.timeSuffix,
                    c, s;
                typeof t == "object" && (t = !1), typeof f == "object" && (f = !1), typeof u == "object" && (u = !1), typeof e == "object" && (e = !1), typeof r == "object" && (r = !1), typeof o == "object" && (o = !1), t !== !1 && (t = parseInt(t, 10)), f !== !1 && (f = parseInt(f, 10)), u !== !1 && (u = parseInt(u, 10)), e !== !1 && (e = parseInt(e, 10)), r !== !1 && (r = parseInt(r, 10)), c = i[t < 12 ? "amNames" : "pmNames"][0], s = t != this.hour || f != this.minute || u != this.second || e != this.millisec || r != this.microsec || this.ampm.length > 0 && t < 12 != (n.inArray(this.ampm.toUpperCase(), this.amNames) !== -1) || this.timezone !== null && o != this.timezone, s && (t !== !1 && (this.hour = t), f !== !1 && (this.minute = f), u !== !1 && (this.second = u), e !== !1 && (this.millisec = e), r !== !1 && (this.microsec = r), o !== !1 && (this.timezone = o), this.inst || (this.inst = n.datepicker._getInst(this.$input[0])), this._limitMinMaxDateTime(this.inst, !0)), this.support.ampm && (this.ampm = c), this.formattedTime = n.datepicker.formatTime(i.timeFormat, this, i), this.$timeObj && (l === i.timeFormat ? this.$timeObj.text(this.formattedTime + h) : this.$timeObj.text(n.datepicker.formatTime(l, this, i) + h)), this.timeDefined = !0, s && this._updateDateTime()
            },
            _onSelectHandler: function () {
                var t = this._defaults.onSelect || this.inst.settings.onSelect,
                    n = this.$input ? this.$input[0] : null;
                t && n && t.apply(n, [this.formattedDateTime, this])
            },
            _updateDateTime: function (t) {
                var r;
                t = this.inst || t;
                var u = n.datepicker._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay)),
                    h = n.datepicker._get(t, "dateFormat"),
                    e = n.datepicker._getFormatConfig(t),
                    o = u !== null && this.timeDefined;
                if (this.formattedDate = n.datepicker.formatDate(h, u === null ? new Date : u, e), r = this.formattedDate, t.lastVal === "" && (t.currentYear = t.selectedYear, t.currentMonth = t.selectedMonth, t.currentDay = t.selectedDay), this._defaults.timeOnly === !0 ? r = this.formattedTime : this._defaults.timeOnly !== !0 && (this._defaults.alwaysSetTime || o) && (r += this._defaults.separator + this.formattedTime + this._defaults.timeSuffix), this.formattedDateTime = r, this._defaults.showTimepicker)
                    if (this.$altInput && this._defaults.timeOnly === !1 && this._defaults.altFieldTimeOnly === !0) this.$altInput.val(this.formattedTime), this.$input.val(this.formattedDate);
                    else if (this.$altInput) {
                        this.$input.val(r);
                        var i = "",
                            s = this._defaults.altSeparator ? this._defaults.altSeparator : this._defaults.separator,
                            f = this._defaults.altTimeSuffix ? this._defaults.altTimeSuffix : this._defaults.timeSuffix;
                        this._defaults.timeOnly || (i = this._defaults.altFormat ? n.datepicker.formatDate(this._defaults.altFormat, u === null ? new Date : u, e) : this.formattedDate, i && (i += s)), i += this._defaults.altTimeFormat ? n.datepicker.formatTime(this._defaults.altTimeFormat, this, this._defaults) + f : this.formattedTime + f, this.$altInput.val(i)
                    } else this.$input.val(r);
                else this.$input.val(this.formattedDate);
                this.$input.trigger("change")
            },
            _onFocus: function () {
                if (!this.$input.val() && this._defaults.defaultValue) {
                    this.$input.val(this._defaults.defaultValue);
                    var t = n.datepicker._getInst(this.$input.get(0)),
                        i = n.datepicker._get(t, "timepicker");
                    if (i && i._defaults.timeOnly && t.input.val() != t.lastVal) try {
                        n.datepicker._updateDatepicker(t)
                    } catch (r) {
                        n.timepicker.log(r)
                    }
                }
            },
            _controls: {
                slider: {
                    create: function (t, i, r, u, f, e, o) {
                        var s = t._defaults.isRTL;
                        return i.prop("slide", null).slider({
                            orientation: "horizontal",
                            value: s ? u * -1 : u,
                            min: s ? e * -1 : f,
                            max: s ? f * -1 : e,
                            step: o,
                            slide: function (i, u) {
                                t.control.value(t, n(this), r, s ? u.value * -1 : u.value), t._onTimeChange()
                            },
                            stop: function () {
                                t._onSelectHandler()
                            }
                        })
                    },
                    options: function (n, t, i, r, u) {
                        if (n._defaults.isRTL) {
                            if (typeof r == "string") return r == "min" || r == "max" ? u !== undefined ? t.slider(r, u * -1) : Math.abs(t.slider(r)) : t.slider(r);
                            var e = r.min,
                                f = r.max;
                            return r.min = r.max = null, e !== undefined && (r.max = e * -1), f !== undefined && (r.min = f * -1), t.slider(r)
                        }
                        return typeof r == "string" && u !== undefined ? t.slider(r, u) : t.slider(r)
                    },
                    value: function (n, t, i, r) {
                        return n._defaults.isRTL ? r !== undefined ? t.slider("value", r * -1) : Math.abs(t.slider("value")) : r !== undefined ? t.slider("value", r) : t.slider("value")
                    }
                },
                select: {
                    create: function (t, i, r, u, f, e, o) {
                        for (var h = '<select class="ui-timepicker-select" data-unit="' + r + '" data-min="' + f + '" data-max="' + e + '" data-step="' + o + '">', c = t._defaults.pickerTimeFormat || t._defaults.timeFormat, s = f; s <= e; s += o) h += '<option value="' + s + '"' + (s == u ? " selected" : "") + ">", h += r == "hour" ? n.datepicker.formatTime(n.trim(c.replace(/[^ht ]/ig, "")), {
                            hour: s
                        }, t._defaults) : r == "millisec" || r == "microsec" || s >= 10 ? s : "0" + s.toString(), h += "</option>";
                        return h += "</select>", i.children("select").remove(), n(h).appendTo(i).change(function () {
                            t._onTimeChange(), t._onSelectHandler()
                        }), i
                    },
                    options: function (n, t, i, r, u) {
                        var e = {}, f = t.children("select");
                        if (typeof r == "string") {
                            if (u === undefined) return f.data(r);
                            e[r] = u
                        } else e = r;
                        return n.control.create(n, t, f.data("unit"), f.val(), e.min || f.data("min"), e.max || f.data("max"), e.step || f.data("step"))
                    },
                    value: function (n, t, i, r) {
                        var u = t.children("select");
                        return r !== undefined ? u.val(r) : u.val()
                    }
                }
            }
        }), n.fn.extend({
            timepicker: function (t) {
                t = t || {};
                var i = Array.prototype.slice.call(arguments);
                return typeof t == "object" && (i[0] = n.extend(t, {
                    timeOnly: !0
                })), n(this).each(function () {
                    n.fn.datetimepicker.apply(n(this), i)
                })
            },
            datetimepicker: function (t) {
                t = t || {};
                var i = arguments;
                return typeof t == "string" ? t == "getDate" ? n.fn.datepicker.apply(n(this[0]), i) : this.each(function () {
                    var t = n(this);
                    t.datepicker.apply(t, i)
                }) : this.each(function () {
                    var i = n(this);
                    i.datepicker(n.timepicker._newInst(i, t)._defaults)
                })
            }
        }), n.datepicker.parseDateTime = function (n, t, i, r, f) {
            var o = u(n, t, i, r, f),
                e;
            return o.timeObj && (e = o.timeObj, o.date.setHours(e.hour, e.minute, e.second, e.millisec), o.date.setMicroseconds(e.microsec)), o.date
        }, n.datepicker.parseTime = function (t, i, u) {
            var f = r(r({}, n.timepicker._defaults), u || {}),
                s = t.replace(/\'.*?\'/g, "").indexOf("Z") !== -1,
                e = function (t, i, r) {
                    var h = function (t, i) {
                        var r = [];
                        return t && n.merge(r, t), i && n.merge(r, i), r = n.map(r, function (n) {
                            return n.replace(/[.*+?|()\[\]{}\\]/g, "\\$&")
                        }), "(" + r.join("|") + ")?"
                    }, s = function (n) {
                        var i = n.toLowerCase().match(/(h{1,2}|m{1,2}|s{1,2}|l{1}|c{1}|t{1,2}|z|'.*?')/g),
                            r = {
                                h: -1,
                                m: -1,
                                s: -1,
                                l: -1,
                                c: -1,
                                t: -1,
                                z: -1
                            }, t;
                        if (i)
                            for (t = 0; t < i.length; t++) r[i[t].toString().charAt(0)] == -1 && (r[i[t].toString().charAt(0)] = t + 1);
                        return r
                    }, c = "^" + t.toString().replace(/([hH]{1,2}|mm?|ss?|[tT]{1,2}|[zZ]|[lc]|'.*?')/g, function (n) {
                        var t = n.length;
                        switch (n.charAt(0).toLowerCase()) {
                            case "h":
                                return t === 1 ? "(\\d?\\d)" : "(\\d{" + t + "})";
                            case "m":
                                return t === 1 ? "(\\d?\\d)" : "(\\d{" + t + "})";
                            case "s":
                                return t === 1 ? "(\\d?\\d)" : "(\\d{" + t + "})";
                            case "l":
                                return "(\\d?\\d?\\d)";
                            case "c":
                                return "(\\d?\\d?\\d)";
                            case "z":
                                return "(z|[-+]\\d\\d:?\\d\\d|\\S+)?";
                            case "t":
                                return h(r.amNames, r.pmNames);
                            default:
                                return "(" + n.replace(/\'/g, "").replace(/(\.|\$|\^|\\|\/|\(|\)|\[|\]|\?|\+|\*)/g, function (n) {
                                    return "\\" + n
                                }) + ")?"
                        }
                    }).replace(/\s/g, "\\s?") + r.timeSuffix + "$",
                        u = s(t),
                        o = "",
                        f, e;
                    return (f = i.match(new RegExp(c, "i")), e = {
                        hour: 0,
                        minute: 0,
                        second: 0,
                        millisec: 0,
                        microsec: 0
                    }, f) ? (u.t !== -1 && (f[u.t] === undefined || f[u.t].length === 0 ? (o = "", e.ampm = "") : (o = n.inArray(f[u.t].toUpperCase(), r.amNames) !== -1 ? "AM" : "PM", e.ampm = r[o == "AM" ? "amNames" : "pmNames"][0])), u.h !== -1 && (e.hour = o == "AM" && f[u.h] == "12" ? 0 : o == "PM" && f[u.h] != "12" ? parseInt(f[u.h], 10) + 12 : Number(f[u.h])), u.m !== -1 && (e.minute = Number(f[u.m])), u.s !== -1 && (e.second = Number(f[u.s])), u.l !== -1 && (e.millisec = Number(f[u.l])), u.c !== -1 && (e.microsec = Number(f[u.c])), u.z !== -1 && f[u.z] !== undefined && (e.timezone = n.timepicker.timezoneOffsetNumber(f[u.z])), e) : !1
                }, o = function (t, i, r) {
                    try {
                        var u = new Date("2012-01-01 " + i);
                        if (isNaN(u.getTime()) && (u = new Date("2012-01-01T" + i), isNaN(u.getTime()) && (u = new Date("01/01/2012 " + i), isNaN(u.getTime())))) throw "Unable to parse time with native Date: " + i;
                        return {
                            hour: u.getHours(),
                            minute: u.getMinutes(),
                            second: u.getSeconds(),
                            millisec: u.getMilliseconds(),
                            microsec: u.getMicroseconds(),
                            timezone: u.getTimezoneOffset() * -1
                        }
                    } catch (o) {
                        try {
                            return e(t, i, r)
                        } catch (f) {
                            n.timepicker.log("Unable to parse \ntimeString: " + i + "\ntimeFormat: " + t)
                        }
                    }
                    return !1
                };
            return typeof f.parse == "function" ? f.parse(t, i, f) : f.parse === "loose" ? o(t, i, f) : e(t, i, f)
        }, n.datepicker.formatTime = function (t, i, r) {
            r = r || {}, r = n.extend({}, n.timepicker._defaults, r), i = n.extend({
                hour: 0,
                minute: 0,
                second: 0,
                millisec: 0,
                timezone: 0
            }, i);
            var o = t,
                e = r.amNames[0],
                u = parseInt(i.hour, 10);
            return u > 11 && (e = r.pmNames[0]), o = o.replace(/(?:HH?|hh?|mm?|ss?|[tT]{1,2}|[zZ]|[lc]|('.*?'|".*?"))/g, function (t) {
                switch (t) {
                    case "HH":
                        return ("0" + u).slice(-2);
                    case "H":
                        return u;
                    case "hh":
                        return ("0" + f(u)).slice(-2);
                    case "h":
                        return f(u);
                    case "mm":
                        return ("0" + i.minute).slice(-2);
                    case "m":
                        return i.minute;
                    case "ss":
                        return ("0" + i.second).slice(-2);
                    case "s":
                        return i.second;
                    case "l":
                        return ("00" + i.millisec).slice(-3);
                    case "c":
                        return ("00" + i.microsec).slice(-3);
                    case "z":
                        return n.timepicker.timezoneOffsetString(i.timezone === null ? r.timezone : i.timezone, !1);
                    case "Z":
                        return n.timepicker.timezoneOffsetString(i.timezone === null ? r.timezone : i.timezone, !0);
                    case "T":
                        return e.charAt(0).toUpperCase();
                    case "TT":
                        return e.toUpperCase();
                    case "t":
                        return e.charAt(0).toLowerCase();
                    case "tt":
                        return e.toLowerCase();
                    default:
                        return t.replace(/\'/g, "") || "'"
                }
            }), o = n.trim(o)
        }, n.datepicker._base_selectDate = n.datepicker._selectDate, n.datepicker._selectDate = function (t, i) {
            var r = this._getInst(n(t)[0]),
                u = this._get(r, "timepicker");
            u ? (u._limitMinMaxDateTime(r, !0), r.inline = r.stay_open = !0, this._base_selectDate(t, i), r.inline = r.stay_open = !1, this._notifyChange(r), this._updateDatepicker(r)) : this._base_selectDate(t, i)
        }, n.datepicker._base_updateDatepicker = n.datepicker._updateDatepicker, n.datepicker._updateDatepicker = function (t) {
            var r = t.input[0],
                i;
            n.datepicker._curInst && n.datepicker._curInst != t && n.datepicker._datepickerShowing && n.datepicker._lastInput != r || (typeof t.stay_open != "boolean" || t.stay_open === !1) && (this._base_updateDatepicker(t), i = this._get(t, "timepicker"), i && i._addTimePicker(t))
        }, n.datepicker._base_doKeyPress = n.datepicker._doKeyPress, n.datepicker._doKeyPress = function (t) {
            var u = n.datepicker._getInst(t.target),
                i = n.datepicker._get(u, "timepicker");
            if (i && n.datepicker._get(u, "constrainInput")) {
                var r = i.support.ampm,
                    o = i._defaults.showTimezone !== null ? i._defaults.showTimezone : i.support.timezone,
                    e = n.datepicker._possibleChars(n.datepicker._get(u, "dateFormat")),
                    s = i._defaults.timeFormat.toString().replace(/[hms]/g, "").replace(/TT/g, r ? "APM" : "").replace(/Tt/g, r ? "AaPpMm" : "").replace(/tT/g, r ? "AaPpMm" : "").replace(/T/g, r ? "AP" : "").replace(/tt/g, r ? "apm" : "").replace(/t/g, r ? "ap" : "") + " " + i._defaults.separator + i._defaults.timeSuffix + (o ? i._defaults.timezoneList.join("") : "") + i._defaults.amNames.join("") + i._defaults.pmNames.join("") + e,
                    f = String.fromCharCode(t.charCode === undefined ? t.keyCode : t.charCode);
                return t.ctrlKey || f < " " || !e || s.indexOf(f) > -1
            }
            return n.datepicker._base_doKeyPress(t)
        }, n.datepicker._base_updateAlternate = n.datepicker._updateAlternate, n.datepicker._updateAlternate = function (t) {
            var i = this._get(t, "timepicker"),
                u;
            if (i) {
                if (u = i._defaults.altField, u) {
                    var c = i._defaults.altFormat || i._defaults.dateFormat,
                        e = this._getDate(t),
                        h = n.datepicker._getFormatConfig(t),
                        r = "",
                        f = i._defaults.altSeparator ? i._defaults.altSeparator : i._defaults.separator,
                        o = i._defaults.altTimeSuffix ? i._defaults.altTimeSuffix : i._defaults.timeSuffix,
                        s = i._defaults.altTimeFormat !== null ? i._defaults.altTimeFormat : i._defaults.timeFormat;
                    r += n.datepicker.formatTime(s, i, i._defaults) + o, i._defaults.timeOnly || i._defaults.altFieldTimeOnly || e === null || (r = i._defaults.altFormat ? n.datepicker.formatDate(i._defaults.altFormat, e, h) + f + r : i.formattedDate + f + r), n(u).val(r)
                }
            } else n.datepicker._base_updateAlternate(t)
        }, n.datepicker._base_doKeyUp = n.datepicker._doKeyUp, n.datepicker._doKeyUp = function (t) {
            var i = n.datepicker._getInst(t.target),
                r = n.datepicker._get(i, "timepicker");
            if (r && r._defaults.timeOnly && i.input.val() != i.lastVal) try {
                n.datepicker._updateDatepicker(i)
            } catch (u) {
                n.timepicker.log(u)
            }
            return n.datepicker._base_doKeyUp(t)
        }, n.datepicker._base_gotoToday = n.datepicker._gotoToday, n.datepicker._gotoToday = function (t) {
            var r = this._getInst(n(t)[0]),
                e = r.dpDiv,
                u, f;
            this._base_gotoToday(t), u = this._get(r, "timepicker"), i(u), f = new Date, this._setTime(r, f), n(".ui-datepicker-today", e).click()
        }, n.datepicker._disableTimepickerDatepicker = function (t) {
            var r = this._getInst(t),
                i;
            r && (i = this._get(r, "timepicker"), n(t).datepicker("getDate"), i && (i._defaults.showTimepicker = !1, i._updateDateTime(r)))
        }, n.datepicker._enableTimepickerDatepicker = function (t) {
            var r = this._getInst(t),
                i;
            r && (i = this._get(r, "timepicker"), n(t).datepicker("getDate"), i && (i._defaults.showTimepicker = !0, i._addTimePicker(r), i._updateDateTime(r)))
        }, n.datepicker._setTime = function (n, t) {
            var i = this._get(n, "timepicker"),
                r;
            i && (r = i._defaults, i.hour = t ? t.getHours() : r.hour, i.minute = t ? t.getMinutes() : r.minute, i.second = t ? t.getSeconds() : r.second, i.millisec = t ? t.getMilliseconds() : r.millisec, i.microsec = t ? t.getMicroseconds() : r.microsec, i._limitMinMaxDateTime(n, !0), i._onTimeChange(), i._updateDateTime(n))
        }, n.datepicker._setTimeDatepicker = function (n, t, i) {
            var f = this._getInst(n),
                u, r;
            f && (u = this._get(f, "timepicker"), u && (this._setDateFromField(f), t && (typeof t == "string" ? (u._parseTime(t, i), r = new Date, r.setHours(u.hour, u.minute, u.second, u.millisec), r.setMicroseconds(u.microsec)) : (r = new Date(t.getTime()), r.setMicroseconds(t.getMicroseconds())), r.toString() == "Invalid Date" && (r = undefined), this._setTime(f, r))))
        }, n.datepicker._base_setDateDatepicker = n.datepicker._setDateDatepicker, n.datepicker._setDateDatepicker = function (t, i) {
            var f = this._getInst(t),
                r, u;
            f && (typeof i == "string" && (i = new Date(i), i.getTime() || n.timepicker.log("Error creating Date object from string.")), r = this._get(f, "timepicker"), i instanceof Date ? (u = new Date(i.getTime()), u.setMicroseconds(i.getMicroseconds())) : u = i, r && (r.support.timezone || r._defaults.timezone !== null || (r.timezone = u.getTimezoneOffset() * -1), i = n.timepicker.timezoneAdjust(i, r.timezone), u = n.timepicker.timezoneAdjust(u, r.timezone)), this._updateDatepicker(f), this._base_setDateDatepicker.apply(this, arguments), this._setTimeDatepicker(t, u, !0))
        }, n.datepicker._base_getDateDatepicker = n.datepicker._getDateDatepicker, n.datepicker._getDateDatepicker = function (t, i) {
            var f = this._getInst(t),
                r, u;
            if (f) return (r = this._get(f, "timepicker"), r) ? (f.lastVal === undefined && this._setDateFromField(f, i), u = this._getDate(f), u && r._parseTime(n(t).val(), r.timeOnly) && (u.setHours(r.hour, r.minute, r.second, r.millisec), u.setMicroseconds(r.microsec), r.timezone != null && (r.support.timezone || r._defaults.timezone !== null || (r.timezone = u.getTimezoneOffset() * -1), u = n.timepicker.timezoneAdjust(u, r.timezone))), u) : this._base_getDateDatepicker(t, i)
        }, n.datepicker._base_parseDate = n.datepicker.parseDate, n.datepicker.parseDate = function (t, i, r) {
            var u;
            try {
                u = this._base_parseDate(t, i, r)
            } catch (f) {
                if (f.indexOf(":") >= 0) u = this._base_parseDate(t, i.substring(0, i.length - (f.length - f.indexOf(":") - 2)), r), n.timepicker.log("Error parsing the date string: " + f + "\ndate string = " + i + "\ndate format = " + t);
                else throw f;
            }
            return u
        }, n.datepicker._base_formatDate = n.datepicker._formatDate, n.datepicker._formatDate = function (n) {
            var u = this._get(n, "timepicker");
            return u ? (u._updateDateTime(n), u.$input.val()) : this._base_formatDate(n)
        }, n.datepicker._base_optionDatepicker = n.datepicker._optionDatepicker, n.datepicker._optionDatepicker = function (t, i, r) {
            var v = this._getInst(t),
                h, s;
            if (!v) return null;
            if (s = this._get(v, "timepicker"), s) {
                var u = null,
                    f = null,
                    a = null,
                    l = s._defaults.evnts,
                    c = {}, e;
                if (typeof i == "string") {
                    if (i === "minDate" || i === "minDateTime") u = r;
                    else if (i === "maxDate" || i === "maxDateTime") f = r;
                    else if (i === "onSelect") a = r;
                    else if (l.hasOwnProperty(i)) {
                        if (typeof r == "undefined") return l[i];
                        c[i] = r, h = {}
                    }
                } else if (typeof i == "object") {
                    i.minDate ? u = i.minDate : i.minDateTime ? u = i.minDateTime : i.maxDate ? f = i.maxDate : i.maxDateTime && (f = i.maxDateTime);
                    for (e in l) l.hasOwnProperty(e) && i[e] && (c[e] = i[e])
                }
                for (e in c) c.hasOwnProperty(e) && (l[e] = c[e], h || (h = n.extend({}, i)), delete h[e]);
                if (h && o(h)) return;
                u ? (u = u === 0 ? new Date : new Date(u), s._defaults.minDate = u, s._defaults.minDateTime = u) : f ? (f = f === 0 ? new Date : new Date(f), s._defaults.maxDate = f, s._defaults.maxDateTime = f) : a && (s._defaults.onSelect = a)
            }
            return r === undefined ? this._base_optionDatepicker.call(n.datepicker, t, i) : this._base_optionDatepicker.call(n.datepicker, t, h || i, r)
        };
        var o = function (n) {
            var t;
            for (t in n)
                if (n.hasOwnProperty(n)) return !1;
            return !0
        }, r = function (t, i) {
            n.extend(t, i);
            for (var r in i) (i[r] === null || i[r] === undefined) && (t[r] = i[r]);
            return t
        }, e = function (n) {
            var i = n.replace(/\'.*?\'/g, "").toLowerCase(),
                t = function (n, t) {
                    return n.indexOf(t) !== -1 ? !0 : !1
                };
            return {
                hour: t(i, "h"),
                minute: t(i, "m"),
                second: t(i, "s"),
                millisec: t(i, "l"),
                microsec: t(i, "c"),
                timezone: t(i, "z"),
                ampm: t(i, "t") && t(n, "h"),
                iso8601: t(n, "Z")
            }
        }, f = function (n) {
            return n > 12 && (n = n - 12), n === 0 && (n = 12), String(n)
        }, s = function (t, i, r, u) {
            var f, c;
            try {
                var e = u && u.separator ? u.separator : n.timepicker._defaults.separator,
                    l = u && u.timeFormat ? u.timeFormat : n.timepicker._defaults.timeFormat,
                    a = l.split(e),
                    h = a.length,
                    o = i.split(e),
                    s = o.length;
                if (s > 1) return [o.splice(0, s - h).join(e), o.splice(0, h).join(e)]
            } catch (v) {
                if (n.timepicker.log("Could not split the date from the time. Please check the following datetimepicker options\nthrown error: " + v + "\ndateTimeString" + i + "\ndateFormat = " + t + "\nseparator = " + u.separator + "\ntimeFormat = " + u.timeFormat), v.indexOf(":") >= 0) return f = i.length - (v.length - v.indexOf(":") - 2), c = i.substring(f), [n.trim(i.substring(0, f)), n.trim(i.substring(f))];
                throw v;
            }
            return [i, ""]
        }, u = function (t, i, r, u, f) {
            var h, o = s(t, r, u, f),
                c, e;
            if (h = n.datepicker._base_parseDate(t, o[0], u), o[1] !== "") {
                if (c = o[1], e = n.datepicker.parseTime(i, c, f), e === null) throw "Wrong time format";
                return {
                    date: h,
                    timeObj: e
                }
            }
            return {
                date: h
            }
        }, i = function (n, t) {
            if (n && n.timezone_select) {
                var i = typeof t != "undefined" ? t : new Date;
                n.timezone_select.val(i.getTimezoneOffset() * -1)
            }
        };
        n.timepicker = new t, n.timepicker.timezoneOffsetString = function (n, t) {
            if (isNaN(n) || n > 840) return n;
            var i = n,
                u = i % 60,
                f = (i - u) / 60,
                e = t ? ":" : "",
                r = (i >= 0 ? "+" : "-") + ("0" + (f * 101).toString()).slice(-2) + e + ("0" + (u * 101).toString()).slice(-2);
            return r == "+00:00" ? "Z" : r
        }, n.timepicker.timezoneOffsetNumber = function (n) {
            return (n = n.toString().replace(":", ""), n.toUpperCase() === "Z") ? 0 : /^(\-|\+)\d{4}$/.test(n) ? (n.substr(0, 1) == "-" ? -1 : 1) * (parseInt(n.substr(1, 2), 10) * 60 + parseInt(n.substr(3, 2), 10)) : n
        }, n.timepicker.timezoneAdjust = function (t, i) {
            var r = n.timepicker.timezoneOffsetNumber(i);
            return isNaN(r) || t.setMinutes(t.getMinutes() * 1 + (t.getTimezoneOffset() * -1 - r * 1)), t
        }, n.timepicker.timeRange = function (t, i, r) {
            return n.timepicker.handleRange("timepicker", t, i, r)
        }, n.timepicker.datetimeRange = function (t, i, r) {
            n.timepicker.handleRange("datetimepicker", t, i, r)
        }, n.timepicker.dateRange = function (t, i, r) {
            n.timepicker.handleRange("datepicker", t, i, r)
        }, n.timepicker.handleRange = function (t, i, r, u) {
            function e(n, f) {
                var s = i[t]("getDate"),
                    h = r[t]("getDate"),
                    c = n[t]("getDate"),
                    e, o;
                s !== null && (e = new Date(s.getTime()), o = new Date(s.getTime()), e.setMilliseconds(e.getMilliseconds() + u.minInterval), o.setMilliseconds(o.getMilliseconds() + u.maxInterval), u.minInterval > 0 && e > h ? r[t]("setDate", e) : u.maxInterval > 0 && o < h ? r[t]("setDate", o) : s > h && f[t]("setDate", c))
            }

            function f(n, i, r) {
                if (n.val()) {
                    var f = n[t].call(n, "getDate");
                    f !== null && u.minInterval > 0 && (r == "minDate" && f.setMilliseconds(f.getMilliseconds() + u.minInterval), r == "maxDate" && f.setMilliseconds(f.getMilliseconds() - u.minInterval)), f.getTime && i[t].call(i, "option", r, f)
                }
            }
            return u = n.extend({}, {
                minInterval: 0,
                maxInterval: 0,
                start: {},
                end: {}
            }, u), n.fn[t].call(i, n.extend({
                onClose: function () {
                    e(n(this), r)
                },
                onSelect: function () {
                    f(n(this), r, "minDate")
                }
            }, u, u.start)), n.fn[t].call(r, n.extend({
                onClose: function () {
                    e(n(this), i)
                },
                onSelect: function () {
                    f(n(this), i, "maxDate")
                }
            }, u, u.end)), e(i, r), f(i, r, "minDate"), f(r, i, "maxDate"), n([i.get(0), r.get(0)])
        }, n.timepicker.log = function (n) {
            window.console && console.log(n)
        }, Date.prototype.getMicroseconds || (Date.prototype.microseconds = 0, Date.prototype.getMicroseconds = function () {
            return this.microseconds
        }, Date.prototype.setMicroseconds = function (n) {
            return this.setMilliseconds(this.getMilliseconds() + Math.floor(n / 1e3)), this.microseconds = n % 1e3, this
        }), n.timepicker.version = "1.3.1"
    }
}(jQuery);