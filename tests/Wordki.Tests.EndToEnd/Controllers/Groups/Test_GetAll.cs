using System.Linq;
using Newtonsoft.Json;
using NUnit.Framework;
using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Infrastructure.DTO;
using Wordki.Infrastructure.Services;

namespace Wordki.Tests.EndToEnd.Controllers.Groups
{
    [TestFixture]
    public class Test_GetAll : TestBase
    {
        private const string method = "Groups/getAll";
        public Test_GetAll() : base()
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
            
            IEnumerable<Group> groups = Util.getGroups(5, user.Id);
            await dbContext.Groups.AddRangeAsync(groups);

            var respnse = await client.GetAsync($"{method}/{user.Id}");
            Assert.AreEqual(HttpStatusCode.OK, respnse.StatusCode, "StatusCode != Ok");

            var message = await respnse.Content.ReadAsStringAsync();
            var obj = JsonConvert.DeserializeObject<IEnumerable<GroupDTO>>(message);
            Assert.AreEqual(groups.Count(), obj.Count(), "Count of groups are not equel");
        }
    }
}