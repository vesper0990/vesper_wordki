using Wordki.Core;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetUser
{
    public class GetUserDto : IDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
    }
}
