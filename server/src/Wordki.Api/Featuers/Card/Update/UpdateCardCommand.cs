using MediatR;

namespace Wordki.Api.Featuers.Card.Update
{
    public class UpdateCardCommand : IRequest
    {
        public long Id { get; set; }
        public Side Front { get; set; }
        public Side Back { get; set; }
        public bool IsVisible { get; set; }
    }

    public class Side{
        public string Value{ get; set; }
        public string Example{ get; set; }
    }
}
