import { createExtendedCardDetails } from 'src/app/test/builders.spec';
import * as actions from '../actions';
import { dashboardReducer } from '../reducer';
import { DashbordState, initialState } from '../state';

class GetLastFailedContext {
    action = new actions.GetLastFailed();
    result = createCustomState();
}

class GetLastFailedSuccessContext {
    action = new actions.GetLastFailedSuccess({ card: createExtendedCardDetails() });
    result = {
        ...initialState,
        lastFailed: createExtendedCardDetails()
    };
}

class GetNextRepeatContext {
    action = new actions.GetNextRepeat();
    result = createCustomState();
}

class GetNextRepeatSuccessContext {
    action = new actions.GetNextRepeatSuccess({ card: createExtendedCardDetails() });
    result = {
        ...initialState,
        nextRepeat: createExtendedCardDetails()
    };
}

class GetNewstCardContext {
    action = new actions.GetNewstCard();
    result = createCustomState();
}

class GetNewstCardSuccessContext {
    action = new actions.GetNewstCardSuccess({ card: createExtendedCardDetails() });
    result = {
        ...initialState,
        newestCard: createExtendedCardDetails()
    };
}

class GetTodayCardsCountContext {
    action = new actions.GetTodayCardsCount();
    result = createCustomState();
}

class GetTodayCardsCountSuccessContext {
    action = new actions.GetTodayCardsCountSuccess({ cardToRepeat: 10 });
    result = {
        ...initialState,
        cardToRepeat: 10
    };
}

class GetLastLessonDateContext {
    action = new actions.GetLastLessonDate();
    result = createCustomState();
}

class GetLastLessonDateSuccessContext {
    action = new actions.GetLastLessonDateSuccess({ lastLesson: new Date(2020, 1, 15) });
    result = {
        ...initialState,
        lastRepeat: new Date(2020, 1, 15)
    };
}

class GetGroupsCountContext {
    action = new actions.GetGroupsCount();
    result = createCustomState();
}

class GetGroupsCountSuccessContext {
    action = new actions.GetGroupsCountSuccess({ groupsCount: 10 });
    result = {
        ...initialState,
        groupsCount: 10
    };
}


class GetCardsCountContext {
    action = new actions.GetCardsCount();
    result = createCustomState();
}

class GetCardsCountSuccessContext {
    action = new actions.GetCardsCountSuccess({ cardsCount: 10 });
    result = {
        ...initialState,
        cardsCount: 10
    };
}

class RequestFailedContext {
    action = new actions.RequestFailed({ error: 'error' });
    result = createCustomState();
}

class OthersContext {
    action = { type: 'test' } as any;
    result = createCustomState();
}

describe('Dashboard reduce', () => {

    [
        new GetLastFailedContext(),
        new GetLastFailedSuccessContext(),
        new GetNextRepeatContext(),
        new GetNextRepeatSuccessContext(),
        new GetNewstCardContext(),
        new GetNewstCardSuccessContext(),
        new GetTodayCardsCountContext(),
        new GetTodayCardsCountSuccessContext(),
        new GetLastLessonDateContext(),
        new GetLastLessonDateSuccessContext(),
        new GetGroupsCountContext(),
        new GetGroupsCountSuccessContext(),
        new GetCardsCountContext(),
        new GetCardsCountSuccessContext(),
        new RequestFailedContext(),
        new OthersContext()
    ].forEach(item => {
        it('should return proper value ' + item.action.type, () => {
            expect(dashboardReducer(initialState, item.action)).toEqual(item.result);
        });
    });
});

function createCustomState(): DashbordState {
    return initialState;
}
