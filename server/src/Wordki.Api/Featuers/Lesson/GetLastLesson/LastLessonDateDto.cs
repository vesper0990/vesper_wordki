using System;

namespace Wordki.Api.Featuers.Lesson.GetLastLesson
{
    public class LastLessonDateDto
    {
        public bool IsAnyLesson { get; set; }
        public DateTime Date { get; set; }
    }
}
