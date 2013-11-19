

$(document).ready(function () {

    Core.Init();
});

var Core = new function() {
    this.Init = function() {
        $.fn.dash();
    };

    this.getBaseURL = function() {
        var baseUrl = "";
        var baseDocument = "index.html";

        if (document.getElementsByTagName('base').length > 0) {
            baseUrl = document.getElementsByTagName('base')[0].href.replace(baseDocument, "");
        } else {
            baseUrl = location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
        }

        return baseUrl;

    };

    this.ReplyToComment = function (input, commentId) {
        var clone = $('#NewComment > .CommentArea > form').clone();
        $("input[name='ParentId']", clone).val(commentId);
        $(input).append(clone);
        $(input).removeAttr('onclick');
        $(this).parents('form:first');
        
        
        //$('div').removeClass('highlight');
        //$('div[data-comment-id=' + commentId + ']').addClass('highlight');
    };

};
