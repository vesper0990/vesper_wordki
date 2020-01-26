using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Wordki.Queries.GetGroups;
using Wordki.Utils.HttpContext;
using Wordki.Utils.Queries;

namespace Wordki.Api.GetGroups
{
    [Route("[controller]")]
    public class GetGroupsController : ControllerBase
    {
        private readonly IQueryManyHandler<GetGroupsQuery, GetGroupsDto> queryHandler;
        private readonly IHttpContextProvider contextProvider;

        public GetGroupsController(IQueryManyHandler<GetGroupsQuery, GetGroupsDto> queryHandler,
            IHttpContextProvider contextProvider)
        {
            this.queryHandler = queryHandler;
            this.contextProvider = contextProvider;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            var userId = contextProvider.GetUserId();
            var query = GetGroupsQuery.Create(userId);
            return new JsonResult(await queryHandler.HandleAsync(query));
        }

    }
}
