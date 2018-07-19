using Newtonsoft.Json;
using NUnit.Framework;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Wordki.Core.Extensions;
using Wordki.Infrastructure.DTO;
using Wordki.Infrastructure.Services;

namespace Wordki.Tests.EndToEnd.Controllers.Groups
{
    [TestFixture]
    public class Test_Add : TestBase
    {

        private const string method = "Groups/add";

        public Test_Add()
        {

        }


        [Test]
        public async Task Try_invoke_if_body_is_empty()
        {
            await ClearDatabase();
            var body = new StringContent("", Encoding.UTF8, "application/json");
            var respone = await client.PostAsync(method, body);
            Assert.AreNotEqual(HttpStatusCode.OK, respone.StatusCode, "StatusCode == OK");

            string message = await respone.Content.ReadAsStringAsync();

            Assert.NotNull(message, $"{nameof(message)} unexpected is null");
            var obj = JsonConvert.DeserializeObject<ExceptionMessage>(message);
            Assert.AreEqual(ErrorCode.NullArgumentException, obj.Code, "ExceptionMessage.Code != NullArgument");
        }

        [Test]
        public async Task Try_invoke_if_authorization_is_failed()
        {
            await ClearDatabase();
            var groupToAdd = Util.GetGroup();
            var body = new StringContent(JsonConvert.SerializeObject(groupToAdd), Encoding.UTF8, "application/json");
            body.Headers.Add("userId", "1");
            body.Headers.Add("userId", "password");
            var respone = await client.PostAsync(method, body);
            Assert.AreNotEqual(HttpStatusCode.OK, respone.StatusCode, "StatusCode == OK");

            string message = await respone.Content.ReadAsStringAsync();
            Assert.NotNull(message, $"{nameof(message)} unexpected is null");
            var obj = JsonConvert.DeserializeObject<ExceptionMessage>(message);
            Assert.AreEqual(ErrorCode.AuthenticaitonException, obj.Code);
        }

        [Test]
        public async Task Try_invoke_if_group_already_exits()
        {
            await ClearDatabase();
            var user = Util.GetUser();
            var groupToAdd = Util.GetGroup();
            await dbContext.Groups.AddAsync(groupToAdd);
            await dbContext.SaveChangesAsync();
            var body = new StringContent(JsonConvert.SerializeObject(groupToAdd), Encoding.UTF8, "application/json");
            await Util.PrepareAuthorization(body, user, encrypter, dbContext);
            var respone = await client.PostAsync(method, body);
            Assert.AreNotEqual(HttpStatusCode.OK, respone.StatusCode, "StatusCode == OK");

            string message = await respone.Content.ReadAsStringAsync();
            Assert.NotNull(message, $"{nameof(message)} unexpected is null");
            var obj = JsonConvert.DeserializeObject<ExceptionMessage>(message);
            Assert.AreEqual(ErrorCode.InsertToDbException, obj.Code);
        }

        [Test]
        public async Task Try_invoke_if_group_has_not_children()
        {
            await ClearDatabase();
            var user = Util.GetUser();
            var groupToAdd = Util.GetGroup(0);
            var body = new StringContent(JsonConvert.SerializeObject(groupToAdd), Encoding.UTF8, "application/json");
            await Util.PrepareAuthorization(body, user, encrypter, dbContext);
            var respone = await client.PostAsync(method, body);
            Assert.AreEqual(HttpStatusCode.OK, respone.StatusCode, "StatusCode != OK");

            string message = await respone.Content.ReadAsStringAsync();
            Assert.NotNull(message, $"{nameof(message)} unexpected is null");
            var obj = JsonConvert.DeserializeObject<GroupDTO>(message);
            Assert.IsNotNull(obj);
            Assert.AreNotEqual(0, obj.Id);
        }

        [Test]
        public async Task Try_invoke_if_group_has_children()
        {
            await ClearDatabase();
            var user = Util.GetUser();
            var groupToAdd = Util.GetGroup(0);
            groupToAdd.AddAllWords(Util.GetWords(0, 1));
            groupToAdd.AddAllResults(Util.GetResults(0, 1));
            var body = new StringContent(JsonConvert.SerializeObject(groupToAdd), Encoding.UTF8, "application/json");
            await Util.PrepareAuthorization(body, user, encrypter, dbContext);
            var respone = await client.PostAsync(method, body);
            Assert.AreEqual(HttpStatusCode.OK, respone.StatusCode, "StatusCode != OK");

            string message = await respone.Content.ReadAsStringAsync();
            Assert.NotNull(message, $"{nameof(message)} unexpected is null");
            var obj = JsonConvert.DeserializeObject<GroupDetailsDTO>(message);
            Assert.IsNotNull(obj);
            Assert.AreNotEqual(0, obj.Id);
            Assert.AreEqual(groupToAdd.Words.Count, obj.Words.Count());
            Assert.AreEqual(groupToAdd.Results.Count, obj.Results.Count());

            // check children inserting
            foreach(var word in obj.Words)
            {
                Assert.AreNotEqual(0, word.Id);
            }
            foreach (var result in obj.Results)
            {
                Assert.AreNotEqual(0, result.Id);
            }



        }
    }
}
