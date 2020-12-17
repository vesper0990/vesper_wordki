// using NUnit.Framework;
// using System;
// using System.Net;
// using System.Net.Http;
// using System.Text.Json;
// using System.Threading.Tasks;
// using TestStack.BDDfy;
// using Wordki.Api.Featuers.Card.GetLastFailed;
// using Wordki.Api.Repositories.EntityFrameworkRepositories;

// namespace Wordki.Tests.E2E.Feature.Card.GetLastFailed
// {
//     [TestFixture]
//     public class UserGetLastFailed : TestBase
//     {
//         public UserGetLastFailed()
//         {
//             Request = new HttpRequestMessage(HttpMethod.Get, "/card/lastFailed");
//         }

//         async Task GivenDatabaseContainData()
//         {
//             using (var dbContext = new WordkiDbContext(ConnectionStringProvider))
//             {
//                 var user = Utils.GetUser();
//                 dbContext.Users.Add(user);

//                 var group = Utils.GetGroup();
//                 group.User = user;
//                 dbContext.Groups.Add(group);

//                 var card1 = Utils.GetCard();
//                 card1.Group = group;
//                 card1.Heads.Value = "card1";
//                 card1.Id = 1;
//                 var repeat1 = Utils.GetRepeat();
//                 repeat1.DateTime = Utils.Yesterday;
//                 repeat1.Word = card1;
//                 await dbContext.Words.AddAsync(card1);
//                 await dbContext.Repeats.AddAsync(repeat1);

//                 var card2 = Utils.GetCard();
//                 card2.Group = group;
//                 card2.Heads.Value = "card2";
//                 card2.Id = 2;
//                 var repeat2 = Utils.GetRepeat();
//                 repeat2.DateTime = Utils.Now;
//                 repeat2.Word = card2;
//                 await dbContext.Words.AddAsync(card2);
//                 await dbContext.Repeats.AddAsync(repeat2);

//                 var lesson = Utils.GetLesson();
//                 lesson.User = user;
//                 lesson.Repeats.Add(repeat1);
//                 lesson.Repeats.Add(repeat2);
//                 await dbContext.Lessons.AddAsync(lesson);

//                 await dbContext.SaveChangesAsync();
//             }
//         }

//         async Task WhenRequestReceived() => await SendRequest();

//         void ThenResponseIsOk()
//         {
//             Assert.AreEqual(HttpStatusCode.OK, Response.StatusCode);
//         }

//         async Task AndThenResponseContainProperMessage()
//         {
//             var message = await Response.Content.ReadAsStringAsync();
//             var obj = JsonSerializer.Deserialize<LastFailedDto>(message, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
//             Assert.AreEqual("card2", obj.Heads.Value);
//         }

//         [Test]
//         public void Execute()
//         {
//             this.BDDfy();
//         }
//     }
// }
