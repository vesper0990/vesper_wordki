using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Wordki.Api.Featuers.Card.Update
{
    [Route("card")]
    public class UpdateCardController : ControllerBase
    {
        public UpdateCardController(IMediator mediator) : base(mediator) { }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] UpdateCardCommand command) => await HandleCommand(command);
    }
}
