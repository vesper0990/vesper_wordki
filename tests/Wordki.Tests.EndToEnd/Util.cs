using Wordki.Core;

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



    }
}
