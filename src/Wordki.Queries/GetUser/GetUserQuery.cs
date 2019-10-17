using Wordki.Utils;
using Wordki.Utils.Queries;

namespace Wordki.Queries.GetUser
{
    public class GetUserQuery : IQuery<GetUserDto>
    {
        private GetUserQuery() { }

        public string Name { get; private set; }
        public string Password { get; private set; }

        public static GetUserQuery Create(string name, string password)
        {
            Condition.MustBeDefined(name, nameof(name));
            Condition.MustBeDefined(password, nameof(password));

            return new GetUserQuery()
            {
                Name = name,
                Password = password
            };
        }

        
    }
}
