using Autofac;
using Wordki.Queries.GetUser;

namespace Wordki.Queries
{
    public class QueryModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<GetUserQueryHandler>().AsImplementedInterfaces();
        }
    }
}
