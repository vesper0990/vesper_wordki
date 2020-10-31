namespace Wordki.Infrastructure.Framework.ExceptionMiddleware
{
    public enum ErrorCode
    {
        Default,

        EmptyParameter,
        EmptyRequest,

        UserNotFound,

        UserAlreadyExists,
        PasswordNotConfirmed,

    }
}
