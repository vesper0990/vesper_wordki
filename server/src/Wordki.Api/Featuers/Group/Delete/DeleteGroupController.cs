using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Wordki.Api.Featuers.Group.Delete
{
    [Route("group")]
    public class DeleteGroupController : ControllerBase
    {
        public DeleteGroupController(IMediator mediator) : base(mediator) { }

        [HttpDelete("delete/{groupId}")]
        public IActionResult Delete([FromRoute] long groupId) => HandleCommand(new DeleteGroupCommand { GroupId = groupId });
    }
}
