using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Wordki.Api.Featuers.Group.Add;
using Wordki.Api.Featuers.Group.Delete;
using Wordki.Api.Featuers.Group.GetCount;
using Wordki.Api.Featuers.Group.Update;

namespace Wordki.Api.Featuers.Group
{
    [Route("group")]
    public class GroupController : ControllerBase
    {
        public GroupController(IMediator mediator) : base(mediator) { }

        [HttpGet("count")]
        public async Task<IActionResult> GetCount() => await HandlerQuery(new GetCountQuery());


        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] AddGroupCommand command) => await HandleCommand(command);

        [HttpDelete("delete/{groupId}")]
        public async Task<IActionResult> Delete([FromRoute] long groupId) => await HandleCommand(new DeleteGroupCommand { GroupId = groupId });

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] UpdateGroupCommand request) => await HandleCommand(request);
    }
}
