using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Wordki.Api.Featuers.Card.GetLastAdded
{
    [Route("card")]
    public class GetLastAddedController : ControllerBase
    {
        public GetLastAddedController(IMediator mediator) : base(mediator) { }

        [HttpGet("lastAdded/{count}")]
        public async Task<IActionResult> Get([FromRoute] GetLastAddedQuery query) => await HandlerQuery(query);

    }
}
