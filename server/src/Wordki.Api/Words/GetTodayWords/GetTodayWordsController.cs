using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Wordki.Queries.GetNextWords;
using Wordki.Queries.GetWordsByDate;
using Wordki.Utils.HttpContext;
using Wordki.Utils.Queries;

namespace Wordki.Api.Words.GetTodayWords
{
    [Route("[controller]")]
    public class GetTodayWordsController : ControllerBase
    {
        private readonly IQueryManyHandler<GetWordsByDateQuery, GetNextWordsDto> queryHandler;
        private readonly IHttpContextProvider contextProvider;

        public GetTodayWordsController(IQueryManyHandler<GetWordsByDateQuery, GetNextWordsDto> queryHandler,
            IHttpContextProvider contextProvider)
        {
            this.queryHandler = queryHandler;
            this.contextProvider = contextProvider;
        }

        [HttpGet("{date}")]
        [Authorize]
        public async Task<IActionResult> Get([FromRoute] GetTodayWordsRequest request)
        {
            var userId = contextProvider.GetUserId();
            var query = GetWordsByDateQuery.Create(userId, request.Date);
            var result = await queryHandler.HandleAsync(query);
            return new JsonResult(result);
        }
    }

    public class GetTodayWordsRequest
    {
        public DateTime Date { get; set; }
    }
}
