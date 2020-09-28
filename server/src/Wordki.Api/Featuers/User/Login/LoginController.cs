using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Wordki.Api.Featuers.User.Login
{
    [Route("login")]
    public class LoginController : ControllerBase
    {
        public LoginController(IMediator mediator) : base(mediator) { }

        [HttpPost()]
        public IActionResult Login([FromBody] LoginCommnad request) => HandleCommand(request);
    }
}
