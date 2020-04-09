using System.Collections.Generic;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetUserSettings
{
    public class UserSettingsDto : IDto
    {
        public IEnumerable<int?> Languages { get; set; }
    }
}
