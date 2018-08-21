using System;
using System.Linq;
using System.Collections.Generic;
using Wordki.Core;
using Wordki.Infrastructure.EntityFramework;
using Wordki.Infrastructure.Settings;
using NLog;

namespace Wordki.Infrastructure.Services
{
    public class SQLDataInitializer : IDataInitializer
    {
        private static readonly Logger logger = LogManager.GetCurrentClassLogger();

        private readonly WordkiDbContext context;
        private readonly IEncrypter encrypter;
        private readonly GeneralSettings settings;

        public SQLDataInitializer(WordkiDbContext context, IEncrypter encrypter, GeneralSettings settings)
        {
            this.context = context;
            this.encrypter = encrypter;
            this.settings = settings;
        }

        public void Init()
        {
            try
            {
                logger.Info("Database initialization");
                context.Database.EnsureCreated();
                if(settings.SeedData && context.Users.Count() == 0){
                    UserSeed();
                    DataSeed();
                }
            }catch(Exception e)
            {
                logger.Error(e, "Database initialization failed");
            }
        }

        private void UserSeed()
        {
            User user = new User
            {
                Id = 1,
                Name = "admin",
                Password = encrypter.Md5Hash("password"),
                ApiKey = encrypter.Md5Hash("password"),
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
                for (int j = 0; j < 2; j++)
                {
                    var word = new Word
                    {
                        Id = DateTime.Now.Ticks,
                        Group = group,
                        UserId = 1,
                        Language1 = $"Slowo {j}, slowo{j}",
                        Language2 = $"Word {j}, word{j}",
                        Language1Example = $"To jest jakis przykład dla Slowo {j} lub slowo{j}",
                        Language2Example = $"This is an example for Word {j} or word{j}",
                        RepeatingCounter = (ushort)j,
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
