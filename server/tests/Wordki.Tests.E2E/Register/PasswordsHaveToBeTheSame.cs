using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using TestStack.BDDfy;
using Wordki.Tests.EndToEnd.Configuration;

namespace Wordki.Tests.EndToEnd.Register
{

    [TestFixture]
    public class PasswordsHaveToBeTheSame : TestBase
    {

        public PasswordsHaveToBeTheSame()
        {
            Request = new HttpRequestMessage(HttpMethod.Post, "/register");
        }

        void GivenRequest()
        {
            Request.Content = new StringContent("{\"userName\":\"user\", \"password\":\"pass\", \"passwordRepeat\":\"pass1\"}", Encoding.UTF8, "application/json");
        }

        async Task WhenRequestReceived() => await SendRequest();

        void ThenResponseIsInternalServerError()
        {
            Assert.AreEqual(HttpStatusCode.InternalServerError, Response.StatusCode);
        }

        async Task AndThenResponseContainError()
        {
            //var responseContent = await Response.Content.ReadAsStringAsync();
            //Assert.IsNotEmpty(responseContent);
        }

        async Task AndThenDatabaseIsEmpty(){
            using(var dbContext = new EntityFramework(DapperSettings)){
                var user = await dbContext.Users.SingleOrDefaultAsync();
                Assert.IsNull(user);
            }
        }

        
        public void Execute()
        {
            this.BDDfy();
        }
    }
}
