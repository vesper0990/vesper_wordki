using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using NUnit.Framework;
using Wordki.Infrastructure.DTO;

namespace Wordki.Tests.EndToEnd.Controllers.Words{

[TestFixture]
    public class Test_Add : TestBase{

        private const string method = "Wordki/add";

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
        public async Task Try_invoke_if_authorization_is_failed()
        {
            await ClearDatabase();
            var wordToAdd = Util.GetWord();
            var body = new StringContent(JsonConvert.SerializeObject(wordToAdd), Encoding.UTF8, "application/json");
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
        public async Task Try_invoke_if_parent_group_not_exists(){
            await ClearDatabase();
            var user = Util.GetUser();
            var wordToAdd = Util.GetWord();
            var body = new StringContent(JsonConvert.SerializeObject(wordToAdd), Encoding.UTF8, "application/json");
            await Util.PrepareAuthorization(body, user, encrypter, dbContext);
            var respone = await client.PostAsync(method, body);
            Assert.AreNotEqual(HttpStatusCode.OK, respone.StatusCode, "StatusCode == OK");

            string message = await respone.Content.ReadAsStringAsync();
            //todo
        }

        [Test]
        public async Task Try_invoke_if_word_is_not_assign_to_group(){
            await ClearDatabase();
        }

        [Test]
        public async Task Try_invoke_if_it_is_ok(){
            await ClearDatabase();
        }

    }

}