using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Wordki.Queries.GetLastFailedWord;

namespace Wordki.Api.Featuers.Card.GetLastFailed
{
    [Route("card")]
    public class GetLastFailedWordController : ControllerBase
    {
        public GetLastFailedWordController(IMediator mediator) : base(mediator) { }

        [HttpGet("lastFailed")]
        public async Task<IActionResult> Get() => await HandlerQuery(new GetLastFailedQuery());

    }
}
