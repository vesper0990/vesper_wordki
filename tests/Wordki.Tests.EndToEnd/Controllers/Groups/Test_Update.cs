using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NUnit.Framework;
using Wordki.Infrastructure.DTO;

namespace Wordki.Tests.EndToEnd.Controllers.Groups
{
    [TestFixture]
    public class Test_Update : TestBase
    {


        public Test_Update()
        {
            method = "Groups/update";
        }

        [Test]
        public override async Task Try_invoke_if_body_is_empty()
        {
            await base.Try_invoke_if_body_is_empty();
        }

        [Test]
        public async Task Try_invoke_if_authorization_is_failed()
        {
            await Try_invoke_if_authorization_is_failed(Util.GetGroup());
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
            var body = new StringContent(JsonConvert.SerializeObject(groupToAdd), Encoding.UTF8, "application/json");
            await Util.PrepareAuthorization(body, user, encrypter, dbContext);
            await dbContext.Groups.AddAsync(groupToAdd);
            await dbContext.SaveChangesAsync();
            groupToAdd.Name = nameAfterChange;

            var response = await client.PutAsync(method, body);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            var message = await response.Content.ReadAsStringAsync();
            Assert.IsEmpty(message);

            Assert.AreEqual(1, await dbContext.Groups.CountAsync());
            Assert.AreEqual(nameAfterChange, (await dbContext.Groups.SingleAsync(x => x.Id == groupToAdd.Id)).Name);
        }
    }
}