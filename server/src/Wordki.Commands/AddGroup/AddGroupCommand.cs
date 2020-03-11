using System.Collections.Generic;
using Wordki.Utils;
using Wordki.Utils.Commands;

namespace Wordki.Commands.AddGroup
{
    public class AddGroupCommand : ICommand
    {
        public long UserId { get; private set; }
        public string Name { get; private set; }
        public int Language1 { get; set; }
        public int Language2 { get; set; }
        public IEnumerable<Word> Words { get; private set; }

        private AddGroupCommand() { }

        public static AddGroupCommand Create(long userId, string name, int langauge1, int langauge2, IEnumerable<Word> words)
        {
            Condition.True(userId > 0, "userId must be defined");
            Condition.False(string.IsNullOrEmpty(name), "name must be defined");

            return new AddGroupCommand{
                UserId = userId,
                Name = name,
                Language1 = langauge1,
                Language2 = langauge2,
                Words = words
            };
        }

        public class Word
        {
            public string Language1 { get; private set; }
            public string Language2 { get; private set; }
            public string Example1 { get; private set; }
            public string Example2 { get; private set; }
            public string Comment { get; private set; }
            private Word() { }

            public static Word Create(
                string language1,
                string language2,
                string example1,
                string example2,
                string comment)
            {
                Condition.False(string.IsNullOrEmpty(language1), "langauge1 must be defined");
                Condition.False(string.IsNullOrEmpty(language2), "langauge2 must be defined");

                return new Word
                {
                    Language1 = language2,
                    Language2 = language2,
                    Example1 = example1,
                    Example2 = example2,
                    Comment = comment
                };
            }
        }

    }
}