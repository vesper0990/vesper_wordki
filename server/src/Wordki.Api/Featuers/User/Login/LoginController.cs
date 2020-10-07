using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Wordki.Api.Featuers.User.Login
{
    [Route("user")]
    public class LoginController : ControllerBase
    {
        public LoginController(IMediator mediator) : base(mediator) { }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginCommnad request) => await HandleCommand(request);
    }
}
