using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using iTotzke.Composites;
using itotzke.Database;
using iTotzke.Models;
using iTotzke.Utilites;
using User = iTotzke.Models.User;

namespace itotzke.Controllers
{
    public class HomeController : Controller
    {
        private readonly DynamicDb db;
        private Logger logger;
        public HomeController()
        {
            this.db = new DynamicDb();
            this.logger = new Logger();
        }

        
        public ActionResult Index()
        {
            //List<Content> pageContents = db.RunListProcedure<Content>("[SelectAllContentByArea]", new { contentArea = "Index" });
            /**
            ViewBag.Message = pageContents.First(x => x.ContentName == "TestTitle");
            ViewBag.Message = pageContents.First(x => x.ContentName == "TestTitle");
            ViewBag.Message = pageContents.First(x => x.ContentName == "TestTitle");
            ViewBag.Message = pageContents.First(x => x.ContentName == "TestTitle");
            ViewBag.Message = pageContents.First(x => x.ContentName == "TestTitle");
            */
            ViewBag.Message = "Chat with AI";
            
            return View();
        }

        public ActionResult About()
        {
            //List<Content> pageContents = db.RunListProcedure<Content>("[SelectAllContentByArea]", new { contentArea = "About" });
            /**
           ViewBag.Message = pageContents.First(x => x.ContentName == "TestTitle");
           ViewBag.Message = pageContents.First(x => x.ContentName == "TestTitle");
           ViewBag.Message = pageContents.First(x => x.ContentName == "TestTitle");
           ViewBag.Message = pageContents.First(x => x.ContentName == "TestTitle");
           ViewBag.Message = pageContents.First(x => x.ContentName == "TestTitle");
           */
            return View();
        }

        public ActionResult Contact()
        {
            //List<Content> pageContents = db.RunListProcedure<Content>("[SelectAllContentByArea]", new { contentArea = "Contact" });
            /**
           ViewBag.Message = pageContents.First(x => x.ContentName == "TestTitle");
           ViewBag.Message = pageContents.First(x => x.ContentName == "TestTitle");
           ViewBag.Message = pageContents.First(x => x.ContentName == "TestTitle");
           ViewBag.Message = pageContents.First(x => x.ContentName == "TestTitle");
           ViewBag.Message = pageContents.First(x => x.ContentName == "TestTitle");
           */
            ViewBag.Message = "Paul Totzke.";
            ViewBag.emailSupport = ConfigurationManager.AppSettings["emailSupport"];
            ViewBag.emailMarketing = ConfigurationManager.AppSettings["emailMarketing"];
            ViewBag.emailGeneral = ConfigurationManager.AppSettings["emailGeneral"];
            return View();
        }

        public ActionResult Carly()
        {
            //List<Content> pageContents = db.RunListProcedure<Content>("[SelectAllContentByArea]", new { contentArea = "Carly" });
            ViewBag.Message = "Computerized Automated Response Lexeme Yakker";

            return View();
        }

        public ActionResult NotFound()
        {
            ViewBag.SourcePage = "http://" + Request.Url.Authority + Request.QueryString["aspxerrorpath"];
            return View("NotFound");
        }

        public ActionResult Error()
        {
            //ViewBag.Exception = model.Exception;
            ViewBag.Username = User.Identity.Name;
            //ViewBag.SourcePage = "http://" + Request.Url.Authority + Request.QueryString["aspxerrorpath"];
            return View("ServerError");
        }

        public ActionResult Default(ContentPage model)
        {
            return View(model);
        }
    }
}
