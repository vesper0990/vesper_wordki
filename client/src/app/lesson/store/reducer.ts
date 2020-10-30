import {
    LessonActionType,
    LessonActionEnum,
    GetWords,
    GetWordsSuccess,
    GetWordsFailed,
    StartLesson,
    CheckCard,
    AnswerCorrect,
    AnswerWrong,
    FinishLesson,
    Finish,
    UpdateCardCorrect,
    UpdateCardCorrectSuccess,
    UpdateCardCorrectFailed,
    UpdateCardWrong,
    UpdateCardWrongSuccess,
    UpdateCardWrongFailed,
    PauseLesson,
    RestartLesson
} from './actions';
import { initialLessonsState, LessonState } from './state';

export function reducer(state = initialLessonsState, action: LessonActionType): LessonState {
    switch (action.type) {
        case LessonActionEnum.GET_WORDS: return GetWords.reduce(state);
        case LessonActionEnum.GET_WORDS_SUCCESS: return GetWordsSuccess.reduce(state, action);
        case LessonActionEnum.GET_WORDS_FAILES: return GetWordsFailed.reduce(state);
        case LessonActionEnum.START_LESSON: return StartLesson.reduce(state);
        case LessonActionEnum.CHECK_CARD: return CheckCard.reduce(state);
        case LessonActionEnum.ANWSER_CORRECT: return AnswerCorrect.reduce(state);
        case LessonActionEnum.ANSWER_WRONG: return AnswerWrong.reduce(state);
        case LessonActionEnum.FINISH_LESSON: return FinishLesson.reduce(state, action);
        case LessonActionEnum.PAUSE_LESSON: return PauseLesson.reduce(state);
        case LessonActionEnum.RESTART_LESSON: return RestartLesson.reduce(state);
        case LessonActionEnum.UPDATE_CARD_CORRECT: return UpdateCardCorrect.reduce(state);
        case LessonActionEnum.UPDATE_CARD_CORRECT_SUCCESS: return UpdateCardCorrectSuccess.reduce(state);
        case LessonActionEnum.UPDATE_CARD_CORRECT_FAILED: return UpdateCardCorrectFailed.reduce(state);
        case LessonActionEnum.UPDATE_CARD_WRONG: return UpdateCardWrong.reduce(state);
        case LessonActionEnum.UPDATE_CARD_WRONG_SUCCESS: return UpdateCardWrongSuccess.reduce(state);
        case LessonActionEnum.UPDATE_CARD_WRONG_FAILED: return UpdateCardWrongFailed.reduce(state);
        case LessonActionEnum.FINISH: return Finish.reduce();
        default: return state;
    }
}
