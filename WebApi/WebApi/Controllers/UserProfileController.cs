using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly AuthenticationContext context;

        public UserProfileController(UserManager<ApplicationUser> userManager, AuthenticationContext context)
        {
            this.userManager = userManager;
            this.context = context;
        }


        [HttpGet]
        [Authorize]
        //GET : /api/UserProfile
        public async Task<object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await userManager.FindByIdAsync(userId);
            return new
            {
                user.FullName,
                user.Email,
                user.UserName
            };
        }


        [HttpGet]
        [Route("User")]
        //GET : /api/User
        public async Task<IEnumerable<object>> GetUser()
        {
            var user = await context.ApplicationUsers
                .Select(x => new  { id = x.Id, username = x.UserName, email = x.Email, regdate = x.RegistrationDate
                , logdate = x.LastLoginDate, status = x.IsBlocked})
                .ToListAsync();
            return user;
        }

    }

}