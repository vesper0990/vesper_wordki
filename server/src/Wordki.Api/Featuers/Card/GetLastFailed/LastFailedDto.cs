using Wordki.Api.Featuers.Card.Dto;

namespace Wordki.Api.Featuers.Card.GetLastFailed
{
    public class LastFailedDto
    {
        public string GroupName { get; set; }
        public SideDto Heads { get; set; }
        public SideDto Tails { get; set; }
    }
}
