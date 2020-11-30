using System;

namespace Wordki.Utils.TimeProvider
{
    public interface ITimeProvider
    {
        DateTime GetTime();
        DateTime GetDate();
    }

    public class TimeProvider : ITimeProvider
    {
        public DateTime GetTime()
        {
            return DateTime.UtcNow;
        }

        public DateTime GetDate()
        {
            var now = DateTime.UtcNow;
            return new DateTime(now.Year, now.Month, now.Day);
        }


    }
}
