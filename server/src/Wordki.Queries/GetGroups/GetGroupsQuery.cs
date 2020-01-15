using Wordki.Utils.Queries;

namespace Wordki.Queries.GetGroups
{
    public class GetGroupsQuery : IQuery<GetGroupsDto>
    {
        public long UserId { get; set; }

        private GetGroupsQuery() { }

        public static GetGroupsQuery Create(long userId)
        {
            return new GetGroupsQuery()
            {
                UserId = userId
            };
        }
    }
}
