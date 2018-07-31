using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NUnit.Framework;
using Wordki.Infrastructure.DTO;

namespace Wordki.Tests.EndToEnd.Controllers.Results
{

    [TestFixture]
    public class Test_Add : TestBase
    {

        public Test_Add()
        {
            method = "Results/add";
        }

        [Test]
        public override async Task Try_invoke_if_body_is_empty()
        {
            await base.Try_invoke_if_body_is_empty();
        }

        [Test]
        public async Task Try_invoke_if_authorization_is_failed()
        {
            await Try_invoke_if_authorization_is_failed(Util.GetResult());
        }

        [Test]
        public async Task Try_invoke_if_parent_group_not_exists()
        {
            await ClearDatabase();
            var user = Util.GetUser();
            var result = Util.GetResult(userId: user.Id);
            var body = new StringContent(JsonConvert.SerializeObject(result), Encoding.UTF8, "application/json");
            await Util.PrepareAuthorization(body, user, encrypter, dbContext);
            var respone = await client.PostAsync(method, body);
            Assert.AreNotEqual(HttpStatusCode.OK, respone.StatusCode, "StatusCode == OK");

            string message = await respone.Content.ReadAsStringAsync();
            var obj = JsonConvert.DeserializeObject<ExceptionMessage>(message);
            Assert.NotNull(obj);
            Assert.AreEqual(ErrorCode.InsertToDbException, obj.Code);
            
        }

        [Test]
        public async Task Try_invoke_if_result_is_not_assign_to_group()
        {
            await ClearDatabase();
            var user = Util.GetUser();
            var result = Util.GetResult(userId: user.Id);
            var body = new StringContent(JsonConvert.SerializeObject(result), Encoding.UTF8, "application/json");
            await Util.PrepareAuthorization(body, user, encrypter, dbContext);
            var respone = await client.PostAsync(method, body);
            Assert.AreNotEqual(HttpStatusCode.OK, respone.StatusCode, "StatusCode == OK");

            string message = await respone.Content.ReadAsStringAsync();
            var obj = JsonConvert.DeserializeObject<ExceptionMessage>(message);
            Assert.NotNull(obj);
            Assert.AreEqual(ErrorCode.InsertToDbException, obj.Code);
            Assert.AreEqual(0, await dbContext.Words.CountAsync());
        }

        [Test]
        public async Task Try_invoke_if_it_is_ok()
        {
            await ClearDatabase();
            var user = Util.GetUser();
            var group = Util.GetGroup(userId: user.Id);
            var result = Util.GetResult(userId: user.Id);
            var body = new StringContent(JsonConvert.SerializeObject(result), Encoding.UTF8, "application/json");
            await Util.PrepareAuthorization(body, user, encrypter, dbContext);
            await dbContext.Groups.AddAsync(group);
            await dbContext.SaveChangesAsync();

            var response = await client.PostAsync(method, body);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            var message = await response.Content.ReadAsStringAsync();
            var obj = JsonConvert.DeserializeObject<WordDTO>(message);

            Assert.IsNotNull(obj);
            Assert.AreNotEqual(0, obj.Id);

            Assert.AreEqual(1, await dbContext.Results.CountAsync());
        }
    }
}