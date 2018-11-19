using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;
using Wordki.Infrastructure.DTO;
using Wordki.Infrastructure.Services;

namespace Wordki.Api.Controllers
{
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService userService;
        private readonly IAuthorizer authorizer;
        private readonly IAuthenticator<string> authenticator;

        public UserController(IUserService userService, IAuthorizer authorizer, IAuthenticator<string> authenticator)
        {
            this.userService = userService;
            this.authorizer = authorizer;
            this.authenticator = authenticator;
        }

        [HttpGet("check/{userName}")]
        public async Task<IActionResult> CheckIfExists(string userName)
        {
            if (string.IsNullOrWhiteSpace(userName))
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    new ExceptionMessage(ErrorCode.NullArgumentException, $"Parameter {nameof(userName)} cannot be null."));
            }
            var isExists = await userService.CheckUserExistingAsync(userName);
            return Json(isExists);
        }

        [HttpGet("login/{userName}/{password}")]
        public async Task<IActionResult> Login(string userName, string password)
        {
            if (string.IsNullOrWhiteSpace(userName) || string.IsNullOrWhiteSpace(password))
            {
                return StatusCode((int)HttpStatusCode.BadRequest,
                    new ExceptionMessage(ErrorCode.NullArgumentException, $"Parameter {nameof(userName)} or {nameof(password)} cannot be null."));
            }
            var user = await userService.LoginAsync(userName, password);
            if (user == null)
            {
                return StatusCode((int)HttpStatusCode.Unauthorized,
                    new ExceptionMessage(ErrorCode.AuthenticaitonException, $"User not found"));
            }
            return Json(user);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDTO userDto)
        {
            if (userDto == null)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ExceptionMessage(ErrorCode.NullArgumentException, $"Parameter {nameof(userDto)} cannot be null."));
            }
            if (string.IsNullOrWhiteSpace(userDto.Name) || string.IsNullOrWhiteSpace(userDto.Password))
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ExceptionMessage(ErrorCode.NullArgumentException, $"Parameter {nameof(userDto.Name)} cannot be null"));
            }
            if (await userService.CheckUserExistingAsync(userDto.Name))
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ExceptionMessage(ErrorCode.UserAlreadyExistsException, $"User with name {userDto.Name} already exists"));
            }
            await userService.RegisterAsync(userDto);
            return Ok();
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] UserDTO userDto)
        {
            if (userDto == null)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ExceptionMessage(ErrorCode.NullArgumentException, $"Parameter {nameof(userDto)} cannot be null."));
            }
            if (string.IsNullOrWhiteSpace(userDto.Name) || string.IsNullOrWhiteSpace(userDto.Password))
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ExceptionMessage(ErrorCode.NullArgumentException, $"Parameter {nameof(userDto.Name)} cannot be null"));
            }
            long userId = await authorizer.AuthorizeAsync(Request);
            userDto.Id = userId;
            await userService.UpdateAsync(userDto);
            return Ok();
        }
    }
}
