using AutoMapper;
using Wordki.Core;
using Wordki.Infrastructure.DTO;

namespace Wordki.Infrastructure.Mapper
{
    public class AutoMapperConfig
    {
        public static IMapper Initialize()
            => new MapperConfiguration(config =>
            {
                config.CreateMap<User, UserDTO>();
                config.CreateMap<UserDTO, User>();
            })
            .CreateMapper();
    }
}
