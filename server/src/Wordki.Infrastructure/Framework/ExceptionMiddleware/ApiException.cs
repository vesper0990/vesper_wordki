using System;

namespace Wordki.Infrastructure.Framework.ExceptionMiddleware
{
    public class ApiException : Exception
    {
        public ErrorCode Code { get; private set; }

        public ApiException(string message) : base(message)
        {
            Code = ErrorCode.Default;
        }

        public ApiException(string message, Exception innerException) : base(message, innerException)
        {
            Code = ErrorCode.Default;
        }

        public ApiException(string message, ErrorCode code) : base(message)
        {
            Code = code;
        }

        public ApiException(string message, Exception innerException, ErrorCode code) : base(message, innerException)
        {
            Code = code;
        }
    }
}
