using System;
using System.Collections.Generic;
using System.Text;
using Wordki.Utils;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetNextWords
{
    public class GetNextWordsForLessonQuery : IQuery<GetNextWordsDto>
    {
        public int Count { get; private set; }
        public int Offset { get; private set; }
        public int Question { get; private set; }
        public int Answer { get; private set; }
        public long UserId { get; private set; }


        private GetNextWordsForLessonQuery() { }

        public static GetNextWordsForLessonQuery Create(int count, int offset, int question, int answer, long userId)
        {
            Condition.True(count > 0, "Count must be greater then 0");
            Condition.True(offset >= 0, "Offset must be greater or equal 0");
            Condition.True(userId > 0, "UserId must be defined");

            return new GetNextWordsForLessonQuery
            {
                Count = count,
                UserId = userId,
                Offset = offset,
                Question = question,
                Answer = answer
            };
        }
    }
}
