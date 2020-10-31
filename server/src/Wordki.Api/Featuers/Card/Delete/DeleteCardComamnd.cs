using MediatR;

namespace Wordki.Api.Featuers.Card.Delete
{
    public class DeleteCardComamnd : IRequest
    {
        public long Id { get; set; }
    }
}
