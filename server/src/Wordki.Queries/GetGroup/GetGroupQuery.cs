using System;
using System.Collections.Generic;
using System.Text;
using Wordki.Utils;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetGroup
{
    public class GetGroupQuery : IQuery<GetGroupDto>
    {
        public long GroupId { get; private set; }
        public long UserId { get; private set; }

        private GetGroupQuery() { }

        public static GetGroupQuery Create(long groupId)
        {
            Condition.True(groupId > 0, "groupId must be defined");

            return new GetGroupQuery
            {
                GroupId = groupId,
            };
        }
    }
}
