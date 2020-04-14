using System;
using Wordki.Queries.GetNextWords;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetWordsByDate
{
    public class GetWordsByDateQuery : IQuery<GetNextWordsDto>
    {
        public long UserId { get; private set; }
        public DateTime Date { get; private set; }

        private GetWordsByDateQuery() { }

        public static GetWordsByDateQuery Create(long userId, DateTime date) 
        {
            if(userId <= 0)
            {
                throw new Exception("userId cannot be equal or less then 0");
            }

            return new GetWordsByDateQuery
            {
                UserId = userId,
                Date = date
            };
        }
    }
}
