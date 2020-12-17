using MediatR;
using System.Collections.Generic;
using Wordki.Api.Responses;

namespace Wordki.Api.Featuers.Card.GetLastAdded
{
    public class GetLastAddedQuery : IRequest<IEnumerable<ExtendedCardDetailsDto>>
    {
        public int Count { get; set; }
    }
}
