using Microsoft.AspNetCore.Mvc;
using Wordki.Infrastructure.Services;

namespace Wordki.Controllers
{
    [Route("[controller]")]
    public class TestController : Controller
    {

        public IDataInitializer DataInitializer { get; set; }

        public TestController(IDataInitializer dataInitializer)
        {
            DataInitializer = dataInitializer;
        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            DataInitializer.Init();
            return Content("test");
        }


    }
}
