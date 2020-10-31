using MediatR;

namespace Wordki.Api.Featuers.User.Register
{
    public class RegisterCommand : IRequest
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string PasswordRepeat { get; set; }
    }
}
