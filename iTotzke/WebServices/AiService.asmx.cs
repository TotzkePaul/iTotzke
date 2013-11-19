using System;
using System.Data;
using System.Web;
using System.Collections;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Collections.Generic;
using System.Linq;

namespace itotzke
{
    /// <summary>
    /// Summary description for AiService
    /// </summary>

    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(true)]
    [System.Web.Script.Services.ScriptService]
    public class AiService : System.Web.Services.WebService
    {


        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World!";
        }

        [WebMethod]
        public string Carly(string input)
        {
            return Utilites.Carly.response(input) ;
        }
    }
}
