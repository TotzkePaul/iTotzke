$(document).ready(function () {

    Tools.Init();
});

var Tools = new function () {

    this.csharpToSQL = {        
        "int": "INTEGER",
        "string": "VARCHAR(max)",
        "float": "FLOAT",
        "bool": "BIT",
        "char": "CHAR(1)",
        "double": "REAL",
        "DateTime": "DateTime",
        "Long": "LONG"
    };

    var mySettings = {
        onShiftEnter: { keepDefault: false, replaceWith: '<br />\n' },
        onCtrlEnter: { keepDefault: false, openWith: '\n<p>', closeWith: '</p>' },
        onTab: { keepDefault: false, replaceWith: '    ' },
        markupSet: [
            { name: 'Bold', key: 'B', openWith: '(!(<strong>|!|<b>)!)', closeWith: '(!(</strong>|!|</b>)!)' },
            { name: 'Italic', key: 'I', openWith: '(!(<em>|!|<i>)!)', closeWith: '(!(</em>|!|</i>)!)' },
            { name: 'Stroke through', key: 'S', openWith: '<del>', closeWith: '</del>' },
            { separator: '---------------' },
            { name: 'Bulleted List', openWith: '    <li>', closeWith: '</li>', multiline: true, openBlockWith: '<ul>\n', closeBlockWith: '\n</ul>' },
            { name: 'Numeric List', openWith: '    <li>', closeWith: '</li>', multiline: true, openBlockWith: '<ol>\n', closeBlockWith: '\n</ol>' },
            { separator: '---------------' },
            { name: 'Picture', key: 'P', replaceWith: '<img src="[![Source:!:http://]!]" alt="[![Alternative text]!]" />' },
            { name: 'Link', key: 'L', openWith: '<a href="[![Link:!:http://]!]"(!( title="[![Title]!]")!)>', closeWith: '</a>', placeHolder: 'Your text to link...' },
            { separator: '---------------' },
            { name: 'Clean', className: 'clean', replaceWith: function (markitup) { return markitup.selection.replace(/<(.*?)>/g, ""); } },
            {
                name: 'Preview',previewAutoRefresh:true, className: 'preview', call: 'preview' /**function () {
                    
                }*/
            },
            {
                name: 'Update', className: 'preview', call: function () {
                    var html = $("#markItUp").text();
                    $("#PreviewArea").html(html);
                    
                }
            }
        ]
    };

    this.CSharp = function (args) {
        var nameSpace = "iTotzke.Composites";
        var varList = "";
        for (var i = 0; i < args.length; i++) {
            varList += "\t\tpublic " + args[i][0] + " "+ args[i][1]+" { get; set; }\n";
        }

        var str =
            $("#UsingStmtsCS").val()+
            "\n" +
            "namespace" + nameSpace +"\n" +
            "{\n"+
                "\tpublic class " + $("#ObjectNameText").val() + "\n" +
                "\t{\n" +
                     varList +
                "\t}\n"+
            "}";
        $("#CSharpText").val(str);
    };

    this.Sql = function (args) {

    };

    this.WebService = function (args) {
        var nameSpace = "iTotzke";
        var databaseObject = "dynamicDB";
        var varList = "";
        var className = $("#ObjectNameText").val();
        args = [["Select" + className + "ById", className, "int"], ["Update" + className, className, className], ["Delete" + className + "ById", "bool","int"]];
        for (var i = 0; i < args.length; i++) {
            varList += 
                    "\t\t\t[WebMethod]\n" +
                    "\t\t\tpublic " +args[i][1] +" "+args[i][0] +"(" + args[i][2]+" input)\n" +
                    "\t\t\t{\n" +
                    '\t\t\t\treturn db.'+args[i][0] + '(input);\n' +
                    "\t\t\t}\n\n";
        }

        var str =
            $("#UsingStmtsWS").val() +
            "\n" +
            "namespace " + nameSpace + "\n" +
            "{\n" +
                    "\t"+$("#WebServiceAttr").val().split("\n").join("\n\t") +
                    "\n\t\tpublic class AiService : System.Web.Services.WebService\n" +
                    "\t\t{\n" +
                        "\t\t\tprivate readonly " + databaseObject + " db;\n" +
                        "\t\t\tprivate readonly Logger logger;\n" +
                        "\t\t\tpublic "+className +"Service()\n"+
                        "\t\t\t{\n" +
                            "\t\t\t\tthis.db = new " + databaseObject+"();\n" +
                            "\t\t\t\tthis.logger = new Logger(db);\n" +
                        "\t\t\t}\n\n" +
                        varList +
                "\t}\n" +
            "}";
        $("#WebServiceText").val(str);
    };

    this.Html = function (args) {
        var sampleData = "";
        var randData = {
            "int": function() {
                return Math.floor((Math.random() * 1000));
            },
            "string": function () {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < 8; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));

                return text;
            },
            "float": function () {
                return Math.random()*100;
            },
            "bool": function () {
                return true;
            },
            "char": function () {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < 1; i++)
                    text += possible.charAt(Math.floor(Math.random() * possible.length));

                return text;
            },
            "double": function () {
                return Math.random() * 100;
            },
            "DateTime": function () {
                var start = new Date(2012, 0, 1);
                var end = new Date();
                return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            },
            "Long": function () {
                return Math.floor((Math.random() * 10000) +1000);
            }
        }
        for (var i = 0; i < 25; i++) {
            sampleData += "\t<tr>\n";
            for (var j = 0; j < args.length; j++) {
                sampleData += "\t\t<td>" +randData[args[j][0]]() + "</td>\n";
            }
            sampleData += "\t\t\t<td> </td>\n" +
                        "\t\t\t<td> </td>\n" +
                        "\t\t\t<td> </td>\n"+"\t</tr>\n";
        }
        //sampleData = "<tr>\n" + sampleData  + "\n</tr>";
        var varList = "";
        var razorList = "";
        var jsNamespace = $("#JsNamespaceText").val();
        var className = $("#ObjectNameText").val();
        for (var i = 0; i < args.length; i++) {
            var prop = "";
            if (args[i].length > 2) {
                prop = " data-table-class='hidden'";
            }
            varList += "\t\t\t<th" + prop + ">" + args[i][1] + "</th>\n";
            razorList += "\t\t\t<td"  +prop + ">" + args[i][1] + "</td>\n";
        }
        varList += "\t\t\t<th" + " data-table-class='viewButton' data-table-width='1px' data-table-sort='false'" + ">" + "</th>\n" +
                    "\t\t\t<th" + " data-table-class='editButton' data-table-width='1px' data-table-sort='false'" + ">" + "</th>\n" +
                    "\t\t\t<th" + " data-table-class='deleteButton' data-table-width='1px' data-table-sort='false'" + ">" + "</th>\n";
        razorList +=    "\t\t\t<td> </td>\n" +
                        "\t\t\t<td> </td>\n" +
                        "\t\t\t<td> </td>\n";
        var str =
            "<table id='"+ className +"Table' data-table='true; fnRowCallback:" + jsNamespace+ "."+className+"Callback; bLengthChange:false'>\n" +
                "\t<thead>\n" +
                    "\t\t<tr>\n" +
                        varList +
                    "\t\t</tr>\n" +
                "\t</thead>\n" +
                "\t<tbody>\n" +
                "\t<!--Uncomment for C# Razor syntax-->\n" +
                sampleData +
                "\t<!--@foreach (" + className +" c in ViewBag.All" +className +")\n" +
                "\t{\n" +
                    "\t\t<tr class=''>\n" +
                        razorList +
                    "\t\t</tr>\n" +
                "}-->\n" +
                "\t</tbody>\n" +
            "</table>\n";
        $("#HtmlText").val(str);
    };

    this.JScript = function (args) {
        var jsNamespace = $("#JsNamespaceText").val();
        var initName = "$(document).ready(function () {/**" + jsNamespace + ".Init();*/});";
        var callback = "this." + $("#ObjectNameText").val() + "Callback = " + $("#CallbackJs").val();
        var nameSpaceJs = "var " + jsNamespace + " = new function () {\n" + callback + "\n}";
        $("#JScriptText").val(initName + "\n" + nameSpaceJs);
    };

    this.ResetForm = function() {
        $("#TypeSelect").val();
        $('input[id="IdCheckbox"]:checked').attr('checked', false);
        $("#NameText").val("");
    };
    


    this.Init = function () {
        
        $("#sortable li").click(function (parameters) {
            var deleteElement = $(this);
            $('<div></div>').appendTo('body')
              .html('<div><h6>Yes or No?</h6></div>')
              .dialog({
                  modal: true, title: 'Delete this item?', zIndex: 10000, autoOpen: true,
                  width: 'auto', resizable: false,
                  buttons: {
                      Yes: function () {
                          deleteElement.remove();
                          $(this).dialog("close");
                      },
                      No: function () {
                          //doFunctionForNo();
                          $(this).dialog("close");
                      }
                  },
                  close: function (event, ui) {
                      $(this).remove();
                  }
              });

        });
        // Add markItUp! to your textarea in one line
        // $('textarea').markItUp( { Settings }, { OptionalExtraSettings } );
        $("#UpdateAll").click(function () {
            var list = [];

            var t = $("#sortable li .datainfo");
            for (var i =0; i<t.length; i++) {
                list.push($(t[i]).attr("data-info").match(/[^ ]+/g));
            }
            Tools.WebService(list);
            Tools.Sql(list);
            Tools.Html(list);
            Tools.JScript(list);
            Tools.CSharp(list);
            return false;
        });

        $("#PreviewLink").click(function () {
            //eval($("#JScriptText").val());
            var script = "<script type=\"text/javascript\"> " + $("#JScriptText").val() + " </script>";
            //using jquery next
            $('body').append(script);

            $("#PreviewArea").html( $("#HtmlText").val());
            //$("#PreviewArea tbody").empty();
            $("#PreviewArea table").dash();
        });

        $("#ToggleDefault").click(function() {
            $("#ExtraControls").toggle();
        });

        

        $("#SubmitVar").click(function() {
            var type = $("#TypeSelect").val();
            var kind = $("input[name='TypeRadio']:checked").val();
            var isId = $('input[id="IdCheckbox"]:checked').length > 0;;
            var name = $("#NameText").val();
            Tools.ResetForm();
            var label = "";
            var data = "";
            if (kind == "Array") {
                label += type + "[] ";
                data += type + "[] ";
            } else if (kind == "List") {
                label += "List<" + type + "> ";
                data += "List<" + type + "> ";
            } else {
                label +=  type + " ";
                data += type + " ";
            }
            label += name + " ";
            data += name + " ";
            if (isId) {
                label += "(id)";
                data += "id";
            }
            var newProperty = $('<li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s bullet"></span><span class="datainfo" data-info="' + data + '">' + label + '</span></li>');
            newProperty.click(function (parameters) {
                var deleteElement = $(this);
                $('<div></div>').appendTo('body')
                  .html('<div><h6>Yes or No?</h6></div>')
                  .dialog({
                      modal: true, title: 'Delete this item?', zIndex: 10000, autoOpen: true,
                      width: 'auto', resizable: false,
                      buttons: {
                          Yes: function () {
                              deleteElement.remove();
                              $(this).dialog("close");
                          },
                          No: function () {
                              //doFunctionForNo();
                              $(this).dialog("close");
                          }
                      },
                      close: function (event, ui) {
                          $(this).remove();
                      }
                  });
                
            });
            $("#sortable").append(newProperty);
        }
            
        );
        
        $(".MarkItUp").markItUp(mySettings);

        $(function () {
            $("#sortable").sortable();
            $("#sortable").disableSelection();
        });
    };
};
