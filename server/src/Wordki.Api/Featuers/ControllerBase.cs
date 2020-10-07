using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Wordki.Api.Featuers
{
    public class ControllerBase : Microsoft.AspNetCore.Mvc.ControllerBase
    {
        protected readonly IMediator mediator;

        public ControllerBase(IMediator mediator)
        {
            this.mediator = mediator;
        }

        protected async Task<IActionResult> HandleCommand(IRequest request)
        {
            await mediator.Send(request);
            return new StatusCodeResult(200);
        }

        protected async Task<IActionResult> HandleCommand<T>(IRequest<T> request) => new JsonResult(await mediator.Send(request));

        protected async Task<IActionResult> HandlerQuery<T>(IRequest<T> request) => new JsonResult(await mediator.Send(request));
    }
}
