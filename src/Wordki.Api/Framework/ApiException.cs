using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wordki.Api.Framework
{
    public class ApiException : Exception
    {
        public ErrorCode Code { get; private set; }
    }
}
