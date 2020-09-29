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
            ValidateRequest(request);
            var group = await dbContext.Groups.SingleOrDefaultAsync(g => g.Id == request.GroupId);
            if(group == null)
            {
                throw new Exception();
            }
            var newCard = new Domain.Card
            {
                Group = group,
                CardSide1 = request.Word1,
                CardSide2 = request.Word2,
                Comment = request.Comment,
                Drawer = Drawer.Create(0),
                IsVisible = request.IsVisible,
                WordCreationDate = dateTimeProvider.Now(),
                NextRepeat = dateTimeProvider.Now(),
            };

            await dbContext.Words.AddAsync(newCard);
            await dbContext.SaveChangesAsync();
            return newCard.Id;
        }

        private void ValidateRequest(AddCardCommand request)
        {
            if(request.GroupId == 0)
            {
                throw new Exception();
            }
        }
    }
}
