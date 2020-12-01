namespace Wordki.Tests.UI.Register
{
    public class RegisterTestBase : UITestBase
    {
        protected void NavigateToRegister()
            => Driver.Navigate().GoToUrl($"{AppUrl}/user/register");

        protected void SetupRegisterEndpoints()
            => Server.AddPostEndpoint("/user/register", new { }, body => true)
                    .AddPutEndpoint("/user/login", "token", body => true);
    }
}
