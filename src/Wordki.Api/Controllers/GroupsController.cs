using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NLog;
using Wordki.Infrastructure;
using Wordki.Infrastructure.DTO;
using Wordki.Infrastructure.Services;

namespace Wordki.Api.Controllers
{
    [Route("[controller]")]
    public class GroupsController : Controller
    {
        private static readonly Logger logger = LogManager.GetCurrentClassLogger();
        private readonly IGroupService groupService;
        private readonly IAuthorizer authorizer;

        public GroupsController(IGroupService groupService, IAuthorizer authorizer)
        {
            this.groupService = groupService;
            this.authorizer = authorizer;
        }

        [HttpGet("getAll/{userId}")]
        public async Task<IActionResult> GetAll(long userId)
        {
            var groups = await groupService.GetItemsAsync(userId);
            return Json(groups);
        }

        [HttpGet("getItems/{userId}")]
        public async Task<IActionResult> GetItems(long userId)
        {
            var groupItems = await groupService.GetItemsAsync(userId);
            return Json(groupItems);
        }

        [HttpGet("getDetails/{groupId}")]
        public async Task<IActionResult> GetDetails(long groupId)
        {
            var groupDetails = await groupService.GetDetailsAsync(groupId);
            return Json(groupDetails);
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] GroupDetailsDTO group)
        {
            if (group == null)
            {
                throw new ApiException($"Parameter {nameof(group)} cannot be null", ErrorCode.NullArgumentException);
            }
            if (string.IsNullOrWhiteSpace(group.Name))
            {
                throw new ApiException($"Parameter {nameof(group.Name)} cannot be null", ErrorCode.NullArgumentException);
            }
            long userId = await authorizer.AuthorizeAsync(Request);
            group = await groupService.AddAsync(group, userId);
            return Json(group);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] GroupDTO group)
        {
            if (group == null)
            {
                throw new ApiException($"Parameter {nameof(group)} cannot be null", ErrorCode.NullArgumentException);
            }
            if (string.IsNullOrWhiteSpace(group.Name))
            {
                throw new ApiException($"Parameter {nameof(group.Name)} cannot be null", ErrorCode.NullArgumentException);
            }
            long userId = await authorizer.AuthorizeAsync(Request);
            await groupService.UpdateAsync(group);
            return Ok();
        }

        [HttpPost("remove")]
        public async Task<IActionResult> Remove([FromBody] long id)
        {
            if (id == 0)
            {
                throw new ApiException($"Parameter {nameof(id)} cannot be null", ErrorCode.NullArgumentException);
            }
            long userId = await authorizer.AuthorizeAsync(Request);
            await groupService.RemoveAsync(id);
            return Ok();
        }
    }
}