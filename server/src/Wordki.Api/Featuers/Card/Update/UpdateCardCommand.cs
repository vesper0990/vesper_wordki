using MediatR;
using Wordki.Api.Domain;

namespace Wordki.Api.Featuers.Card.Update
{
    public class UpdateCardCommand : IRequest
    {
        public long Id { get; set; }
        public Side CardSide1 { get; set; }
        public Side CardSide2 { get; set; }
        public string Comment { get; set; }
        public bool IsVisible { get; set; }
    }
}
