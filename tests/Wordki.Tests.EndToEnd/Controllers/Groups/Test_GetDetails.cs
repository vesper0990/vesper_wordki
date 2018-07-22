using Newtonsoft.Json;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Infrastructure.DTO;

namespace Wordki.Tests.EndToEnd.Controllers.Groups
{
    [TestFixture]
    public class Test_GetDetails : TestBase
    {

        private const string method = "Groups/getDetails";

        public Test_GetDetails() : base()
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
            await ClearDatabase();
            var response = await client.GetAsync($"{method}/1");
            Assert.AreNotEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [Test]
        public async Task Try_invoke_if_it_is_ok()
        {
            await ClearDatabase();
            User user = Util.GetUser();
            await dbContext.Users.AddAsync(user);
            await dbContext.SaveChangesAsync();

            IList<Group> groups = Util.GetGroups(5, userId: user.Id).ToList();
            await dbContext.Groups.AddRangeAsync(groups);
            await dbContext.SaveChangesAsync();

            var respnse = await client.GetAsync($"{method}/{groups[0].Id}");
            Assert.AreEqual(HttpStatusCode.OK, respnse.StatusCode, "StatusCode != Ok");

            var message = await respnse.Content.ReadAsStringAsync();
            var obj = JsonConvert.DeserializeObject<GroupDetailsDTO>(message);

            Assert.IsNotNull(obj);
            Assert.AreEqual(groups[0].Words.Count, obj.Words.Count());
            Assert.AreEqual(groups[0].Results.Count, obj.Results.Count());

        }

    }
}
