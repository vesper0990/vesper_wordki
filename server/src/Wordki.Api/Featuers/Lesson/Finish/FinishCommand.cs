using MediatR;

namespace Wordki.Api.Featuers.Lesson.Finish
{
    public class FinishCommand : IRequest
    {
        public long LessonId { get; set; }
    }
}
