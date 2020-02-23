using Wordki.Utils;
using Wordki.Utils.Commands;

namespace Wordki.Commands.Register
{
    public class RegisterCommand : ICommand
    {

        private RegisterCommand() { }

        public string UserName { get; private set; }
        public string Password { get; private set; }

        public static RegisterCommand Create(string userName, string password)
        {
            Condition.False(string.IsNullOrEmpty(userName), "userName cannot be empty");
            Condition.MustBeDefined(userName, nameof(userName));
            Condition.MustBeDefined(password, nameof(password));

            return new RegisterCommand()
            {
                UserName = userName,
                Password = password
            };
        }
    }
}
