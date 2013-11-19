using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace iTotzke.Models
{
    public class PasswordReset
    {
        [Required]
        [StringLength(64, MinimumLength = 4, ErrorMessage = "4 to 64 characters")]
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

        [StringLength(128)]
        public string Key { get; set; }

        public bool Recaptcha { get; set; }
    }
}