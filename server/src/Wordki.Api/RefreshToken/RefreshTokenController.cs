using Microsoft.AspNetCore.Mvc;
using Wordki.Infrastructure.Services;

namespace Wordki.Api.RefreshToken
{
    public class RefreshTokenController : ControllerBase
    {
        private readonly IAuthenticationService authenticationService;

        public RefreshTokenController(IAuthenticationService authenticationService)
        {
            this.authenticationService = authenticationService;
        }

        [HttpGet]
        public IActionResult Refresh(RefreshTokenRequest request)
        {
            var refreshedToken = authenticationService.Refresh(request.Token);

            return new JsonResult(refreshedToken);
        }
    }
}
