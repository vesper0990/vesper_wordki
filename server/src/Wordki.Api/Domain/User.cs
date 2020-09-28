using System;
using System.Collections.Generic;

namespace Wordki.Api.Domain
{
    public class User
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public IList<Group> Groups { get; }

        public User()
        {
            Groups = new List<Group>();
        }
    }
}
