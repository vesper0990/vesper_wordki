using System;
using System.Linq;
using Wordki.Api.Domain;
using Wordki.Api.Domain2;
using Wordki.Utils.TimeProvider;

namespace Wordki.Api.Services
{
    public interface INextRepeatCalculator
    {
        DateTime Calculate(CardDetails details);
    }

    public class NextRepeatCalculator : INextRepeatCalculator
    {
        private readonly ITimeProvider timeProvider;

        public NextRepeatCalculator(ITimeProvider timeProvider)
        {
            this.timeProvider = timeProvider;
        }

        public DateTime Calculate(CardDetails details)
        {
            return timeProvider.GetDate().AddDays(GetDay(details.Drawer));
        }

        private int GetDay(int drawer)
        {
            if (drawer == 0) return 1;
            else if (drawer == 1) return 2;
            else if (drawer == 2) return 3;
            else if (drawer == 3) return 5;
            else if (drawer == 4) return 7;
            else return 0;
        }
    }
}
