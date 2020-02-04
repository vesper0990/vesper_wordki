using Wordki.Utils;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetLastFailedWord
{
    public class GetLastFailedWordQuery: IQuery<LastFailedWordDto>
    {
        public long UserId { get; set; }

        private GetLastFailedWordQuery() { }

        public static GetLastFailedWordQuery Create(long userId)
        {
            Condition.True(userId > 0, "userId must be defined");
            return new GetLastFailedWordQuery
            {
                UserId = userId
            };
        }
    }
}
