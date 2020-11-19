using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Utils.HttpContext;

namespace Wordki.Api.Featuers.Card.GetNextRepeat
{
    public class GetNextRepeatQueryHandler : IRequestHandler<GetNextRepeatQuery, NextRepeatDto>
    {
        private readonly WordkiDbContext dbContext;
        private readonly IHttpContextProvider contextProvider;

        public GetNextRepeatQueryHandler(WordkiDbContext dbContext, IHttpContextProvider contextProvider)
        {
            this.dbContext = dbContext;
            this.contextProvider = contextProvider;
        }

        public async Task<NextRepeatDto> Handle(GetNextRepeatQuery request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();

            var minHeads = await dbContext.Words
                .Include(w => w.Group).ThenInclude(g => g.User)
                .Where(c => c.Group.User.Id == userId).OrderBy(w => w.Heads.State.NextRepeat).Take(1).FirstOrDefaultAsync();

            var minTails = await dbContext.Words
                .Include(w => w.Group).ThenInclude(g => g.User)
                .Where(c => c.Group.User.Id == userId).OrderBy(w => w.Tails.State.NextRepeat).Take(1).FirstOrDefaultAsync();

            var card = GetNextRepeat(minHeads, minTails);
            return new NextRepeatDto
            {
                GroupName = card.Group.Name,
                Heads = new Dto.SideDto{
                    Value = card.Heads.Value,
                    Example = card.Heads.Example,
                    Drawer = card.Heads.State.Drawer.Value,
                    Language = card.Group.GroupLanguage1,
                },
                Tails = new Dto.SideDto{
                    Value = card.Tails.Value,
                    Example = card.Tails.Example,
                    Drawer = card.Tails.State.Drawer.Value,
                    Language = card.Group.GroupLanguage2,
                },
            };
        }

        private Domain.Card GetNextRepeat(Domain.Card minHeads, Domain.Card minTails)
        {
            if(minHeads == null && minTails == null){
                return null;
            }
            if(minHeads == null){
                return minTails;
            }
            if(minTails == null){
                return minHeads;
            }
            return minHeads.Heads.State.NextRepeat < minTails.Tails.State.NextRepeat ? minHeads : minTails;
        }
    }
}
