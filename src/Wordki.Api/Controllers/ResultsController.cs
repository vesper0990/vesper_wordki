using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Wordki.Infrastructure;
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
                throw new ApiException($"Parameter {nameof(resultDto)} cannot be null", ErrorCode.NullArgumentException);
            }
            var userId = await authorizer.AuthorizeAsync(Request);
            resultDto = await resultService.AddAsync(resultDto, userId);
            return Json(resultDto);
        }

        [HttpPost("addAll")]
        public async Task<IActionResult> AddAll([FromBody] IEnumerable<ResultDTO> resultsDto)
        {
            if (resultsDto == null)
            {
                throw new ApiException($"Parameter {nameof(resultsDto)} cannot be null", ErrorCode.NullArgumentException);
            }
            if (resultsDto.Count() == 0)
            {
                throw new ApiException($"Parameter {nameof(resultsDto)} cannot be empty", ErrorCode.NullArgumentException);
            }
            var userId = await authorizer.AuthorizeAsync(Request);
            resultsDto = await resultService.AddAllAsync(resultsDto, userId);
            return Json(resultsDto);
        }
    }
}