using System.Collections.Generic;
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

        public ResultsController(IResultService resultService, IAuthorizer authorizer){
            this.resultService = resultService;
            this.authorizer = authorizer;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll(){
            var results = await resultService.GetAllAsync();
            return Json(results);
        }

        [HttpPost("addAll")]
        public async Task<IActionResult> AddAll([FromBody] IEnumerable<ResultDTO> resultsDto){
            var userId = await authorizer.AuthorizeAsync(Request);
            resultsDto = await resultService.AddAllAsync(resultsDto, userId);
            return Json(resultsDto);
        }
    }
}
