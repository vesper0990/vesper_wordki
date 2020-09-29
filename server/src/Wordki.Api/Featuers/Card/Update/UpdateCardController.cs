using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Wordki.Api.Featuers.Card.Update
{
    [Route("card")]
    public class UpdateCardController : ControllerBase
    {
        public UpdateCardController(IMediator mediator) : base(mediator) { }

        [HttpPut("update")]
        public IActionResult Update([FromBody] UpdateCardCommand command) => HandleCommand(command);
    }
}
