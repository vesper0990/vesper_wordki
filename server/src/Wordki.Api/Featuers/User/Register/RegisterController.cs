using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Wordki.Api.Featuers.User.Register
{
    [Route("user")]
    public class RegisterController : ControllerBase
    {
        public RegisterController(IMediator mediator) : base(mediator) { }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterCommand command) => HandleCommand(command);
    }
}
