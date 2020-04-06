using NUnit.Framework;
using System;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using TestStack.BDDfy;
using Wordki.Core.Dtos;
using Wordki.Tests.EndToEnd.Configuration;

namespace Wordki.Tests.EndToEnd.GetLastFailedWord
{
    [TestFixture]
    public class UserGetLastFailedWord : TestBase
    {

        public UserGetLastFailedWord()
        {
            Request = new HttpRequestMessage(HttpMethod.Get, "/getLastFailedWord");
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

                var word1 = new WordDto
                {
                    WordId = 1,
                    GroupId = 1,
                    IsVisible = true,
                };
                dbContext.Words.Add(word1);

                var repeat1 = new RepeatDto
                {
                    Id = 1,
                    WordId = 1,
                    Result = -1,
                    DateTime = new DateTime(2020, 01, 01)
                };
                dbContext.Repeats.Add(repeat1);

                var word2 = new WordDto
                {
                    WordId = 2,
                    GroupId = 1,
                    WordLanguage1 = "word2",
                    WordLanguage2 = "word2",
                    Drawer = 0,
                    IsVisible = true,
                    WordCreationDate = Host.TimeProviderMock.Object.GetTime()
                };
                dbContext.Words.Add(word2);

                var repeat2 = new RepeatDto
                {
                    Id = 2,
                    WordId = 2,
                    Result = -1,
                    DateTime = new DateTime(2020, 01, 02)
                };
                dbContext.Repeats.Add(repeat2);
                await dbContext.SaveChangesAsync();
            }
        }

        async Task WhenRequestReceived() => await SendRequest();

        void ThenResponseIsOk()
        {
            Assert.AreEqual(HttpStatusCode.OK, Response.StatusCode);
        }

        async Task AndThenResponseContainLastFailedWord()
        {
            var message = await Response.Content.ReadAsStringAsync();
            object temp = null;
            var expectedJsonObj = new
            {
                groupName = "group",
                groupLanguage1 = 1,
                groupLanguage2 = 2,
                id = 2,
                language1 = "word2",
                language2 = "word2",
                example1 = temp,
                example2 = temp,
                drawer = 0,
                creationDate = Host.TimeProviderMock.Object.GetTime(),
                repeatsCount = 1,
                lastRepeat = new DateTime(2020, 01, 02)
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
