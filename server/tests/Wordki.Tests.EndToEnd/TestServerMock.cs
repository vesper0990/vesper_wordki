using Autofac;
using Moq;
using Wordki.Infrastructure.Services;
using Wordki.Tests.Utils.ServerMock;
using Wordki.Utils.HttpContext;
using Wordki.Utils.TimeProvider;

namespace Wordki.Tests.EndToEnd
{
    public class TestServerMock : ServerMock<Startup>
    {

        public Mock<ITimeProvider> TimeProviderMock { get; private set; }
        public Mock<IEncrypter> EncrypterMock { get; private set; }
        public Mock<IHttpContextProvider> HttpContextProviderMock { get; private set; }

        protected override void ConfigureTestContainer(ContainerBuilder builder)
        {
            builder.RegisterInstance(TimeProviderMock.Object);
            builder.RegisterInstance(EncrypterMock.Object);
        }

        protected override void CreateMocks()
        {
            TimeProviderMock = Utils.TimeProvider;
            EncrypterMock = Utils.Encrypter;
            HttpContextProviderMock = Utils.HttpContextProvider;
        }
    }
}
