using System;

namespace Wordki.Utils.TimeProvider
{
    public interface ITimeProvider
    {
        DateTime GetTime();
    }

    public class TimeProvider : ITimeProvider
    {
        public DateTime GetTime()
        {
            return DateTime.Now;
        }
    }
}
