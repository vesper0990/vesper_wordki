using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Wordki.Core;
using Wordki.Core.Repositories;

namespace Wordki.Infrastructure.Repositories
{
    public class ResultRepository : IResultRepository
    {
        public Task<IEnumerable<Result>> GetAllAsync()
        {
            throw new NotImplementedException();
        }
    }
}
