using System.Linq;
using Newtonsoft.Json;
using NUnit.Framework;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Infrastructure.DTO;

namespace Wordki.Tests.EndToEnd.Controllers.Groups
{
    [TestFixture]
    public class Test_GetAll : TestBase
    {
        public Test_GetAll() : base()
        {
            method = "Groups/getAll";
        }

        [Test]
        public async Task Try_invoke_if_parameter_is_null()
        {
            var response = await client.GetAsync(method);
            Assert.AreNotEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [Test]
        public async Task Try_invoke_if_database_is_empty()
        {
            await ClearDatabase();
            var response = await client.GetAsync($"{method}/1");
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            var message = await response.Content.ReadAsStringAsync();
            var obj = JsonConvert.DeserializeObject<IEnumerable<GroupDTO>>(message);
            Assert.AreEqual(0, obj.Count());
        }

        [Test]
        public async Task Try_invoke_if_it_is_ok()
        {
            await ClearDatabase();
            User user = Util.GetUser();
            await dbContext.Users.AddAsync(user);
            await dbContext.SaveChangesAsync();
            
            IEnumerable<Group> groups = Util.GetGroups(5, userId: user.Id);
            await dbContext.Groups.AddRangeAsync(groups);
            await dbContext.SaveChangesAsync();

            var respnse = await client.GetAsync($"{method}/{user.Id}");
            Assert.AreEqual(HttpStatusCode.OK, respnse.StatusCode, "StatusCode != Ok");

            var message = await respnse.Content.ReadAsStringAsync();
            var obj = JsonConvert.DeserializeObject<IEnumerable<GroupDTO>>(message);
            Assert.AreEqual(groups.Count(), obj.Count(), "Count of groups are not equel");
        }
    }
}