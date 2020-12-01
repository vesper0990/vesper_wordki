using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Utils.HttpContext;
using Wordki.Utils.TimeProvider;

namespace Wordki.Api.Featuers.Group.Add
{
    public class AddGroupCommandHandler : IRequestHandler<AddGroupCommand, long>
    {
        private readonly WordkiDbContext dbContext;
        private readonly ITimeProvider dateTimeProvider;
        private readonly IHttpContextProvider contextProvider;

        public AddGroupCommandHandler(
            WordkiDbContext dbContext,
             ITimeProvider dateTimeProvider,
             IHttpContextProvider contextProvider)
        {
            this.dbContext = dbContext;
            this.dateTimeProvider = dateTimeProvider;
            this.contextProvider = contextProvider;
        }

        public async Task<long> Handle(AddGroupCommand request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            var user = await dbContext.Users.Include(u => u.Groups).SingleOrDefaultAsync(u => u.Id == userId);
            var newGroup = new Domain.Group
            {
                Name = request.Name,
                GroupLanguage1 = request.Language1,
                GroupLanguage2 = request.Language2,
                User = user,
                GroupCreationDate = dateTimeProvider.GetTime()
            };
            foreach (var word in request.Words)
            {
                newGroup.Words.Add(
                    new Domain.Card
                    {
                        Heads = word.CardSide1,
                        Tails = word.CardSide2,
                        Comment = word.Comment,
                        Group = newGroup,
                        IsVisible = word.IsVisible,
                        WordCreationDate = dateTimeProvider.GetTime(),
                    });
            }

            await dbContext.Groups.AddAsync(newGroup);
            await dbContext.SaveChangesAsync();

            return newGroup.Id;
        }
    }
}
