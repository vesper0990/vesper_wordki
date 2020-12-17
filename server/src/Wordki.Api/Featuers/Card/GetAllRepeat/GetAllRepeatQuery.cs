using System.Collections.Generic;
using MediatR;
using Wordki.Api.Responses;

namespace Wordki.Api.Featuers.Card.GetAllRepeat
{
    public class GetAllRepeatQuery : IRequest<IEnumerable<CardRepeatDto>> { }
}