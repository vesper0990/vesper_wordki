using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;
using Wordki.Commands.Register;
using Wordki.Infrastructure.Framework.ExceptionMiddleware;
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
            if (request == null)
            {
                throw new ApiException("Request is null", ErrorCode.EmptyRequest);
            }

            var command = RegisterCommand.Create(request.UserName, request.Password, request.PasswordConfirmation);

            await commandHandler.HandleAsync(command);

            return new StatusCodeResult((int)HttpStatusCode.OK);
        }
    }

    public class RegisterRequest
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string PasswordConfirmation { get; set; }
    }
}
