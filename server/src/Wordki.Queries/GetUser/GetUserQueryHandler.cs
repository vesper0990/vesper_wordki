using System;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Infrastructure.Services;
using Wordki.Utils.Dapper;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetUser
{
    public class GetUserQueryHandler : IQueryHandler<GetUserQuery, GetUserDto>
    {
        private readonly IDbConnectionProvider dbConnection;
        private readonly IEncrypter encrypter;

        public GetUserQueryHandler(IDbConnectionProvider dbConnection, IEncrypter encrypter)
        {
            this.dbConnection = dbConnection;
            this.encrypter = encrypter;
        }

        public async Task<GetUserDto> HandleAsync(GetUserQuery query)
        {
            var hashPassword = encrypter.Md5Hash(query.Password);
            var param = new
            {
                name = query.Name,
                hashPassword = hashPassword
            };
            using(var connection = await dbConnection.Connect())
            {
                return await connection.GetSingleAsync<GetUserDto>(sql, param);
            }
        }

        private readonly string sql = $@"
SELECT 
u.id,
u.name
FROM users u
WHERE u.name = @name AND
u.password = @hashPassword";
    }
}
