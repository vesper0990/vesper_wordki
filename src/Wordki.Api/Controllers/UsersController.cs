using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Wordki.Api.Framework;
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

        [HttpGet("check/{userName}")]
        public async Task<IActionResult> CheckIfExists(string userName)
        {
            if (string.IsNullOrWhiteSpace(userName))
            {
                throw new ApiException($"Parameter {nameof(userName)} cannot be null.", ErrorCode.NullArgument);
            }
            var isExists = await userService.CheckUserExistingAsync(userName);
            return Json(isExists);
        }

        [HttpGet("login/{userName}/{password}")]
        public async Task<IActionResult> Login(string userName, string password)
        {
            if (string.IsNullOrWhiteSpace(userName) || string.IsNullOrWhiteSpace(password))
            {
                throw new ApiException($"Parameter {nameof(userName)} or {nameof(password)} cannot be null.", ErrorCode.NullArgument);
            }
            var user = await userService.LoginAsync(userName, password);
            return Json(user);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDTO userDto)
        {
            if (userDto == null)
            {
                throw new ApiException($"Parameter {nameof(userDto)} cannot be null.", ErrorCode.NullArgument);
            }
            if (string.IsNullOrWhiteSpace(userDto.Name))
            {
                throw new ApiException($"Parameter {nameof(userDto.Name)} cannot be null", ErrorCode.NullArgument);
            }
            if (await userService.CheckUserExistingAsync(userDto.Name))
            {
                throw new ApiException($"User with name {userDto.Name} already exists", ErrorCode.UserAlreadyExists);
            }
            var user = await userService.RegisterAsync(userDto);
            return Json(user);
        }
    }
}
