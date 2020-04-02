using Wordki.Infrastructure.Framework.ExceptionMiddleware;
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
            ValidateUserName(userName);
            ValidatePassword(password);

            return new LoginCommand()
            {
                UserName = userName,
                Password = password
            };
        }

        private static void ValidateUserName(string userName)
        {
            if (string.IsNullOrEmpty(userName))
            {
                throw new ApiException("Parameter 'userName' cannot be null or empty", ErrorCode.EmptyParameter);
            }
        }

        private static void ValidatePassword(string password)
        {
            if (string.IsNullOrEmpty(password))
            {
                throw new ApiException("Parameter 'password' cannot be null or empty", ErrorCode.EmptyParameter);
            }
        }
    }
}
