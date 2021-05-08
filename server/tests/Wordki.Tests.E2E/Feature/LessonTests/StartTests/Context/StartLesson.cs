using Wordki.Api.Domain2;

namespace Wordki.Tests.E2E.Feature.LessonTests.StartTests
{
    public class StartLesson : StartSuccessContext
    {
        public override User GivenEntity { get; }

        public override Lesson ExpectedLesson { get; }

        public StartLesson()
        {
            GivenEntity = Utils.GetUser();

            ExpectedLesson = new Lesson
            {
                Id = 1,
                Date = DateTimeMock.Now.Date,
                Repeats = new Repeat[0]
            };
        }
    }
}