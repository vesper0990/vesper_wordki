using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Utils.Dapper;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetNextWords
{
    public class GetNextWordsQueryHandler : IQueryManyHandler<GetNextWordsQuery, GetNextWordsDto>
    {
        private readonly IDbConnectionProvider dbConnection;

        public GetNextWordsQueryHandler(IDbConnectionProvider dbConnection)
        {
            this.dbConnection = dbConnection;
        }

        public async Task<IEnumerable<GetNextWordsDto>> HandleAsync(GetNextWordsQuery query)
        {
            var param = new
            {
                count = query.Count,
                userId = query.UserId
            };
            using (var connection = await dbConnection.Connect())
            {
                return await connection.GetAsync<GetNextWordsDto>(sql, param);
            }
        }

        private readonly string sql = $@"
SELECT
w.id            as Id,
w.language1     as Language1,
w.language2     as Language2,
w.drawer        as Drawer
FROM words w
JOIN groups g ON w.groupId = g.id
WHERE g.userId = @userId
ORDER BY w.nextRepeat, w.id
LIMIT @count";
    }
}
