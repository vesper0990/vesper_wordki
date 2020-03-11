using System;
using System.Collections.Generic;
using Wordki.Core.Domain;
using Wordki.Utils.Domain;
using Wordki.Utils.TimeProvider;

namespace Wordki.Core
{
    public class Word : IDomainObject
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
        public long GroupId { get; set; }
        public string Language1 { get; private set; }
        public string Language2 { get; private set; }
        public string Exapmle1 { get; private set; }
        public string Exapmle2 { get; private set; }
        public string Comment { get; private set; }
        public Drawer Drawer { get; private set; }
        public bool IsVisible { get; private set; }
        public DateTime NextRepeat { get; set; }
        public DateTime CreationDate { get; }
        public List<Repeat> Repeats { get; }
        public bool NeedUpdate { get; private set; }

        public static Word Restore(long id, long groupId, string language1, string language2, string exapmle1, string exapmle2,
            string comment, Drawer drawer, bool isVisible, DateTime creationDate, DateTime nextRepeat, IEnumerable<Repeat> repeats)
        {
            var word = new Word(id, groupId, language1, language2, exapmle1, exapmle2, comment, drawer, isVisible, creationDate)
            {
                NextRepeat = nextRepeat,
            };
            word.Repeats.AddRange(repeats);
            return word;
        }

        internal void Swap()
        {
            var temp = Language1;
            Language1 = Language2;
            Language2 = temp;

            temp = Exapmle1;
            Exapmle1 = Exapmle2;
            Exapmle2 = temp;
        }

        public void AddRepeat(Repeat repeat)
        {
            Repeats.Add(repeat);
            repeat.AddToWord(this);
            NeedUpdate = true;
        }

        public void AddToGroup(Group group)
        {
            GroupId = group.Id;
            NeedUpdate = true;
        }

        public void Update(string langauge1, string language2, string example1, string example2, string comment, bool isVisible)
        {
            NeedUpdate = true;
            Language1 = langauge1;
            Language2 = language2;
            Exapmle1 = example1;
            Exapmle2 = example2;
            Comment = comment;
            IsVisible = isVisible;
        }

        public void Remove(){
            GroupId = 0;
            NeedUpdate = true;
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
                    NeedUpdate = true
                };
            }
        }

    }
    public interface IWordFactory
    {
        Word Create(long groupId, string language1, string language2, string exapmle1, string example2, string comment);
    }
}
