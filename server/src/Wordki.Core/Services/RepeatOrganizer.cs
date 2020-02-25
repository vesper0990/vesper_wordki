using System;
using Wordki.Core.Domain;
using Wordki.Utils.TimeProvider;

namespace Wordki.Core.Services
{
    public interface IRepeatOrganizer
    {
        Repeat NoticeRepeat(Word word, int result);
    }

    public class RepeatOrganizer : IRepeatOrganizer
    {
        private readonly IRepeatFactory repeatFactory;
        private readonly ITimeProvider timeProvider;

        public RepeatOrganizer(IRepeatFactory repeatFactory, ITimeProvider timeProvider)
        {
            this.repeatFactory = repeatFactory;
            this.timeProvider = timeProvider;
        }

        public Repeat NoticeRepeat(Word word, int result)
        {
            var newRepeat = repeatFactory.Create(word.Id, result);
            if (result > 0)
            {
                word.Drawer.Increase();
            }
            else if (result < 0)
            {
                word.Drawer.Reset();
            }
            word.NextRepeat = CalculateNextRepeat(word.Drawer);
            word.AddRepeat(newRepeat);
            return newRepeat;
        }

        private DateTime CalculateNextRepeat(Drawer drawer)
        {
            return timeProvider.GetTime().AddDays(drawer.Value);
        }
    }
}
