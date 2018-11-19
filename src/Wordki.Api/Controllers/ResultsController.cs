using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Wordki.Infrastructure.DTO;
using Wordki.Infrastructure.Services;

namespace Wordki.Api.Controllers
{
    [Route("[controller]")]
    public class ResultsController : Controller
    {
        private readonly IResultService resultService;
        private readonly IAuthorizer authorizer;

        public ResultsController(IResultService resultService, IAuthorizer authorizer)
        {
            this.resultService = resultService;
            this.authorizer = authorizer;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            var results = await resultService.GetAllAsync();
            return Json(results);
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] ResultDTO resultDto)
        {
            if (resultDto == null)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ExceptionMessage(ErrorCode.NullArgumentException, $"Parameter {nameof(resultDto)} cannot be null."));
            }
            var userId = await authorizer.AuthorizeAsync(Request);
            var result = await resultService.AddAsync(resultDto, userId);
            return StatusCode((int)HttpStatusCode.Created, result);
        }

        [HttpPost("addAll")]
        public async Task<IActionResult> AddAll([FromBody] IEnumerable<ResultDTO> resultsDto)
        {
            if (resultsDto == null)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ExceptionMessage(ErrorCode.NullArgumentException, $"Parameter {nameof(resultsDto)} cannot be null."));
            }
            if (resultsDto.Count() == 0)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ExceptionMessage(ErrorCode.NullArgumentException, $"Parameter {nameof(resultsDto)} cannot be empty"));
            }
            var userId = await authorizer.AuthorizeAsync(Request);
            var result = await resultService.AddAllAsync(resultsDto, userId);
            return StatusCode((int)HttpStatusCode.Created, result);
        }
    }
}