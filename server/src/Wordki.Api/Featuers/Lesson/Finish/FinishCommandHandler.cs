using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Utils.HttpContext;
using Wordki.Utils.TimeProvider;

namespace Wordki.Api.Featuers.Lesson.Finish
{
    public class FinishCommandHandler : IRequestHandler<FinishCommand>
    {
        private readonly WordkiDbContext dbContext;
        private readonly ITimeProvider timeProvider;
        private readonly IHttpContextProvider contextProvider;

        public FinishCommandHandler(WordkiDbContext dbContext, ITimeProvider timeProvider, IHttpContextProvider contextProvider)
        {
            this.dbContext = dbContext;
            this.timeProvider = timeProvider;
            this.contextProvider = contextProvider;
        }

        public async Task<Unit> Handle(FinishCommand request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            var lesson = await dbContext.Lessons.SingleOrDefaultAsync(l => l.Id == request.LessonId && l.User.Id == userId);
            lesson.FinishDate = timeProvider.GetTime();

            dbContext.Lessons.Update(lesson);
            await dbContext.SaveChangesAsync();
            return Unit.Value;
        }
    }
}
