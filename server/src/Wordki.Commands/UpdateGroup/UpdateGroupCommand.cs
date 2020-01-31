using Wordki.Core;
using Wordki.Utils;
using Wordki.Utils.Commands;

namespace Wordki.Commands.UpdateGroup
{
    public class UpdateGroupCommand : ICommand
    {
        public long GroupId { get; private set; }
        public string Name { get; private set; }
        public LanguageEnum Language1 { get; private set; }
        public LanguageEnum Language2 { get; private set; }


        private UpdateGroupCommand() { }

        public static UpdateGroupCommand Create(long groupId, string name, LanguageEnum langauge1, LanguageEnum language2)
        {
            Condition.True(groupId > 0, "groupId must be defined");
            Condition.False(string.IsNullOrEmpty(name), "name must be defined");

            return new UpdateGroupCommand
            {
                Name = name,
                Language1 = langauge1,
                Language2 = language2
            };
        }
    }
}
