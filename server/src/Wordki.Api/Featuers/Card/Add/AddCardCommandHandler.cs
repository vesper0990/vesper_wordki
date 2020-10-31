using MediatR;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using System;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Domain;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Services;

namespace Wordki.Api.Featuers.Card.Add
{
    public class AddCardCommandHandler : IRequestHandler<AddCardCommand, long>
    {
        private readonly WordkiDbContext dbContext;
        private readonly IDateTimeProvider dateTimeProvider;

        public AddCardCommandHandler(WordkiDbContext dbContext, IDateTimeProvider dateTimeProvider)
        {
            this.dbContext = dbContext;
            this.dateTimeProvider = dateTimeProvider;
        }

        public async Task<long> Handle(AddCardCommand request, CancellationToken cancellationToken)
        {
            var group = await dbContext.Groups.SingleOrDefaultAsync(g => g.Id == request.GroupId);
            if(group == null)
            {
                throw new Exception();
            }
            var newCard = new Domain.Card
            {
                Group = group,
                Heads = request.CardSide1,
                Tails = request.CardSide2,
                Comment = request.Comment,
                IsVisible = request.IsVisible,
                WordCreationDate = dateTimeProvider.Now(),
            };

            await dbContext.Words.AddAsync(newCard);
            await dbContext.SaveChangesAsync();
            return newCard.Id;
        }
    }
}
