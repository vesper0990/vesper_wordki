using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Newtonsoft.Json;
using NUnit.Framework;
using Wordki.Core;
using Wordki.Infrastructure.DTO;

namespace Wordki.Tests.EndToEnd.Controllers.Groups
{

    [TestFixture]
    public class Test_GetItems : TestBase
    {

        private const string method = "Groups/getItems";
        public Test_GetItems()
        {

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
            var response = await client.GetAsync($"{method}/1");
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            var message = await response.Content.ReadAsStringAsync();
            var obj = JsonConvert.DeserializeObject<IEnumerable<GroupDetailsDTO>>(message);
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
            // Checking children count
            for (int i = 0; i < groups.Count(); i++)
            {
                Assert.AreEqual(groups.ElementAt(i).Words.Count, obj.ElementAt(i).WordsCount, $"WordsCount wrong for {i} item");
                Assert.AreEqual(groups.ElementAt(i).Results.Count, obj.ElementAt(i).ResultsCount, $"ResultsCount wrong for {i} item");
            }
        }

    }

}