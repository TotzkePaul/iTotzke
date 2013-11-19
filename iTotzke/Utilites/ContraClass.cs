using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using System.Web.Mvc;

namespace iTotzke.Utilites
{
    public class ContraClass
    {
        public static List<Object> SubjectList = new List<Object>
        {
            new {value = 0, text = "Computer Science"},
            new {value = 1, text = "Mathematics"},
            new {value = 2, text = "Biology"},
            new {value = 3, text = "Humanities"},
            new {value = 4, text = "Social Sciences"},
            new {value = 5, text = "Music, Film, and Audio"},
            new {value = 6, text = "Economics & Finance"},
            new {value = 7, text = "Physics"},
            new {value = 8, text = "Foreign Language"},
            new {value = 9, text = "Social Justice"},
            new {value = 10, text = "Education"},
            new {value = 11, text = "Physical Science"},
            new {value = 12, text = "Art, Fashion, & Hobbies"},
            new {value = 14, text = "Business & Management"},
            new {value = 15, text = "Sports, Games, & Outdoors"},
            new {value = 16, text = "Health & Fitness"},
            new {value = 17, text = "Home, Pets, & Garden"},
            new {value = 18, text = "Vocational"},
            new {value = 14, text = "Volunteerism & Activism"},
            new {value = 13, text = "Random"}
        };

        public static string GetSubjectNameById(int id)
        {
            var select = new SelectList(
                SubjectList,
                "value",
                "text",
                0);
            return select.First(x => Convert.ToInt32(x.Value) == id).Text;
        }
    }
}