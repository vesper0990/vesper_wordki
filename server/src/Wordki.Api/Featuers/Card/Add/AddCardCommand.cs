using MediatR;
using Wordki.Api.Domain;

namespace Wordki.Api.Featuers.Card.Add
{
    public class AddCardCommand : IRequest<long>
    {
        public long GroupId { get; set; }
        public Side CardSide1 { get; set; }
        public Side CardSide2 { get; set; }
        public string Comment { get; set; }
        public bool IsVisible { get; set; }
    }
}
