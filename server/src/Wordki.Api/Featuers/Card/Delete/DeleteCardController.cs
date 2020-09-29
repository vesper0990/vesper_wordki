using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Wordki.Api.Featuers.Card.Delete
{
    [Route("card")]
    public class DeleteCardController : ControllerBase
    {
        public DeleteCardController(IMediator mediator) : base(mediator) { }

        [HttpDelete("delete/{cardId}")]
        public IActionResult Delete([FromRoute] long cardId) => HandleCommand(new DeleteCardComamnd { Id = cardId });
    }
}
