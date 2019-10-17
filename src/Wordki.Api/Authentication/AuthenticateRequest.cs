using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wordki.Api.Authentication
{
    public class AuthenticateRequest
    {
        public string Name { get; set; }
        public string Password { get; set; }
    }
}
