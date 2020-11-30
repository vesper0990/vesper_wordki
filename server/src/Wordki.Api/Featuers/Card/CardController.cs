using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Wordki.Api.Featuers.Card.Add;
using Wordki.Api.Featuers.Card.Delete;
using Wordki.Api.Featuers.Card.GetAll;
using Wordki.Api.Featuers.Card.GetAllRepeat;
using Wordki.Api.Featuers.Card.GetCardDetails;
using Wordki.Api.Featuers.Card.GetCount;
using Wordki.Api.Featuers.Card.GetLastAdded;
using Wordki.Api.Featuers.Card.GetLastFailed;
using Wordki.Api.Featuers.Card.GetNextRepeat;
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

        [HttpGet("lastFailed")]
        public async Task<IActionResult> GetLastFailed() => await HandlerQuery(new GetLastFailedQuery());

        [HttpGet("lastAdded/{count}")]
        public async Task<IActionResult> GetLastAdded([FromRoute] GetLastAddedQuery query) => await HandlerQuery(query);

        [HttpGet("nextRepeat")]
        public async Task<IActionResult> GetNextRepeat() => await HandlerQuery(new GetNextRepeatQuery());

        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetCardDetails([FromRoute] GetCardDetailsQuery query) => await HandlerQuery(query);

        [HttpGet("allRepeats")]
        public async Task<IActionResult> GetCardsToRepeat() => await HandlerQuery(new GetAllRepeatQuery());

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] UpdateCardCommand command) => await HandleCommand(command);

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] AddCardCommand command) => await HandleCommand(command);

        [HttpDelete("delete/{cardId}")]
        public async Task<IActionResult> Delete([FromRoute] long cardId) => await HandleCommand(new DeleteCardComamnd { Id = cardId });

        
        
    }
}
