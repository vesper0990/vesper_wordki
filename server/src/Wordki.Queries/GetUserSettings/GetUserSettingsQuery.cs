using System;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetUserSettings
{
    public class GetUserSettingsQuery : IQuery<UserSettingsDto>
    {

        public long UserId { get; private set; }

        private GetUserSettingsQuery() { }

        public static GetUserSettingsQuery Create(long userId)
        {
            if (userId <= 0)
            {
                throw new Exception("userId cannot be equal or less 0");
            }
            return new GetUserSettingsQuery
            {
                UserId = userId
            };
        }
    }
}
