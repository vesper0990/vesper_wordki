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

        [HttpGet("getGroupItems/{userId}")]
        public async Task<IActionResult> GetGroupItems(long userId){
            var groupItems = await groupService.GetItemsAsync(userId);
            return Json(groupItems);
        }

        [HttpGet("getGroupDetails/{groupId}")]
        public async Task<IActionResult> GetGroupDetails(long groupId)
        {
            var groupDetails = await groupService.GetDetailsAsync(groupId);
            return Json(groupDetails);
        }

        [HttpPost("addGroup")]
        public async Task<IActionResult> AddGroup([FromBody] GroupDTO group)
        {
            if (group == null)
            {
                throw new ApiException($"Parameter {nameof(group)} cannot be null", ErrorCode.NullArgument);
            }
            if (string.IsNullOrWhiteSpace(group.Name))
            {
                throw new ApiException($"Parameter {nameof(group.Name)} cannot be null", ErrorCode.NullArgument);
            }
            long userId = await authorizer.AuthorizeAsync(Request);
            group = await groupService.AddAsync(group, userId);
            return Json(group);
        }

        [HttpPut("updateGroup")]
        public async Task<IActionResult> UpdateGroup([FromBody] GroupDTO group)
        {
            if (group == null)
            {
                throw new ApiException($"Parameter {nameof(group)} cannot be null", ErrorCode.NullArgument);
            }
            if (string.IsNullOrWhiteSpace(group.Name))
            {
                throw new ApiException($"Parameter {nameof(group.Name)} cannot be null", ErrorCode.NullArgument);
            }
            long userId = await authorizer.AuthorizeAsync(Request);
            await groupService.UpdateAsync(group);
            return Ok();
        }

        [HttpDelete("removeGroup")]
        public async Task<IActionResult> RemoveGroup([FromBody] long id)
        {
            long userId = await authorizer.AuthorizeAsync(Request);
            await groupService.RemoveAsync(id);
            return Ok();
        }
    }
}