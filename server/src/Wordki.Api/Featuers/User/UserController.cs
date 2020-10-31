using MediatR;
using Microsoft.AspNetCore.Components;

namespace Wordki.Api.Featuers.User
{
    [Route("user")]
    public class UserController : ControllerBase
    {
        public UserController(IMediator mediator) : base(mediator)
        {
        }
    }
}
