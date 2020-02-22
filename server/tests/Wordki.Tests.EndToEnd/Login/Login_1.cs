using NUnit.Framework;
using System;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using TestStack.BDDfy;
using Wordki.Core.Dtos;
using Wordki.Tests.EndToEnd.Configuration;

namespace Wordki.Tests.EndToEnd.Login
{
    [TestFixture]
    public class Login_1
    {

        public Login_1()
        {
        }

        async Task Given()
        {
            Console.WriteLine("given");
            //var user = new UserDto
            //{
            //    Name = "test",
            //    Password = "test1",
            //    CreationDate = new DateTime(),
            //    LastLoginDate = new DateTime(),
            //    Id = 1
            //};
            using (var dbContext = new EntityFramework())
            {
                dbContext.Database.EnsureCreated();
            }
            var host = new LoginServerMock();
            var request = new HttpRequestMessage(HttpMethod.Post, "/register");
            request.Content = new StringContent("{\"userName\":\"user\", \"password\":\"pass\", \"passwordRepeat\":\"pass\"}", Encoding.UTF8, "application/json");
            var response = await host.Client.SendAsync(request);

            using (var dbContext = new EntityFramework())
            {
                dbContext.Database.EnsureCreated();
                var userInDatabase = dbContext.Users.First(x => x.Name == "user");
            }

        }

        void When()
        {
            Console.WriteLine("when");
        }

        void Then()
        {
            Console.WriteLine("then");
            Assert.IsTrue(true);
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }
    }
}
