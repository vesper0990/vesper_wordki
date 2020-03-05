using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Wordki.Commands.UpdateGroup;
using Wordki.Utils.Commands;

namespace Wordki.Api.Groups.UpdateGroup
{
    [Route("[controller]")]
    public class UpdateGroupController : ControllerBase
    {
        private readonly ICommandHandler<UpdateGroupCommand> commandHandler;

        public UpdateGroupController(ICommandHandler<UpdateGroupCommand> commandHandler)
        {
            this.commandHandler = commandHandler;
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromBody] UpdateGroupRequest request)
        {
            var command = UpdateGroupCommand.Create(request.GroupId, request.GroupName, request.Language1, request.Language2);
            await commandHandler.HandleAsync(command);
            return new StatusCodeResult((int)HttpStatusCode.OK);
        }

    }
}