using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace Wordki.Tests.E2E.Feature.UserTests.RegisterTests
{
    [TestFixture(typeof(NewUser))]
    public class RegisterSuccessTests<TContext> : E2eWebApplicationTestBase where TContext : RegisterSuccessContext, new()
    {
        private TContext context = new TContext();

        [Test]
        public async Task Test()
        {
            var request = new HttpRequestMessage(HttpMethod.Post, "user/register");
            request.Content = CreateContent(context.GivenRequest);

            var response = await Client.SendAsync(request);

            response.StatusCode.Should().Be(context.ExpectedStatusCode);

            var user = await DbContext.Users.SingleAsync();
            user.Id.Should().BeGreaterThan(0);
            user.Name.Should().BeEquivalentTo(context.ExpectedEntity.Name);
            user.Password.Should().BeEquivalentTo(context.ExpectedEntity.Password);
            user.LastLoginDate.Should().Be(context.ExpectedEntity.LastLoginDate);
            user.CreationDate.Should().Be(context.ExpectedEntity.CreationDate);
        }
    }

}