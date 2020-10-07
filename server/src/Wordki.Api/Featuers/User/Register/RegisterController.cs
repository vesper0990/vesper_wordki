using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Wordki.Api.Featuers.User.Register
{
    [Route("user")]
    public class RegisterController : ControllerBase
    {
        public RegisterController(IMediator mediator) : base(mediator) { }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterCommand command) => await HandleCommand(command);
    }
}
