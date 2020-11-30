using System;

namespace Wordki.Api.Services
{
    public interface IDateTimeProvider
    {
        DateTime Now();
    }

    public class DateTimeProvider : IDateTimeProvider
    {
        public DateTime Now() => new DateTime();
    }
}
