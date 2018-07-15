using Autofac;
using System.Reflection;
using Wordki.Infrastructure.Services;

namespace Wordki.Infrastructure.IoC.Modules
{
    public class ServicesModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            var assembly = typeof(ServicesModule)
                .GetTypeInfo()
                .Assembly;

            builder.RegisterAssemblyTypes(assembly)
                .Where(x => x.IsAssignableTo<IService>())
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();

            builder.RegisterType<Encrypter>().As<IEncrypter>().SingleInstance();
        }
    }
}
