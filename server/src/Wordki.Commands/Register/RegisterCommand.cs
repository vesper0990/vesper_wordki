using Wordki.Infrastructure.Framework.ExceptionMiddleware;
using Wordki.Utils;
using Wordki.Utils.Commands;

namespace Wordki.Commands.Register
{
    public class RegisterCommand : ICommand
    {

        private RegisterCommand() { }

        public string UserName { get; private set; }
        public string Password { get; private set; }

        public static RegisterCommand Create(string userName, string password, string passwordConfirmation)
        {
            ValidateUserName(userName);
            ValidatePassword(password, passwordConfirmation);

            return new RegisterCommand()
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

        private static void ValidatePassword(string password, string passwordConfiramtion)
        {
            if (string.IsNullOrEmpty(password))
            {
                throw new ApiException("Parameter 'password' cannot be null or empty", ErrorCode.EmptyParameter);
            }

            if (string.IsNullOrEmpty(passwordConfiramtion))
            {
                throw new ApiException("Parameter 'passwordConfirmation' cannot be null or empty", ErrorCode.EmptyParameter);
            }

            if (!password.Equals(passwordConfiramtion))
            {
                throw new ApiException("Parameter 'passwordConfirmation' cannot be null or empty", ErrorCode.PasswordNotConfirmed);
            }
        }
    }
}
