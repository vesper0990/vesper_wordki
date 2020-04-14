using System;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetCountWordsByDate
{
    public class GetCountWordsByDateQuery : IQuery<CountWordsByDateDto>
    {
        public long UserId { get; private set; }
        public DateTime Date { get; private set; }

        private GetCountWordsByDateQuery() { }

        public static GetCountWordsByDateQuery Create(long userId, DateTime date)
        {
            if(userId <= 0)
            {
                throw new Exception("userId is 0");
            }

            return new GetCountWordsByDateQuery
            {
                UserId = userId,
                Date = date
            };
        }
    }
}
