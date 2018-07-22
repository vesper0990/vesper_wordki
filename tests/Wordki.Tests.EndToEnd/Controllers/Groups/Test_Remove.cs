using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NUnit.Framework;
using Wordki.Core.Extensions;
using Wordki.Infrastructure.DTO;

namespace Wordki.Tests.EndToEnd.Controllers.Groups
{
    [TestFixture]
    public class Test_Remove : TestBase
    {

        private const string method = "Groups/remove";

        public Test_Remove()
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

            var obj = JsonConvert.DeserializeObject<ExceptionMessage>(message);
            Assert.NotNull(obj, $"{nameof(obj)} unexpected is null");
            Assert.AreEqual(ErrorCode.NullArgumentException, obj.Code, "ExceptionMessage.Code != NullArgument");
        }

        [Test]
        public async Task Try_invoke_if_authorizatio_is_failed()
        {
            await ClearDatabase();
            var body = new StringContent("1", Encoding.UTF8, "application/json");
            body.Headers.Add("userId", "1");
            body.Headers.Add("userId", "password");
            var respone = await client.PostAsync(method, body);
            Assert.AreNotEqual(HttpStatusCode.OK, respone.StatusCode, "StatusCode == OK");

            string message = await respone.Content.ReadAsStringAsync();
            var obj = JsonConvert.DeserializeObject<ExceptionMessage>(message);
            Assert.NotNull(obj, $"{nameof(obj)} unexpected is null");
            Assert.AreEqual(ErrorCode.AuthenticaitonException, obj.Code);
        }
        [Test]
        public async Task Try_invoke_if_group_is_not_exists_in_database()
        {
            await ClearDatabase();
            var user = Util.GetUser();
            var body = new StringContent("1", Encoding.UTF8, "application/json");
            await Util.PrepareAuthorization(body, user, encrypter, dbContext);

            var response = await client.PostAsync(method, body);
            Assert.AreNotEqual(HttpStatusCode.OK, response.StatusCode);

            var message = await response.Content.ReadAsStringAsync();
            var obj = JsonConvert.DeserializeObject<ExceptionMessage>(message);
            Assert.IsNotNull(obj);
            Assert.AreEqual(ErrorCode.RemovingFromDbException, obj.Code);
        }

        [Test]
        public async Task Try_invoke_if_group_in_database_is_empty()
        {
            await ClearDatabase();
            var user = Util.GetUser();
            var groupToAdd = Util.GetGroup();
            var body = new StringContent(groupToAdd.Id.ToString(), Encoding.UTF8, "application/json");
            await Util.PrepareAuthorization(body, user, encrypter, dbContext);
            await dbContext.Groups.AddAsync(groupToAdd);
            await dbContext.SaveChangesAsync();

            var response = await client.PostAsync(method, body);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            var message = await response.Content.ReadAsStringAsync();
            Assert.IsEmpty(message);

            Assert.AreEqual(0, await dbContext.Groups.CountAsync());
        }
        [Test]

        public async Task Try_invoke_if_group_in_database_has_children()
        {
            await ClearDatabase();
            var user = Util.GetUser();
            var groupToAdd = Util.GetGroup();
            groupToAdd.AddAllWords(Util.GetWords(groupToAdd.Id, user.Id)).AddAllResults(Util.GetResults(groupToAdd.Id, user.Id));
            var body = new StringContent(groupToAdd.Id.ToString(), Encoding.UTF8, "application/json");
            await Util.PrepareAuthorization(body, user, encrypter, dbContext);
            await dbContext.Groups.AddAsync(groupToAdd);
            await dbContext.SaveChangesAsync();

            var response = await client.PostAsync(method, body);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            var message = await response.Content.ReadAsStringAsync();
            Assert.IsEmpty(message);
            Assert.AreEqual(0, await dbContext.Groups.CountAsync());
        }
    }
}