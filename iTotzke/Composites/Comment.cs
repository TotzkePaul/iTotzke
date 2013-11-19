using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace iTotzke.Composites
{
    public class Comment
    {
        public int CommentId { get; set; }
        public int? ParentId { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; }
        public int CommentTypeId { get; set; }
        public int Vote { get; set; }
        public string CommentText { get; set; }
        public List<Comment> ChildComments { get; set; }

        public static List<Comment> CreateTree(List<Comment> list)
        {
            foreach (Comment comment in list)
            {
                comment.ChildComments =
                  list.Where(c => c.ParentId == comment.CommentId).ToList();
            }
            return list.Where(c => c.ParentId == 0).ToList();
        }

        /**
         *  1	Question
            2	Comment
            3	Review
         */
        public static List<Object> CommentTypeList = new List<Object>
        {
            new {value = 2, text = "Comment"},
            new {value = 1, text = "Question"},
            new {value = 3, text = "Review"}
        };
    }
}