using System;
using Wordki.Core.Dtos;
using Wordki.Utils.Domain;

namespace Wordki.Core.Mappers
{
    public class UserMapper : IMapper<UserDto, User>
    {
        private readonly IUserFactory userFactory;

        public UserMapper(IUserFactory userFactory)
        {
            this.userFactory = userFactory;
        }

        public User Map(UserDto dto)
        {
            var id = new Guid(dto.Guid);
            return userFactory.Restore(id, dto.Name, dto.Password, dto.CreationDate, dto.LastLoginDate);
        }
    }
}
