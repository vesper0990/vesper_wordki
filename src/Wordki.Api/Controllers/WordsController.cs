using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wordki.Infrastructure;
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
                throw new ApiException($"Parameter {nameof(wordDto)} cannot be null", ErrorCode.NullArgumentException);
            }
            var userId = await authenticator.Authenticate(apiKey);
            wordDto = await wordService.AddAsync(wordDto, userId);
            return Json(wordDto);
        }

        [HttpPost("addAll")]
        public async Task<IActionResult> AddAll([FromBody] IEnumerable<WordDTO> wordsDto, [FromHeader] string apiKey)
        {
            if (wordsDto == null)
            {
                throw new ApiException($"Parameter {nameof(wordsDto)} cannot be null", ErrorCode.NullArgumentException);
            }
            if (wordsDto.Count() == 0){
                throw new ApiException($"Parameter {nameof(wordsDto)} cannot be empty", ErrorCode.NullArgumentException);
            }
            var userId = await authenticator.Authenticate(apiKey);
            wordsDto = await wordService.AddAllAsync(wordsDto, userId);
            return Json(wordsDto);
        }

        [HttpDelete("remove/{wordId}")]
        public async Task<IActionResult> Remove(long wordId, [FromHeader] string apiKey)
        {
            if(wordId == 0){
                throw new ApiException($"Parameter {nameof(wordId)} cannot be equal 0", ErrorCode.NullArgumentException);
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
                throw new ApiException($"Parameter {nameof(wordDto)} cannot be null", ErrorCode.NullArgumentException);
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
                throw new ApiException($"Parameter {nameof(wordsDto)} cannot be null", ErrorCode.NullArgumentException);
            }
            if (wordsDto.Count() == 0){
                throw new ApiException($"Parameter {nameof(wordsDto)} cannot be empty", ErrorCode.NullArgumentException);
            }
            await authenticator.Authenticate(apiKey);
            await wordService.UpdateAllAsync(wordsDto);
            return Ok();
        }
    }
}
