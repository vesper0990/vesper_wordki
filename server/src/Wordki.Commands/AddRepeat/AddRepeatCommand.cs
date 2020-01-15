using Wordki.Utils.Commands;

namespace Wordki.Commands.AddRepeat
{
    public class AddRepeatCommand : ICommand
    {
        public long WordId { get; set; }
        public long UserId { get; set; }
        public int Result { get; set; }

        private AddRepeatCommand() { }

        public static AddRepeatCommand Create(long wordId, long userId, int result)
        {
            return new AddRepeatCommand()
            {
                WordId = wordId,
                UserId = userId,
                Result = result
            };
        }
    }
}
