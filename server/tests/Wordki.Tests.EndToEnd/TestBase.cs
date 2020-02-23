using System.Net.Http;
using System.Threading.Tasks;
using NUnit.Framework;
using Wordki;
using Wordki.Tests.EndToEnd;
using Wordki.Tests.EndToEnd.Configuration;
using Wordki.Tests.Utils.ServerMock;

public class TestBase
{

    protected HttpRequestMessage Request { get; set; }
    protected HttpResponseMessage Response { get; set; }
    protected TestServerMock Host { get; set; }

    public TestBase()
    {

    }

    [SetUp]
    protected async Task CreateDatabase()
    {
        using (var dbContext = new EntityFramework())
        {
            await dbContext.Database.EnsureCreatedAsync();
        }
    }

    [TearDown]
    protected async Task DropDabase(){
        using (var dbContext = new EntityFramework())
        {
            await dbContext.Database.EnsureDeletedAsync();
        }
    }

    protected async Task SendRequest(){
        Response = await Host.Client.SendAsync(Request);
    }


}