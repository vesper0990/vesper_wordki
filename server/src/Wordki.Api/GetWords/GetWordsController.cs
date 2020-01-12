using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Wordki.Api.GetWords
{
    [Route("[controller]")]
    public class GetWordsController : ControllerBase
    {
        static int Index = 0;

        [HttpGet("{count}")]
        public IActionResult Get(int count)
        {
            var words = new List<GetWordsDto>();
            while (words.Count < count)
            {
                words.Add(new GetWordsDto
                {
                    Id = Index,
                    Language1 = $"Word {Index}",
                    Language2 = $"Słowo {Index}",
                    Drawer = 1
                });
                Index++;
            }
            return new JsonResult(words);
        }

    }
}
