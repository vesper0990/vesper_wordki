using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Wordki.Api.Domain2;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Utils.HttpContext;
using Wordki.Utils.TimeProvider;

namespace Wordki.Api.Featuers.Lesson.GetLessonSettings
{
    public class GetLessonSettingsQueryHandler : IRequestHandler<GetLessonSettingsQuery, LessonSettingsDto>
    {
        private readonly WordkiDbContext2 dbContext;
        private readonly IHttpContextProvider contextProvider;
        private readonly ITimeProvider timeProvider;

        public GetLessonSettingsQueryHandler(WordkiDbContext2 dbContext,
        IHttpContextProvider contextProvider,
        ITimeProvider timeProvider)
        {
            this.dbContext = dbContext;
            this.contextProvider = contextProvider;
            this.timeProvider = timeProvider;
        }

        public async Task<LessonSettingsDto> Handle(GetLessonSettingsQuery request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            var date = timeProvider.GetDate().AddDays(1);

            var newCardsCount = await dbContext.Details.CountAsync(d => d.NextRepeatDate == null);
            var repetitionsCount = await dbContext.Details.CountAsync(d => d.NextRepeatDate != null && d.NextRepeatDate < timeProvider.GetDate());

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