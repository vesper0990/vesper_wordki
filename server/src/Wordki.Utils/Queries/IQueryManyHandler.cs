using System.Collections.Generic;
using System.Threading.Tasks;

namespace Wordki.Utils.Queries
{
    public interface IQueryManyHandler<TQuery, TDto>
        where TQuery : IQuery<TDto>
        where TDto : IDto
    {
        Task<IEnumerable<TDto>> HandleAsync(TQuery query);
    }
}
