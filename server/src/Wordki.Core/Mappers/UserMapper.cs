using Wordki.Core.Dtos;
using Wordki.Utils.Domain;

namespace Wordki.Core.Mappers
{
    public class UserMapper : IMapper<UserDto, User>
    {
        public User Map(UserDto dto)
        {
            if(dto == null)
            {
                return User.NullObject;
            }
            return User.Restore(dto.Id, dto.Name, dto.Password, dto.CreationDate, dto.LastLoginDate);
        }
    }
}
