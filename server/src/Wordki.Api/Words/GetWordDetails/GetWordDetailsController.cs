using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Wordki.Queries.GetWordDetails;
using Wordki.Utils.Queries;

namespace Wordki.Api.Words
{
    [Route("[controller]")]
    public class GetWordDetailsController : ControllerBase
    {
        private readonly IQueryHandler<GetWordDetailsQuery, GetWordDetailsDto> queryHandler;

        public GetWordDetailsController(IQueryHandler<GetWordDetailsQuery, GetWordDetailsDto> queryHandler)
        {
            this.queryHandler = queryHandler;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get([FromBody] GetWordDetailsRequest request)
        {
            var query = GetWordDetailsQuery.Create(0, request.wordId);
            var result = await queryHandler.HandleAsync(query);
            return new JsonResult(result);
        }

    }
}