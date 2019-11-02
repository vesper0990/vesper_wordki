using Autofac;
using Wordki.Commands.Login;
using Wordki.Commands.Register;

namespace Wordki.Commands
{
    public class CommandModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<LoginCommandHandler>().AsImplementedInterfaces();
            builder.RegisterType<RegisterCommandHandler>().AsImplementedInterfaces();
        }
    }
}
