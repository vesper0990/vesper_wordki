namespace Wordki.Infrastructure.Services
{
    public interface IEncrypter
    {

        string GetSalt(string value);
        string GetHash(string value, string salt);
        string Md5Hash(string value);

    }
}
