using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using Wordki.Api.Domain;
using Wordki.Api.Repositories.EntityFrameworkRepositories;
using Wordki.Api.Services;
using Wordki.Utils.HttpContext;
using Wordki.Utils.TimeProvider;

namespace Wordki.Api.Featuers.Lesson.Answare
{
    public class AnswareCommnadHandler : IRequestHandler<AnswareCommand>
    {
        private readonly WordkiDbContext dbContext;
        private readonly IHttpContextProvider contextProvider;
        private readonly INextRepeatCalculator nextRepeatCalculator;
        private readonly ITimeProvider timeProvider;

        public AnswareCommnadHandler(
            WordkiDbContext dbContext,
            IHttpContextProvider contextProvider,
            INextRepeatCalculator nextRepeatCalculator,
            ITimeProvider timeProvider)
        {
            this.dbContext = dbContext;
            this.contextProvider = contextProvider;
            this.nextRepeatCalculator = nextRepeatCalculator;
            this.timeProvider = timeProvider;
        }

        public async Task<Unit> Handle(AnswareCommand request, CancellationToken cancellationToken)
        {
            var userId = contextProvider.GetUserId();
            var card = await dbContext.Words.Include(c => c.Repeats).SingleOrDefaultAsync(c => c.Id == request.CardId && c.Group.User.Id == userId, cancellationToken);
            var lesson = await dbContext.Lessons.SingleOrDefaultAsync(l => l.Id == request.LessonId && l.User.Id == userId, cancellationToken);
            UpdateDrawer(request.QuestionSide == QuestionSideEnum.Heads ? card.Heads.State : card.Tails.State, request.repeatReuslt);
            UpdateNextRepeat(card, request.QuestionSide);
            AddRepeat(card, request.QuestionSide, request.repeatReuslt, lesson);

            await dbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }

        private void AddRepeat(Domain.Card card, QuestionSideEnum questionSide, RepeatResultEnum repeatReuslt, Domain.Lesson lesson)
        {
            var newResult = new Repeat
            {
                DateTime = timeProvider.GetTime(),
                Lesson = lesson,
                QuestionSide = questionSide,
                Result = RepeatResult.Create((int)repeatReuslt),
                Word = card
            };

            dbContext.Repeats.Add(newResult);
        }

        private void UpdateNextRepeat(Domain.Card card, QuestionSideEnum questionSide)
        {
            var nextRepeat = nextRepeatCalculator.Calculate(card, questionSide);
            var side = questionSide == QuestionSideEnum.Heads ? card.Heads : card.Tails;
            side.State.NextRepeat = nextRepeat;
        }

        private void UpdateCard(Domain.Card card, QuestionSideEnum questionSide, RepeatResultEnum repeatResult)
        {

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
    }
}
