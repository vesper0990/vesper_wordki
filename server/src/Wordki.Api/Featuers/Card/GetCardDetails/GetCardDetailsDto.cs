using Wordki.Api.Domain;

namespace Wordki.Api.Featuers.Card.GetCardDetails
{
    public class GetCardDetailsDto
    {
        public long Id { get; set; }
        public long GroupId { get; set; }
        public int Language1 { get; set; }
        public int Language2 { get; set; }
        public Side Word1 { get; set; }
        public Side Word2 { get; set; }
        public string Comment { get; set; }
        public int RepeatsCount { get; set; }
    }
}
