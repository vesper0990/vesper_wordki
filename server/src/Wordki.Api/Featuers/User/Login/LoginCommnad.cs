using MediatR;

namespace Wordki.Api.Featuers.User.Login
{
    public class LoginCommnad : IRequest
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
