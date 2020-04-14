using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Queries.GetNextWords;
using Wordki.Utils.Dapper;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetWordsByDate
{
    public class GetWordsByDateQueryHandler : IQueryManyHandler<GetWordsByDateQuery, GetNextWordsDto>
    {
        private readonly IDbConnectionProvider dbConnection;

        public GetWordsByDateQueryHandler(IDbConnectionProvider dbConnection)
        {
            this.dbConnection = dbConnection;
        }

        public async Task<IEnumerable<GetNextWordsDto>> HandleAsync(GetWordsByDateQuery query)
        {
            var param = new
            {
                date = query.Date,
                userId = query.UserId,
            };
            using (var connection = await dbConnection.Connect())
            {
                return await connection.GetAsync<GetNextWordsDto>(sql, param);
            }
        }

        private readonly string sql = @"
SELECT
g.name          as GroupName,
g.language1     as GroupLanguage1,
g.language2     as GroupLanguage2,
w.id            as Id,
w.language1     as Language1,
w.language2     as Language2,
w.example1      as Example1,
w.example2      as Example2,
w.drawer        as Drawer
FROM words w
JOIN groups2 g ON w.groupId = g.id
LEFT JOIN repeats r ON w.id = r.wordId
WHERE g.userId = @userId
AND w.isVisible = 1
AND w.nextRepeat <= @date
GROUP BY w.id, g.name
";
    }
}
