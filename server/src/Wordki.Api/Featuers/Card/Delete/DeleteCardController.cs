using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Wordki.Api.Featuers.Card.Delete
{
    [Route("card")]
    public class DeleteCardController : ControllerBase
    {
        public DeleteCardController(IMediator mediator) : base(mediator) { }

        [HttpDelete("delete/{cardId}")]
        public async Task<IActionResult> Delete([FromRoute] long cardId) => await HandleCommand(new DeleteCardComamnd { Id = cardId });
    }
}
