using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace iTotzke.Composites
{
    public class Lesson
    {
        /*
         *  LessonId ,
	        Courses.CourseId ,
			CourseName,
			SubjectId,
	        Lessons.UserId ,
	        LessonName ,
	        Link  AS LinkText,
			LinkTypeName,
			LinkTypeHtml,
	        LessonText
         */
        public int LessonId { get; set; }
        public int CourseId { get; set; }
        public int UserId { get; set; }
        public string LessonName { get; set; }
        public string Link { get; set; }
        public int LinkTypeId { get; set; }
        public string LinkTypeName { get; set; }
        public string CourseName { get; set; } 
        public int SubjectId { get; set; }
        public string SectionName { get; set; }
        public string LinkTypeHtml { get; set; } 
        public string LessonText { get; set; }
    }
}