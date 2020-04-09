using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TestStack.BDDfy;
using Wordki.Core.Dtos;
using Wordki.Tests.EndToEnd.Configuration;

namespace Wordki.Tests.E2E.GetUserSettings
{
    [TestFixture]
    public class UserGetOwnSettings : TestBase
    {
        public UserGetOwnSettings()
        {
            Request = new HttpRequestMessage(HttpMethod.Get, "getUserSettings");
        }

        async Task GivenDatabaseContainData()
        {
            using (var dbContext = new EntityFramework(DapperSettings))
            {
                var user = new UserDto
                {
                    Id = 1,
                    Name = "user",
                    Password = Host.EncrypterMock.Object.GetSalt(string.Empty),
                    CreationDate = Host.TimeProviderMock.Object.GetTime(),
                    LastLoginDate = Host.TimeProviderMock.Object.GetTime()
                };
                dbContext.Users.Add(user);

                var group = new GroupDto
                {
                    UserId = 1,
                    GroupId = 1,
                    GroupLanguage1 = 1,
                    GroupLanguage2 = 2,
                    Name = "group",
                    GroupCreationDate = Host.TimeProviderMock.Object.GetTime()
                };
                dbContext.Groups.Add(group);

                await dbContext.SaveChangesAsync();
            }
        }

        async Task WhenRequestReceived() => await SendRequest();

        void ThenResponseIsOk()
        {
            Assert.AreEqual(HttpStatusCode.OK, Response.StatusCode);
        }

        async Task AndThenResponseContainProperMessage()
        {
            var message = await Response.Content.ReadAsStringAsync();
            //object temp = null;
            var expectedJsonObj = new
            {
                languages = new int[] { 1, 2 }
            };
            var expectedJson = JsonSerializer.Serialize(expectedJsonObj);
            Assert.AreEqual(expectedJson, message);

        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }
    }
}
