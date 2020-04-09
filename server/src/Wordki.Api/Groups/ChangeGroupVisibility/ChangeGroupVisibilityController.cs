using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Wordki.Commands.ChangeGroupVisibility;
using Wordki.Utils.Commands;

namespace Wordki.Api.Groups.ChangeGroupVisibility
{
    [Route("[controller]")]
    public class ChangeGroupVisibilityController : ControllerBase
    {
        private readonly ICommandHandler<ChangeGroupVisibilityCommand> commandHandler;

        public ChangeGroupVisibilityController(ICommandHandler<ChangeGroupVisibilityCommand> commandHandler)
        {
            this.commandHandler = commandHandler;
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromBody] LearnGroupRequest request)
        {
            var command = ChangeGroupVisibilityCommand.Create(request.Id, request.IsAddedToLessons);
            await commandHandler.HandleAsync(command);
            return new StatusCodeResult((int)HttpStatusCode.OK);
        }

    }

    public class LearnGroupRequest
    {
        public long Id { get; set; }
        public bool? IsAddedToLessons { get; set; }
    }
}
