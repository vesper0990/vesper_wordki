using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Wordki.Queries.GetUserSettings;
using Wordki.Utils.HttpContext;
using Wordki.Utils.Queries;

namespace Wordki.Api.GetUserSettings
{
    [Route("[controller]")]
    public class GetUserSettingsController : ControllerBase
    {
        private readonly IQueryHandler<GetUserSettingsQuery, UserSettingsDto> queryHandler;
        private readonly IHttpContextProvider contextProvider;

        public GetUserSettingsController(IQueryHandler<GetUserSettingsQuery, UserSettingsDto> queryHandler,
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
            var query = GetUserSettingsQuery.Create(userId);
            var userSettings = await queryHandler.HandleAsync(query);
            return new JsonResult(userSettings);
        }
    }
}
