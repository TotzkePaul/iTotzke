using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace iTotzke.Models
{
    public class EditCourse
    {

        [Required]
        public int CourseId { get; set; }

        [Required]
        [StringLength(64, MinimumLength = 4, ErrorMessage = "4 to 64 characters")]
        [RegularExpression(@"^[a-zA-Z0-9_]+([-. ][a-zA-Z0-9_]+)*$", ErrorMessage = "Numbers, letters, and underscores only.")]
        public string CourseName { get; set; }

        [Required]
        public int CreatorId { get; set; }

        [Required]
        public int SubjectId { get; set; }

        public bool IsPrivate { get; set; }
    }
}