$(document).ready(function () {
    
    Carly.Init();
});

function getBaseURL() {
    var url = location.href;  // entire url including querystring - also: window.location.href;
    var baseURL = url.substring(0, url.indexOf('/', 14));


    if (baseURL.indexOf('http://localhost') != -1) {
        // Base Url for localhost
        var url = location.href;  // window.location.href;
        var pathname = location.pathname;  // window.location.pathname;
        var index1 = url.indexOf(pathname);
        var index2 = url.indexOf("/", index1 + 1);
        var baseLocalUrl = url.substr(0, index2);

        return baseLocalUrl;
    }
    else {
        // Root Url for domain name
        return baseURL + "/";
    }

}

var Carly = new function() {
    this.Init = function() {
        $("#submitmsg").click(function() {
            Carly.SendMsg();

        });
        $('#usermsg').keyup(function(e) {
            if (e.keyCode == 13) {
                $("#submitmsg").click();
            }
        });
    };
    
    this.SendMsg = function() {
        var request = $.ajax(
            {
                type: "POST",
                url: Core.getBaseURL() + "WebServices/AiService.asmx/Carly",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({
                    "input": $("#usermsg").val()
                })
            });

        request.done(function(result) {
            var data = result.d;
            $("#chatbox").append("User:" + $("#usermsg").val() + "<br />");
            $("#chatbox").append("Carly:" + data + "<br />");
            $("#usermsg").val("");
        });
        request.fail(function() {
            alert("There was a problem connecting.", "error");
        });
    };
};
