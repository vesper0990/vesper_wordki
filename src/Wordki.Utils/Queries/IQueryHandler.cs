using System.Threading.Tasks;

namespace Wordki.Utils.Queries
{
    public interface IQueryHandler<TQuery, TDto> 
        where TQuery : IQuery<TDto> 
        where TDto : IDto 
    {
        Task<TDto> HandleAsync(TQuery query);
    }
}
