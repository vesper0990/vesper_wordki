using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Wordki.Queries.GetCountWordsByDate;
using Wordki.Utils.HttpContext;
using Wordki.Utils.Queries;

namespace Wordki.Api.Words.GetCountWordsByDate
{
    [Route("[controller]")]
    public class GetCountWordsByDateController : ControllerBase
    {
        private readonly IQueryHandler<GetCountWordsByDateQuery, CountWordsByDateDto> queryHandler;
        private readonly IHttpContextProvider contextProvider;

        public GetCountWordsByDateController(IQueryHandler<GetCountWordsByDateQuery, CountWordsByDateDto> queryHandler,
            IHttpContextProvider contextProvider)
        {
            this.queryHandler = queryHandler;
            this.contextProvider = contextProvider;
        }

        [HttpGet("{date}")]
        [Authorize]
        public async Task<IActionResult> Get([FromRoute] GetCountWordsByDateRequest request)
        {
            var userId = contextProvider.GetUserId();
            var query = GetCountWordsByDateQuery.Create(userId, request.Date);
            var result = await queryHandler.HandleAsync(query);
            return new JsonResult(result);
        }
    }

    public class GetCountWordsByDateRequest
    {
        public DateTime Date { get; set; }
    }
}
