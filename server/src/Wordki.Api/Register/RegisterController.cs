using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;
using Wordki.Commands.Register;
using Wordki.Utils;
using Wordki.Utils.Commands;

namespace Wordki.Api.Register
{
    [Route("[controller]")]
    public class RegisterController : ControllerBase
    {
        private readonly ICommandHandler<RegisterCommand> commandHandler;

        public RegisterController(ICommandHandler<RegisterCommand> commandHandler)
        {
            this.commandHandler = commandHandler;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            Condition.True(request.Password.Equals(request.PasswordRepeat), "Password's are not the same");

            var command = RegisterCommand.Create(request.UserName, request.Password);

            await commandHandler.HandleAsync(command);

            return new StatusCodeResult((int)HttpStatusCode.OK);
        }
    }

    public class RegisterRequest
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string PasswordRepeat { get; set; }
    }
}
