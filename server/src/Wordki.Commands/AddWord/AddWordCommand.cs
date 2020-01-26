using Wordki.Utils;
using Wordki.Utils.Commands;

namespace Wordki.Commands.AddWord
{
    public class AddWordCommand : ICommand
    {
        public long GroupId { get; private set; }
        public string Language1 { get; private set; }
        public string Language2 { get; private set; }

        private AddWordCommand() { }

        public static AddWordCommand Create(long groupId, string language1, string language2)
        {
            Condition.True(groupId > 0, "groupId must be defined");
            Condition.False(string.IsNullOrEmpty(language1), "language1 must be defined");
            Condition.False(string.IsNullOrEmpty(language2), "language2 must be defined");

            return new AddWordCommand
            {
                GroupId = groupId,
                Language1 = language1,
                Language2 = language2
            };
        }
    }
}
