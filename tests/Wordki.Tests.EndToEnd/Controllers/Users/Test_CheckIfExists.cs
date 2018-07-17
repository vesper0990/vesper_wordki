using System;
using System.Net;
using System.Threading.Tasks;
using NUnit.Framework;
using Wordki.Core;

namespace Wordki.Tests.EndToEnd.Controllers.Users
{
    [TestFixture]
    public class Test_CheckIfExists : TestBase
    {
        private const string method = "/User/check";


        public Test_CheckIfExists() : base()
        {

        }

        [Test]
        public async Task Try_invoke_if_parameter_is_null_check_status_code()
        {
            var response = await client.GetAsync($"{method}/");
            Assert.AreNotEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [Test]
        public async Task Try_invoke_if_parameter_is_incorrect_check_status_code()
        {
            var response = await client.GetAsync($"{method}/test");
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [Test]
        public async Task Try_invoke_if_parameter_is_incorrect_check_response()
        {
            var response = await client.GetAsync($"{method}/test");
            var responseString = await response.Content.ReadAsStringAsync();
            Assert.IsFalse(Convert.ToBoolean(responseString));
        }
        
        [Test]
        public async Task Try_invoke_if_parameter_is_correct_check_status_code()
        {
            await ClearDatabase();
            User userToAdd = Util.GetUser(1);
            await dbContext.Users.AddAsync(userToAdd);
            await dbContext.SaveChangesAsync();

            var response = await client.GetAsync($"{method}/{userToAdd.Name}");
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [Test]
        public async Task Try_invoke_if_parameter_is_correct_check_response()
        {
            await ClearDatabase();
            User userToAdd = Util.GetUser(2);
            await dbContext.Users.AddAsync(userToAdd);
            await dbContext.SaveChangesAsync();

            var response = await client.GetAsync($"{method}/{userToAdd.Name}");
            var responseString = await response.Content.ReadAsStringAsync();
            Assert.IsTrue(Convert.ToBoolean(responseString));
        }


    }
}
