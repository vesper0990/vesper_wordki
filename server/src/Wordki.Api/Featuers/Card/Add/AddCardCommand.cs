using MediatR;

namespace Wordki.Api.Featuers.Card.Add
{
    public class AddCardCommand : IRequest<long>
    {
        public long GroupId { get; set; }
        public Side Front { get; set; }
        public Side Back { get; set; }
    }

    public class Side
    {
        public string Value { get; set; }
        public string Example { get; set; }
    }
}
