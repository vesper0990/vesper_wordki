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
        private readonly IAuthorizer authorizer;

        public WordsController(IWordService wordService, IAuthorizer authorizer)
        {
            this.wordService = wordService;
            this.authorizer = authorizer;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddWord([FromBody] WordDTO wordDto)
        {
            if (wordDto == null)
            {
                throw new ApiException($"Parameter {nameof(wordDto)} cannot be null", ErrorCode.NullArgumentException);
            }
            var userId = await authorizer.AuthorizeAsync(Request);
            wordDto = await wordService.AddAsync(wordDto, userId);
            return Json(wordDto);
        }

        [HttpPost("addAll")]
        public async Task<IActionResult> AddAll([FromBody] IEnumerable<WordDTO> wordsDto)
        {
            if (wordsDto == null)
            {
                throw new ApiException($"Parameter {nameof(wordsDto)} cannot be null", ErrorCode.NullArgumentException);
            }
            if (wordsDto.Count() == 0){
                throw new ApiException($"Parameter {nameof(wordsDto)} cannot be empty", ErrorCode.NullArgumentException);
            }
            var userId = await authorizer.AuthorizeAsync(Request);
            wordsDto = await wordService.AddAllAsync(wordsDto, userId);
            return Json(wordsDto);
        }

        [HttpPost("remove")]
        public async Task<IActionResult> Remove([FromBody] long wordId)
        {
            if(wordId == 0){
                throw new ApiException($"Parameter {nameof(wordId)} cannot be equal 0", ErrorCode.NullArgumentException);
            }
            var userId = await authorizer.AuthorizeAsync(Request);
            await wordService.RemoveAsync(wordId);
            return Ok();
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] WordDTO wordDto)
        {
            if (wordDto == null)
            {
                throw new ApiException($"Parameter {nameof(wordDto)} cannot be null", ErrorCode.NullArgumentException);
            }
            await authorizer.AuthorizeAsync(Request);
            await wordService.UpdateAsync(wordDto);
            return Ok();
        }

        [HttpPut("updateAll")]
        public async Task<IActionResult> UpdateAll([FromBody] IEnumerable<WordDTO> wordsDto)
        {
            if (wordsDto == null)
            {
                throw new ApiException($"Parameter {nameof(wordsDto)} cannot be null", ErrorCode.NullArgumentException);
            }
            if (wordsDto.Count() == 0){
                throw new ApiException($"Parameter {nameof(wordsDto)} cannot be empty", ErrorCode.NullArgumentException);
            }
            await authorizer.AuthorizeAsync(Request);
            await wordService.UpdateAllAsync(wordsDto);
            return Ok();
        }
    }
}
