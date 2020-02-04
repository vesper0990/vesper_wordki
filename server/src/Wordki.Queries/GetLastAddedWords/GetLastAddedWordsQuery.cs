using Wordki.Utils;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetLastAddedWords
{
    public class GetLastAddedWordsQuery : IQuery<LastAddedWordDto>
    {
        public long UserId { get; set; }
        public int Count { get; set; }

        private GetLastAddedWordsQuery() { }

        public static GetLastAddedWordsQuery Create(long userId, int count)
        {
            Condition.True(userId > 0, "userId must be defined");
            Condition.True(count > 0, "count must be defined");

            return new GetLastAddedWordsQuery
            {
                UserId = userId,
                Count = count
            };
        }
    }
}
