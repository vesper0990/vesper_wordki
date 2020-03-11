using Autofac;
using Wordki.Commands.AddGroup;
using Wordki.Commands.AddRepeat;
using Wordki.Commands.AddWord;
using Wordki.Commands.Login;
using Wordki.Commands.Register;
using Wordki.Commands.RemoveWord;
using Wordki.Commands.UpdateGroup;
using Wordki.Commands.UpdateWord;

namespace Wordki.Commands
{
    public class CommandModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<LoginCommandHandler>().AsImplementedInterfaces();
            builder.RegisterType<RegisterCommandHandler>().AsImplementedInterfaces();
            builder.RegisterType<AddWordCommandHandler>().AsImplementedInterfaces();
            builder.RegisterType<AddRepeatCommandHandler>().AsImplementedInterfaces();
            builder.RegisterType<UpdateWordCommandHandler>().AsImplementedInterfaces();
            builder.RegisterType<RemoveWordCommandHandler>().AsImplementedInterfaces();
            builder.RegisterType<UpdateGroupCommandHandler>().AsImplementedInterfaces();
            builder.RegisterType<AddGroupCommandHandler>().AsImplementedInterfaces();
        }
    }
}
