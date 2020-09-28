using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Wordki.Api.Featuers
{
    public class ControllerBase : Microsoft.AspNetCore.Mvc.ControllerBase
    {
        protected readonly IMediator mediator;

        public ControllerBase(IMediator mediator)
        {
            this.mediator = mediator;
        }

        protected IActionResult HandleCommand(IRequest request)
        {
            mediator.Send(request);
            return new StatusCodeResult(200);
        }

        protected IActionResult HandleCommand<T>(IRequest<T> request) => new JsonResult(mediator.Send(request));

        protected IActionResult HandlerQuery<T>(IRequest<T> request) => new JsonResult(mediator.Send(request));
    }
}
