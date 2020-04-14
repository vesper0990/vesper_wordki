using System.Threading.Tasks;
using Wordki.Utils.Dapper;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetCountWordsByDate
{
    public class GetCountWordsByDateQueryHandler : IQueryHandler<GetCountWordsByDateQuery, CountWordsByDateDto>
    {
        private readonly IDbConnectionProvider dbConnection;

        public GetCountWordsByDateQueryHandler(IDbConnectionProvider dbConnection)
        {
            this.dbConnection = dbConnection;
        }

        public async Task<CountWordsByDateDto> HandleAsync(GetCountWordsByDateQuery query)
        {
            var param = new
            {
                date = query.Date,
                userId = query.UserId,
            };

            using (var connection = await dbConnection.Connect())
            {
                return await connection.GetSingleAsync<CountWordsByDateDto>(sql, param);
            }
        }

        private readonly string sql = @"
SELECT
count(w.id) as Count
FROM words w
JOIN groups2 g ON w.groupId = g.id
WHERE g.userId = @userId
AND w.isVisible = 1
AND w.nextRepeat <= @date
";
    }
}
