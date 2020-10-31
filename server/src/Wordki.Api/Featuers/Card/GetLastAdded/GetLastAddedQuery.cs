using MediatR;
using System.Collections.Generic;

namespace Wordki.Api.Featuers.Card.GetLastAdded
{
    public class GetLastAddedQuery : IRequest<IEnumerable<LastAddedDto>>
    {
        public int Count { get; set; }
    }
}
