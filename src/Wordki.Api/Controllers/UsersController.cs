using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Wordki.Infrastructure;
using Wordki.Infrastructure.DTO;
using Wordki.Infrastructure.Services;

namespace Wordki.Api.Controllers
{
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService userService;
        private readonly IAuthorizer authorizer;

        public UserController(IUserService userService, IAuthorizer authorizer)
        {
            this.userService = userService;
            this.authorizer = authorizer;
        }

        [HttpGet("check/{userName}")]
        public async Task<IActionResult> CheckIfExists(string userName)
        {
            if (string.IsNullOrWhiteSpace(userName))
            {
                throw new ApiException($"Parameter {nameof(userName)} cannot be null.", ErrorCode.NullArgumentException);
            }
            var isExists = await userService.CheckUserExistingAsync(userName);
            return Json(isExists);
        }

        [HttpGet("login/{userName}/{password}")]
        public async Task<IActionResult> Login(string userName, string password)
        {
            if (string.IsNullOrWhiteSpace(userName) || string.IsNullOrWhiteSpace(password))
            {
                throw new ApiException($"Parameter {nameof(userName)} or {nameof(password)} cannot be null.", ErrorCode.NullArgumentException);
            }
            var user = await userService.LoginAsync(userName, password);
            return Json(user);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDTO userDto)
        {
            if (userDto == null)
            {
                throw new ApiException($"Parameter {nameof(userDto)} cannot be null.", ErrorCode.NullArgumentException);
            }
            if (string.IsNullOrWhiteSpace(userDto.Name) || string.IsNullOrWhiteSpace(userDto.Password))
            {
                throw new ApiException($"Parameter {nameof(userDto.Name)} cannot be null", ErrorCode.NullArgumentException);
            }
            if (await userService.CheckUserExistingAsync(userDto.Name))
            {
                throw new ApiException($"User with name {userDto.Name} already exists", ErrorCode.UserAlreadyExistsException);
            }
            var user = await userService.RegisterAsync(userDto);
            return Json(user);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] UserDTO userDto) {
            if (userDto == null)
            {
                throw new ApiException($"Parameter {nameof(userDto)} cannot be null.", ErrorCode.NullArgumentException);
            }
            if (string.IsNullOrWhiteSpace(userDto.Name) || string.IsNullOrWhiteSpace(userDto.Password))
            {
                throw new ApiException($"Parameter {nameof(userDto.Name)} cannot be null", ErrorCode.NullArgumentException);
            }
            long userId = await authorizer.AuthorizeAsync(Request);
            userDto.Id = userId;
            userDto = await userService.UpdateAsync(userDto);
            return Json(userDto);
        }
    }
}
