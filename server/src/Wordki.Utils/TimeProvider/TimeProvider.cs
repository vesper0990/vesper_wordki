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
            return DateTime.Now;
        }

        public DateTime GetDate()
        {
            var now = DateTime.Now;
            return new DateTime(now.Year, now.Month, now.Day);
        }


    }
}
