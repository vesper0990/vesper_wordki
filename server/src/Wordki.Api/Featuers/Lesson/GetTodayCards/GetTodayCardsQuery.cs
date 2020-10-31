using MediatR;
using System.Collections.Generic;

namespace Wordki.Api.Featuers.Lesson.GetTodayCards
{
    public class GetTodayCardsQuery : IRequest<IEnumerable<TodayCardDto>>
    {
    }
}
