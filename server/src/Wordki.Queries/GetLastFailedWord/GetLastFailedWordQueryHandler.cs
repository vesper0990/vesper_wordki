using System.Threading.Tasks;
using Wordki.Utils.Dapper;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetLastFailedWord
{
    public class GetLastFailedWordQueryHandler : IQueryHandler<GetLastFailedWordQuery, LastFailedWordDto>
    {
        private readonly IDbConnectionProvider dbConnection;

        public GetLastFailedWordQueryHandler(IDbConnectionProvider dbConnection)
        {
            this.dbConnection = dbConnection;
        }

        public async Task<LastFailedWordDto> HandleAsync(GetLastFailedWordQuery query)
        {
            var param = new
            {
                userId = query.UserId
            };
            using (var connection = await dbConnection.Connect())
            {
                return await connection.GetSingleAsync<LastFailedWordDto>(sql, param);
            }
        }

        private static readonly string sql = $@"
SELECT
w.language1 as Language1,
w.language2 as Language2
FROM repeats r
JOIN words w ON w.id = r.wordId
JOIN groups g ON g.id = w.groupId
WHERE g.userId = @userId
ORDER BY r.dateTime DESC
LIMIT 1
";
    }
}
