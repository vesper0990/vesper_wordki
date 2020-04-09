using System.Threading.Tasks;
using Wordki.Utils.Dapper;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetUserSettings
{
    public class GetUserSettingsQueryHandler : IQueryHandler<GetUserSettingsQuery, UserSettingsDto>
    {
        private readonly IDbConnectionProvider connection;

        public GetUserSettingsQueryHandler(IDbConnectionProvider connection)
        {
            this.connection = connection;
        }

        public async Task<UserSettingsDto> HandleAsync(GetUserSettingsQuery query)
        {
            var param = new
            {
                userId = query.UserId
            };

            var result = new UserSettingsDto();

            using (var context = await connection.Connect())
            {
                result.Languages = await context.GetAsync<int?>(languagesSql, param);
            }

            return result;
        }

        private readonly string languagesSql = @"
(SELECT 
    g.language1 as language 
FROM groups2 g 
JOIN users u ON u.id = g.userId 
WHERE u.id = @userId
GROUP BY g.language1)
UNION 
(SELECT
    g.language2 as language 
FROM groups2 g 
JOIN users u ON u.id = g.userId 
WHERE u.id = @userId
GROUP BY g.language2) 
";
    }
}
