using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Wordki.Queries.GetNextWords;
using Wordki.Utils.HttpContext;
using Wordki.Utils.Queries;

namespace Wordki.Api.Words.GetNextWords
{
    [Route("[controller]")]
    public class GetNextWordsController : ControllerBase
    {
        private readonly IQueryManyHandler<GetNextWordsQuery, GetNextWordsDto> queryHandler;
        private readonly IHttpContextProvider httpContextProvider;

        public GetNextWordsController(IQueryManyHandler<GetNextWordsQuery, GetNextWordsDto> queryHandler,
            IHttpContextProvider httpContextProvider)
        {
            this.queryHandler = queryHandler;
            this.httpContextProvider = httpContextProvider;
        }

        [HttpGet("{count}/{offset}")]
        [Authorize]
        public async Task<IActionResult> Get([FromRoute] GetNextWordsRequest request)
        {
            var userId = httpContextProvider.GetUserId();
            var query = GetNextWordsQuery.Create(request.Count, request.Offset, userId);
            var result = await queryHandler.HandleAsync(query);
            return new JsonResult(result);
        }

        [HttpGet("{count}/{offset}/{question}/{answer}")]
        [Authorize]
        public async Task<IActionResult> GetForLesson([FromRoute] GetNextWordsRequest request)
        {
            var userId = httpContextProvider.GetUserId();
            var query = GetNextWordsQuery.Create(request.Count, request.Offset, userId);
            var result = await queryHandler.HandleAsync(query);
            return new JsonResult(result);
        }

    }
}
