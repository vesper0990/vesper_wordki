namespace Wordki.Utils.Domain
{
    public interface IMapper<TDto, TDomain> 
        where TDto : IDto
        where TDomain: IDomainObject
    {
        TDomain Map(TDto dto);
    }
}
