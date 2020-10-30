using Autofac;
using Moq;
using Wordki.Api.Services;
using Wordki.Tests.Utils.ServerMock;
using Wordki.Utils.HttpContext;

namespace Wordki.Tests.E2E.Feature
{
    public class TestServerMock : ServerMock<Startup>
    {
        public Mock<IDateTimeProvider> TimeProviderMock { get; private set; }
        public Mock<IEncrypter> EncrypterMock { get; private set; }
        public Mock<IHttpContextProvider> HttpContextProvider { get; private set; }

        protected override void ConfigureTestContainer(ContainerBuilder builder)
        {
            builder.RegisterInstance(TimeProviderMock.Object);
            builder.RegisterInstance(EncrypterMock.Object);
            builder.RegisterInstance(HttpContextProvider.Object);
        }

        protected override void CreateMocks()
        {
            TimeProviderMock = Utils.DateTimeProvider;
            EncrypterMock = Utils.Encrypter;
            HttpContextProvider = Utils.HttpContextProvider;
        }
    }
}
