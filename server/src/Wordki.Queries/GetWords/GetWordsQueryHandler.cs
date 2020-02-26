using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Utils.Dapper;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetWords
{
    public class GetWordsQueryHandler : IQueryManyHandler<GetWordsQuery, GetWordsDto>
    {
        private readonly IDbConnectionProvider dbConnectionProvider;

        public GetWordsQueryHandler(IDbConnectionProvider dbConnectionProvider)
        {
            this.dbConnectionProvider = dbConnectionProvider;
        }

        public async Task<IEnumerable<GetWordsDto>> HandleAsync(GetWordsQuery query)
        {
            var param = new
            {
                Count = query.Count
            };

            using (var connection = await dbConnectionProvider.Connect())
            {
                return await connection.GetAsync<GetWordsDto>(Sql, param);
            }
        }

        private readonly string Sql = $@"
SELECT
    w.id,
    w.language1,
    w.language2,
    w.drawer
FROM words w
JOIN groups2 g ON w.group_id = g.id
ORDER BY w.next_repeat
LIMIT @Count";
    }
}
