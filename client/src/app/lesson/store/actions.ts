import { Action } from '@ngrx/store';
import { LessonResult } from '../models/lesson-result';
import { LessonStep } from '../models/lesson-state';
import { WordRepeat } from '../models/word-repeat';
import { LessonCardDto } from '../models/word-repeat.dto';
import { initialLessonsState, LessonState } from './state';

export enum LessonActionEnum {
    CREATE_NEW_LESSON = '[LESSON_STATE] CREATE_NEW_LESSON',
    CREATE_NEW_LESSON_SUCCESS = '[LESSON_STATE] CREATE_NEW_LESSON_SUCCESS',

    GET_WORDS = '[LESSON_STATE] GET_WORDS',
    GET_WORDS_SUCCESS = '[LESSON_STATE] GET_WORDS_SUCCESS',
    GET_WORDS_FAILES = '[LESSON_STATE] GET_WORDS_FAILED',

    UPDATE_CARD_CORRECT = '[LESSON_STATE] UPDATE_CARD_CORRECT',
    UPDATE_CARD_CORRECT_SUCCESS = '[LESSON_STATE] UPDATE_CARD_CORRECT_SUCCESS',
    UPDATE_CARD_CORRECT_FAILED = '[LESSON_STATE] UPDATE_CARD_CORRECT_FAILED',

    UPDATE_CARD_WRONG = '[LESSON_STATE] UPDATE_CARD_WRONG',
    UPDATE_CARD_WRONG_SUCCESS = '[LESSON_STATE] UPDATE_CARD_WRONG_SUCCESS',
    UPDATE_CARD_WRONG_FAILED = '[LESSON_STATE] UPDATE_CARD_WRONG_FAILED',

    START_LESSON = '[LESSON_STATE] START_LESSON',
    CHECK_CARD = '[LESSON_STATE] CHECK_CARD',

    COMPARE = '[LESSON_STATE] COMPARE',
    COMPARISON_CORRECT = '[LESSON_STATE] COMPARISON_CORRECT',
    COMPARISON_WRONG = '[LESSON_STATE] COMPARISON_WRONG',

    ANWSER_CORRECT = '[LESSON_STATE] ANSWER_CORRECT',
    ANSWER_WRONG = '[LESSON_STATE] ANSWER_WRONG',
    FINISH_LESSON = '[LESSON_STATE] FINISH_LESSON',
    PAUSE_LESSON = '[LESSON_STATE] PAUSE_LESSON',
    RESTART_LESSON = '[LESSON_STATE] RESTART_LESSON',

    FINISH = '[LESSON_STATE] FINISH',
}

export class CreateNewLesson implements Action {
    readonly type = LessonActionEnum.CREATE_NEW_LESSON;
    constructor() { }

    static reduce(state: LessonState): LessonState {
        return {
            ...state
        };
    }
}

export class CreateNewLessonSuccess implements Action {
    readonly type = LessonActionEnum.CREATE_NEW_LESSON_SUCCESS;
    constructor(public payload: { lessonId: number }) { }

    static reduce(state: LessonState, action: CreateNewLessonSuccess): LessonState {
        return {
            ...state,
            lessonId: action.payload.lessonId
        };
    }
}

export class GetWords implements Action {
    readonly type = LessonActionEnum.GET_WORDS;
    constructor() { }

    static reduce(state: LessonState): LessonState {
        return initialLessonsState;
    }
}

export class GetWordsSuccess implements Action {
    readonly type = LessonActionEnum.GET_WORDS_SUCCESS;
    constructor(public payload: { cards: LessonCardDto[] }) { }

    static reduce(state: LessonState, action: GetWordsSuccess): LessonState {
        return {
            ...state,
            words: action.payload.cards,
            lessonStep: LessonStep.BEFORE_START
        };
    }
}

export class GetWordsFailed implements Action {
    readonly type = LessonActionEnum.GET_WORDS_FAILES;
    constructor(public payload: { error: string }) { }

    static reduce(state: LessonState): LessonState {
        return {
            ...state
        };
    }
}

export class StartLesson implements Action {
    readonly type = LessonActionEnum.START_LESSON;
    constructor() { }

    static reduce(state: LessonState): LessonState {
        const result = new LessonResult();
        result.startTime = new Date();
        return {
            ...state,
            result: result,
            lessonStep: LessonStep.QUESTION
        };
    }
}

export class CheckCard implements Action {
    readonly type = LessonActionEnum.CHECK_CARD;
    constructor() { }

    static reduce(state: LessonState): LessonState {
        return {
            ...state,
            lessonStep: LessonStep.ANSWER
        };
    }
}

export class Compare implements Action {
    readonly type = LessonActionEnum.COMPARE;
    constructor(public payload: { value: string }) { }

    static reduce(state: LessonState): LessonState {
        return {
            ...state
        };
    }
}

export class ComparisonCorrect implements Action{
    readonly type = LessonActionEnum.COMPARISON_CORRECT;
    constructor() { }

    static reduce(state: LessonState): LessonState {
        return {
            ...state,
            comparisonResult: 'correct'
        };
    }
}

export class ComparisonWrong implements Action{
    readonly type = LessonActionEnum.COMPARISON_WRONG;
    constructor() { }

    static reduce(state: LessonState): LessonState {
        return {
            ...state,
            comparisonResult: 'wrong'
        };
    }
}

export class AnswerCorrect implements Action {
    readonly type = LessonActionEnum.ANWSER_CORRECT;
    constructor() { }

    static reduce(state: LessonState): LessonState {
        const cards = state.words.slice(1, state.words.length);
        const step = cards.length !== 0 ? LessonStep.QUESTION : LessonStep.AFTER_FINISH;
        return {
            ...state,
            lessonStep: step,
            words: cards,
            result: {
                ...state.result,
                correct: state.result.correct + 1
            },
            comparisonResult: 'none'
        };
    }
}

export class AnswerWrong implements Action {
    readonly type = LessonActionEnum.ANSWER_WRONG;
    constructor() { }

    static reduce(state: LessonState): LessonState {
        const currentCard = state.words[0];
        const cards = state.words.slice(1, state.words.length);
        cards.push(currentCard);
        const step = cards.length !== 0 ? LessonStep.QUESTION : LessonStep.AFTER_FINISH;
        return {
            ...state,
            lessonStep: step,
            words: cards,
            result: {
                ...state.result,
                wrong: state.result.wrong + 1
            },
            comparisonResult: 'none'
        };
    }
}

export class FinishLesson implements Action {
    readonly type = LessonActionEnum.FINISH_LESSON;
    constructor(public payload: { totalTime: number }) { }

    static reduce(state: LessonState, action: FinishLesson): LessonState {
        return {
            ...state,
            result: {
                ...state.result,
                totalTime: action.payload.totalTime,
            }
        };
    }
}

export class PauseLesson implements Action {
    readonly type = LessonActionEnum.PAUSE_LESSON;
    constructor() { }

    static reduce(state: LessonState): LessonState {
        const stepBeforePause = state.lessonStep;
        const step = {
            ...LessonStep.PAUSE,
            answer: stepBeforePause.answer
        };
        return {
            ...state,
            lessonStep: step,
            stepBeforePause: stepBeforePause
        };
    }
}

export class RestartLesson implements Action {
    readonly type = LessonActionEnum.RESTART_LESSON;
    constructor() { }

    static reduce(state: LessonState): LessonState {
        return {
            ...state,
            lessonStep: state.stepBeforePause,
            stepBeforePause: null,
        };
    }
}

export class UpdateCardCorrect implements Action {
    readonly type = LessonActionEnum.UPDATE_CARD_CORRECT;
    constructor() { }

    static reduce(state: LessonState): LessonState {
        return {
            ...state
        };
    }
}

export class UpdateCardCorrectSuccess implements Action {
    readonly type = LessonActionEnum.UPDATE_CARD_CORRECT_SUCCESS;
    constructor() { }

    static reduce(state: LessonState): LessonState {
        return {
            ...state
        };
    }
}

export class UpdateCardCorrectFailed implements Action {
    readonly type = LessonActionEnum.UPDATE_CARD_CORRECT_FAILED;
    constructor() { }

    static reduce(state: LessonState): LessonState {
        return {
            ...state
        };
    }
}

export class UpdateCardWrong implements Action {
    readonly type = LessonActionEnum.UPDATE_CARD_WRONG;
    constructor() { }

    static reduce(state: LessonState): LessonState {
        return {
            ...state
        };
    }
}

export class UpdateCardWrongSuccess implements Action {
    readonly type = LessonActionEnum.UPDATE_CARD_WRONG_SUCCESS;
    constructor() { }

    static reduce(state: LessonState): LessonState {
        return {
            ...state
        };
    }
}

export class UpdateCardWrongFailed implements Action {
    readonly type = LessonActionEnum.UPDATE_CARD_WRONG_FAILED;
    constructor() { }

    static reduce(state: LessonState): LessonState {
        return {
            ...state
        };
    }
}

export class Finish implements Action {
    readonly type = LessonActionEnum.FINISH;
    constructor() { }

    static reduce(): LessonState {
        return initialLessonsState;
    }
}

export type LessonActionType =
    CreateNewLesson |
    CreateNewLessonSuccess |
    GetWords |
    GetWordsSuccess |
    GetWordsFailed |
    StartLesson |
    Compare |
    ComparisonCorrect |
    ComparisonWrong |
    CheckCard |
    AnswerCorrect |
    AnswerWrong |
    FinishLesson |
    PauseLesson |
    RestartLesson |
    UpdateCardCorrect |
    UpdateCardCorrectSuccess |
    UpdateCardCorrectFailed |
    UpdateCardWrong |
    UpdateCardWrongSuccess |
    UpdateCardWrongFailed |
    Finish;
