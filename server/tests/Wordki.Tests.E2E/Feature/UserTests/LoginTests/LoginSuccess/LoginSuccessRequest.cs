using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NUnit.Framework;

namespace Wordki.Tests.E2E.Feature.UserTests.LoginTests
{
    [TestFixture(typeof(UserExists))]
    public class LoginSuccessRequest<TContext> : E2eWebApplicationTestBase where TContext : LoginSuccessContext, new()
    {
        private TContext context = new TContext();

        [Test]
        public async Task Test()
        {
            await AddAsync(context.GivenEntity);

            var request = new HttpRequestMessage(HttpMethod.Put, "user/login");
            request.Content = CreateContent(context.GivenContent);

            var response = await Client.SendAsync(request);

            response.StatusCode.Should().Be(context.ExpectedStatusCode);

            var responseObj = JsonConvert.DeserializeObject<string>(await response.Content.ReadAsStringAsync());
            responseObj.Should().Be(context.ExpectedResponseMessage);

            var user = await DbContext.Users.SingleAsync();
            user.Name.Should().BeEquivalentTo(context.ExpectedEntity.Name);
            user.Password.Should().BeEquivalentTo(context.ExpectedEntity.Password);
            user.LastLoginDate.Should().Be(context.ExpectedEntity.LastLoginDate);
            user.CreationDate.Should().Be(context.ExpectedEntity.CreationDate);
        }
    }

}