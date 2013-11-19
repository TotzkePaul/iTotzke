using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.Security;
using itotzke.Database;
using iTotzke.Models;
using iTotzke.Utilites;
using User = iTotzke.Composites.User;

namespace iTotzke.Controllers
{
    public class UserController : Controller
    {
        private Logger _logger;
        private DynamicDb _dynamicDb;
        public UserController()
        {
            this._logger = new Logger();
            this._dynamicDb = new DynamicDb();
        }

        //
        // GET: /User/

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }


        [HttpPost]
        public ActionResult Login(Models.User user)
        {
            if (ModelState.IsValid)
            {
                if (user.IsValid(user.UserName, user.Password, _dynamicDb))
                {
                    FormsAuthentication.SetAuthCookie(user.UserName, user.RememberMe);
                    //Emailer.Send( "totzkp00@uwosh.edu", "Test Subject", "Body Sample");
                    //"http://" + Request.Url.Authority + System.Security.Policy.Url .RouteUrl("Default", new {Controller = "User", Action = "Reset"});
                    ContentPage model = new ContentPage
                    {
                        Title = "Successful Login!",
                        Body = "Logged in as " + user.UserName,
                        Link = "http://itotzke.com"
                    };
                    ViewBag.Username = user.UserName;
                    if (Request.IsAjaxRequest())
                    {
                        return PartialView("UserMenu");
                    }
                    else
                    {
                        string dataStr = "Login Successful";

                        ContentPage contentModel = new ContentPage
                        {
                            Title = "Welcome to iTotzke!",
                            Body = dataStr,
                            Link = "http://itotzke.com"
                        };
                        return RedirectToAction("Default", "Home", contentModel);
                    }
                }
                else
                {
                    ModelState.AddModelError("", "Login data is incorrect!");
                }
            }
            //return PartialView("UserMenu", user);
            return View(user);
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return PartialView("SimpleLogin");
            //return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        public ActionResult SimpleLogout()
        {
            FormsAuthentication.SignOut();
            return PartialView("SimpleLogin");
            //return RedirectToAction("Index", "Home");
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult Register()
        {
            return View();
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult Reset(string user, string key)
        {
            PasswordReset model = new PasswordReset();
            model.UserName = user;
            model.Key = key;
            return View(model);
        }

        [ReCaptcha]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Reset(PasswordReset model)
        {
            if (!ModelState.IsValid)
            {
                return View("Reset", model);
            }
            else
            {
                try
                {
                    User user = _dynamicDb.RunProcedure<User>("SelectUserByName", new { UserName = model.UserName });
                    string newKey = model.Key;//Security.GenerateResetKey(user.Password, 128);
                    string encyrptedPwd = Security.Sha256Encrypt(model.Password);
                    if (_dynamicDb.ExcuteQuery("ResetPassword", new { userId = user.UserId, key = newKey, newPassword = encyrptedPwd }))
                    {
                        return RedirectToAction("Index", "Home");
                    }
                    return RedirectToAction("Contact", "Home");
                }
                catch (Exception ex)
                {
                    _logger.Add(ex, "Emailer Failed", "User.ResetPassword", model.UserName);
                    return RedirectToAction("Index", "Home");
                }
            }
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult Recover()
        {
            return View();
        }

        [ReCaptcha]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Recover(UserReset model)
        {
            if (!ModelState.IsValid)
            {
                return View("Recover", model);
            }
            else
            {
                try
                {
                    User user = _dynamicDb.RunProcedure<User>("SelectUserByEmail", new { email = model.Email });
                    string newKey = Security.GenerateResetKey(user.Password, 128);
                    if (_dynamicDb.ExcuteQuery("InsertResetKey", new {userId = user.UserId, key = newKey}))
                    {
                        string customlink = Url.RouteUrl("Default", new { Controller = "User", Action = "Reset", user = user.Username, key = newKey }); // "www.iTotzke.com/User/Reset";
                        string body = string.Format("Dear {0}, \n Your password needs to be reset. Reset using the URL below. \n {1} ", user.Username, "http://" + Request.Url.Authority + customlink);
                        Emailer.Send(user.Email, "Password Reset - iTotze", body);
                        return RedirectToAction("Index", "Home");
                    }
                    return RedirectToAction("Index", "Home");
                }
                catch (Exception ex)
                {
                    _logger.Add(ex, "Emailer Failed", "User.ResetPassword", model.Email);
                    return RedirectToAction("Index", "Home"); 
                }
            }
        }        

        [ReCaptcha]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Register(RegisterNewUser model)
        {
            if (!ModelState.IsValid)
            {
                return View("Register", model);
            }
            else
            {
                if (!model.IsValid(model.UserName, model.Password, model.Email, _dynamicDb))
                {
                    ModelState.AddModelError("", "Login data is incorrect! Username and/or E-mail registered already.");
                    return View("Register", model);
                }
            }

            string dataStr = "";
            dataStr += "User: " + model.UserName +"\n";
            dataStr += "Email: " + model.Email + "\n";

            ContentPage contentModel = new ContentPage
            {
                Title = "Welcome to iTotzke!",
                Body = dataStr,
                Link = "http://itotzke.com"
            };
            return RedirectToAction("Default", "Home", contentModel);
        }

    }
}
