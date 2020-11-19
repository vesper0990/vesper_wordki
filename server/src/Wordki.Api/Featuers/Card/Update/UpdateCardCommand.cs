using MediatR;
using Wordki.Api.Domain;

namespace Wordki.Api.Featuers.Card.Update
{
    public class UpdateCardCommand : IRequest
    {
        public long Id { get; set; }
        public Side Heads { get; set; }
        public Side Tails { get; set; }
        public string Comment { get; set; }
        public bool IsVisible { get; set; }
    }
}
