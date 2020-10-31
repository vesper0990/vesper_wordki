//using Microsoft.EntityFrameworkCore;
//using NUnit.Framework;
//using System;
//using System.Net;
//using System.Net.Http;
//using System.Text;
//using System.Text.Json;
//using System.Threading.Tasks;
//using TestStack.BDDfy;
//using Wordki.Api.Domain;
//using Wordki.Api.Repositories.EntityFrameworkRepositories;
//using Wordki.Core.Dtos;
//using Wordki.Tests.EndToEnd.Configuration;

//namespace Wordki.Tests.E2E.Feature.Card.Update
//{
//    [TestFixture]
//    public class UserUpdateCard : TestBase
//    {

//        public UserUpdateCard()
//        {
//            Request = new HttpRequestMessage(HttpMethod.Put, "/card/update");
//        }

//        async Task GivenGroupInDatabase()
//        {
//            using (var dbContext = new WordkiDbContext(Options))
//            {
//                var user = Utils.GetUser();
//                dbContext.Users.Add(user);

//                var group = Utils.GetGroup();
//                group.User = user;

//                dbContext.Groups.Add(group);

//                var word = Utils.GetCard();
//                word.Group = group;

//                dbContext.Words.Add(word);
//                await dbContext.SaveChangesAsync();
//            }
//        }

//        void AndGivenRequest()
//        {
//            var content = new
//            {
//                id = 1,
//                cardSide1 = new { value = "asdf" },
//                cardSide2 = new { value = "fdsa" },
//                isVisible = false
//            };
//            Request.Content = new StringContent(JsonSerializer.Serialize(content), Encoding.UTF8, "application/json");
//        }

//        async Task WhenRequestReceived() => await SendRequest();

//        void ThenResponseIsOk()
//        {
//            Assert.AreEqual(HttpStatusCode.OK, Response.StatusCode);
//        }

//        async Task AndThenResponseIsEmpty()
//        {
//            var message = await Response.Content.ReadAsStringAsync();
//            Assert.IsEmpty(message);
//        }

//        async Task AndThenWordIsAdded()
//        {
//            using (var dbContext = new WordkiDbContext(Options))
//            {
//                var word = await dbContext.Words.Include(w => w.Group).SingleOrDefaultAsync();
//                Assert.IsNotNull(word);
//                Assert.AreEqual(1, word.Id);
//                Assert.AreEqual(1, word.Group.Id);
//                Assert.AreEqual("asdf", word.CardSide1.Value);
//                Assert.AreEqual("fdsa", word.CardSide2.Value);
//                Assert.AreEqual(null, word.Comment);
//                Assert.AreEqual(2, word.Drawer.Value);
//                Assert.AreEqual(false, word.IsVisible);
//            }
//        }

//        [Test]
//        public void Execute()
//        {
//            this.BDDfy();
//        }

//    }
//}
