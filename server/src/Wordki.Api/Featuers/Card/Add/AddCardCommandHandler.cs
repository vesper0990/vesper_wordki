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
            if(group == null)
            {
                throw new Exception();
            }
            var heads = Side.New(request.Heads.Value, request.Heads.Example);
            var tails = Side.New(request.Tails.Value, request.Tails.Example);
            var newCard = new Domain.Card
            {
                Group = group,
                Heads = heads,
                Tails = tails,
                Comment = request.Comment,
                IsVisible = request.IsVisible,
                WordCreationDate = dateTimeProvider.GetDate(),
            };

            await dbContext.Words.AddAsync(newCard);
            await dbContext.SaveChangesAsync();
            return newCard.Id;
        }
    }
}
