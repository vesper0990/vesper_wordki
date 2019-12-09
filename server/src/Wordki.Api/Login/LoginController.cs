using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;
using Wordki.Commands.Login;
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
            var command = LoginCommand.Create(request.Name, request.Password);
            await commandHandler.HandleAsync(command);
            return new StatusCodeResult((int)HttpStatusCode.OK);
        }

    }

    public class LoginRequest
    {
        public string Name { get; set; }
        public string Password { get; set; }
    }
}
