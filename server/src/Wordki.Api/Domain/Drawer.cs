using System;

namespace Wordki.Api.Domain
{
    public class Drawer
    {
        public int Value { get; set; }

        private Drawer(int value)
        {
            Value = value;
        }

        public static Drawer Create(int value)
        {
            if (value < 1 && value > 5)
            {
                throw new Exception();
            }
            return new Drawer(value);
        }
    }
}
