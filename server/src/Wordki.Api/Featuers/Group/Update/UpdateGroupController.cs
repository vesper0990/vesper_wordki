using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Wordki.Api.Featuers.Group.Update
{
    [Route("group")]
    public class UpdateGroupController : ControllerBase
    {
        public UpdateGroupController(IMediator mediator) : base(mediator) { }

        [HttpPut("update")]
        public IActionResult Update([FromBody] UpdateGroupCommand request) => HandleCommand(request);
    }
}
