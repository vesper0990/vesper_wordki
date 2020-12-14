using MediatR;
using Wordki.Api.Responses;

namespace Wordki.Api.Featuers.Card.GetNextRepeat
{
    public class GetNextRepeatQuery : IRequest<ExtendedCardDetailsDto>
    {
    }
}
