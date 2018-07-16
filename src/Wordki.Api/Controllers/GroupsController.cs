using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NLog;
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
            logger.Debug("test");
            var groups = await groupService.GetGroupItemsAsync(userId);
            return Json(groups);
        }

        [HttpGet("getGroupDetails/{groupId}")]
        public async Task<IActionResult> GetGroupDetails(long groupId){
            var groupDetails = await groupService.GetGroupDetailsAsync(groupId);
            return Json(groupDetails);
        }

        [HttpPost("addGroup")]
        public async Task<IActionResult> AddGroup([FromBody] GroupDTO group)
        {
            long userId = await authorizer.AuthorizeAsync(Request);
            group = await groupService.AddGroupAsync(group, userId);
            return Json(group);
        }
    }
}