using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Core.Repositories;
using Wordki.Infrastructure.DTO;

namespace Wordki.Infrastructure.Services
{
    public class GroupService : IGroupService, IService
    {

        private readonly IGroupRepository groupRepository;

        public GroupService(IGroupRepository groupRepository)
        {
            this.groupRepository = groupRepository;
        }

        public async Task<IEnumerable<GroupDTO>> GetGroupItemsAsync(long userId)
        {
            return await Task.Run(() =>
            {
                return from g in groupRepository.GetGroups()
                       where g.UserId == userId && g.State >= 0
                       select new GroupDTO()
                       {
                           Id = g.Id,
                           Language1 = g.Language1,
                           Language2 = g.Language2,
                           Name = g.Name,
                           WordsCount = g.Words.Count(x => x.State >= 0),
                           ResultsCount = g.Results.Count(x => x.State >= 0),
                       };
            });

        }
    }
}
