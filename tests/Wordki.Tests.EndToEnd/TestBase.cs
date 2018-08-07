using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NUnit.Framework;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Infrastructure.DTO;
using Wordki.Infrastructure.EntityFramework;
using Wordki.Infrastructure.Services;

namespace Wordki.Tests.EndToEnd
{
    public class TestBase
    {
        protected readonly TestServer server;
        protected readonly HttpClient client;
        protected readonly WordkiDbContext dbContext;
        protected readonly IEncrypter encrypter;
        protected string method;

        public TestBase()
        {
            server = new TestServer(new WebHostBuilder()
                .UseEnvironment("Testing")
                .UseStartup<Startup>());
            client = server.CreateClient();
            dbContext = server.Host.Services.GetService(typeof(WordkiDbContext)) as WordkiDbContext;
            encrypter = server.Host.Services.GetService(typeof(IEncrypter)) as IEncrypter;
        }

        public Task ClearDatabase()
        {
            dbContext.Database.EnsureDeleted();
            dbContext.Database.EnsureCreated();

            if (dbContext.Set<Result>().Local.Count != 0)
            {
                dbContext.Set<Result>().Local.ToList().ForEach(x => dbContext.Entry(x).State = EntityState.Detached);
                dbContext.SaveChanges();
            }
            if (dbContext.Set<Word>().Local.Count != 0)
            {
                dbContext.Set<Word>().Local.ToList().ForEach(x => dbContext.Entry(x).State = EntityState.Detached);
                dbContext.SaveChanges();
            }

            if (dbContext.Set<Group>().Local.Count != 0)
            {
                dbContext.Set<Group>().Local.ToList().ForEach(x => dbContext.Entry(x).State = EntityState.Detached);
                dbContext.SaveChanges();
            }

            if (dbContext.Set<User>().Local.Count != 0)
            {
                dbContext.Set<User>().Local.ToList().ForEach(x => dbContext.Entry(x).State = EntityState.Detached);
                dbContext.SaveChanges();
            }
            return Task.CompletedTask;
        }


        public virtual async Task Try_invoke_if_body_is_empty()
        {
            await ClearDatabase();
            var body = new StringContent("", Encoding.UTF8, "application/json");
            var respone = await GetAction()(method, body);
            Assert.AreNotEqual(HttpStatusCode.OK, respone.StatusCode, "StatusCode == OK");

            string message = await respone.Content.ReadAsStringAsync();

            var obj = JsonConvert.DeserializeObject<ExceptionMessage>(message);
            Assert.NotNull(obj, $"{nameof(obj)} unexpected is null");
            Assert.AreEqual(ErrorCode.NullArgumentException, obj.Code, "ExceptionMessage.Code != NullArgument");
        }

        public async Task Try_invoke_if_authorization_is_failed(object objToPush)
        {
            await ClearDatabase();
            var body = new StringContent(JsonConvert.SerializeObject(objToPush), Encoding.UTF8, "application/json");
            body.Headers.Add("userId", "1");
            body.Headers.Add("userId", "password");
            var respone = await GetAction()(method, body);
            Assert.AreNotEqual(HttpStatusCode.OK, respone.StatusCode, "StatusCode == OK");

            string message = await respone.Content.ReadAsStringAsync();
            var obj = JsonConvert.DeserializeObject<ExceptionMessage>(message);
            Assert.NotNull(obj, $"{nameof(obj)} unexpected is null");
            Assert.AreEqual(ErrorCode.AuthenticaitonException, obj.Code);
        }

        protected delegate Task<HttpResponseMessage> Action(string method, HttpContent content);

        private Action GetAction()
        {
            if (method.Contains("update"))
            {
                return client.PutAsync;
            }
            if (method.Contains("add") || method.Contains("remove") || method.Contains("register"))
            {
                return client.PostAsync;
            }
            return null;
        }


        protected async Task<User> PrepareUser(User user)
        {
            var noEncryptedPassword = user.Password;
            user.Password = encrypter.Md5Hash(user.Password);
            //await userRepository.AddAsync(user);
            user.Password = noEncryptedPassword;
            return await Task.FromResult(user);
        }
    }

    public static class TestExtensions
    {
        public static HttpContent AddAuthorizationHeaders(this HttpContent content, User user)
        {
            //content.Headers.Add("password", user.Password);
            //content.Headers.Add("userId", user.Id.ToString());
            content.Headers.Add("apiKey", user.ApiKey);
            return content;
        }

    }
}
