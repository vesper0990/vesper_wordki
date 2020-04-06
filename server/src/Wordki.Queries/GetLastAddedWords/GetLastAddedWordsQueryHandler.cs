using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Utils.Dapper;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetLastAddedWords
{
    public class GetLastAddedWordsQueryHandler : IQueryManyHandler<GetLastAddedWordsQuery, LastAddedWordDto>
    {
        private readonly IDbConnectionProvider dbConnection;

        public GetLastAddedWordsQueryHandler(IDbConnectionProvider dbConnection)
        {
            this.dbConnection = dbConnection;
        }

        public async Task<IEnumerable<LastAddedWordDto>> HandleAsync(GetLastAddedWordsQuery query)
        {
            var param = new
            {
                userId = query.UserId,
                count = query.Count
            };

            using (var connection = await dbConnection.Connect())
            {
                return await connection.GetAsync<LastAddedWordDto>(sql, param);
            }
        }

        private readonly string sql = $@"
SELECT
g.name          as GroupName,
g.language1     as GroupLanguage1,
g.language2     as GroupLanguage2,
w.id            as Id,
w.language1     as Language1,
w.language2     as Language2,
w.example1      as Example1,
w.example2      as Example2,
w.drawer        as Drawer,
w.creationDate  as CreationDate,
count(r.id)     as RepeatsCount,
max(r.date)     as LastRepeat
FROM words w
JOIN groups2 g ON w.groupId = g.id
LEFT JOIN repeats r ON w.id = r.wordId
WHERE g.userId = @userId
AND w.isVisible = 1
GROUP BY w.id, g.name
ORDER BY w.creationDate DESC
LIMIT @count";
    }
}
