(function ($) {

    $.liveEssay = function(el, options) {

        var defaults = {
            propertyName: 'value',
            onSomeEvent: function() {}
        };

        var plugin = this;

        plugin.settings = {};

        var init = function() {
            plugin.settings = $.extend({}, defaults, options);
            plugin.el = el;
            evaluate(0);
            options.statements.forEach(function (entry) {
                $("#Essay").append("<br/>" + entry.value);
            });
            // create checkboxes "Accept", "Reject", and "Unsure" foreach premise, and its proper label
            // At the end, put a submit button linked to the plugin's "submit" func
        };

        plugin.submit = function() {
            
        };

        var evaluate = function(input) {
            var s = options.statements;
            var p = options.premises;
            for (var i = 0; i < s.length; i++)
            {
                for (var j = 0; j < p.length; j++) {
                    //debugger;
                    s[i].formula = s[i].formula.replace(p[j].symbol, p[j].value);
                    console.log(s[i].formula);
                }
            }
            var change = true;
            while (change) {
                change = false;
                for (var i = 0; i < s.length; i++)
                {
                    if (s[i].value === "true" || s[i].value === "false") {
                        continue;
                    }
                    for (var j = 0; j < s.length; j++)
                    {
                        if (i == j) continue;
                        
                        if (s[j].value === "true" || s[j].value === "false") {
                            if (s[i].formula.indexOf(s[j].symbol) > -1) {
                                debugger;
                                s[i].formula = s[i].formula.replace(s[j].symbol, s[j].value);
                                change = true;
                            }
                        }
                    }
                }
                for (var i = 0; i < s.length; i++) {
                    try {
                        if (s[i].value !== "true" && s[i].value !== "false") {
                            s[i].value = "" + eval(s[i].formula);
                            
                            change = true;
                        }
                    } catch (e) {
                        if (e instanceof SyntaxError) {
                            alert(e.message);
                        }
                    }
                }
            }
            

        };

        init();

    };

})(jQuery);


$(document).ready(function () {
    var dataFile = {
        "premises": [
            /**{ "value": "true, false, unknown", "label": "myName", "symbol":"A" }*/
            { "value": "true", "label": "myName", "symbol": "A" },
            { "value": "false", "label": "myName", "symbol": "B" },
            { "value": "notset", "label": "myName", "symbol": "C" }
        ],
        "statements": [
            /*{ "value": "", "label": "myName", "symbol": "A", "formula": "symbolicProposition" }*/
            { "value": "notset", "label": "myName", "symbol": "D", "formula": "A && !B" },
            { "value": "notset", "label": "myName", "symbol": "E", "formula": "!D" },
            { "value": "notset", "label": "myName", "symbol": "F", "formula": "C || C" }
        ],
        "conclusions": [
            /*{ "target": "nameOfDiv|Element", "display": "symbolicProposition" }*/
            { "target": "Essay", "display": "C" }
        ]
    };

    // create a new instance of the plugin
    var liveEssay = new $.liveEssay($('#Essay'), dataFile);

    // call a public method
    //liveEssay.foo_public_method();

    // get the value of a public property
    //liveEssay.settings.property;

});
