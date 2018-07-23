using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NUnit.Framework;
using Wordki.Infrastructure.DTO;

namespace Wordki.Tests.EndToEnd.Controllers.Words
{
    [TestFixture]
    public class Test_AddAll : TestBase
    {

        public Test_AddAll() : base()
        {
            method = "Words/addAll";
        }

        [Test]
        public override async Task Try_invoke_if_body_is_empty()
        {
            await base.Try_invoke_if_body_is_empty();
        }

        [Test]
        public async Task Try_invoke_if_authorization_is_failed()
        {
            await Try_invoke_if_authorization_is_failed(Util.GetWords(1, 1));
        }
        
        [Test]
        public async Task Try_to_invoke_if_words_have_not_got_group_id(){
            await ClearDatabase();
            var user = Util.GetUser();
            var wordToAdd = Util.GetWords(0, 1);
            var body = new StringContent(JsonConvert.SerializeObject(wordToAdd), Encoding.UTF8, "application/json");
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
        public async Task Try_to_invoke_if_parent_group_not_exists_in_database(){
            await ClearDatabase();
            var user = Util.GetUser();
            var wordToAdd = Util.GetWords(1, 1);
            var body = new StringContent(JsonConvert.SerializeObject(wordToAdd), Encoding.UTF8, "application/json");
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
        public async Task Try_to_invoke_if_it_is_ok(){
            await ClearDatabase();
            var user = Util.GetUser(id: 1);
            var group = Util.GetGroup(id: 1, userId: 1);
            var wordToAdd = Util.GetWords(groupId: 1, userId: 1);
            var body = new StringContent(JsonConvert.SerializeObject(wordToAdd), Encoding.UTF8, "application/json");
            await Util.PrepareAuthorization(body, user, encrypter, dbContext);
            await dbContext.Groups.AddAsync(group);
            await dbContext.SaveChangesAsync();

            var response = await client.PostAsync(method, body);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            var message = await response.Content.ReadAsStringAsync();
            var obj = JsonConvert.DeserializeObject<IEnumerable<WordDTO>>(message);

            Assert.IsNotNull(obj);
            Assert.AreEqual(wordToAdd.Count(), obj.Count());
            obj.ToList().ForEach(x => Assert.AreNotEqual(0, x.Id));
            Assert.AreEqual(wordToAdd.Count(), await dbContext.Words.CountAsync());
        }
    }

}