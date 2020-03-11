using System.Collections.Generic;

namespace Wordki.Api.Groups.AddGroup
{
    public class AddGroupRequest
    {
        public string Name { get; set; }
        public int Language1 { get; set; }
        public int Language2 { get; set; }
        public IEnumerable<WordToAdd> Words { get; set; }

        public class WordToAdd
        {
            public string Language1 { get; set; }
            public string Language2 { get; set; }
            public string Example1 { get; set; }
            public string Example2 { get; set; }
            public string Comment { get; set; }
        }
    }
}