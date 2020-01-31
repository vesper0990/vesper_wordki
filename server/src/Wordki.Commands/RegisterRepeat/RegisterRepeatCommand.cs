using Wordki.Utils;
using Wordki.Utils.Commands;

namespace Wordki.Commands.RegisterRepeat
{
    public class RegisterRepeatCommand : ICommand
    {
        public long WordId { get; private set; }
        public int Result { get; private set; }

        private RegisterRepeatCommand() { }

        public static RegisterRepeatCommand Create(long wordId, int result)
        {
            Condition.True(wordId > 0, "wordId must be defined");

            return new RegisterRepeatCommand
            {
                WordId = wordId,
                Result = result
            };
        }
    }
}
