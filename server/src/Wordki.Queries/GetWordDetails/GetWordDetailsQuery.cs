using Wordki.Utils;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetWordDetails
{
    public class GetWordDetailsQuery : IQuery<GetWordDetailsDto>
    {
        public long WordId { get; private set; }
        public long GroupId { get; private set; }

        private GetWordDetailsQuery() { }

        public static GetWordDetailsQuery Create(long groupId, long wordId)
        {
            Condition.True(wordId > 0, "wordId must be defained");
            Condition.True(groupId > 0, "groupId must be defained");

            return new GetWordDetailsQuery
            {
                WordId = wordId,
                GroupId = groupId,
            };
        }
    }
}
