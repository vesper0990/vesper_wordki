using MediatR;
using System.Collections.Generic;
using Wordki.Api.Responses;

namespace Wordki.Api.Featuers.Card.GetCardDetails
{
    public class GetCardDetailsQuery : IRequest<IEnumerable<CardDetailsDto>>
    {
        public long CardId { get; set; }
    }
}
