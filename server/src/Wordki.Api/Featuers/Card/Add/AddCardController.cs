using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Wordki.Api.Featuers.Card.Add
{
    [Route("card")]
    public class AddCardController : ControllerBase
    {
        public AddCardController(IMediator mediator) : base(mediator) { }

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] AddCardCommand command) => await HandleCommand(command);
    }
}
