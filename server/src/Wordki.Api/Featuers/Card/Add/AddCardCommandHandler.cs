using MediatR;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using System;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Domain2;
using Wordki.Utils.TimeProvider;

namespace Wordki.Api.Featuers.Card.Add
{
    public class AddCardCommandHandler : IRequestHandler<AddCardCommand, long>
    {
        private readonly WordkiDbContext2 dbContext;
        private readonly ITimeProvider dateTimeProvider;

        public AddCardCommandHandler(WordkiDbContext2 dbContext, ITimeProvider dateTimeProvider)
        {
            this.dbContext = dbContext;
            this.dateTimeProvider = dateTimeProvider;
        }

        public async Task<long> Handle(AddCardCommand request, CancellationToken cancellationToken)
        {
            var group = await dbContext.Groups.SingleOrDefaultAsync(g => g.Id == request.GroupId);
            if (group == null)
            {
                throw new Exception();
            }
            var newCard = new Domain2.Card
            {
                FrontValue = request.Front.Value,
                FrontExample = request.Front.Example,
                BackValue = request.Back.Value,
                BackExample = request.Back.Example,
            };

            group.AddCard(newCard);

            await dbContext.Cards.AddAsync(newCard);
            await dbContext.SaveChangesAsync();
            return newCard.Id;
        }
    }
}
