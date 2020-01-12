using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetWords
{
    public class GetWordsQueryHandler : IQueryManyHandler<GetWordsQuery, GetWordsDto>
    {

        private static int Index { get; set; } = 0;

        public GetWordsQueryHandler()
        {
        }

        public Task<IEnumerable<GetWordsDto>> HandleAsync(GetWordsQuery query)
        {
            var result = new List<GetWordsDto>();
            for (var i = 0; i < query.Count; i++, Index++)
            {
                result.Add(new GetWordsDto
                {
                    Id = Index,
                    Language1 = $"Word {Index}",
                    Language2 = $"Word {Index}",
                    Drawer = 1,
                });
            }
            return Task.FromResult<IEnumerable<GetWordsDto>>(result);
        }
    }
}
