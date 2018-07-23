using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Wordki.Infrastructure.DTO;

namespace Wordki.Tests.EndToEnd.Controllers.Words
{
    [TestFixture]
    public class Test_UpdateAll : TestBase
    {

        public Test_UpdateAll()
        {
            method = "Words/updateAll";
        }

        [Test]
        public override async Task Try_invoke_if_body_is_empty()
        {
            await base.Try_invoke_if_body_is_empty();
        }

        [Test]
        public async Task Try_invoke_if_authorization_is_failed()
        {
            await Try_invoke_if_authorization_is_failed(Util.GetWords(1, 1));
        }

        [Test]
        public async Task Try_invoke_if_words_are_not_exist_in_database()
        {
            await ClearDatabase();
            var user = Util.GetUser(id: 1);
            var words = Util.GetWords(1, 1);
            var body = new StringContent(JsonConvert.SerializeObject(words), Encoding.UTF8, "application/json");
            await Util.PrepareAuthorization(body, user, encrypter, dbContext);

            var response = await client.PutAsync(method, body);
            Assert.AreNotEqual(HttpStatusCode.OK, response.StatusCode);

            var message = await response.Content.ReadAsStringAsync();
            var obj = JsonConvert.DeserializeObject<ExceptionMessage>(message);
            Assert.IsNotNull(obj);
            Assert.AreEqual(ErrorCode.UpdateInDbException, obj.Code);
        }

        [Test]
        public async Task Try_invoke_if_it_is_ok()
        {
            await ClearDatabase();
            var user = Util.GetUser(id: 1);
            var group = Util.GetGroup(id: 1, userId: 1);
            var words = Util.GetWords(1, 1).ToList();
            for (int i = 0; i < words.Count(); i++)
            {
                words[i].Id = i + 1;
            }
            var body = new StringContent(JsonConvert.SerializeObject(words), Encoding.UTF8, "application/json");
            await Util.PrepareAuthorization(body, user, encrypter, dbContext);

            await dbContext.Groups.AddAsync(group);
            await dbContext.SaveChangesAsync();
            await dbContext.Words.AddRangeAsync(words);
            await dbContext.SaveChangesAsync();

            var response = await client.PutAsync(method, body);
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

            var message = await response.Content.ReadAsStringAsync();
            Assert.IsEmpty(message);

            Assert.AreEqual(words.Count(), await dbContext.Words.CountAsync());
        }

    }
}
