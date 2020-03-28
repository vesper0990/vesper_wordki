using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using TestStack.BDDfy;
using Wordki.Core.Dtos;
using Wordki.Tests.EndToEnd.Configuration;

namespace Wordki.Tests.EndToEnd.GetLastAddedWords
{
    [TestFixture]
    public class UserGetLastAddedWords : TestBase
    {
        public UserGetLastAddedWords()
        {
            Request = new HttpRequestMessage(HttpMethod.Get, "/getLastAddedWords/2");
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

                for (int i = 1; i < 4; i++)
                {
                    var word = new WordDto
                    {
                        WordId = i,
                        GroupId = 1,
                        WordLanguage1 = $"word{i}",
                        WordLanguage2 = $"word{i}",
                        WordCreationDate = new DateTime(2020, 01, 01).AddDays(-1 * i),
                    };
                    dbContext.Words.Add(word);
                }

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
            Assert.AreEqual("[{\"language1\":\"word1\",\"language2\":\"word1\",\"creationDate\":\"2019-12-31T00:00:00\"},{\"language1\":\"word2\",\"language2\":\"word2\",\"creationDate\":\"2019-12-30T00:00:00\"}]", message);
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }
    }
}
