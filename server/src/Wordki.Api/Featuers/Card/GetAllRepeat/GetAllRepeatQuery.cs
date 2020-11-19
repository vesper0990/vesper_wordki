using System.Collections.Generic;
using MediatR;

namespace Wordki.Api.Featuers.Card.GetAllRepeat
{
    public class GetAllRepeatQuery : IRequest<IEnumerable<RepeatDto>> { }
}