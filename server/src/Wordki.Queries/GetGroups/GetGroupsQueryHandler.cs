using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Utils.Dapper;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetGroups
{
    public class GetGroupsQueryHandler : IQueryManyHandler<GetGroupsQuery, GetGroupsDto>
    {
        private readonly IDbConnectionProvider dbConnection;

        public GetGroupsQueryHandler(IDbConnectionProvider dbConnection)
        {
            this.dbConnection = dbConnection;
        }

        public async Task<IEnumerable<GetGroupsDto>> HandleAsync(GetGroupsQuery query)
        {
            var param = new
            {
                userId = query.UserId
            };

            using(var connection = await dbConnection.Connect())
            {
                return await connection.GetAsync<GetGroupsDto>(Sql, param);
            }
        }

        private readonly string Sql = $@"
SELECT
    g.id                as Id,
    g.name              as Name,
    g.language1         as Language1,
    g.language2         as Language2,
    count(w.id)         as WordsCount
FROM groups2 g
LEFT JOIN words w ON w.groupId =  g.id
WHERE g.userid = @userId
GROUP BY g.id";
    }
}
