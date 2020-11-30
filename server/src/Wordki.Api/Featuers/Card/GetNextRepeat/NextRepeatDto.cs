using Wordki.Api.Featuers.Card.Dto;

namespace Wordki.Api.Featuers.Card.GetNextRepeat
{
    public class NextRepeatDto
    {
        public string GroupName { get; set; }
        public SideDto Heads { get; set; }
        public SideDto Tails { get; set; }
    }
}
