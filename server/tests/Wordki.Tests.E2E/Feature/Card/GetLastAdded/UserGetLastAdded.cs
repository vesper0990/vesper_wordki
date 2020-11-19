using NUnit.Framework;
using System;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using TestStack.BDDfy;
using Wordki.Api.Repositories.EntityFrameworkRepositories;

namespace Wordki.Tests.E2E.Feature.Card.GetLastAdded
{
    [TestFixture]
    public class UserGetLastAdded : TestBase
    {
        public UserGetLastAdded()
        {
            Request = new HttpRequestMessage(HttpMethod.Get, "/card/lastAdded/2");
        }

        async Task GivenDatabaseContainData()
        {
            using (var dbContext = new WordkiDbContext(ConnectionStringProvider))
            {
                var user = Utils.GetUser();
                dbContext.Users.Add(user);

                var group = Utils.GetGroup();
                group.User = user;
                dbContext.Groups.Add(group);

                for (int i = 1; i < 4; i++)
                {
                    var word = Utils.GetCard();
                    word.Group = group;
                    word.Id = i;
                    word.WordCreationDate = word.WordCreationDate.AddDays(i);
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
            var expectedJsonObj = new object[]{
            new
            {
                groupName = "GroupName",
                language1 = 1,
                language2 = 2,
                heads = new { value = "Value1", example = "Example1", state = new { drawer = 2, nextRepeat = new DateTime(2020, 1,1) } },
                tails = new { value = "Value1", example = "Example1", state = new { drawer = 2, nextRepeat = new DateTime(2020, 1,1)  } },
                // comment = "Comment1",
                // isVisible = true
            },
            new
            {
                groupName = "GroupName",
                language1 = 1,
                language2 = 2,
                heads = new { value = "Value1", example = "Example1", state = new { drawer = 2, nextRepeat = new DateTime(2020, 1,1)  } } ,
                tails = new { value = "Value1", example = "Example1" , state = new { drawer = 2, nextRepeat = new DateTime(2020, 1,1)  } },
                // comment = "Comment1",
                // isVisible = true
            },
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
