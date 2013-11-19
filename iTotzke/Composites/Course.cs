using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace iTotzke.Composites
{
    public class Course
    {
        /*
         *  [CourseId]   INT           IDENTITY (1, 1) NOT NULL,
            [UserId]     INT           NOT NULL,
            [CourseName] VARCHAR (256) NOT NULL,
            [SubjectId]  INT           NOT NULL,
            [IsPrivate
         */
        public int CourseId { get; set; }
        public string CourseName { get; set; }
        public int UserId { get; set; }
        public int SubjectId { get; set; }
        public bool IsPrivate { get; set; }
    }
}