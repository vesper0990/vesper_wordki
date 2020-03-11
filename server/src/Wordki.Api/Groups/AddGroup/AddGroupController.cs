using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Wordki.Commands.AddGroup;
using Wordki.Utils.Commands;
using Wordki.Utils.HttpContext;

namespace Wordki.Api.Groups.AddGroup
{
    [Route("[controller]")]
    public class AddGroupController : ControllerBase
    {
        private readonly IHttpContextProvider contextProvider;
        private readonly ICommandHandler<AddGroupCommand> commandHandler;

        public AddGroupController(IHttpContextProvider contextProvider,
        ICommandHandler<AddGroupCommand> commandHandler)
        {
            this.contextProvider = contextProvider;
            this.commandHandler = commandHandler;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] AddGroupRequest request)
        {
            var words = request.Words.Select(item =>
            AddGroupCommand.Word.Create(item.Language1, item.Language2, item.Example1, item.Example2, item.Comment));
            var userId = contextProvider.GetUserId();
            var command = AddGroupCommand.Create(userId, request.Name, request.Language1, request.Language2, words);
            await commandHandler.HandleAsync(command);
            return new StatusCodeResult((int)HttpStatusCode.OK);
        }
    }
}