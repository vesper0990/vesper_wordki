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
                if (await connection.ExecuteScalar("SELECT COUNT(*) FROM users") > 0)
                {
                    return;
                }
            }

            using (var connection = await dbConnection.Connect())
            {
                await connection.Execute("DELETE FROM repeats");
                await connection.Execute("DELETE FROM words");
                await connection.Execute("DELETE FROM groups2");
                await connection.Execute("DELETE FROM users");
            }

            for (int i = 1; i <= 1; i++)
            {
                var user = userFactory.Create($"user{i}", encrypter.Md5Hash($"pass{i}"));
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
                            string.Empty,
                            string.Empty,
                            string.Empty,
                            Drawer.Restore(random.Next(0, 4)),
                            random.Next(0, 9) < 2,
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
