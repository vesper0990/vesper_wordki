using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Core.Data;

namespace Wordki.Infrastructure.Services
{
    public interface IDataInitializer
    {
        Task Initialize();
    }

    public class DataInitializer : IDataInitializer
    {
        private readonly IGroupRepository groupRepository;
        private readonly IUserRepository userRepository;
        private readonly IUserFactory userFactory;
        private readonly IEncrypter encrypter;
        private readonly IWordFactory wordFactory;

        public DataInitializer(IGroupRepository groupRepository, IUserRepository userRepository, IUserFactory userFactory, IEncrypter encrypter, IWordFactory wordFactory)
        {
            this.groupRepository = groupRepository;
            this.userRepository = userRepository;
            this.userFactory = userFactory;
            this.encrypter = encrypter;
            this.wordFactory = wordFactory;
        }

        public async Task Initialize()
        {
            for (int i = 1; i <= 2; i++)
            {
                var user = userFactory.Create($"user{i}", encrypter.Md5Hash($"pass{i}"));
                var userId = await userRepository.SaveAsync(user);
                for (int j = 1; j <= 10; j++)
                {
                    var group = Group.Create(userId, $"group${j}", (LanguageEnum)(j % 2), (LanguageEnum)(j % 2), DateTime.Now);
                    for (int k = 1; k <= 10; k++)
                    {
                        group.AddWord(wordFactory.Create(0, $"word{k}", $"slowo{k}", string.Empty, string.Empty, string.Empty));
                    }
                    await groupRepository.SaveAsync(group);
                }
            }
        }
    }
}
