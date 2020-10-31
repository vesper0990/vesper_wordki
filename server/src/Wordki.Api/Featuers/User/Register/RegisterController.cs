using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Wordki.Api.Featuers.User.Register
{
    public class RegisterController : UserController
    {
        public RegisterController(IMediator mediator) : base(mediator) { }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterCommand command) => await HandleCommand(command);
    }
}
