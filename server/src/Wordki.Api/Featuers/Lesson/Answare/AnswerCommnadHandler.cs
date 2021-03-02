using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Runtime.Serialization;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Domain;
using Wordki.Api.Domain2;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Services;
using Wordki.Utils.HttpContext;
using Wordki.Utils.TimeProvider;
using Repeat = Wordki.Api.Domain2.Repeat;

namespace Wordki.Api.Featuers.Lesson.Answer
{
    public class AnswerCommnadHandler : IRequestHandler<AnswerCommand>
    {
        private readonly WordkiDbContext2 dbContext;
        private readonly IHttpContextProvider contextProvider;
        private readonly INextRepeatCalculator nextRepeatCalculator;
        private readonly ITimeProvider timeProvider;

        public AnswerCommnadHandler(
            WordkiDbContext2 dbContext,
            IHttpContextProvider contextProvider,
            INextRepeatCalculator nextRepeatCalculator,
            ITimeProvider timeProvider)
        {
            this.dbContext = dbContext;
            this.contextProvider = contextProvider;
            this.nextRepeatCalculator = nextRepeatCalculator;
            this.timeProvider = timeProvider;
        }

        public async Task<Unit> Handle(AnswerCommand request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            if (userId == 0)
            {
                throw new ApiException("userId == 0");
            }
            var card = await dbContext.Cards
            .Include(c => c.CardDetails)
            .ThenInclude(d => d.Repeats)
            .SingleOrDefaultAsync(c => c.Id == request.CardId && c.Group.Owner.Id == userId, cancellationToken);
            if (card == null)
            {
                throw new ApiException($"Card not found for id {request.CardId}");
            }
            var lesson = await dbContext.Lessons
            .SingleOrDefaultAsync(l => l.Id == request.LessonId && l.Owner.Id == userId, cancellationToken);
            if (lesson == null)
            {
                throw new ApiException($"Lesson not found for id {request.LessonId}");
            }

            await dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }

        private void AddRepeat(Domain.Card card, QuestionSideEnum questionSide, RepeatResultEnum repeatReuslt, Domain.Lesson lesson)
        {
            // var newResult = new Repeat
            // {
            //     DateTime = timeProvider.GetTime(),
            //     Lesson = lesson,
            //     QuestionSide = questionSide,
            //     Result = (int)repeatReuslt,
            //     Word = card
            // };

            // dbContext.Repeats.Add(newResult);
        }

        private void UpdateNextRepeat(Domain.Card card, QuestionSideEnum questionSide)
        {
            var nextRepeat = nextRepeatCalculator.Calculate(card, questionSide);
            var side = questionSide == QuestionSideEnum.Front ? card.Front : card.Back;
            side.State.NextRepeat = nextRepeat;
        }

        private void UpdateDrawer(State state, RepeatResultEnum repeatResult)
        {
            switch (repeatResult)
            {
                case RepeatResultEnum.Correct:
                    {
                        state.Drawer = Drawer.Create(state.Drawer.Value + 1);
                        break;
                    }
                case RepeatResultEnum.Wrong:
                    {
                        state.Drawer = Drawer.Create(0);
                        break;
                    }
            }
        }

        [System.Serializable]
        private class ApiException : System.Exception
        {
            public ApiException()
            {
            }

            public ApiException(string message) : base(message)
            {
            }

            public ApiException(string message, System.Exception innerException) : base(message, innerException)
            {
            }

            protected ApiException(SerializationInfo info, StreamingContext context) : base(info, context)
            {
            }
        }
    }
}
