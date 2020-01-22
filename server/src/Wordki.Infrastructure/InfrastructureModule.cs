using Autofac;
using Wordki.Infrastructure.Framework.ExceptionMiddleware;
using Wordki.Infrastructure.Framework.UserProvider;
using Wordki.Infrastructure.Services;

namespace Wordki.Infrastructure
{
    public class InfrastructureModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<ExceptionHandlerMiddleware>().AsImplementedInterfaces();
            builder.RegisterType<UserProvider>().AsImplementedInterfaces();
            builder.RegisterType<AuthenticationService>().AsImplementedInterfaces();
            builder.RegisterType<Encrypter>().AsImplementedInterfaces();
            builder.RegisterType<DataInitializer>().AsImplementedInterfaces();
        }
    }
}
