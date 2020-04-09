using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Core.Data;
using Wordki.Core.Domain;
using Wordki.Utils.Dapper;

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
        private readonly IDbConnectionProvider dbConnection;
        private static readonly Random random = new Random();

        public DataInitializer(IGroupRepository groupRepository,
            IUserRepository userRepository,
            IUserFactory userFactory,
            IEncrypter encrypter,
            IDbConnectionProvider dbConnection)
        {
            this.groupRepository = groupRepository;
            this.userRepository = userRepository;
            this.userFactory = userFactory;
            this.encrypter = encrypter;
            this.dbConnection = dbConnection;
        }

        public async Task Initialize()
        {
            using (var connection = await dbConnection.Connect())
            {
                await connection.Execute("DELETE FROM users where name = 'sampleUser'");
            }

            for (int i = 1; i <= 1; i++)
            {
                var user = userFactory.Create($"sampleUser", encrypter.Md5Hash($"password"));
                var userId = await userRepository.SaveAsync(user);
                for (int j = 1; j <= 10; j++)
                {
                    var creationDate = DateTime.Today.AddDays(random.Next(0, 5) - 10);
                    var group = Group.Restore(0, userId, $"group {j}", (LanguageEnum)1, (LanguageEnum)2, creationDate, new List<Word>());
                    for (int k = 1; k <= 10; k++)
                    {
                        var word = Word.Restore(
                            0,
                            0,
                            $"word {k}",
                            $"slowo {k}",
                            $"This is a very long, example sentance where word {k} is used, but only one time.",
                            $"To jest bardzo długie, przykładowe zdanie gdzie słowo {k} zostało użyte, ale tylko jeden raz.",
                            $"Tutaj można dodać jakiś komentarz do słowa {k}",
                            Drawer.Restore(random.Next(0, 4)),
                            false,
                            creationDate,
                            new DateTime().AddDays(random.Next(0, 5)),
                            new List<Repeat>());
                        for (var l = 0; l < k; l++)
                        {
                            var repeat = Repeat.Restore(0, 0, DateTime.Now.AddDays(random.Next(0, 5) - 10), 1);
                            word.AddRepeat(repeat);
                        }
                        group.AddWord(word);
                    }
                    await groupRepository.SaveAsync(group);
                }
            }
        }
    }
}
