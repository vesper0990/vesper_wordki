using Wordki.Core.Dtos;
using Wordki.Utils.Domain;

namespace Wordki.Core.Mappers
{
    public class UserMapper : IMapper<UserDto, User>
    {
        public User Map(UserDto dto)
        {
            return User.Restore(dto.Id, dto.Name, dto.Password, dto.CreationDate, dto.LastLoginDate);
        }
    }
}
