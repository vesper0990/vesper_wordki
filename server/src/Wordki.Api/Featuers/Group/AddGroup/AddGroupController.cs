using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Wordki.Api.Featuers.Group.AddGroup
{
    [Route("addGroup")]
    public class AddGroupController : ControllerBase
    {
        public AddGroupController(IMediator mediator): base(mediator) { }

        [HttpPost]
        public IActionResult Add([FromBody] AddGroupCommand command) => HandleCommand(command);
    }
}
