using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;
using Wordki.Infrastructure.Services;

namespace Wordki.Api.GenerateSampleUser
{
    [Route("[controller]")]
    public class GenerateSampleUserController : ControllerBase
    {
        private readonly IDataInitializer dataInitializer;

        public GenerateSampleUserController(IDataInitializer dataInitializer)
        {
            this.dataInitializer = dataInitializer;
        }

        [HttpPost]
        public async Task<IActionResult> Post()
        {
            await dataInitializer.Initialize();
            return new StatusCodeResult((int)HttpStatusCode.OK);
        }

    }
}
