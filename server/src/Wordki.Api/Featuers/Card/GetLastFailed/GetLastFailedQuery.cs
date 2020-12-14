using MediatR;
using Wordki.Api.Responses;

namespace Wordki.Api.Featuers.Card.GetLastFailed
{
    public class GetLastFailedQuery : IRequest<ExtendedCardDetailsDto>
    {
    }
}
