using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Utils.HttpContext;
using Wordki.Utils.TimeProvider;

namespace Wordki.Api.Featuers.Lesson.Start
{
    public class StartCommandHandler : IRequestHandler<StartCommand, long>
    {
        private readonly WordkiDbContext dbContext;
        private readonly IHttpContextProvider contextProvider;
        private readonly ITimeProvider timeProvider;

        public StartCommandHandler(WordkiDbContext dbContext, IHttpContextProvider contextProvider, ITimeProvider timeProvider)
        {
            this.dbContext = dbContext;
            this.contextProvider = contextProvider;
            this.timeProvider = timeProvider;
        }

        public async Task<long> Handle(StartCommand request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            var user = await dbContext.Users.SingleOrDefaultAsync(u => u.Id == userId);
            if(user == null)
            {
                throw new Exception("user == null");
            }
            var now = timeProvider.GetTime();

            var newLesson = new Domain.Lesson
            {
                User = user,
                StartDate = now
            };
            dbContext.Lessons.Add(newLesson);
            await dbContext.SaveChangesAsync();

            return newLesson.Id;
        }
    }
}
