using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;
using Wordki.Commands.UpdateWord;
using Wordki.Utils.Commands;

namespace Wordki.Api.Words.UpdateWord
{
    [Route("[controller]")]
    public class UpdateWordController : ControllerBase
    {
        private readonly ICommandHandler<UpdateWordCommand> commandHandler;

        public UpdateWordController(ICommandHandler<UpdateWordCommand> commandHandler)
        {
            this.commandHandler = commandHandler;
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromBody] UpdateRequest request)
        {
            var command = UpdateWordCommand.Create(request.GroupId,
                request.WordId,
                request.Langauge1,
                request.Langauge2,
                request.IsVisible);
            await commandHandler.HandleAsync(command);
            return new StatusCodeResult((int)HttpStatusCode.OK);

        }


    }
}
