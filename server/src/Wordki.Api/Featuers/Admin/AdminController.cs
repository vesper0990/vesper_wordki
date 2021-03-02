using System;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Wordki.Api.Domain2;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Services;

namespace Wordki.Api.Featuers.Admin
{
    [Route("admin")]
    public class AdminController : ControllerBase
    {
        private readonly IEncrypter encrypter;
        private readonly IConfiguration configuration;
        private readonly IConnectionStringProvider connectionStringProvider;
        private readonly WordkiDbContext dbContext;
        private readonly WordkiDbContext2 dbContext2;
        private readonly IDatabaseInitializer init;
        private readonly ICardFactory cardFactory;

        public AdminController(
            IEncrypter encrypter,
            IMediator mediator,
            IConfiguration configuration,
            IConnectionStringProvider connectionStringProvider,
            WordkiDbContext dbContext,
            WordkiDbContext2 dbContext2,
            IDatabaseInitializer init,
            ICardFactory cardFactory) : base(mediator)
        {
            this.encrypter = encrypter;
            this.configuration = configuration;
            this.connectionStringProvider = connectionStringProvider;
            this.dbContext = dbContext;
            this.dbContext2 = dbContext2;
            this.init = init;
            this.cardFactory = cardFactory;
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

        [HttpGet("init2")]
        public async Task<IActionResult> Init2()
        {
            await dbContext2.Database.EnsureDeletedAsync();
            await dbContext2.Database.EnsureCreatedAsync();

            const int groupCount = 2;
            const int cardCount = 2;

            Domain2.User user = new Domain2.User()
            {
                Name = "testUser",
                Password = encrypter.Md5Hash("testPassword"),
                CreationDate = DateTime.Now,
                LastLoginDate = DateTime.Now
            };

            for (int i = 0; i < groupCount; i++)
            {
                Domain2.Group group = new Domain2.Group()
                {
                    Name = $"group {i}",
                    FrontLanguage = 1,
                    BackLanguage = 2,
                    CreationDate = DateTime.Now.Date
                };

                for (int j = 0; j < cardCount; j++)
                {
                    Domain2.Card card = cardFactory.Create(
                        $"Card {j} from Group {i}",
                        $"karta {j} z Groupy {i}",
                        string.Empty,
                        string.Empty);
                    group.AddCard(card);
                }
                user.AddGroup(group);
            }

            await dbContext2.Users.AddAsync(user);
            await dbContext2.SaveChangesAsync();

            return Ok();
        }
    }
}