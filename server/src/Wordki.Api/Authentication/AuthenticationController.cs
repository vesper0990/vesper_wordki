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

        [HttpPost]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticateRequest request)
        {
            var query = GetUserQuery.Create(request.Name, request.Password);
            var user = await queryHandler.HandleAsync(query);
            if (user == null)
            {
                throw new ArgumentException("User not found");
            }
            var token = authenticationService.Authenticate(user.Id, new string[] { "User", "Admin" });
            var dto = new AuthenticateDto
            {
                Token = token
            };

            return new JsonResult(dto);
        }
    }
}
