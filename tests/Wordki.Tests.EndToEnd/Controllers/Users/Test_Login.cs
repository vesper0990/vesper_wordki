using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Wordki.Tests.EndToEnd.Controllers.Users
{
    [TestFixture]
    public class Test_Login : TestBase
    {
        private const string method = "User/login";

        public Test_Login() : base()
        {

        }

        [Test]
        public async Task Try_invoke_if_no_parameters_check_status_code()
        {
            var response = await client.GetAsync(method);
            Assert.AreNotEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [Test]
        public async Task Try_invoke_if_parameters_are_incorrect_check_status_code()
        {
            var response = await client.GetAsync($"{method}/test/test");
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [Test]
        public async Task Try_invoke_if_parameters_are_incorrect_check_response()
        {
            var response = await client.GetAsync($"{method}/test/test");
            var responseString = await response.Content.ReadAsStringAsync();
            Assert.IsTrue(responseString.Contains("null"));
        }
    }
}
