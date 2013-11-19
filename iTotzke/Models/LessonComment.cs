using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace iTotzke.Models
{
    public class LessonComment
    {
        /*
         *  @parentId INT,
	        @userId INT,
	        @lessonId INT,
	        @comment VARCHAR(1024)
         */

        public int LessonId { get; set; }
        [DisplayName("Comment")]
        [Required]
        [StringLength(1024, MinimumLength = 1, ErrorMessage = "1 to 1024 characters")]
        public string CommentText { get; set; }
        [DisplayName("Type")]
        public int CommentTypeId { get; set; }
        public int? ParentId { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; }
          
    }
}