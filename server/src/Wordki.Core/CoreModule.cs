using Autofac;
using Wordki.Core.Data;
using Wordki.Core.Mappers;

namespace Wordki.Core
{
    public class CoreModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<UserRepository>().AsImplementedInterfaces();
            builder.RegisterType<GroupRepository>().AsImplementedInterfaces();
            builder.RegisterType<User.UserFactory>().AsImplementedInterfaces();
            builder.RegisterType<Word.WordFactory>().AsImplementedInterfaces();
            builder.RegisterType<User.UserLogin>().AsImplementedInterfaces();
            builder.RegisterType<UserMapper>().AsImplementedInterfaces();
            builder.RegisterType<GroupMapper>().AsImplementedInterfaces();
            builder.RegisterType<WordMapper>().AsImplementedInterfaces();
        }
    }
}
