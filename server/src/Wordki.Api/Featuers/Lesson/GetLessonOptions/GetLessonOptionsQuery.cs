using MediatR;

namespace Wordki.Api.Featuers.Lesson.GetLessonSettings
{
    public class GetLessonSettingsQuery : IRequest<LessonSettingsDto> { }
}