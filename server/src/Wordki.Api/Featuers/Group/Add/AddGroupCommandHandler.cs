using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Domain2;
using Wordki.Utils.HttpContext;

namespace Wordki.Api.Featuers.Group.Add
{
    public class AddGroupCommandHandler : IRequestHandler<AddGroupCommand, long>
    {
        private readonly WordkiDbContext2 dbContext;
        private readonly IHttpContextProvider contextProvider;
        private readonly IGroupFactory groupFactory;
        private readonly ICardFactory cardFactory;

        public AddGroupCommandHandler(
            WordkiDbContext2 dbContext,
             IHttpContextProvider contextProvider,
             IGroupFactory groupFactory,
             ICardFactory cardFactory)
        {
            this.dbContext = dbContext;
            this.contextProvider = contextProvider;
            this.groupFactory = groupFactory;
            this.cardFactory = cardFactory;
        }

        public async Task<long> Handle(AddGroupCommand request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            var user = await dbContext.Users.SingleOrDefaultAsync(u => u.Id == userId);

            var newGroup = groupFactory.Create(request.Name, request.FrontLanguage, request.BackLanguage);

            user.AddGroup(newGroup);
            foreach (var card in request.Cards)
            {
                var newCard = cardFactory.Create(card.Front.Value, card.Back.Value, card.Front.Example, card.Back.Example);
                newGroup.AddCard(newCard);
            }

            await dbContext.Groups.AddAsync(newGroup, cancellationToken);
            await dbContext.SaveChangesAsync(cancellationToken);

            return newGroup.Id;
        }
    }
}
