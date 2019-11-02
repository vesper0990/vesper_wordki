using System;
using Autofac;
using Moq;
using Microsoft.Extensions.DependencyInjection;
using Wordki.Core;
using Wordki.Core.Data;
using Wordki.Infrastructure.Services;
using Wordki.Tests.Utils.ServerMock;
using Wordki.Utils.TimeProvider;

namespace Wordki.Tests.EndToEnd.Login
{
    public class LoginServerMock : ServerMock<Startup>
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

        public User CreateUser()
        {
            var factory = Server.Host.Services.GetService<IUserFactory>();
            return factory.Create("kamil", "aaaa");
        }
    }
}
