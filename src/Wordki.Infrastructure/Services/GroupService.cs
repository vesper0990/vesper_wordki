using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Core.Repositories;
using Wordki.Infrastructure.DTO;
using AutoMapper;
using Wordki.Core;
using System;
using Wordki.Core.Extensions;

namespace Wordki.Infrastructure.Services
{
    public class GroupService : IGroupService, IService
    {
        private readonly IGroupQueryRepository groupQueryRepository;
        private readonly IGroupCommandRepository groupCommandRepository;
        private readonly IWordCommandRepository wordCommandRepository;
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
                        });
            });

        }

        public async Task RemoveAsync(long id)
        {
            await groupCommandRepository.RemoveAsync(id);
        }

        public async Task SplitGroup(GroupToSplitDTO groupToSplitDTO)
        {
            var group = await groupQueryRepository.GetAsync(groupToSplitDTO.Id, true);
            var dateTime = DateTime.Now;
            var newGroup = new Group()
            {
                CreationDate = dateTime,
                Language1 = group.Language1,
                Language2 = group.Language2,
                LastChange = dateTime,
                Name = string.Format($"{group.Name}*"),
                UserId = group.UserId,
            };
            await groupCommandRepository.AddAsync(newGroup);
            for (var i = group.Words.Count - groupToSplitDTO.Factor; i < group.Words.Count; i++)
            {
                newGroup.AddWord(group.Words[i]);
            }
            await groupCommandRepository.UpdateAsync(newGroup);
        }

        public async Task UpdateAsync(GroupDTO groupDto, long userId)
        {
            var group = mapper.Map<Group>(groupDto);
            group.UserId = userId;
            await groupCommandRepository.UpdateAsync(group);
        }
    }
}
