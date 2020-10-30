using System;
using System.Linq;
using Wordki.Api.Domain;
using Wordki.Utils.TimeProvider;

namespace Wordki.Api.Services
{
    public interface INextRepeatCalculator
    {
        DateTime Calculate(Card card, QuestionSideEnum questionSide);
    }

    public class NextRepeatCalculator : INextRepeatCalculator
    {
        private readonly ITimeProvider timeProvider;

        public NextRepeatCalculator(ITimeProvider timeProvider)
        {
            this.timeProvider = timeProvider;
        }

        public DateTime Calculate(Card card, QuestionSideEnum questionSide)
        {
            var side = questionSide == QuestionSideEnum.Heads ? card.Heads : card.Tails;
            var repeatsCount = card.Repeats.Count(r => r.QuestionSide == questionSide);
            return timeProvider.GetDate().AddDays(GetDay(side.State.Drawer));
        }

        private int GetDay(Drawer drawer)
        {
            if (drawer.Value == 0) return 1;
            else if (drawer.Value == 1) return 2;
            else if (drawer.Value == 2) return 3;
            else if (drawer.Value == 3) return 5;
            else if (drawer.Value == 4) return 7;
            else return 0;
        }
    }
}
