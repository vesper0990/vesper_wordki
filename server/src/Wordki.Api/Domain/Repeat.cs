using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;

namespace Wordki.Api.Domain
{
    public class Repeat
    {
        public long Id { get; set; }
        public DateTime DateTime { get; set; }
        public RepeatResult Result { get; set; }
        public Card Word { get; set; }
    }

    public enum RepeatResultEnum
    {
        Correct,
        Accepted,
        Wrong
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
}
