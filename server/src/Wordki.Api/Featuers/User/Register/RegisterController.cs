using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Wordki.Api.Featuers.User.Register
{
    [Route("register")]
    public class RegisterController : ControllerBase
    {
        public RegisterController(IMediator mediator) : base(mediator) { }

        [HttpPost()]
        public IActionResult Register(RegisterCommand command) => HandleCommand(command);
    }
}
