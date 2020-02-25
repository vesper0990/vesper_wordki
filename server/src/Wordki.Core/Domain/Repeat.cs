using System;
using Wordki.Utils;
using Wordki.Utils.Domain;
using Wordki.Utils.TimeProvider;

namespace Wordki.Core.Domain
{
    public class Repeat : IDomainObject
    {
        public long Id { get; private set; }
        public long WordId { get; set; }
        public DateTime DateTime { get; private set; }
        public int Result { get; private set; }
        public bool NeedUpdate { get; private set; }

        private Repeat() { }

        public static Repeat Restore(long id, long wordId, DateTime dateTime, int result)
        {
            return new Repeat()
            {
                Id = id,
                WordId = wordId,
                DateTime = dateTime,
                Result = result
            };
        }

        public void AddToWord(Word word)
        {
            WordId = word.Id;
            NeedUpdate = true;
        }

        public class RepeatFactory : IRepeatFactory
        {
            private readonly ITimeProvider timeProvider;

            public RepeatFactory(ITimeProvider timeProvider)
            {
                this.timeProvider = timeProvider;
            }

            public Repeat Create(long wordId, int result)
            {
                Condition.True(wordId != 0, "wordId must be defined");
                return new Repeat()
                {
                    Id = 0,
                    WordId = wordId,
                    DateTime = timeProvider.GetTime(),
                    Result = result
                };
            }
        }
    }
    
    public interface IRepeatFactory
    {
        Repeat Create(long wordId, int result);
    }
}
