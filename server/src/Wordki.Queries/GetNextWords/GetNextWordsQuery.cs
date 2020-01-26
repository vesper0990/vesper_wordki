using Wordki.Utils;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetNextWords
{
    public class GetNextWordsQuery : IQuery<GetNextWordsDto>
    {
        public int Count { get; private set; }
        public long UserId { get; private set; }

        private GetNextWordsQuery() { }

        public static GetNextWordsQuery Create(int count, long userId)
        {
            Condition.True(count > 0, "Count must be greater then 0");
            Condition.True(userId > 0, "UserId must be defined");

            return new GetNextWordsQuery
            {
                Count = count,
                UserId = userId
            };
        }
    }
}
