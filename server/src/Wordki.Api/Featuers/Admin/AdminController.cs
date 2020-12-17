using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Wordki.Api.Repositories.EntityFrameworkRepositories;

namespace Wordki.Api.Featuers.Admin
{
    [Route("admin")]
    public class AdminController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly IConnectionStringProvider connectionStringProvider;
        private readonly WordkiDbContext dbContext;
        private readonly IDatabaseInitializer init;

        public AdminController(
            IMediator mediator,
            IConfiguration configuration,
            IConnectionStringProvider connectionStringProvider,
            WordkiDbContext dbContext,
            IDatabaseInitializer init) : base(mediator)
        {
            this.configuration = configuration;
            this.connectionStringProvider = connectionStringProvider;
            this.dbContext = dbContext;
            this.init = init;
        }


        [HttpGet("env")]
        public IActionResult Env()
            => new JsonResult(configuration.AsEnumerable().Select(
                x => new { x.Key, x.Value }
            ));

        [HttpGet("connectionString")]
        public IActionResult ConnectionString()
            => new JsonResult(connectionStringProvider.ConnectionString);

        [HttpGet("users")]
        public IActionResult Users()
            => new JsonResult(dbContext.Users);

        [HttpGet("groups")]
        public IActionResult Groups()
            => new JsonResult(dbContext.Groups);

        [HttpGet("init")]
        public async Task<IActionResult> Init()
        {
            await init.Init();
            return Ok();
        }

    }
}