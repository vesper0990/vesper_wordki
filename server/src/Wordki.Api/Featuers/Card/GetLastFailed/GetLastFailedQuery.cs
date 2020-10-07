using MediatR;
using System.Collections.Generic;

namespace Wordki.Api.Featuers.Card.GetLastFailed
{
    public class GetLastFailedQuery : IRequest<LastFailedDto>
    {
    }
}
