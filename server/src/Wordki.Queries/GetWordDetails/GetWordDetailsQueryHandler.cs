using System.Linq;
using System.Threading.Tasks;
using Wordki.Core.Data;
using Wordki.Utils.Dapper;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetWordDetails
{
    public class GetWordDetailsQueryHandler : IQueryHandler<GetWordDetailsQuery, GetWordDetailsDto>
    {
        private readonly IDbConnectionProvider connection;

        public GetWordDetailsQueryHandler(IDbConnectionProvider connection)
        {
            this.connection = connection;
        }

        public async Task<GetWordDetailsDto> HandleAsync(GetWordDetailsQuery query)
        {
            var param = new
            {
                wordId = query.WordId,
            };
            using (var context = await connection.Connect())
            {
                return await context.GetSingleAsync<GetWordDetailsDto>(sql, param);
            }
        }

        private readonly string sql = $@"
SELECT
    *
FROM words w
JOIN repeats r ON w.id = r=wordId
WHERE w.id = @wordId";
    }
}