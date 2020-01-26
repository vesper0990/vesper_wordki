using Wordki.Utils;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetWordsFromGroup
{
    public class GetWordsFromGroupQuery : IQuery<GetWordsFromGroupDto>
    {
        public long GroupId { get; private set; }

        private GetWordsFromGroupQuery() { }

        public static GetWordsFromGroupQuery Create(long groupId)
        {
            Condition.True(groupId > 0, "groupId must be defined");

            return new GetWordsFromGroupQuery
            {
                GroupId = groupId
            };
        }
    }
}
