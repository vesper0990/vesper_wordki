using System.Threading.Tasks;
using System.Net;
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
        private readonly IAuthenticator<string> authenticator;

        public GroupsController(IGroupService groupService, IAuthenticator<string> authenticator)
        {
            this.groupService = groupService;
            this.authenticator = authenticator;
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
        public async Task<IActionResult> Add([FromBody] GroupDetailsDTO group, [FromHeader] string apiKey)
        {
            if (group == null)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ExceptionMessage(ErrorCode.NullArgumentException, $"Parameter {nameof(group)} cannot be null."));
            }
            if (string.IsNullOrWhiteSpace(group.Name))
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ExceptionMessage(ErrorCode.NullArgumentException, $"Parameter {nameof(group.Name)} cannot be null."));
            }
            long userId = await authenticator.Authenticate(apiKey);
            var result = await groupService.AddAsync(group, userId);
            return StatusCode((int)HttpStatusCode.Created, result);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] GroupDTO group, [FromHeader] string apiKey)
        {
            if (group == null)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ExceptionMessage(ErrorCode.NullArgumentException, $"Parameter {nameof(group)} cannot be null."));
            }
            if (string.IsNullOrWhiteSpace(group.Name))
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ExceptionMessage(ErrorCode.NullArgumentException, $"Parameter {nameof(group.Name)} cannot be null."));
            }
            long userId = await authenticator.Authenticate(apiKey);
            await groupService.UpdateAsync(group, userId);
            return Ok();
        }

        [HttpDelete("remove/{id}")]
        public async Task<IActionResult> Remove([FromBody] long id, [FromHeader] string apiKey)
        {
            if (id == 0)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ExceptionMessage(ErrorCode.NullArgumentException, $"Parameter {nameof(id)} cannot be null."));
            }
            long userId = await authenticator.Authenticate(apiKey);
            await groupService.RemoveAsync(id);
            return Ok();
        }

        [HttpPost("split")]
        public async Task<IActionResult> Split([FromBody] GroupToSplitDTO groupToSplitDTO, [FromHeader] string apiKey)
        {
            if(groupToSplitDTO == null)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ExceptionMessage(ErrorCode.NullArgumentException, $"Parameter {nameof(groupToSplitDTO)} cannot be null."));
            }
            long userId = await authenticator.Authenticate(apiKey);
            await groupService.SplitGroup(groupToSplitDTO);
            return Ok();
        }
    }
}