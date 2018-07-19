using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NUnit.Framework;
using Wordki.Infrastructure.DTO;
using Wordki.Infrastructure.Services;

namespace Wordki.Tests.EndToEnd.Controllers.Groups
{
    [TestFixture]
    public class Test_Update : TestBase
    {

        private const string method = "Groups/update";
        private readonly IEncrypter encrypter;

        public Test_Update()
        {
            encrypter = server.Host.Services.GetService(typeof(IEncrypter)) as IEncrypter;
        }

        [Test]
        public async Task Try_invoke_if_body_is_empty()
        {
            await ClearDatabase();
            var body = new StringContent("", Encoding.UTF8, "application/json");
            var respone = await client.PutAsync(method, body);
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
            var groupToAdd = Util.GetGroup();
            var body = new StringContent(JsonConvert.SerializeObject(groupToAdd), Encoding.UTF8, "application/json");
            body.Headers.Add("userId", "1");
            body.Headers.Add("userId", "password");
            var respone = await client.PutAsync(method, body);
            Assert.AreNotEqual(HttpStatusCode.OK, respone.StatusCode, "StatusCode == OK");

            string message = await respone.Content.ReadAsStringAsync();
            Assert.NotNull(message, $"{nameof(message)} unexpected is null");
            var obj = JsonConvert.DeserializeObject<ExceptionMessage>(message);
            Assert.AreEqual(ErrorCode.AuthenticaitonException, obj.Code);
        }

        [Test]
        public async Task Try_invoke_if_group_is_not_exists_in_database(){
            await ClearDatabase();
            var user = Util.GetUser();
            var groupToAdd = Util.GetGroup();
            var body = new StringContent(JsonConvert.SerializeObject(groupToAdd), Encoding.UTF8, "application/json");
            await Util.PrepareAuthorization(body, user, encrypter, dbContext);

            var response = await client.PutAsync(method, body);
            Assert.AreNotEqual(HttpStatusCode.OK, response.StatusCode);

            var message = await response.Content.ReadAsStringAsync();
            var obj = JsonConvert.DeserializeObject<ExceptionMessage>(message);
            Assert.IsNotNull(obj);
            Assert.AreEqual(ErrorCode.UpdateInDbException, obj.Code);
        }

        [Test]
        public async Task Try_invoke_if_group_is_empty()
        {
            string nameAfterChange = "asdf";
            await ClearDatabase();
            var user = Util.GetUser();
            var groupToAdd = Util.GetGroup();
            await dbContext.Groups.AddAsync(groupToAdd);
            await dbContext.SaveChangesAsync();
            groupToAdd.Name = nameAfterChange;
            var body = new StringContent(JsonConvert.SerializeObject(groupToAdd), Encoding.UTF8, "application/json");
            await Util.PrepareAuthorization(body, user, encrypter, dbContext);

            var response = await client.PutAsync(method, body);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            var message = await response.Content.ReadAsStringAsync();
            Assert.IsEmpty(message);

            Assert.AreEqual(1, await dbContext.Groups.CountAsync());
            Assert.AreEqual(nameAfterChange, (await dbContext.Groups.SingleAsync(x => x.Id == groupToAdd.Id)).Name);
        }
    }
}