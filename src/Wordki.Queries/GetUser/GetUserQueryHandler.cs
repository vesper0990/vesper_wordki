using System;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Infrastructure.Services;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetUser
{
    public class GetUserQueryHandler : IQueryHandler<GetUserQuery, GetUserDto>
    {
        private readonly IUserFactory userFactory;
        private readonly IEncrypter encrypter;

        public GetUserQueryHandler(IUserFactory userFactory, IEncrypter encrypter)
        {
            this.userFactory = userFactory;
            this.encrypter = encrypter;
        }

        public async Task<GetUserDto> HandleAsync(GetUserQuery query)
        {
            var id = Guid.NewGuid();
            var hashPassword = encrypter.Md5Hash(query.Password);
            var creationDate = new DateTime(1990, 9, 24);
            var user = userFactory.Restore(id, query.Name, hashPassword, creationDate, null);
            var result = new GetUserDto
            {
                User = user
            };
            return await Task.FromResult(result);
        }
    }
}
