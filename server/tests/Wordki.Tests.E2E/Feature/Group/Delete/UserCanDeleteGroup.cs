using FizzWare.NBuilder;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using TestStack.BDDfy;
using Wordki.Api.Repositories.EntityFrameworkRepositories;

namespace Wordki.Tests.E2E.Feature.Group.Delete
{
    class UserCanDeleteGroup : TestBase
    {
        public UserCanDeleteGroup()
        {
            Request = new HttpRequestMessage(HttpMethod.Delete, "group/delete/1");
        }

        async Task GivenGroupsInDatabase()
        {
            using(var dbContext = new WordkiDbContext(Options))
            {
                var user = Builder<Api.Domain.User>.CreateNew()
                    .With(u => u.Id = 1)
                    .With(u => u.Name = "user")
                    .With(u => u.Password = Host.EncrypterMock.Object.Md5Hash("pass"))
                    .With(u => u.LastLoginDate = new DateTime(2020, 1, 1))
                    .With(u => u.CreationDate = new DateTime(2020, 1, 1))
                    .Build();
                dbContext.Users.Add(user);

                var sequence = new SequentialGenerator<long> { Direction = GeneratorDirection.Ascending, Increment = 1 };
                sequence.StartingWith(1);

                var builder = Builder<Api.Domain.Group>.CreateNew()
                    .With(g => g.Id = sequence.Generate())
                    .With(g => g.GroupLanguage1 = 1)
                    .With(g => g.GroupLanguage2 = 2)
                    .With(g => g.Name = "name");
                var groups = new Api.Domain.Group[] { builder.Build(), builder.Build() };

                dbContext.Groups.AddRange(groups);
                await dbContext.SaveChangesAsync();
            }
        }
        async Task WhenRequestReceived() => await SendRequest();

        void ThenResponseIsOk()
        {
            Assert.AreEqual(HttpStatusCode.OK, Response.StatusCode);
        }

        async Task AndThenResponseIsEmpty()
        {
            var message = await Response.Content.ReadAsStringAsync();
            Assert.IsEmpty(message);
        }

        async Task AndThenWordIsAdded()
        {
            using (var dbContext = new WordkiDbContext(Options))
            {
                var count = await dbContext.Groups.CountAsync();
                Assert.AreEqual(1, count);
            }
        }

        [Test]
        public void Execute()
        {
            this.BDDfy();
        }
    }
}
