using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Wordki.Infrastructure.Services;

namespace Wordki.Api.Controllers
{
    [Route("[controller]")]
    public class GroupsController : Controller
    {
        private readonly IGroupService groupService;

        public GroupsController(IGroupService groupService)
        {
            this.groupService = groupService;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            var groups = await groupService.GetGroupItemsAsync(1);
            return Json(groups);
        }

        [HttpGet("getGroupDetails/{groupId}")]
        public async Task<IActionResult> GetGroupDetails(long groupId){
            var groupDetails = await groupService.GetGroupDetailsAsync();
            return Json(groupDetails);
        }
    }
}