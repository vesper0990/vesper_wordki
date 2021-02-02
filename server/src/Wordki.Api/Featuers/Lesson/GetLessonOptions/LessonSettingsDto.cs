using System.Collections.Generic;

namespace Wordki.Api.Featuers.Lesson.GetLessonSettings
{
    public class LessonSettingsDto
    {
        public int RepetitionsCount { get; set; }
        public int NewCardsCount { get; set; }
        public IEnumerable<int> Languages { get; set; }
    }
}