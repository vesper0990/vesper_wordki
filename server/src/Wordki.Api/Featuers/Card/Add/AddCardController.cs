using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Wordki.Api.Featuers.Card.Add
{
    [Route("card")]
    public class AddCardController : ControllerBase
    {
        public AddCardController(IMediator mediator) : base(mediator) { }

        [HttpPost("add")]
        public IActionResult Add([FromBody] AddCardCommand command) => HandleCommand(command);
    }
}
