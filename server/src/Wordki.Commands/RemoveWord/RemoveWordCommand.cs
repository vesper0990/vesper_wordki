using Wordki.Utils;
using Wordki.Utils.Commands;

namespace Wordki.Commands.RemoveWord
{
    public class RemoveWordCommand : ICommand
    {
        public long WordId { get; private set; }
        public long GroupId { get; private set; }

        private RemoveWordCommand() { }

        public static RemoveWordCommand Create(long groupId, long wordId)
        {
            Condition.True(wordId > 0, "wordId must to be defined");
            Condition.True(groupId > 0, "groupId must to be defined");

            return new RemoveWordCommand
            {
                WordId = wordId,
                GroupId = groupId
            };
        }
    }
}