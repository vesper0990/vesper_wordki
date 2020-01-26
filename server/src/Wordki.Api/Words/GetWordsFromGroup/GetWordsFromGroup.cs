using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Wordki.Queries.GetWordsFromGroup;
using Wordki.Utils.Queries;

namespace Wordki.Api.Words.GetWordsFromGroup
{
    [Route("[controller]")]
    public class GetWordsFromGroup : ControllerBase
    {
        private readonly IQueryManyHandler<GetWordsFromGroupQuery, GetWordsFromGroupDto> queryHandler;

        public GetWordsFromGroup(IQueryManyHandler<GetWordsFromGroupQuery, GetWordsFromGroupDto> queryHandler)
        {
            this.queryHandler = queryHandler;
        }

        [HttpGet("{groupId}")]
        [Authorize]
        public async Task<IActionResult> Get([FromRoute]GetWordsFromGroupRequest request)
        {
            var query = GetWordsFromGroupQuery.Create(request.GroupId);
            var result = await queryHandler.HandleAsync(query);
            return new JsonResult(result);
        }

    }
}
