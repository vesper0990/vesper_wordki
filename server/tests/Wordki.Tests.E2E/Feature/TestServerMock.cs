using Autofac;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using Wordki.Api.Services;
using Wordki.Tests.Utils.ServerMock;

namespace Wordki.Tests.E2E.Feature
{
    public class TestServerMock : ServerMock<Startup>
    {
        public Mock<IDateTimeProvider> TimeProviderMock { get; private set; }
        public Mock<IEncrypter> EncrypterMock { get; private set; }

        protected override void ConfigureTestContainer(ContainerBuilder builder)
        {
            builder.RegisterInstance(TimeProviderMock.Object);
            builder.RegisterInstance(EncrypterMock.Object);
        }

        protected override void CreateMocks()
        {
            TimeProviderMock = Utils.DateTimeProvider;
            EncrypterMock = Utils.Encrypter;
        }
    }
}
