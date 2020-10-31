using MediatR;
using System.Collections.Generic;

namespace Wordki.Api.Featuers.Card.GetCardDetails
{
    public class GetCardDetailsQuery : IRequest<IEnumerable<GetCardDetailsDto>>
    {
        public long CardId { get; set; }
    }
}
