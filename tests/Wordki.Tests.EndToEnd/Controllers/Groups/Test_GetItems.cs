using System.Net;
using System.Threading.Tasks;
using NUnit.Framework;

namespace Wordki.Tests.EndToEnd.Controllers.Groups
{

    [TestFixture]
    public class Test_GetItems : TestBase
    {

        private const string method = "Groups/getItems";
        public Test_GetItems()
        {

        }

        public async Task Try_invoke_if_parameter_is_null()
        {
            var response = await client.GetAsync(method);
            Assert.AreNotEqual(HttpStatusCode.OK, response.StatusCode);
        }

        public async Task Try_invoke_if_database_is_empty(){
            var response = await client.GetAsync($"{method}/1");
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            
        }

    }

}