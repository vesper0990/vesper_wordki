using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Wordki.Api.Featuers.Group.Add
{
    [Route("group")]
    public class AddGroupController : ControllerBase
    {
        public AddGroupController(IMediator mediator): base(mediator) { }

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] AddGroupCommand command) => await HandleCommand(command);
    }
}
