using Microsoft.Extensions.DependencyInjection;
using Moq;
using Wordki.Api.Services;
using Wordki.Tests.Utils.ServerMock;
using Wordki.Utils.HttpContext;
using Wordki.Utils.TimeProvider;

namespace Wordki.Tests.E2E.Feature
{
    public class TestServerMock : ServerMock<Startup>
    {
        public Mock<IDateTimeProvider> TimeProviderMock { get; private set; }
        public Mock<IEncrypter> EncrypterMock { get; private set; }
        public Mock<IHttpContextProvider> HttpContextProvider { get; private set; }
        public Mock<ITimeProvider> Time2ProviderMock { get;  private set;}

    protected override void ConfigureTestContainer(IServiceCollection services)
        {
            services.AddScoped<IDateTimeProvider>(s => TimeProviderMock.Object);
            services.AddScoped<IEncrypter>(s => EncrypterMock.Object);
            services.AddScoped<IHttpContextProvider>(s => HttpContextProvider.Object);
            services.AddScoped<ITimeProvider>(s => Time2ProviderMock.Object);
        }

        protected override void CreateMocks()
        {
            Time2ProviderMock = Utils.TimeProvider;
            TimeProviderMock = Utils.DateTimeProvider;
            EncrypterMock = Utils.Encrypter;
            HttpContextProvider = Utils.HttpContextProvider;
        }
    }
}
