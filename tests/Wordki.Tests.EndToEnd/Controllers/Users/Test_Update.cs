using Newtonsoft.Json;
using NUnit.Framework;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Infrastructure.DTO;

namespace Wordki.Tests.EndToEnd.Controllers.Users
{
    [TestFixture]
    public class Test_Update : TestBase
    {

        private const string method = "User/update";


        public Test_Update(): base()
        {
        }

        [Test]
        public async Task Try_invoke_if_authorization_is_empty()
        {
            await ClearDatabase();
            string name = "test";
            string password = "test";
            var body = new StringContent(JsonConvert.SerializeObject(new { Name = name, Password = password }), Encoding.UTF8, "application/json");
            var respone = await client.PutAsync(method, body);
            Assert.AreNotEqual(HttpStatusCode.OK, respone.StatusCode, "StatusCode == OK");

            string message = await respone.Content.ReadAsStringAsync();
            Assert.NotNull(message, $"{nameof(message)} unexpected is null");
            var obj = JsonConvert.DeserializeObject<ExceptionMessage>(message);
            Assert.AreEqual(ErrorCode.AuthenticaitonException, obj.Code);
        }

        [Test]
        public async Task Try_invoke_if_user_not_exists_in_database()
        {
            await ClearDatabase();
            string name = "test";
            string password = "test";
            var body = new StringContent(JsonConvert.SerializeObject(new { Name = name, Password = password }), Encoding.UTF8, "application/json");
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
        public async Task Try_invoke_if_it_is_ok()
        {
            await ClearDatabase();
            string name = "test";
            string password = "test";
            User user = new User
            {
                Name = name,
                Password = password,
            };
            User userToSend = new User
            {
                Name = user.Name,
                Password = "aaaa",
            };
            var body = new StringContent(JsonConvert.SerializeObject(new { userToSend.Name, userToSend.Password }), Encoding.UTF8, "application/json");
            await Util.PrepareAuthorization(body, user, encrypter, dbContext);
            var respone = await client.PutAsync(method, body);
            Assert.AreEqual(HttpStatusCode.OK, respone.StatusCode, "StatusCode != OK");

            string message = await respone.Content.ReadAsStringAsync();
            Assert.NotNull(message, $"{nameof(message)} unexpected is null");
            var obj = JsonConvert.DeserializeObject<UserDTO>(message);
            Assert.AreEqual(user.Id , obj.Id, "Ids are not equal");
            Assert.AreEqual(user.Name, obj.Name, "Names are not equal");
            Assert.AreEqual(encrypter.Md5Hash(userToSend.Password), obj.Password, "Passwords are not equal");
        }


    }
}
