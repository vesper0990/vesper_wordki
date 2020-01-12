using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Wordki.Queries.GetWords;
using Wordki.Utils.Queries;

namespace Wordki.Api.GetWords
{
    [Route("[controller]")]
    public class GetWordsController : ControllerBase
    {
        private readonly IQueryManyHandler<GetWordsQuery, GetWordsDto> queryHandler;

        public GetWordsController(IQueryManyHandler<GetWordsQuery, GetWordsDto> queryHandler)
        {
            this.queryHandler = queryHandler;
        }

        [HttpGet("{count}")]
        public async Task<IActionResult> Get(int count)
        {
            var query = GetWordsQuery.Create(count);
            var words = await queryHandler.HandleAsync(query);
            return new JsonResult(words);
        }

    }
}
