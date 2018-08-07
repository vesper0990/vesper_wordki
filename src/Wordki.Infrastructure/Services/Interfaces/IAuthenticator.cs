using System.Threading.Tasks;

namespace Wordki.Infrastructure.Services
{
    public interface IAuthenticator<T> : IService
    {
        Task<long> Authenticate(T obj);
    }
}
