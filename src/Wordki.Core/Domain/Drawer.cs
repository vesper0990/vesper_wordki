using System;

namespace Wordki.Core
{
    public class Drawer
    {
        public const string OutOfRangeException = "Wrong value";

        public const int MaxValue = 4;
        public const int MinValue = 0;

        private Drawer(int value)
        {
            Value = value;
        }

        public int Value { get; private set; }

        public static Drawer Restore(int value)
        {
            if (value > MaxValue || value < MinValue)
            {
                throw new Exception(OutOfRangeException);
            }
            return new Drawer(value);
        }

        public static Drawer Create()
        {
            return new Drawer(MinValue);
        }

        public bool IsMax() => Value == MaxValue;

        public void Reset() => Value = 0;

        public void Increase()
        {
            if (!IsMax())
                Value++;
        }
    }
}
