using System.Threading.Tasks;
using NUnit.Framework;

namespace Wordki.Tests.EndToEnd.Controllers.Words
{
    [TestFixture]
    public class Test_AddAll : TestBase
    {

        [Test]
        public async Task Try_to_invoke_if_body_is_empty()
        {
            await ClearDatabase();
        }

        public async Task Try_to_invoke_if_authentication_is_failed()
        {
            await ClearDatabase();
        }

        public async Task Try_to_invoke_if_words_have_not_got_group_id(){
            await ClearDatabase();
        }

        public async Task Try_to_invoke_if_parent_group_not_exists_in_database(){
            await ClearDatabase();
        }

        public async Task Try_to_invoke_if_it_is_ok(){
            await ClearDatabase();
        }
    }

}