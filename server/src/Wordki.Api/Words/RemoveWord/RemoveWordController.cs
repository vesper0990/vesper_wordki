using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Wordki.Commands.RemoveWord;
using Wordki.Utils.Commands;

namespace Wordki.Api.Words
{
    [Route("[controller]")]
    public class RemoveWordController : ControllerBase
    {
        private readonly ICommandHandler<RemoveWordCommand> commandHandler;

        public RemoveWordController(ICommandHandler<RemoveWordCommand> commandHandler)
        {
            this.commandHandler = commandHandler;
        }

        [HttpDelete("{groupId}/{wordId}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] RemoveWordRequest request)
        {
            var command = RemoveWordCommand.Create(request.GroupId, request.WordId);
            await commandHandler.HandleAsync(command);
            return new StatusCodeResult((int)HttpStatusCode.OK);
        }

    }
}