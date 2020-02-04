using Wordki.Utils;
using Wordki.Utils.Commands;

namespace Wordki.Commands.UpdateWord
{
    public class UpdateWordCommand : ICommand
    {
        public long GroupId { get; set; }
        public long WordId { get; set; }
        public string Language1 { get; set; }
        public string Language2 { get; set; }
        public string Example1 { get; set; }
        public string Example2 { get; set; }
        public string Comment { get; set; }
        public bool IsVisible { get; set; }

        public static UpdateWordCommand Create(long groupId, long wordId, string language1, string language2, bool isVisible)
        {
            Condition.True(groupId > 0, "groupId must be defined");
            Condition.True(wordId > 0, "wordId must be defined");
            Condition.False(string.IsNullOrEmpty(language1), "language1 must be defined");
            Condition.False(string.IsNullOrEmpty(language2), "language2 must be defined");

            return new UpdateWordCommand
            {
                GroupId = groupId,
                WordId = wordId,
                Language1 = language1,
                Language2 = language2,
                IsVisible = isVisible
            };
        }
    }
}
