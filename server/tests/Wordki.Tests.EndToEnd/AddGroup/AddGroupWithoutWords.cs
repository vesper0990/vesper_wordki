using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TestStack.BDDfy;
using Wordki.Core.Dtos;
using Wordki.Tests.EndToEnd.Configuration;

namespace Wordki.Tests.EndToEnd.AddGroup
{
    [TestFixture]
    public class AddGroupWithoutWords : TestBase
    {
        public AddGroupWithoutWords()
        {
            Request = new System.Net.Http.HttpRequestMessage(HttpMethod.Post, "/addGroup");
        }

        async Task GivenUserInDatabase()
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

                await dbContext.SaveChangesAsync();
            }
        }

        void AndGivenRequest()
        {
            var jsonObj = new
            {
                name = "groupName",
                language1 = 1,
                language2 = 2,
                words = new object[0]
            };
            var jsonString = JsonSerializer.Serialize(jsonObj);
            Request.Content = new StringContent(jsonString, Encoding.UTF8, "application/json");
        }

        async Task WhenRequestReceived() => await SendRequest();

        void ThenResponseIsOk()
        {
            Assert.AreEqual(HttpStatusCode.OK, Response.StatusCode);
        }

        async Task AndThenResponseIsEmpty()
        {
            var message = await Response.Content.ReadAsStringAsync();
            Assert.IsEmpty(message);
        }

        async Task AndThenGroupIsAdded()
        {
            using (var dbContext = new EntityFramework(DapperSettings))
            {
                var group = await dbContext.Groups.SingleAsync();
                Assert.IsNotNull(group);
                Assert.Greater(group.GroupId, 0);
                Assert.AreEqual(group.UserId, 1);
                Assert.AreEqual(group.Name, "groupName");
                Assert.AreEqual(group.GroupLanguage1, 1);
                Assert.AreEqual(group.GroupLanguage2, 2);
                Assert.AreEqual(group.GroupCreationDate, new DateTime(1990, 9, 24));

                var wordsCount = await dbContext.Words.CountAsync();
                Assert.AreEqual(0, wordsCount);

            }
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }
    }
}
