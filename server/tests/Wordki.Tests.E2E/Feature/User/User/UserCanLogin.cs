using FizzWare.NBuilder;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TestStack.BDDfy;
using Wordki.Api.Repositories.EntityFrameworkRepositories;

namespace Wordki.Tests.E2E.Feature.User.User
{
    public class UserCanLogin : TestBase
    {
        public UserCanLogin()
        {
            Request = new HttpRequestMessage(HttpMethod.Post, "/user/login");
        }

        async Task GivenUserInDatabase()
        {
            using(var dbContext = new WordkiDbContext(ConnectionStringProvider))
            {
                var user = Builder<Api.Domain.User>.CreateNew()
                    .With(u => u.Id = 1)
                    .With(u => u.Name = "user")
                    .With(u => u.Password = Host.EncrypterMock.Object.Md5Hash("pass"))
                    .With(u => u.LastLoginDate = new DateTime(2020, 1, 1))
                    .With(u => u.CreationDate = new DateTime(2020, 1, 1))
                    .Build();

                dbContext.Users.Add(user);
                await dbContext.SaveChangesAsync();
            }
        }

        void AndGivenRequest()
        {
            var content = new
            {
                userName = "user",
                password = "pass",
            };
            Request.Content = new StringContent(JsonSerializer.Serialize(content), Encoding.UTF8, "application/json");
        }

        async Task WhenRequestReceived() => await SendRequest();

        void ThenResponseIsOk()
        {
            Assert.AreEqual(HttpStatusCode.OK, Response.StatusCode);
        }

        async Task AndThenResponseIsEmpty()
        {
            var responseContent = await Response.Content.ReadAsStringAsync();
            Assert.AreEqual(string.Empty, responseContent);
        }

        async Task AndThenUserAdded()
        {
            using (var dbContext = new WordkiDbContext(ConnectionStringProvider))
            {
                var user = await dbContext.Users.SingleAsync();
                Assert.AreEqual(user.Name, "user");
                Assert.AreEqual(user.Id, 1);
                Assert.AreEqual(Host.EncrypterMock.Object.Md5Hash("pass"), user.Password);
                Assert.AreEqual(Host.TimeProviderMock.Object.Now(), user.LastLoginDate);
                Assert.AreEqual(new DateTime(2020, 1, 1), user.CreationDate);
            }
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }
    }
}
