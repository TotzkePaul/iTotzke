using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iTotzke.Controllers
{
    public class ToolsController : Controller
    {
        //
        // GET: /Tools/

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult SelectionSaver()
        {
            return View();
        }

        public ActionResult Example()
        {
            return View();
        }

        public ActionResult WebPad()
        {
            return View();
        }
    }
}
