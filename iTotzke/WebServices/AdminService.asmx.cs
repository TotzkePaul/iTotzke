using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Caching;
using System.Web.Services;
using itotzke.Database;
using iTotzke.Utilites;

namespace iTotzke
{
    /// <summary>
    /// Summary description for AdminService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(true)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class AdminService : System.Web.Services.WebService
    {
        private readonly DynamicDb db;
        private readonly Logger logger;
        private static int list = 0;

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World!";
        }

        public AdminService()
        {
            this.db = new DynamicDb();
            this.logger = new Logger(db);
        }

        [WebMethod]
        public string InsertContent(string password, string name, string text, string area)
        {
            if (password == ConfigurationManager.AppSettings["adminPassword"])
            {
                try
                {
                    //int t = (int?)Context.Cache["inc"]??0;
                    list++;
                    //Context.Cache["inc"] = t++;
                    return list + " " + db.RunProcedure<Decimal>("InsertContent", new { contentName = name, contentText = text, contentArea = area });
                }
                catch (Exception ex)
                {
                    logger.Add(ex, "Connecting to DB", GetType().ToString());
                    return ex.StackTrace;
                }
                
            }
            else
            {
                logger.Add(new Exception(), "Wrong password", "AdminService");
                HttpContext.Current.Cache["myVar"] += "X";
                return (string)System.Web.HttpContext.Current.Cache["myVar"];
            }
        }
    }
}
