using MediatR;

namespace Wordki.Api.Featuers.Card.Delete
{
    public class DeleteCardComamnd : IRequest
    {
        public long Id { get; set; }
        public long GroupId { get; set; }
    }
}
