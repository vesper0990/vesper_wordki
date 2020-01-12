using System;
using Wordki.Utils;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetWords
{
    public class GetWordsQuery : IQuery<GetWordsDto>
    {
        public int Count { get; set; }

        private GetWordsQuery() { }

        public static GetWordsQuery Create(int count)
        {
            Condition.True(count == 0, "Count must be defined");
            return new GetWordsQuery
            {
                Count = count
            };
        }
    }
}
