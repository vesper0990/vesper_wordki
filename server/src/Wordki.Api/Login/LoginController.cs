using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;
using Wordki.Commands.Login;
using Wordki.Infrastructure.Framework.ExceptionMiddleware;
using Wordki.Utils.Commands;

namespace Wordki.Api.Login
{
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ICommandHandler<LoginCommand> commandHandler;

        public LoginController(ICommandHandler<LoginCommand> commandHandler)
        {
            this.commandHandler = commandHandler;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (request == null)
            {
                throw new ApiException("Request is null", ErrorCode.EmptyRequest);
            }
            var command = LoginCommand.Create(request.UserName, request.Password);
            await commandHandler.HandleAsync(command);
            return new StatusCodeResult((int)HttpStatusCode.OK);
        }

    }

    public class LoginRequest
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
