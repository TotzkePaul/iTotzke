$(document).ready(function () {

    Admin.Init();
});

var Admin = new function () {
    this.ContentCallback = function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        // Bold the grade for all 'A' grade browsers
        $(".edit", nRow).empty();
        $(".delete", nRow).empty();
        var editButton = $("<a href='#' class='editButton'></a>").button({
                text: false,
                icons: { primary: "ui-icon-pencil" }
            }
        );
        $('.edit', nRow).append(editButton);

        var delButton = $("<a href='#' class='deleteButton'></a>").button({
                text: false,
                icons: { primary: "ui-icon-trash" }
            }
        );

        $('.delete', nRow).append(delButton);
        return nRow;
    };
    this.LogCallback = function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        // Bold the grade for all 'A' grade browsers
        $(".edit", nRow).empty();
        $(".delete", nRow).empty();
        var editButton = $("<a href='#' class='editButton'></a>").button({
            text: false,
            icons: { primary: "ui-icon-pencil" }
        }
        );
        $('.edit', nRow).append(editButton);

        var delButton = $("<a href='#' class='deleteButton'></a>").button({
            text: false,
            icons: { primary: "ui-icon-trash" }
        }
        );

        $('.delete', nRow).append(delButton);
        return nRow;
    };
    this.UserCallback = function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        // Bold the grade for all 'A' grade browsers
        $(".edit", nRow).empty();
        $(".delete", nRow).empty();
        var editButton = $("<a href='#' class='editButton'></a>").button({
            text: false,
            icons: { primary: "ui-icon-pencil" }
        }
        );
        $('.edit', nRow).append(editButton);

        var delButton = $("<a href='#' class='deleteButton'></a>").button({
            text: false,
            icons: { primary: "ui-icon-trash" }
        }
        );

        $('.delete', nRow).append(delButton);
        return nRow;
    };
    this.Init = function () {
        $("#SubmitContent").click(function () {
            Admin.InsertContent();

        });
    };

    this.InsertContent = function() {
        //string password, string name, string text
        var request = $.ajax(
            {
                type: "POST",
                url: Core.getBaseURL() + "Webservices/AdminService.asmx/InsertContent",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({
                    "area": $("#ContentArea").val(),
                    "name": $("#ContentName").val(),
                    "text": $("#ContentText").val(),
                    "password": $("#password").val()
                })
            });

        request.done(function(result) {
            var data = result.d;
            alert(data);
        });
        request.fail(function() {
            alert("There was a problem connecting.", "error");
        });
    };
};
