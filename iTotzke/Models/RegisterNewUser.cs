using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using itotzke.Database;
using iTotzke.Utilites;

namespace iTotzke.Models
{
    public class RegisterNewUser
    {
        [Required]
        [StringLength(64, MinimumLength = 4,ErrorMessage = "4 to 64 characters")]
        [RegularExpression(@"^[a-zA-Z0-9_]+([-.][a-zA-Z0-9_]+)*$", ErrorMessage = "Numbers, letters, and underscores only.")]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(64, ErrorMessage = "Must be between 6 and 64 characters", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm Password is required")]
        [StringLength(64, ErrorMessage = "Must be between 6 and 64 characters", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }


        [RegularExpression(@"^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$", ErrorMessage = "The E-mail must be valid. Example: User@domain.com")]
        [Display(Name = "E-mail")]
        public string Email { get; set; }

        
        public bool Recaptcha { get; set; }

        public bool IsValid(string username, string password, string email, DynamicDb db)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(password);
            SHA256Managed hashstring = new SHA256Managed();
            byte[] hash = hashstring.ComputeHash(bytes);
            string hashString = string.Empty;
            foreach (byte x in hash)
            {
                hashString += String.Format("{0:x2}", x);
            }
            try
            {
                var user = db.RunProcedure<Composites.User>("InsertUser", new { username = username, password = hashString, email = email, userdata = "" });

                return user != null;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}