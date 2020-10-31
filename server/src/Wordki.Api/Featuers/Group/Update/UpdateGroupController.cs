using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Wordki.Api.Featuers.Group.Update
{
    [Route("group")]
    public class UpdateGroupController : ControllerBase
    {
        public UpdateGroupController(IMediator mediator) : base(mediator) { }

        
    }
}
