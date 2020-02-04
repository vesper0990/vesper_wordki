using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Wordki.Queries.GetLastFailedWord;
using Wordki.Utils.HttpContext;
using Wordki.Utils.Queries;

namespace Wordki.Api.Words.GelLastFailedWord
{
    [Route("[controller]")]
    public class GetLastFailedWordController : ControllerBase
    {
        private readonly IQueryHandler<GetLastFailedWordQuery, LastFailedWordDto> queryHandler;
        private readonly IHttpContextProvider httpContextProvider;

        public GetLastFailedWordController(IQueryHandler<GetLastFailedWordQuery, LastFailedWordDto> queryHandler,
            IHttpContextProvider httpContextProvider)
        {
            this.queryHandler = queryHandler;
            this.httpContextProvider = httpContextProvider;
        }

        [HttpGet()]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var userId = httpContextProvider.GetUserId();
            var query = GetLastFailedWordQuery.Create(userId);
            var word = await queryHandler.HandleAsync(query);
            return new JsonResult(word);
        }

    }
}
