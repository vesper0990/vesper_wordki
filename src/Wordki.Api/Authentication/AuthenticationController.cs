using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Wordki.Infrastructure.Services;
using Wordki.Queries.GetUser;
using Wordki.Utils.Queries;

namespace Wordki.Api.Authentication
{
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IQueryHandler<GetUserQuery, GetUserDto> queryHandler;
        private readonly IAuthenticationService authenticationService;

        public AuthenticationController(IQueryHandler<GetUserQuery, GetUserDto> queryHandler,
            IAuthenticationService authenticationService)
        {
            this.queryHandler = queryHandler;
            this.authenticationService = authenticationService;
        }

        [HttpPost("authenticate")]
        public async Task<ActionResult> Authenticate([FromBody] AuthenticateRequest request)
        {
            var query = GetUserQuery.Create(request.Name, request.Password);
            var user = await queryHandler.HandleAsync(query);
            if (user == null)
            {
                throw new ArgumentException("User not found");
            }
            var token = authenticationService.Authenticate(user.User.Id.Value, new string[] { "User", "Admin" });
            var dto = new AuthenticateDto
            {
                Token = token
            };

            return new JsonResult(dto);
        }
    }
}
