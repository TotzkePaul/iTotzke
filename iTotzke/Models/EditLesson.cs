using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using iTotzke.Composites;

namespace iTotzke.Models
{
    public class EditLesson
    {
        public int LessonId { get; set; }
        public int CourseId { get; set; }
        public string LessonName { get; set; }
        public string Link { get; set; }
        public string LessonText { get; set; }
        public int LinkTypeId { get; set; }
        public string SectionName { get; set; }
    }
}