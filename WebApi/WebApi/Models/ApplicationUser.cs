using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class ApplicationUser:IdentityUser
    {
        [Column(TypeName = "nvarchar(150)")]
        public string FullName { get; set; }


        public DateTime RegistrationDate { get; set; }


        public DateTime LastLoginDate { get; set; }

        [Required]
        public bool IsBlocked { get; set; }

    }
}
