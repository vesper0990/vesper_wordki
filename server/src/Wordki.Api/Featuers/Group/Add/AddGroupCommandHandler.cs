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
                GroupLanguage1 = request.LanguageFront,
                GroupLanguage2 = request.LanguageBack,
                User = user,
                GroupCreationDate = dateTimeProvider.GetTime()
            };
            foreach (var card in request.Cards)
            {
                newGroup.Words.Add(
                    new Domain.Card
                    {
                        Heads = Domain.Side.New(card.Front.Value, card.Front.Example),
                        Tails = Domain.Side.New(card.Back.Value, card.Back.Example),
                        Comment = string.Empty,
                        Group = newGroup,
                        IsVisible = true,
                        WordCreationDate = dateTimeProvider.GetTime(),
                    });
            }

            await dbContext.Groups.AddAsync(newGroup);
            await dbContext.SaveChangesAsync();

            return newGroup.Id;
        }
    }
}
