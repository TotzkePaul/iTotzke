using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using System.Web.UI;
using iTotzke.Composites;
using itotzke.Database;
using iTotzke.Models;
using iTotzke.Utilites;
using User = iTotzke.Composites.User;

namespace iTotzke.Controllers
{
    [HandleError]
    public class AppsController : Controller
    {
        private readonly DynamicDb db;
        private Logger logger;
        public AppsController()
        {
            this.db = new DynamicDb();
            this.logger = new Logger();
        }
        //
        // GET: /Apps/

        [HttpGet]
        public ActionResult SubmitComment()
        {
            return View();
        }


        [HttpPost]
        public ActionResult SubmitComment(LessonComment model)
        {
            if (ModelState.IsValid)
            {
               
                string username = User.Identity.Name;
                User user;
                try
                {
                     user = db.RunProcedure<User>("SelectUserByName", new { UserName = username });
                }
                catch(Exception ex)
                {
                    ModelState.AddModelError("", "Please Login to submit comment.");
                    if (Request.IsAjaxRequest())
                    {
                        return PartialView(model);
                    }
                    else
                    {
                        return View(model);
                    }
                    
                }
                

                db.RunProcedure<Comment>("InsertComment", new { commentTypeId = model.CommentTypeId, LessonId = model.LessonId, UserId = user.UserId, ParentId = model.ParentId, CommentText = model.CommentText });

                
                if (Request.IsAjaxRequest())
                {
                    try
                    {
                        model.ParentId = null;
                        model.CommentText = "";
                        
                        List<Comment> comments = db.RunListProcedure<Comment>("[SelectLessonCommentsById]", new { lessonId = model.LessonId });
                        ViewBag.comments = Comment.CreateTree(comments); ;
                        ViewBag.lessonId = model.LessonId;
                        return PartialView("Comments", model);
                    }
                    catch (Exception ex)
                    {

                        return Content(ex.StackTrace);
                    }
                    
                    //return 
                }
                else
                {
                    ContentPage contentModel = new ContentPage
                    {
                        Title = "Welcome to iTotzke!",
                        Body = "Post Sucessful.",
                        Link = "http://itotzke.com"
                    };
                    return RedirectToAction("Default", "Home", contentModel);
                }
            }
            if (Request.IsAjaxRequest())
            {
                return PartialView(model);
            }
            return View(model);
        }


        public ActionResult Index()
        {
            return View();
        }

        public ActionResult LiveEssay()
        {
            return View();
        }

        public ActionResult Polyglot()
        {
            return View();
        }

        public ActionResult Language()
        {
            int id = Convert.ToInt32(this.ControllerContext.RouteData.Values["id"]);
            

            Language language = db.RunListProcedure<Language>("SelectLanguageById", new { languageId = id }).First();
            Lesson lesson = db.RunProcedure<Lesson>("SelectLessonById", new { lessonId = id });
            ViewBag.AllLessons = db.RunListProcedure<Lesson>("SelectAllLessonsByCourseId", new { courseId = id });
            // finish me
            return View();
        }

        [Authorize(Users="totzke")]
        public ActionResult TileAssembly()
        {
            return View();
        }

        public ActionResult Monotone()
        {
            return View();
        }

        public ActionResult Arcuus()
        {
            return View();
        }

        public ActionResult ContraClass()
        {
            ViewBag.AllCourses = db.RunListProcedure<Course>("SelectAllCourses", new { });
            return View();
        }

        [HttpGet]
        public ActionResult EditCourse()
        {
            int id = Convert.ToInt32(this.ControllerContext.RouteData.Values["id"]);

            return View();
        }

        [HttpPost]
        public ActionResult EditCourse(EditCourse model)
        {
            if (!ModelState.IsValid)
            {
                return View("EditCourse", model);
            }
            else
            {
                string username = User.Identity.Name;
                User user;
                try
                {
                    user = db.RunProcedure<User>("SelectUserByName", new { UserName = username });
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", "Please Login to submit comment.");
                    if (Request.IsAjaxRequest())
                    {
                        return PartialView(model);
                    }
                    else
                    {
                        return View(model);
                    }

                }
                Course course = db.RunListProcedure<Course>("EditCourse", new
                {
                    courseId = model.CourseId,
                    userId = user.UserId,
                    courseName = model.CourseName,
                    subjectId = model.SubjectId,
                    isPrivate = model.IsPrivate
                }).First();
                return RedirectToAction("Course", "Apps", new { id = course.CourseId });
            }
            return View();
        }

        [HttpGet]
        public ActionResult CreateCourse()
        {
            ViewBag.SubjectId = Convert.ToInt32(this.ControllerContext.RouteData.Values["id"]);
            return View();
        }

        [HttpPost]
        public ActionResult CreateCourse(CreateCourse model)
        {
            if (!ModelState.IsValid)
            {
                return View("CreateCourse", model);
            }
            else
            {
                string username = User.Identity.Name;
                User user;
                try
                {
                    user = db.RunProcedure<User>("SelectUserByName", new { UserName = username });
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", "Please Login to submit Course.");
                    if (Request.IsAjaxRequest())
                    {
                        return PartialView(model);
                    }
                    else
                    {
                        return View(model);
                    }

                }
                Course course = db.RunListProcedure<Course>("InsertCourse", new
                {
                    userId = user.UserId,
                    courseName = model.CourseName,
                    subjectId = model.SubjectId,
                    isPrivate = model.IsPrivate
                }).First();
                return RedirectToAction("Course", "Apps", new { id = course.CourseId });
            }
            return View();
        }

        public ActionResult Lesson()
        {
            int id = Convert.ToInt32(this.ControllerContext.RouteData.Values["id"]);
            Lesson lesson = db.RunListProcedure<Lesson>("SelectLessonById", new { lessonId = id }).First();
            List<Comment> comments = db.RunListProcedure<Comment>("[SelectLessonCommentsById]", new {lessonId = id});

            string url = lesson.Link ?? "http://www.youtube.com/watch?v=dQw4w9WgXcQ"; //url goes here!

            Regex vimeoVideoRegex = new Regex(@"vimeo\.com/(?:.*#|.*/videos/)?([0-9]+)", RegexOptions.IgnoreCase | RegexOptions.Multiline);
            Regex youtubeVideoRegex = new Regex(@"youtu(?:\.be|be\.com)/(?:(.*)v(/|=)|(.*/)?)([a-zA-Z0-9-_]+)", RegexOptions.IgnoreCase);
            Match youtubeMatch = youtubeVideoRegex.Match(url);
            Match vimeoMatch = vimeoVideoRegex.Match(url);

            string videoId = string.Empty;

            if (youtubeMatch.Success)
                videoId = youtubeMatch.Groups[4].Value;

            else if (vimeoMatch.Success)
                videoId = vimeoMatch.Groups[1].Value;
            else
                videoId = Regex.Replace(url, "^(https?)://", ""); 
            ViewBag.videoId = videoId;
            ViewBag.lesson = lesson;
            ViewBag.lessonId = id;

            ViewBag.comments = Comment.CreateTree(comments);
            return View();
        }

        
        public ActionResult Course()
        {
            int id =  Convert.ToInt32(this.ControllerContext.RouteData.Values["id"]);
            Course course = db.RunProcedure<Course>("SelectCourseById",new {courseId=id});
            ViewBag.AllLessons = db.RunListProcedure<Lesson>("SelectAllLessonsByCourseId", new {courseId = id });
            ViewBag.course = course;
            return View();
        }

        public ActionResult Subject()
        {
            int id = Convert.ToInt32(this.ControllerContext.RouteData.Values["id"]);
            ViewBag.SubjectId = id;
            List<Course> courses = db.RunListProcedure<Course>("[SelectAllCoursesBySubjectId]", new { SubjectId = id });
            ViewBag.AllCourses = courses;
            return View();
        }

        [HttpGet]
        public ActionResult EditLesson()
        {
            int id = Convert.ToInt32(this.ControllerContext.RouteData.Values["id"]);
            ViewBag.courseId = id;
            Lesson lesson = db.RunListProcedure<Lesson>("SelectLessonById", new { lessonId = id }).First();
            List<LinkType> linkTypes = db.RunListProcedure<LinkType>("[SelectAllLinkTypes]", new { });
            linkTypes.Add(new LinkType(){LinkTypeId = 0, LinkTypeName = ""});
            int linktypeId = linkTypes.First(x => x.LinkTypeId == lesson.LinkTypeId).LinkTypeId;
            
            EditLesson model = new EditLesson()
            {
                CourseId = lesson.CourseId,
                LessonId = lesson.LessonId,
                LessonName = lesson.LessonName,
                LessonText = lesson.LessonText,
                Link = lesson.Link,
                LinkTypeId = linktypeId,
                SectionName = lesson.SectionName
            };
            ViewBag.LinkTypes = linkTypes;

            return View(model);
        }

        [HttpGet]
        public ActionResult CreateLesson()
        {


            int id = Convert.ToInt32(this.ControllerContext.RouteData.Values["id"]);
            ViewBag.courseId = id;
            CreateLesson model = new CreateLesson() { CourseId = id };
            ViewBag.LinkTypes = db.RunListProcedure<LinkType>("[SelectAllLinkTypes]", new { });

            return View(model);
        }

        [HttpPost]
        public ActionResult EditLesson(EditLesson model)
        {
            ViewBag.LinkTypes = db.RunListProcedure<LinkType>("[SelectAllLinkTypes]", new { });
            if (!ModelState.IsValid)
            {
                return View("EditLesson", model);
            }
            else
            {
                string username = User.Identity.Name;
                User user;
                try
                {
                    user = db.RunProcedure<User>("SelectUserByName", new { UserName = username });
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", "Please Login to submit Course.");
                    if (Request.IsAjaxRequest())
                    {
                        return PartialView(model);
                    }
                    else
                    {
                        return View(model);
                    }

                }
                Lesson lesson = db.RunListProcedure<Lesson>("UpdateLesson", new
                {
                    lessonId = Convert.ToInt32(this.ControllerContext.RouteData.Values["id"]),
                    courseId = model.CourseId,
                    userId = user.UserId,
                    lessonName = model.LessonName,
                    link = model.Link,
                    lessonText = model.LessonText??"",
                    LinkTypeId = model.LinkTypeId,
                    SectionName = !string.IsNullOrEmpty(model.SectionName) ? model.SectionName : null
                }).First();

                return RedirectToAction("Lesson", "Apps", new { id = Convert.ToInt32(this.ControllerContext.RouteData.Values["id"]) });
            }
        }

        [HttpPost]
        public ActionResult CreateLesson(CreateLesson model)
        {
            ViewBag.LinkTypes = db.RunListProcedure<LinkType>("[SelectAllLinkTypes]", new { });
            if (!ModelState.IsValid)
            {
                return View("CreateLesson", model);
            }
            else
            {
                string username = User.Identity.Name;
                User user;
                try
                {
                    user = db.RunProcedure<User>("SelectUserByName", new { UserName = username });
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", "Please Login to submit Course.");
                    if (Request.IsAjaxRequest())
                    {
                        return PartialView(model);
                    }
                    else
                    {
                        return View(model);
                    }

                }
                Lesson lesson = db.RunListProcedure<Lesson>("InsertLesson", new
                {
                    courseId = model.CourseId,
                    userId = user.UserId,
                    lessonName = model.LessonName,
                    link = model.Link,
                    lessonText = model.LessonText??"",
                    LinkTypeId = model.LinkTypeId,
                    SectionName = !string.IsNullOrEmpty(model.SectionName) ? model.SectionName : null
                }).First();
                return RedirectToAction("Lesson", "Apps", new {id = lesson.LessonId});
            }
        }
    }
}
