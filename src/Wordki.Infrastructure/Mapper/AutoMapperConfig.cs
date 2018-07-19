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

                config.CreateMap<Group, GroupDTO>();
                config.CreateMap<GroupDTO, Group>();
                config.CreateMap<Group, GroupDetailsDTO>();
                config.CreateMap<GroupDetailsDTO, Group>();
                config.CreateMap<Word, WordDTO>();
                config.CreateMap<WordDTO, Word>();

                config.CreateMap<Result, ResultDTO>();
                config.CreateMap<ResultDTO, Result>();
            })
            .CreateMapper();
    }
}
