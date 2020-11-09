using MediatR;
using System;

namespace Wordki.Api.Featuers.Lesson.GetLastLesson
{
    public class GetLastLessonQuery : IRequest<LastLessonDateDto>
    {
    }
}
