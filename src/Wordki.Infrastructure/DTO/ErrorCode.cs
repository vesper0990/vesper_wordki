namespace Wordki.Infrastructure.DTO
{
    public enum ErrorCode
    {
        Default,
        NullArgumentException,
        UserAlreadyExistsException,
        AuthenticaitonException,
        InsertToDbException,
        UpdateInDbException,
        RemovingFromDbException,
    }
}
