using System;
using System.Collections.Generic;

namespace Wordki.Api.Domain
{
    public class Repeat
    {
        public long Id { get; set; }
        public DateTime DateTime { get; set; }
        public int Result { get; set; }
        public QuestionSideEnum QuestionSide { get; set; }
        public Card Word { get; set; }
        public Lesson Lesson { get; set; }
    }

    public enum RepeatResultEnum
    {
        Correct = 1,
        Accepted = 0,
        Wrong = -1
    }

    public class RepeatResult
    {
        public int Value { get; private set; }
        public RepeatResultEnum Type { get; private set; }

        public static RepeatResult Correct = new RepeatResult(1, RepeatResultEnum.Correct);
        public static RepeatResult Accepted = new RepeatResult(0, RepeatResultEnum.Accepted);
        public static RepeatResult Wrong = new RepeatResult(-1, RepeatResultEnum.Wrong);

        private RepeatResult(int value, RepeatResultEnum type)
        {
            Value = value;
            Type = type;
        }

        private static readonly IDictionary<int, RepeatResult> Map = new Dictionary<int, RepeatResult>()
        {
            {1, Correct},
            {0, Accepted},
            {-1, Wrong},
        };

        public static RepeatResult Create(int value) => Map[value];
    }

    public enum QuestionSideEnum
    {
        Front,
        Back,
    }
}
