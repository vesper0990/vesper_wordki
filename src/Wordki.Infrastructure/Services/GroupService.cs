using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Core.Repositories;
using Wordki.Infrastructure.DTO;
using AutoMapper;
using Wordki.Core;

namespace Wordki.Infrastructure.Services
{
    public class GroupService : IGroupService, IService
    {
        private readonly IGroupQueryRepository groupQueryRepository;
        private readonly IGroupCommandRepository groupCommandRepository;
        private readonly IMapper mapper;

        public GroupService(IGroupQueryRepository groupQueryRepository, IGroupCommandRepository groupCommandRepository, IMapper mapper)
        {
            this.groupQueryRepository = groupQueryRepository;
            this.groupCommandRepository = groupCommandRepository;
            this.mapper = mapper;
        }

        public async Task<GroupDetailsDTO> AddAsync(GroupDetailsDTO groupDto, long userId)
        {
            var group = mapper.Map<Group>(groupDto);
            group.UserId = userId;
            await groupCommandRepository.AddAsync(group);
            return mapper.Map<Group, GroupDetailsDTO>(group);
        }

        public async Task<GroupDetailsDTO> GetDetailsAsync(long groupId)
        {
            return mapper.Map<Group, GroupDetailsDTO>(await groupQueryRepository.GetAsync(groupId, true));
        }

        public async Task<IEnumerable<GroupDTO>> GetItemsAsync(long userId)
        {
            return await Task.Run(() =>
            {
                return (from g in groupQueryRepository.GetGroups()
                        where g.UserId == userId && g.State >= 0
                        select new GroupDTO()
                        {
                            Id = g.Id,
                            Language1 = g.Language1,
                            Language2 = g.Language2,
                            Name = g.Name,
                            CreationDate = g.CreationDate,
                            WordsCount = g.Words.Count(x => x.State >= 0),
                            ResultsCount = g.Results.Count(x => x.State >= 0),
                            LastLessonDate = g.Results.Where(x => x.State >= 0).DefaultIfEmpty().Max(x => x != null ? x.DateTime : new System.DateTime()),
                        });
            });

        }

        public async Task RemoveAsync(long id)
        {
            await groupCommandRepository.RemoveAsync(id);
        }

        public async Task UpdateAsync(GroupDTO groupDto, long userId)
        {
            var group = mapper.Map<Group>(groupDto);
            group.UserId = userId;
            await groupCommandRepository.UpdateAsync(group);
        }
    }
}
