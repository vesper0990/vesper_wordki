using Microsoft.Extensions.Options;
using Wordki.Tests.Utils.ServerMock;

public static class ExtensionMethods
{

    public static K GetSettings<T, K>(this ServerMock<T> server) where T : class
    where K : class, new()
    {
        var opt = server.Server.Services.GetService(typeof(IOptions<K>)) as IOptions<K>;
        return opt != null ? opt.Value : null;
    }

}