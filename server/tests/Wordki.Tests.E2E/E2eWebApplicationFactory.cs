using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using Newtonsoft.Json;
using NUnit.Framework;
using Wordki.Api.Domain2;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Services;
using Wordki.Utils.HttpContext;

namespace Wordki.Tests.E2E
{
    public abstract class E2eWebApplicationTestBase
    {
        private E2eWebApplicationFactory factory;

        protected Mock<IEncrypter> EncrypterMock { get; }
        protected Mock<IHttpContextProvider> HttpContextProviderMock { get; }
        protected Mock<Wordki.Utils.TimeProvider.ITimeProvider> Time2ProviderMock { get; }
        protected Mock<IAuthenticationService> AuthenticationService { get; }

        protected virtual Action<IServiceCollection> InitalConfig { get; set; }
        protected HttpClient Client => factory.Client;

        protected E2eWebApplicationTestBase()
        {
            EncrypterMock = Utils.Encrypter;
            HttpContextProviderMock = Utils.HttpContextProvider;
            Time2ProviderMock = Utils.TimeProvider;
            AuthenticationService = Utils.AuthenticationService;
        }

        [SetUp]
        public async Task Setup()
        {
            if (factory is null)
            {
                factory = new E2eWebApplicationFactory(services =>
                {
                    services.AddScoped(s => EncrypterMock.Object);
                    services.AddScoped(s => HttpContextProviderMock.Object);
                    services.AddScoped(s => Time2ProviderMock.Object);
                    services.AddScoped(s => AuthenticationService.Object);
                    if (InitalConfig != null)
                    {
                        InitalConfig(services);
                    }
                });
            }
            await PerpareDatabase();
        }

        private async Task PerpareDatabase()
        {
            await using var context = DbContext;
            await context.Database.EnsureDeletedAsync();
            await context.Database.EnsureCreatedAsync();
            await context.SaveChangesAsync();
        }
        protected WordkiDbContext2 DbContext =>
            new WordkiDbContext2(factory.Services.GetService<IConnectionStringProvider>());

        protected async Task AddAsync(object entity)
        {
            await using var context = DbContext;
            await context.AddAsync(entity);
            await context.SaveChangesAsync();
        }
        protected StringContent CreateContent<T>(T request)
        => new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");
    }

    public class E2eWebApplicationFactory : WebApplicationFactory<Startup>
    {

        private readonly Lazy<HttpClient> httpClient;
        private readonly Action<IServiceCollection> initialConfig;

        public HttpClient Client => httpClient.Value;
        public E2eWebApplicationFactory(Action<IServiceCollection> initialConfig = null) : base()
        {
            Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", "Test");
            this.initialConfig = initialConfig;
            httpClient = new Lazy<HttpClient>(CreateClient());
        }

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            base.ConfigureWebHost(builder);
            builder.ConfigureTestServices(services =>
            {
                initialConfig?.Invoke(services);
            });
        }


    }
}