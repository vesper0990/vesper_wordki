using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Wordki.Api.Featuers.Group.Update
{
    [Route("group")]
    public class UpdateGroupController : ControllerBase
    {
        public UpdateGroupController(IMediator mediator) : base(mediator) { }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] UpdateGroupCommand request) => await HandleCommand(request);
    }
}
