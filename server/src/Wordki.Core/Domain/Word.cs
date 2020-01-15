using System;
using System.Collections.Generic;
using Wordki.Core.Domain;
using Wordki.Utils.TimeProvider;
using static Wordki.Core.Domain.Repeat;

namespace Wordki.Core
{
    public class Word
    {
        private Word(long id,
            long groupId,
            string language1,
            string language2,
            string exapmle1,
            string exapmle2,
            string comment,
            Drawer drawer,
            bool isVisible,
            DateTime creationDate)
        {
            Id = id;
            GroupId = groupId;
            Language1 = language1;
            Language2 = language2;
            Exapmle1 = exapmle1;
            Exapmle2 = exapmle2;
            Comment = comment;
            Drawer = drawer;
            IsVisible = isVisible;
            CreationDate = creationDate;
            Repeats = new List<Repeat>();
        }

        public long Id { get; }
        public long GroupId { get; }
        public string Language1 { get; private set; }
        public string Language2 { get; private set; }
        public string Exapmle1 { get; private set; }
        public string Exapmle2 { get; private set; }
        public string Comment { get; }
        public Drawer Drawer { get; }
        public bool IsVisible { get; }
        public DateTime NextRepeat { get; set; }
        public DateTime CreationDate { get; }
        public List<Repeat> Repeats { get; }

        public static Word Restore(long id, long groupId, string language1, string language2, string exapmle1, string exapmle2,
            string comment, Drawer drawer, bool isVisible, DateTime creationDate, DateTime nextRepeat)
        {
            return new Word(id, groupId, language1, language2, exapmle1, exapmle2, comment, drawer, isVisible, creationDate)
            {
                NextRepeat = nextRepeat
            };
        }

        internal void Swap()
        {
            var temp = Language1;
            Language1 = Language2;
            Language2 = Language1;

            temp = Exapmle1;
            Exapmle1 = Exapmle2;
            Exapmle2 = temp;
        }

        public void AddRepeat(Repeat repeat)
        {
            Repeats.Add(repeat);

        }

        public class WordFactory : IWordFactory
        {
            private readonly ITimeProvider timeProvider;

            public WordFactory(ITimeProvider timeProvider)
            {
                this.timeProvider = timeProvider;
            }

            public Word Create(long groupId, string language1, string language2, string exapmle1, string example2, string comment)
            {
                var drawer = Drawer.Create();
                var isVisible = true;
                var creationDate = timeProvider.GetTime();
                var nextRepeat = new DateTime(2000, 1, 1);
                return new Word(0, groupId, language1, language2, exapmle1, example2, comment, drawer, isVisible, creationDate)
                {
                    NextRepeat = nextRepeat,
                };
            }
        }

    }
    public interface IWordFactory
    {
        Word Create(long groupId, string language1, string language2, string exapmle1, string example2, string comment);
    }

    public interface IRepeatOrganizer
    {
        Repeat NoticeRepeat(Word word, int result);
    }

    public class RepeatOrganizer : IRepeatOrganizer
    {
        private readonly IRepeatFactory repeatFactory;

        public RepeatOrganizer(IRepeatFactory repeatFactory)
        {
            this.repeatFactory = repeatFactory;
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
            word.AddRepeat(newRepeat);
            return newRepeat;
        }

        private DateTime CalculateNextRepeat(Drawer drawer)
        {
            return new DateTime();
        }
    }
}
