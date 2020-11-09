using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Utils.HttpContext;

namespace Wordki.Api.Featuers.Lesson.GetLastLesson
{
    public class GetLastLessonQueryHandler : IRequestHandler<GetLastLessonQuery, LastLessonDateDto>
    {
        private readonly WordkiDbContext dbContext;
        private readonly IHttpContextProvider contextProvider;

        public GetLastLessonQueryHandler(WordkiDbContext dbContext, IHttpContextProvider contextProvider)
        {
            this.dbContext = dbContext;
            this.contextProvider = contextProvider;
        }

        public async Task<LastLessonDateDto> Handle(GetLastLessonQuery request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            var lastLesson = await dbContext.Lessons.Where(l => l.User.Id == userId).OrderByDescending(l => l.StartDate).FirstOrDefaultAsync();
            var isAnyLesson = lastLesson != null;
            return new LastLessonDateDto
            {
                IsAnyLesson = isAnyLesson,
                Date = isAnyLesson ? lastLesson.StartDate : new DateTime(0)
            };
        }
    }
}
