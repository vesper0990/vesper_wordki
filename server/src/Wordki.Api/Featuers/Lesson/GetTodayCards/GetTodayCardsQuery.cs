using MediatR;
using System.Collections.Generic;
using Wordki.Api.Responses;

namespace Wordki.Api.Featuers.Lesson.GetTodayCards
{
    public class GetTodayCardsQuery : IRequest<IEnumerable<CardRepeatDto>> { }
}
