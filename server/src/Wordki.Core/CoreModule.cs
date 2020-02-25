using Autofac;
using Wordki.Core.Data;
using Wordki.Core.Domain;
using Wordki.Core.Mappers;
using Wordki.Core.Services;

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
            builder.RegisterType<Repeat.RepeatFactory>().AsImplementedInterfaces();
            builder.RegisterType<UserMapper>().AsImplementedInterfaces();
            builder.RegisterType<GroupMapper>().AsImplementedInterfaces();
            builder.RegisterType<WordMapper>().AsImplementedInterfaces();
            builder.RegisterType<RepeatMapper>().AsImplementedInterfaces();
            builder.RegisterType<RepeatOrganizer>().AsImplementedInterfaces();
        }
    }
}
