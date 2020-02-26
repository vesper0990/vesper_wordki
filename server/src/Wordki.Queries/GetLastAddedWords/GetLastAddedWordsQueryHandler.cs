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

        private static readonly string sql = $@"
SELECT 
    w.language1 as Language1,
    w.language2 as Language2,
    w.creationDate as CreationDate
FROM words w
JOIN groups2 g ON g.id = w.groupId
WHERE g.userId = @userId
ORDER BY w.creationDate DESC
LIMIT @count
";
    }
}
