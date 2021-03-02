using System.Collections.Generic;
using System.Net;
using Wordki.Api.Domain2;
using Wordki.Api.Featuers.Group.Add;

namespace Wordki.Tests.E2E.Feature.GroupTests.AddTests
{
    public class AddEmptyNewGroup : AddSuccessContext
    {
        public override User GivenEntity => Utils.GetUser();

        public override AddGroupCommand GivenRequest => new AddGroupCommand
        {
            Name = "test-group-name",
            Cards = new Api.Featuers.Group.Add.Card[0],
            FrontLanguage = 1,
            BackLanguage = 2
        };

        public override HttpStatusCode ExpectedStatusCode => HttpStatusCode.OK;
        public override Group ExpectedGroup => new Group
        {
            Id = 1,
            BackLanguage = 2,
            FrontLanguage = 1,
            Name = "test-group-name",
            CreationDate = DateTimeMock.Now.Date,
            Cards = new List<Api.Domain2.Card>()
        };
    }
}