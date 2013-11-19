using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using iTotzke.Composites;
using itotzke.Database;

namespace iTotzke.Controllers
{
    public class AdminController : Controller
    {
        //
        // GET: /Admin/

        public ActionResult Index()
        {
            DynamicDb db = new DynamicDb();
            //ViewBag.AllContent = db.RunQuery<Content>(DynamicDb.Db.Select, "Content", new string[]{}, cols: new string[]{"*"});
            ViewBag.AllLogs = db.RunQuery<Log>(DynamicDb.Db.Select, "Logger", new string[] { }, cols: new string[] { "*" });
            ViewBag.AllUsers = new List<User>() { 
                new User() { Type = "Admin", UserId = 1, Username = "Totzp00" },
                new User() { Type = "Teacher", UserId = 2, Username = "Duerrr34" },
                new User(){Type="Student", UserId = 3, Username = "Muicha11"}
            };
            return View();
        }

    }
}
