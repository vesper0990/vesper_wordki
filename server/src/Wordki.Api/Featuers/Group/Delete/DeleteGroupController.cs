using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Wordki.Api.Featuers.Group.Delete
{
    [Route("group")]
    public class DeleteGroupController : ControllerBase
    {
        public DeleteGroupController(IMediator mediator) : base(mediator) { }

        [HttpDelete("delete/{groupId}")]
        public async Task<IActionResult> Delete([FromRoute] long groupId) => await HandleCommand(new DeleteGroupCommand { GroupId = groupId });
    }
}
