using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Utils.HttpContext;
using Wordki.Utils.TimeProvider;
using System.Linq;
using System;

namespace Wordki.Api.Featuers.Card.GetAllRepeat
{
    public class GetAllRepeatQueryHandler : IRequestHandler<GetAllRepeatQuery, IEnumerable<RepeatDto>>
    {
        private readonly WordkiDbContext dbContext;
        private readonly ITimeProvider timeProvider;
        private readonly IHttpContextProvider contextProvider;

        public GetAllRepeatQueryHandler(WordkiDbContext dbContext, ITimeProvider timeProvider, IHttpContextProvider contextProvider){
            this.dbContext = dbContext;
            this.timeProvider = timeProvider;
            this.contextProvider = contextProvider;
        }

        public Task<IEnumerable<RepeatDto>> Handle(GetAllRepeatQuery request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            var results = new List<RepeatDto>();

            var heads = dbContext.Words.Include(c => c.Group)
            .Where(c => c.Group.User.Id == userId && c.Heads.State.NextRepeat < timeProvider.GetDate());

            results.AddRange(heads.Select(item => item.ConvertIntoRepeatDto(false)));

            var tails = dbContext.Words.Include(c => c.Group)
            .Where(c => c.Group.User.Id == userId && c.Tails.State.NextRepeat < timeProvider.GetDate());

            results.AddRange(tails.Select(item => item.ConvertIntoRepeatDto(true)));

            return Task.FromResult(results.AsEnumerable());
        }

        private bool CheckDate(Domain.Side side)
        {
            var sideDate = new DateTime(side.State.NextRepeat.Year, side.State.NextRepeat.Month, side.State.NextRepeat.Day);
            return sideDate.CompareTo(timeProvider.GetDate()) <= 0;
        }    
    }
}