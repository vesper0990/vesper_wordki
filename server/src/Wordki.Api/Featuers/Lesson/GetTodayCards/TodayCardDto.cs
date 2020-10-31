using Wordki.Api.Domain;

namespace Wordki.Api.Featuers.Lesson.GetTodayCards
{
    public class TodayCardDto
    {
        public long CardId { get; set; }
        public Side Heads { get; set; }
        public Side Tails { get; set; }
        public string GroupName { get; set; }
        public int HeadsLanguage { get; set; }
        public int TailsLanguage { get; set; }

    }
}
