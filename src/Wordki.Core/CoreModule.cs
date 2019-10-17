using Autofac;
using Wordki.Core.Data;
using Wordki.Core.Dtos;
using Wordki.Core.Mappers;

namespace Wordki.Core
{
    public class CoreModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<UserRepository>().AsImplementedInterfaces();

            builder.RegisterType<User.UserFactory>().AsImplementedInterfaces();

            builder.RegisterType<UserMapper>().AsImplementedInterfaces();
        }
    }
}
