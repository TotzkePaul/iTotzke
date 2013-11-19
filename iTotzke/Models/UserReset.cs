using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace iTotzke.Models
{
    public class UserReset
    {
        [RegularExpression(@"^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$", ErrorMessage = "The E-mail must be valid. Example: User@domain.com")]
        [Display(Name = "E-mail")]
        public string Email { get; set; }


        public bool Recaptcha { get; set; }
    }
}