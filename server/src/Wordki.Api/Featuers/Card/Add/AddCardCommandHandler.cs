using MediatR;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using System;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Domain;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Utils.TimeProvider;

namespace Wordki.Api.Featuers.Card.Add
{
    public class AddCardCommandHandler : IRequestHandler<AddCardCommand, long>
    {
        private readonly WordkiDbContext dbContext;
        private readonly ITimeProvider dateTimeProvider;

        public AddCardCommandHandler(WordkiDbContext dbContext, ITimeProvider dateTimeProvider)
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
            var heads = Domain.Side.New(request.Front.Value, request.Front.Example);
            var tails = Domain.Side.New(request.Back.Value, request.Back.Example);
            var newCard = new Domain.Card
            {
                Group = group,
                Front = heads,
                Back = tails,
                IsVisible = request.IsVisible,
                CreationDate = dateTimeProvider.GetDate(),
            };

            await dbContext.Cards.AddAsync(newCard);
            await dbContext.SaveChangesAsync();
            return newCard.Id;
        }
    }
}
