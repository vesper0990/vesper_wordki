using Microsoft.Extensions.Options;
using System;
using Wordki.Infrastructure.Services;
using Wordki.Infrastructure.Settings;
using Xunit;

namespace Wordki.Tests.UnitTests.AutorizationService
{

    public class Test
    {
        private readonly IAuthenticationService authenticationService;

        public Test()
        {
            authenticationService = new AuthenticationService(Options.Create(new JwtSettings { Secret = "poDgQKSoHyHihwInbzHbgaxUqk5TyeFO" }));
        }

        [Fact]
        public void UnitTest()
        {
            var guid = Guid.Parse("f43cebd3-de49-4cd0-8a2a-f265ba9bdf14");
            var roles = new string[] { "Role1", "Role2" };
            string token = authenticationService.Authenticate(guid, roles);
        }


    }
}
