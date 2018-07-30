
using System.Collections.Generic;

namespace Wordki.Core
{
    public class User
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string ApiKey { get; set; }
        public IList<Group> Groups { get; set; }

        public User()
        {
            Groups = new List<Group>();
        }
    }
}
