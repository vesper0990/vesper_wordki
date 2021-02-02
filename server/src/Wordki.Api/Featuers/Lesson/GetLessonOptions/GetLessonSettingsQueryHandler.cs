using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Utils.HttpContext;
using Wordki.Utils.TimeProvider;

namespace Wordki.Api.Featuers.Lesson.GetLessonSettings
{
    public class GetLessonSettingsQueryHandler : IRequestHandler<GetLessonSettingsQuery, LessonSettingsDto>
    {
        private readonly WordkiDbContext dbContext;
        private readonly IHttpContextProvider contextProvider;
        private readonly ITimeProvider timeProvider;

        public GetLessonSettingsQueryHandler(WordkiDbContext dbContext, IHttpContextProvider contextProvider, ITimeProvider timeProvider)
        {
            this.dbContext = dbContext;
            this.contextProvider = contextProvider;
            this.timeProvider = timeProvider;
        }

        public async Task<LessonSettingsDto> Handle(GetLessonSettingsQuery request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            var date = timeProvider.GetDate().AddDays(1);
            var repetitionsCount = 0;

            repetitionsCount += await dbContext.Cards.CountAsync(c =>
            c.Group.Owner.Id == userId &&
            c.Front.State.IsVisible &&
             c.Front.State.NextRepeat < timeProvider.GetDate(), cancellationToken);

            repetitionsCount += await dbContext.Cards.CountAsync(c =>
             c.Group.Owner.Id == userId &&
             c.Back.State.IsVisible &&
              c.Back.State.NextRepeat < timeProvider.GetDate(), cancellationToken);

            var newCardsCount = 0;

            newCardsCount += await dbContext.Cards.CountAsync(c =>
            c.Group.Owner.Id == userId &&
            !c.Front.State.IsVisible, cancellationToken);

            newCardsCount += await dbContext.Cards.CountAsync(c =>
             c.Group.Owner.Id == userId &&
             !c.Back.State.IsVisible, cancellationToken);

            var backLangauges = dbContext.Groups.Select(x => x.BackLanguage).Distinct();
            var frontLangauges = dbContext.Groups.Select(x => x.FrontLanguage).Distinct();
            var languages = backLangauges.Concat(frontLangauges).Distinct();
            return new LessonSettingsDto
            {
                NewCardsCount = newCardsCount,
                RepetitionsCount = repetitionsCount,
                Languages = languages
            };
        }
    }
}