using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Wordki.Tests.EndToEnd;
using Wordki.Tests.EndToEnd.Configuration;
using Wordki.Utils.Dapper;

public class TestBase
{

    protected HttpRequestMessage Request { get; set; }
    protected HttpResponseMessage Response { get; set; }
    protected TestServerMock Host { get; set; }
    protected DapperSettings DapperSettings { get; set; }

    public TestBase()
    {
        Host = new TestServerMock();
        DapperSettings = Host.GetSettings<DapperSettings>();
    }

    [SetUp]
    protected async Task CreateDatabase()
    {
        using (var dbContext = new EntityFramework(DapperSettings))
        {
            await dbContext.Database.EnsureCreatedAsync();
            await dbContext.Database.ExecuteSqlRawAsync("Delete from repeats");
            await dbContext.Database.ExecuteSqlRawAsync("Delete from words");
            await dbContext.Database.ExecuteSqlRawAsync("Delete from groups");
            await dbContext.Database.ExecuteSqlRawAsync("Delete from users");
        }
    }

    //[TearDown]
    //protected async Task DropDabase(){
    //}

    protected async Task SendRequest(){
        Response = await Host.Client.SendAsync(Request);
    }


}