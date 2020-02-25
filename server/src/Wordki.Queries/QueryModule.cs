using Autofac;
using Wordki.Queries.GetGroup;
using Wordki.Queries.GetGroups;
using Wordki.Queries.GetLastAddedWords;
using Wordki.Queries.GetLastFailedWord;
using Wordki.Queries.GetNextWords;
using Wordki.Queries.GetUser;
using Wordki.Queries.GetWordsFromGroup;

namespace Wordki.Queries
{
    public class QueryModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<GetUserQueryHandler>().AsImplementedInterfaces();
            builder.RegisterType<GetNextWordsQueryHandler>().AsImplementedInterfaces();
            builder.RegisterType<GetGroupsQueryHandler>().AsImplementedInterfaces();
            builder.RegisterType<GetGroupQueryHandler>().AsImplementedInterfaces();
            builder.RegisterType<GetWordsFromGroupQueryHandler>().AsImplementedInterfaces();
            builder.RegisterType<GetLastAddedWordsQueryHandler>().AsImplementedInterfaces();
            builder.RegisterType<GetLastFailedWordQueryHandler>().AsImplementedInterfaces();
        }
    }
}
