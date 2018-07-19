using Newtonsoft.Json;
using NUnit.Framework;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Wordki.Api.Framework;
using Wordki.Core;
using Wordki.Infrastructure.DTO;
using Wordki.Infrastructure.Services;

namespace Wordki.Tests.EndToEnd.Controllers.Users
{
    [TestFixture]
    public class Test_Register : TestBase
    {

        private const string method = "/User/register";

        public Test_Register()
        {
        }

        [Test]
        public async Task Try_invoke_if_body_is_empty()
        {
            var body = new StringContent("", Encoding.UTF8, "application/json");
            var respone = await client.PostAsync(method, body);
            Assert.AreNotEqual(HttpStatusCode.OK, respone.StatusCode, "StatusCode == OK");

            string message = await respone.Content.ReadAsStringAsync();

            Assert.NotNull(message, $"{nameof(message)} unexpected is null");
            var obj = JsonConvert.DeserializeObject<ExceptionMessage>(message);
            Assert.AreEqual(ErrorCode.NullArgumentException, obj.Code, "ExceptionMessage.Code != NullArgument");
        }

        [Test]
        public async Task Try_invoke_if_user_name_is_empty()
        {
            var body = new StringContent(JsonConvert.SerializeObject(new { Password = "test" }), Encoding.UTF8, "application/json");
            var respone = await client.PostAsync(method, body);
            Assert.AreNotEqual(HttpStatusCode.OK, respone.StatusCode, "StatusCode == OK");

            string message = await respone.Content.ReadAsStringAsync();
            Assert.NotNull(message, $"{nameof(message)} unexpected is null");
            var obj = JsonConvert.DeserializeObject<ExceptionMessage>(message);
            Assert.AreEqual(ErrorCode.NullArgumentException, obj.Code, "ExceptionMessage.Code != NullArgument");
        }

        [Test]
        public async Task Try_invoke_if_password_is_empty_check_status_code()
        {
            var body = new StringContent(JsonConvert.SerializeObject(new { Name = "test" }), Encoding.UTF8, "application/json");
            var respone = await client.PostAsync(method, body);
            Assert.AreNotEqual(HttpStatusCode.OK, respone.StatusCode, "StatusCode == OK");

            string message = await respone.Content.ReadAsStringAsync();
            Assert.NotNull(message, $"{nameof(message)} unexpected is null");
            var obj = JsonConvert.DeserializeObject<ExceptionMessage>(message);
            Assert.AreEqual(ErrorCode.NullArgumentException, obj.Code, "ExceptionMessage.Code != NullArgument");
        }


        [Test]
        public async Task Try_invoke_if_user_aleady_exists_status_code()
        {
            await ClearDatabase();
            string name = "test";
            string password = "test";
            User user = new User
            {
                Name = name,
                Password = password,
            };
            await dbContext.Users.AddAsync(user);
            await dbContext.SaveChangesAsync();

            var body = new StringContent(JsonConvert.SerializeObject(new { Name = name, Password = password }), Encoding.UTF8, "application/json");
            var respone = await client.PostAsync(method, body);
            Assert.AreNotEqual(HttpStatusCode.OK, respone.StatusCode, "StatusCode == OK");

            string message = await respone.Content.ReadAsStringAsync();
            Assert.NotNull(message, $"{nameof(message)} unexpected is null");
            var obj = JsonConvert.DeserializeObject<ExceptionMessage>(message);
            Assert.AreEqual(ErrorCode.UserAlreadyExistsException, obj.Code, "ExceptionMessage.Code != UserAlreadyExists");
        }

        [Test]
        public async Task Try_invoke_if_it_is_ok()
        {
            string name = "test";
            string password = "test";
            await ClearDatabase();
            var body = new StringContent(JsonConvert.SerializeObject(new { Name = name, Password = password }), Encoding.UTF8, "application/json");
            var respone = await client.PostAsync(method, body);
            Assert.AreEqual(HttpStatusCode.OK, respone.StatusCode, "StatusCode != OK");

            string message = await respone.Content.ReadAsStringAsync();
            Assert.NotNull(message, $"{nameof(message)} unexpected is null");
            var obj = JsonConvert.DeserializeObject<UserDTO>(message);
            Assert.AreEqual(name, obj.Name, "Name is wrong");
            Assert.AreEqual(new Encrypter().Md5Hash(password), obj.Password, "Password is wrong");
            Assert.AreNotEqual(0, obj.Id, "Id is wrong");
        }
    }
}
