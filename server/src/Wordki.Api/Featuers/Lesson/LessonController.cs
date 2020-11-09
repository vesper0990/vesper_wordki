using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Wordki.Api.Featuers.Card.GetLastAdded;
using Wordki.Api.Featuers.Lesson.Answare;
using Wordki.Api.Featuers.Lesson.Finish;
using Wordki.Api.Featuers.Lesson.GetTodayCardsCount;
using Wordki.Api.Featuers.Lesson.Start;

namespace Wordki.Api.Featuers.Lesson
{
    [Route("lesson")]
    public class LessonController : ControllerBase
    {
        public LessonController(IMediator mediator) : base(mediator) { }

        [HttpPost("start")]
        public async Task<IActionResult> Start() => await HandleCommand(new StartCommand());

        [HttpPut("finish")]
        public async Task<IActionResult> Finish([FromBody] FinishCommand command) => await HandleCommand(command);

        [HttpPost("answare")]
        public async Task<IActionResult> Answare([FromBody] AnswareCommand command) => await HandleCommand(command);

        [HttpGet("todaysCardCount")]
        public async Task<IActionResult> GetTodayCardsCount() => await HandlerQuery(new GetTodayCardsCountQuery());

        [HttpGet("lastLessonDate")]
        public async Task<IActionResult> GetLastLessonDate() => await HandlerQuery(new GetLastAddedQuery());
    }
}
