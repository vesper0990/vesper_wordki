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
        private readonly IGroupRepository groupRepository;
        private readonly IMapper mapper;

        public GroupService(IGroupRepository groupRepository, IMapper mapper)
        {
            this.groupRepository = groupRepository;
            this.mapper = mapper;
        }

        public async Task<GroupDetailsDTO> AddAsync(GroupDetailsDTO groupDto, long userId)
        {
            var group = mapper.Map<Group>(groupDto);
            group.UserId = userId;
            await groupRepository.AddAsync(group);
            return mapper.Map<Group, GroupDetailsDTO>(group);
        }

        public async Task<GroupDetailsDTO> GetDetailsAsync(long groupId)
        {
            return mapper.Map<Group, GroupDetailsDTO>(await groupRepository.GetAsync(groupId, true));
        }

        public async Task<IEnumerable<GroupDTO>> GetItemsAsync(long userId)
        {
            return await Task.Run(() =>
            {
                return (from g in groupRepository.GetGroups()
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
                            LastLessonDate = g.Results.Count(x => x.State >= 0) > 0 ? new System.DateTime() : g.Results.First().DateTime,
                        }).ToList();
            });

        }

        public async Task RemoveAsync(long id)
        {
            await groupRepository.RemoveAsync(id);
        }

        public async Task UpdateAsync(GroupDTO groupDto, long userId)
        {
            var group = mapper.Map<Group>(groupDto);
            group.UserId = userId;
            await groupRepository.UpdateAsync(group);
        }
    }
}
