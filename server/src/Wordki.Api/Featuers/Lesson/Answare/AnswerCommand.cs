using MediatR;
using Wordki.Api.Domain;

namespace Wordki.Api.Featuers.Lesson.Answer
{
    public class AnswerCommand : IRequest
    {
        public long LessonId { get; set; }
        public long CardId { get; set; }
        public RepeatResultEnum repeatReuslt { get; set; }
        public QuestionSideEnum QuestionSide { get; set; }
    }
}
