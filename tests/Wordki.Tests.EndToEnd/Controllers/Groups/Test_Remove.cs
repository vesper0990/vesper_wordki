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


        public Test_Remove()
        {
            method = "Groups/remove";
            action = client.PostAsync;
        }

        [SetUp]
        public async Task SetUp()
        {
            await ClearDatabase();
        }

        [Test]
        public override async Task Try_invoke_if_body_is_empty()
        {
            await base.Try_invoke_if_body_is_empty();
        }

        [Test]
        public async Task Try_invoke_if_authorization_is_failed()
        {
            await Try_invoke_if_authorization_is_failed(1);
        }

        [Test]
        public async Task Try_invoke_if_group_is_not_exists_in_database()
        {
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