using Moq;
using Wordki.Core.Data;
using Autofac;
using Wordki.Utils.TimeProvider;
using System;
using Wordki.Infrastructure.Services;
using Wordki.Tests.Utils.ServerMock;

namespace Wordki.Tests.EndToEnd.Register
{
    public class RegisterServerMock : ServerMock<Startup>
    {
        public Mock<IUserRepository> UserRepositoryMock { get; private set; }
        public Mock<ITimeProvider> TimeProviderMock { get; private set; }
        public Mock<IEncrypter> EncrypterMock { get; private set; }

        protected override void ConfigureTestContainer(ContainerBuilder builder)
        {
            builder.RegisterInstance(UserRepositoryMock.Object);
            builder.RegisterInstance(TimeProviderMock.Object);
            builder.RegisterInstance(EncrypterMock.Object);
        }

        protected override void CreateMocks()
        {
            UserRepositoryMock = Utils.UserRepository;
            TimeProviderMock = Utils.TimeProvider;
            EncrypterMock = Utils.Encrypter;
        }
    }
}
