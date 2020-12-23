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
using Wordki.Api.Responses;

namespace Wordki.Api.Featuers.Card.GetAllRepeat
{
    public class GetAllRepeatQueryHandler : IRequestHandler<GetAllRepeatQuery, IEnumerable<CardRepeatDto>>
    {
        private readonly WordkiDbContext dbContext;
        private readonly ITimeProvider timeProvider;
        private readonly IHttpContextProvider contextProvider;

        public GetAllRepeatQueryHandler(WordkiDbContext dbContext, ITimeProvider timeProvider, IHttpContextProvider contextProvider){
            this.dbContext = dbContext;
            this.timeProvider = timeProvider;
            this.contextProvider = contextProvider;
        }

        public Task<IEnumerable<CardRepeatDto>> Handle(GetAllRepeatQuery request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            var results = new List<CardRepeatDto>();

            var heads = dbContext.Words.Include(c => c.Group)
            .Where(c => c.Group.User.Id == userId && c.Heads.State.NextRepeat < timeProvider.GetDate())
            .Select(item => ConvertIntoRepeatDto(item, false)).ToList();

            results.AddRange(heads);

            var tails = dbContext.Words.Include(c => c.Group)
            .Where(c => c.Group.User.Id == userId && c.Tails.State.NextRepeat < timeProvider.GetDate())
            .Select(item => ConvertIntoRepeatDto(item, true));

            results.AddRange(tails);

            return Task.FromResult(results.AsEnumerable());
        }

        private bool CheckDate(Domain.Side side)
        {
            var sideDate = new DateTime(side.State.NextRepeat.Year, side.State.NextRepeat.Month, side.State.NextRepeat.Day);
            return sideDate.CompareTo(timeProvider.GetDate()) <= 0;
        }    

        public static CardRepeatDto ConvertIntoRepeatDto(Domain.Card card, bool revert = false)
        => revert 
        ? new CardRepeatDto
        {
            Id = card.Id,
            Answer = new SideRepeatDto
            {
                Value = card.Heads.Value,
                Example = card.Heads.Example,
                Drawer = card.Heads.State.Drawer.Value,
                Language =  card.Group.GroupLanguage1
            },
            Question = new SideRepeatDto
            {
                Value = card.Tails.Value,
                Example = card.Tails.Example,
                Drawer = card.Tails.State.Drawer.Value,
                Language =  card.Group.GroupLanguage2
            }
        }
        : new CardRepeatDto
        {
            Id = card.Id,
            Question = new SideRepeatDto
            {
                Value = card.Heads.Value,
                Example = card.Heads.Example,
                Drawer = card.Heads.State.Drawer.Value,
                Language =  card.Group.GroupLanguage1
            },
            Answer = new SideRepeatDto
            {
                Value = card.Tails.Value,
                Example = card.Tails.Example,
                Drawer = card.Tails.State.Drawer.Value,
                Language =  card.Group.GroupLanguage2
            }
        };
    }
}