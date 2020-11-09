using Wordki.Api.Domain;

namespace Wordki.Api.Featuers.Card.GetNextRepeat
{
    public class NextRepeatDto
    {
        public string GroupName { get; set; }
        public int Language1 { get; set; }
        public int Language2 { get; set; }
        public Side Heads { get; set; }
        public Side Tails { get; set; }
    }
}
