using System.Threading.Tasks;
using Wordki.Infrastructure.DTO;

namespace Wordki.Infrastructure.Services
{
    public interface IUserService : IService
    {
        Task<bool> CheckUserExistingAsync(string userName);
        Task<bool> CheckUserExistingAsync(long id, string password);
        Task<bool> CheckUserToLoginAsync(string userName, string password);
        Task<UserDTO> LoginAsync(string userName, string password);
        Task<UserDTO> RegisterAsync(UserDTO userDto);
        Task<UserDTO> UpdateAsync(UserDTO userDto);
    }
}
