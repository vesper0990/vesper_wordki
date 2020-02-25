using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;
using Wordki.Commands.AddRepeat;
using Wordki.Utils.Commands;
using Wordki.Utils.HttpContext;

namespace Wordki.Api.AddRepeat
{
    [Route("[controller]")]
    public class AddRepeatController : ControllerBase
    {
        private readonly ICommandHandler<AddRepeatCommand> commandHandler;
        private readonly IHttpContextProvider contextProvider;

        public AddRepeatController(ICommandHandler<AddRepeatCommand> commandHandler, IHttpContextProvider contextProvider)
        {
            this.commandHandler = commandHandler;
            this.contextProvider = contextProvider;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] AddRepeatRequest request)
        {
            var userId = contextProvider.GetUserId();
            var command = AddRepeatCommand.Create(request.WordId, userId, request.Result);
            await commandHandler.HandleAsync(command);
            return StatusCode((int)HttpStatusCode.OK);
        }

    }
}
