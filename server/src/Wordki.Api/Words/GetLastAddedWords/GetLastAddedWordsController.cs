using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Wordki.Queries.GetLastAddedWords;
using Wordki.Utils.HttpContext;
using Wordki.Utils.Queries;

namespace Wordki.Api.Words.GetLastAddedWords
{
    [Route("[controller]")]
    public class GetLastAddedWordsController : ControllerBase
    {
        private readonly IQueryManyHandler<GetLastAddedWordsQuery, LastAddedWordDto> queryhandler;
        private readonly IHttpContextProvider contextProvider;

        public GetLastAddedWordsController(IQueryManyHandler<GetLastAddedWordsQuery, LastAddedWordDto> queryhandler,
            IHttpContextProvider contextProvider)
        {
            this.queryhandler = queryhandler;
            this.contextProvider = contextProvider;
        }

        [HttpGet("{count}")]
        [Authorize]
        public async Task<IActionResult> Get([FromRoute] int count)
        {
            var userId = contextProvider.GetUserId();
            var query = GetLastAddedWordsQuery.Create(userId, count);
            var result = await queryhandler.HandleAsync(query);
            return new JsonResult(result);
        }
    }
}
