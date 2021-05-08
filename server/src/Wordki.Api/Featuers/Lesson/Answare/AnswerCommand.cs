using MediatR;
using Wordki.Api.Domain;

namespace Wordki.Api.Featuers.Lesson.Answer
{
    public class AnswerCommand : IRequest
    {
        public long LessonId { get; set; }
        public long CardDetailId { get; set; }
        public RepeatResultEnum Result { get; set; }
    }
}
