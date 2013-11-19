

$(document).ready(function () {

    Core.Init();
});

var Core = new function() {
    this.Init = function() {
        $.fn.dash();
    };
    
    this.getBaseURL = function () {
        var baseUrl = "";
        var baseDocument = "index.html";

        if (document.getElementsByTagName('base').length > 0) {
            baseUrl = document.getElementsByTagName('base')[0].href.replace(baseDocument, "");
        } else {
            baseUrl = location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
        }

        return baseUrl;

    }
    
};
