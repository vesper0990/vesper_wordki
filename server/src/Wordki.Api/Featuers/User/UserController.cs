using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Wordki.Api.Featuers.User.Login;
using Wordki.Api.Featuers.User.Register;

namespace Wordki.Api.Featuers.User
{
    [Route("user")]
    public class UserController : ControllerBase
    {
        public UserController(IMediator mediator) : base(mediator) { }

        [HttpPut("login")]
        public async Task<IActionResult> Login([FromBody] LoginCommnad command) => await HandleCommand(command);

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterCommand command) => await HandleCommand(command);
    }
}
