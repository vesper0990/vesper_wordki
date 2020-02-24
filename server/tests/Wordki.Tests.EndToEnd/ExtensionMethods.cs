using Microsoft.Extensions.Options;
using Wordki.Tests.EndToEnd;

public static class ExtensionMethods
{

    public static K GetSettings<K>(this TestServerMock server) where K : class, new()
    {
        var opt = server.Server.Services.GetService(typeof(IOptions<K>)) as IOptions<K>;
        return opt != null ? opt.Value : null;
    }

}