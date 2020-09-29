using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Wordki.Api.Featuers.Group.Add
{
    [Route("group")]
    public class AddGroupController : ControllerBase
    {
        public AddGroupController(IMediator mediator): base(mediator) { }

        [HttpPost("add")]
        public IActionResult Add([FromBody] AddGroupCommand command) => HandleCommand(command);
    }
}
