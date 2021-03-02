using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Wordki.Api.Featuers.Card.Add;
using Wordki.Api.Featuers.Card.Delete;
using Wordki.Api.Featuers.Card.GetAll;
using Wordki.Api.Featuers.Card.GetCardDetails;
using Wordki.Api.Featuers.Card.GetCount;
using Wordki.Api.Featuers.Card.GetRepeatsWithParams;
using Wordki.Api.Featuers.Card.Update;

namespace Wordki.Api.Featuers.Card
{
    [Route("card")]
    public class CardController : ControllerBase
    {
        public CardController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("count")]
        public async Task<IActionResult> GetAllCount() => await HandlerQuery(new GetCountQuery());

        [HttpGet("all/{groupId}")]
        public async Task<IActionResult> getAll([FromRoute] GetAllQuery query) => await HandlerQuery(query);

        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetCardDetails([FromRoute] GetCardDetailsQuery query) => await HandlerQuery(query);

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] UpdateCardCommand command) => await HandleCommand(command);

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] AddCardCommand command) => await HandleCommand(command);

        [HttpDelete("delete/{cardId}/{groupId}")]
        public async Task<IActionResult> Delete([FromRoute] long cardId, [FromRoute] long groupId)
        => await HandleCommand(new DeleteCardComamnd { Id = cardId, GroupId = groupId });

        [HttpGet("repeats/count")]
        public async Task<IActionResult> GetRepeatCount([FromQuery] GetRepeatsCountWithParamsQuery query)
            => await HandlerQuery(query);

        [HttpGet("repeats")]
        public async Task<IActionResult> GetRepeat([FromQuery] GetRepeatsWithParamsQuery query)
            => await HandlerQuery(query);
    }
}
