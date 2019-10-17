using System;

namespace Wordki.Utils
{
    public static class Condition
    {
        public static void MustBeDefined(object obj, string paramName)
        {
            if(obj is null)
            {
                throw new ArgumentException("Argument is not defined", paramName);
            }
        }

        public static void True(bool value, string message)
        {
            if (!value)
            {
                throw new ArgumentException(message);
            }
        }

        public static void False(bool value, string message)
        {
            if (value)
            {
                throw new ArgumentException(message);
            }
        }
    }
}
