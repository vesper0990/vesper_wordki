using System.Collections.Generic;
using Wordki.Core;
using Wordki.Core.Extensions;
using Wordki.Core.Enums;
using System.Net.Http;
using Wordki.Infrastructure.EntityFramework;
using System.Threading.Tasks;
using Wordki.Infrastructure.Services;
using System.Linq;
using System;

namespace Wordki.Tests.EndToEnd
{
    public static class Util
    {
        public static int groupCounter = 1;
        public static int wordCounter = 1;
        public static int resultCounter = 1;
        public static User GetUser(long id = 1, string name = "name", string password = "password")
        {
            return new User
            {
                Id = id,
                Name = name,
                Password = password,
            };
        }

        public static Group GetGroup(
            long id = 1,
            long userId = 1,
            string name = "group",
            LanguageType language1 = LanguageType.Polish,
            LanguageType language2 = LanguageType.English)
        {
            return new Group
            {
                Id = id,
                UserId = userId,
                Name = name,
                Language1 = language1,
                Language2 = language1
            };
        }

        public static Word GetWord(
            long id,
            long groupId,
            long userId,
            string language1,
            string language2
        )
        {
            return new Word
            {
                Id = id,
                GroupId = groupId,
                UserId = userId,
                Language1 = language1,
                Language2 = language2
            };
        }

        public static Result GetResult(
            long id,
            long groupId,
            long userId
        )
        {
            return new Result
            {
                Id = id,
                GroupId = groupId,
                UserId = userId,
                Correct = 1,
                Accepted = 1,
                Wrong = 1,
                Invisible = 1
            };
        }

        public static IEnumerable<Group> GetGroups(int count = 10, int wordsCount = 10, int resultsCount = 10, long userId = 1)
        {
            for (int i = 1; i <= count; i++)
            {
                int groupId = groupCounter++;
                yield return GetGroup(groupId, userId).AddAllWords(GetWords(groupId, userId, wordsCount)).AddAllResults(GetResults(groupId, userId, resultsCount));
            }
        }

        public static IEnumerable<Word> GetWords(int groupId, long userId, int count = 10)
        {
            for (int i = 1; i <= count; i++)
            {
                yield return GetWord(0, groupId, userId, $"slowo {i}", $"word {i}");
            }
        }

        public static IEnumerable<Result> GetResults(int groupId, long userId, int count = 10)
        {
            for (int i = 1; i <= count; i++)
            {
                yield return GetResult(0, groupId, userId);
            }
        }

        public static async Task PrepareAuthorization(HttpContent content, User user, IEncrypter encrypter, WordkiDbContext context)
        {
            content.Headers.Add("password", user.Password);
            user.Password = encrypter.Md5Hash(user.Password);
            context.SaveChanges();
            IList<User> users = context.Users.ToList();
            context.Add(user);
            context.SaveChanges();
            content.Headers.Add("userId", user.Id.ToString());
        }
    }
}
