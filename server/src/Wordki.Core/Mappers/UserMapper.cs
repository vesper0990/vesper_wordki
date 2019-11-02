using System;
using Wordki.Core.Dtos;
using Wordki.Utils.Domain;

namespace Wordki.Core.Mappers
{
    public class UserMapper : IMapper<UserDto, User>
    {
        private readonly IUserRestoration userRestoration;

        public UserMapper(IUserRestoration userRestoration)
        {
            this.userRestoration = userRestoration;
        }

        public User Map(UserDto dto)
        {
            var id = new Guid(dto.Guid);
            return userRestoration.Restore(id, dto.Name, dto.Password, dto.CreationDate, dto.LastLoginDate);
        }
    }
}
