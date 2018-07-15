using System;
using System.Collections.Generic;
using Wordki.Core;
using Wordki.Infrastructure.EntityFramework;

namespace Wordki.Infrastructure.Services
{
    public class DataInitializer : IDataInitializer
    {
        private readonly WordkiDbContext context;
        private readonly IEncrypter encrypter;

        public DataInitializer(WordkiDbContext context, IEncrypter encrypter)
        {
            this.context = context;
            this.encrypter = encrypter;
        }

        public void Init()
        {
            return;
            context.Database.EnsureCreated();
            UserSeed();
            DataSeed();
        }

        private void CheckDatabase()
        {

        }

        private void UserSeed()
        {
            User user = new User
            {
                Id = 1,
                Name = "admin",
                Password = encrypter.Md5Hash("password"),
            };
            context.Users.Add(user);
            context.SaveChanges();
        }

        private void DataSeed()
        {
            List<Group> groups = new List<Group>();
            for (int i = 0; i < 10; i++)
            {
                var group = new Group
                {
                    Id = DateTime.Now.Ticks,
                    Name = $"Group {i}",
                    UserId = 1,
                    Language1 = Core.Enums.LanguageType.Polish,
                    Language2 = Core.Enums.LanguageType.English,
                    Words = new List<Word>(),
                    Results = new List<Result>()
                };
                for (int j = 0; j < 10; j++)
                {
                    var word = new Word
                    {
                        Id = DateTime.Now.Ticks,
                        Group = group,
                        UserId = 1,
                        Language1 = $"Słowo {j}",
                        Language2 = $"Word {j}",
                    };
                    group.Words.Add(word);

                    var result = new Result
                    {
                        Id = DateTime.Now.Ticks,
                        UserId = 1,
                    };
                    group.Results.Add(result);
                }
                groups.Add(group);
            }
            context.Groups.AddRange(groups);
            context.SaveChanges();
        }
    }
}
