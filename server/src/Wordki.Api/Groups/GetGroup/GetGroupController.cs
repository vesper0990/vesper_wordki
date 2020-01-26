using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Wordki.Queries.GetGroup;
using Wordki.Utils.Queries;

namespace Wordki.Api.Groups.GetGroup
{
    [Route("[controller]")]
    public class GetGroupController : ControllerBase
    {
        private readonly IQueryHandler<GetGroupQuery, GetGroupDto> queryHandler;

        public GetGroupController(IQueryHandler<GetGroupQuery, GetGroupDto> queryHandler)
        {
            this.queryHandler = queryHandler;
        }

        [HttpGet("{groupId}")]
        [Authorize]
        public async Task<IActionResult> Get([FromRoute] GetGroupRequest request)
        {
            var query = GetGroupQuery.Create(request.GroupId);
            var result = await queryHandler.HandleAsync(query);
            return new JsonResult(result);
        }
    }
}
