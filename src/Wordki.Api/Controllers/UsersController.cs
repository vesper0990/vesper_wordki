using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Wordki.Infrastructure.DTO;
using Wordki.Infrastructure.Services;

namespace Wordki.Api.Controllers
{
    [Route("[controller]")]
    public class UserController : Controller
    {

        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet("login/{userName}/{password}")]
        public async Task<IActionResult> Login(string userName, string password)
        {
            if (string.IsNullOrWhiteSpace(userName) || string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentException("Invalid credential");
            }
            var user = await userService.LoginAsync(userName, password);
            return Json(user);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDTO userDto)
        {
            if (userDto == null)
            {
                throw new ArgumentNullException(nameof(userDto));
            }
            if (await userService.CheckUserExistingAsync(userDto.Name))
            {
                throw new ArgumentException("User exists");
            }
            var user = await userService.RegisterAsync(userDto);
            return Json(user);
        }
    }
}
