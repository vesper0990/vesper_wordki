using System.Collections.Generic;
using Wordki.Core;
using Wordki.Core.Enums;

namespace Wordki.Tests.EndToEnd
{
    public static class Util
    {

        public static User GetUser(long id = 1, string name = "name", string password = "password")
        {
            return new User
            {
                Id = id,
                Name = name,
                Password = password,
            };
        }

        public static Group getGroup(
            long id = 1,
            long userId = 1,
            string name = "group",
            LanguageType language1 = LanguageType.Polish, 
            LanguageType language2 = LanguageType.English){
             return new Group{
                 Id = id,
                 UserId = userId,
                 Name = name, 
                 Language1 = language1,
                 Language2 = language1
             };
        }

        public static Word getWord(
            long id,
            long groupId,
            long userId,
            string language1,
            string language2
        ){
            return new Word{
                Id = id,
                GroupId = groupId,
                UserId = userId,
                Language1 = language1,
                Language2 = language2
            };
        }

        public static Result getResult(
            long id,
            long groupId,
            long userId
        ){
            return new Result{
                Id = id,
                GroupId = groupId,
                UserId = userId,
                Correct = 1,
                Accepted = 1,
                Wrong = 1,
                Invisible = 1
            };
        }

        public static IEnumerable<Group> getGroups(int count = 10, long userId = 1){
            for(int i=0;i<count ;i++){
                yield return getGroup(i, userId);
            }
        }

        public static IEnumerable<Word> getWords( int groupId, int userId, int count = 10){
            for(int i=0; i<count; i++){
                yield return getWord(i, groupId, userId, $"slowo {i}", $"word {i}");
            }
        }

        public static IEnumerable<Result> getResults( int groupId, int userId, int count = 10){
            for(int i=0; i<count; i++){
                yield return getResult(i, groupId, userId);
            }
        }
    }
}
