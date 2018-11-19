using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Wordki.Infrastructure.DTO;
using Wordki.Infrastructure.Services;

namespace Wordki.Api.Controllers
{
    [Route("[controller]")]
    public class WordsController : Controller
    {

        private readonly IWordService wordService;
        private readonly IAuthenticator<string> authenticator;

        public WordsController(IWordService wordService, IAuthenticator<string> authenticator)
        {
            this.wordService = wordService;
            this.authenticator = authenticator;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddWord([FromBody] WordDTO wordDto, [FromHeader] string apiKey)
        {
            if (wordDto == null)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ExceptionMessage(ErrorCode.NullArgumentException, $"Parameter {nameof(wordDto)} cannot be null"));
            }
            var userId = await authenticator.Authenticate(apiKey);
            var result = await wordService.AddAsync(wordDto, userId);
            return StatusCode((int)HttpStatusCode.Created, result);
        }

        [HttpPost("addAll")]
        public async Task<IActionResult> AddAll([FromBody] IEnumerable<WordDTO> wordsDto, [FromHeader] string apiKey)
        {
            if (wordsDto == null)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ExceptionMessage(ErrorCode.NullArgumentException, $"Parameter {nameof(wordsDto)} cannot be null"));
            }
            if (wordsDto.Count() == 0)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ExceptionMessage(ErrorCode.NullArgumentException, $"Parameter {nameof(wordsDto)} cannot be empty"));
            }
            var userId = await authenticator.Authenticate(apiKey);
            var result = await wordService.AddAllAsync(wordsDto, userId);
            return StatusCode((int)HttpStatusCode.Created, result);
        }

        [HttpDelete("remove/{wordId}")]
        public async Task<IActionResult> Remove(long wordId, [FromHeader] string apiKey)
        {
            if (wordId == 0)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ExceptionMessage(ErrorCode.NullArgumentException, $"Parameter {nameof(wordId)} cannot be equal 0"));
            }
            await authenticator.Authenticate(apiKey);
            await wordService.RemoveAsync(wordId);
            return Ok();
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] WordDTO wordDto, [FromHeader] string apiKey)
        {
            if (wordDto == null)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ExceptionMessage(ErrorCode.NullArgumentException, $"Parameter {nameof(wordDto)} cannot be null"));
            }
            await authenticator.Authenticate(apiKey);
            await wordService.UpdateAsync(wordDto);
            return Ok();
        }

        [HttpPut("updateAll")]
        public async Task<IActionResult> UpdateAll([FromBody] IEnumerable<WordDTO> wordsDto, [FromHeader] string apiKey)
        {
            if (wordsDto == null)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ExceptionMessage(ErrorCode.NullArgumentException, $"Parameter {nameof(wordsDto)} cannot be null"));

            }
            if (wordsDto.Count() == 0)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new ExceptionMessage(ErrorCode.NullArgumentException, $"Parameter {nameof(wordsDto)} cannot be empty"));

            }
            await authenticator.Authenticate(apiKey);
            await wordService.UpdateAllAsync(wordsDto);
            return Ok();
        }
    }
}
