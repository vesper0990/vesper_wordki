using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Services;

namespace Wordki.Api.Featuers.Group.AddGroup
{
    public class AddGroupCommandHandler : IRequestHandler<AddGroupCommand, long>
    {
        private readonly WordkiDbContext dbContext;
        private readonly IDateTimeProvider dateTimeProvider;

        public AddGroupCommandHandler(WordkiDbContext dbContext, IDateTimeProvider dateTimeProvider)
        {
            this.dbContext = dbContext;
            this.dateTimeProvider = dateTimeProvider;
        }

        public async Task<long> Handle(AddGroupCommand request, CancellationToken cancellationToken)
        {
            var user = await dbContext.Users.SingleOrDefaultAsync(u => u.Id == request.UserId);
            var newGroup = new Domain.Group
            {
                 Name = request.Name,
                 GroupLanguage1 = request.Language1,
                 GroupLanguage2 = request.Language2,
                 User = user,
                 GroupCreationDate = dateTimeProvider.Now()
            };
            user.Groups.Add(newGroup);

            await dbContext.Groups.AddAsync(newGroup);
            await dbContext.SaveChangesAsync();

            return newGroup.Id;
        }
    }
}
