import * as actions from './actions';
import { initialLessonsState, LessonState } from './state';

export function reducer(state = initialLessonsState, action: actions.LessonActionType): LessonState {
    switch (action.type) {
        case actions.LessonActionEnum.CREATE_NEW_LESSON_SUCCESS: return actions.CreateNewLessonSuccess.reduce(state, action);
        case actions.LessonActionEnum.GET_WORDS: return actions.GetWords.reduce(state);
        case actions.LessonActionEnum.GET_WORDS_SUCCESS: return actions.GetWordsSuccess.reduce(state, action);
        case actions.LessonActionEnum.GET_WORDS_FAILES: return actions.GetWordsFailed.reduce(state);
        case actions.LessonActionEnum.START_LESSON: return actions.StartLesson.reduce(state);
        case actions.LessonActionEnum.CHECK_CARD: return actions.CheckCard.reduce(state);
        case actions.LessonActionEnum.COMPARE: return actions.Compare.reduce(state);
        case actions.LessonActionEnum.COMPARISON_CORRECT: return actions.ComparisonCorrect.reduce(state);
        case actions.LessonActionEnum.COMPARISON_WRONG: return actions.ComparisonWrong.reduce(state);
        case actions.LessonActionEnum.ANWSER_CORRECT: return actions.AnswerCorrect.reduce(state);
        case actions.LessonActionEnum.ANSWER_WRONG: return actions.AnswerWrong.reduce(state);
        case actions.LessonActionEnum.FINISH_LESSON: return actions.FinishLesson.reduce(state, action);
        case actions.LessonActionEnum.PAUSE_LESSON: return actions.PauseLesson.reduce(state);
        case actions.LessonActionEnum.RESTART_LESSON: return actions.RestartLesson.reduce(state);
        case actions.LessonActionEnum.UPDATE_CARD_CORRECT: return actions.UpdateCardCorrect.reduce(state);
        case actions.LessonActionEnum.UPDATE_CARD_CORRECT_SUCCESS: return actions.UpdateCardCorrectSuccess.reduce(state);
        case actions.LessonActionEnum.UPDATE_CARD_CORRECT_FAILED: return actions.UpdateCardCorrectFailed.reduce(state);
        case actions.LessonActionEnum.UPDATE_CARD_WRONG: return actions.UpdateCardWrong.reduce(state);
        case actions.LessonActionEnum.UPDATE_CARD_WRONG_SUCCESS: return actions.UpdateCardWrongSuccess.reduce(state);
        case actions.LessonActionEnum.UPDATE_CARD_WRONG_FAILED: return actions.UpdateCardWrongFailed.reduce(state);
        case actions.LessonActionEnum.FINISH: return actions.Finish.reduce();
        default: return state;
    }
}
