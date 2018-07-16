using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Wordki.Infrastructure.Services
{
    public interface IAuthorizer : IService
    {
        Task<long> AuthorizeAsync(HttpRequest request);
    }
}
