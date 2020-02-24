using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;
using Wordki.Commands.AddWord;
using Wordki.Utils.Commands;

namespace Wordki.Api.Words.AddWord
{
    [Route("[controller]")]
    public class AddWordController : ControllerBase
    {
        private readonly ICommandHandler<AddWordCommand> commandHandler;

        public AddWordController(ICommandHandler<AddWordCommand> commandHandler)
        {
            this.commandHandler = commandHandler;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] AddWordRequest request)
        {
            var command = AddWordCommand.Create(request.GroupId, request.Language1, request.Language2);
            await commandHandler.HandleAsync(command);
            return new StatusCodeResult((int)HttpStatusCode.OK);
        }
    }
}
