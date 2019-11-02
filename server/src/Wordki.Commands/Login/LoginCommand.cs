using Wordki.Utils;
using Wordki.Utils.Commands;

namespace Wordki.Commands.Login
{
    public class LoginCommand : ICommand
    {

        private LoginCommand() { }

        public string UserName { get; private set; }
        public string Password { get; private set; }

        public static LoginCommand Create(string userName, string password)
        {
            Condition.MustBeDefined(userName, nameof(userName));
            Condition.MustBeDefined(password, nameof(password));

            return new LoginCommand()
            {
                UserName = userName,
                Password = password
            };
        }

    }
}
