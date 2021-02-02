import { Action } from '@ngrx/store';
import { CardRepeat, LessonType } from 'src/app/share/models/card-details';
import { LessonResult } from '../models/lesson-result';
import { LessonSource } from '../models/lesson-source';
import { LessonStep } from '../models/lesson-state';
import { initialLessonsState, LessonState } from './state';

export enum LessonActionEnum {
    CREATE_NEW_LESSON = '[LESSON_STATE] CREATE_NEW_LESSON',
    CREATE_NEW_LESSON_SUCCESS = '[LESSON_STATE] CREATE_NEW_LESSON_SUCCESS',

    GET_WORDS = '[LESSON_STATE] GET_WORDS',
    GET_WORDS_SUCCESS = '[LESSON_STATE] GET_WORDS_SUCCESS',
    GET_COUNT_CARDS = '[LESSON_STATE] GET_COUNT_CARDS',

    UPDATE_CARD_CORRECT = '[LESSON_STATE] UPDATE_CARD_CORRECT',
    UPDATE_CARD_WRONG = '[LESSON_STATE] UPDATE_CARD_WRONG',
    UPDATE_CARD_ACCEPTED = '[LESSON_STATE] UPDATE_CARD_ACCEPTED',

    START_LESSON = '[LESSON_STATE] START_LESSON',
    CHECK_CARD = '[LESSON_STATE] CHECK_CARD',

    COMPARE = '[LESSON_STATE] COMPARE',
    COMPARISON_CORRECT = '[LESSON_STATE] COMPARISON_CORRECT',
    COMPARISON_WRONG = '[LESSON_STATE] COMPARISON_WRONG',

    ANWSER_CORRECT = '[LESSON_STATE] ANSWER_CORRECT',
    ANSWER_WRONG = '[LESSON_STATE] ANSWER_WRONG',
    ANSWER_ACCEPTED = '[LESSON_STATE] ANSWER_ACCEPTED',
    FINISH_LESSON = '[LESSON_STATE] FINISH_LESSON',
    PAUSE_LESSON = '[LESSON_STATE] PAUSE_LESSON',
    RESTART_LESSON = '[LESSON_STATE] RESTART_LESSON',

    FINISH = '[LESSON_STATE] FINISH',

    GET_LESSON_OPTIONS = '[LESSON_STATE] GET_LESSON_OPTIONS',
    GET_LESSON_OPTIONS_SUCCESS = '[LESSON_STATE] GET_LESSON_OPTIONS_SUCCESS',
    SET_LESSON_TYPE = '[LESSON_STATE] SET_LESSON_TYPE',
    SET_LESSON_SOURCE = '[LESSON_STATE] SET_LESSON_SOURCE',
    SET_LESSON_SIZE = '[LESSON_STATE] SET_LESSON_SIZE',
    SET_LESSON_ALL_LANGUAGES = '[LESSON_STATE] SET_LESSON_ALL_LANGUAGES',
    SET_LESSON_LANGUAGE = '[LESSON_STATE] SET_LESSON_LANGUAGE',
    UNSET_LESSON_LANGUAGE = '[LESSON_STATE] UNSET_LESSON_LANGUAGE',
    SUBMIT_SETTINGS = '[LESSON_STATE] SUBMIT_SETTINGS',
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
}

export class GetCountCards implements Action {
    readonly type = LessonActionEnum.GET_COUNT_CARDS;
    constructor(public readonly payload: { count: number }) { }
}

export class GetWordsSuccess implements Action {
    readonly type = LessonActionEnum.GET_WORDS_SUCCESS;
    constructor(public payload: { cards: CardRepeat[] }) { }

    static reduce(state: LessonState, action: GetWordsSuccess): LessonState {
        return {
            ...state,
            words: action.payload.cards,
            lessonStep: LessonStep.BEFORE_START
        };
    }
}

export class StartLesson implements Action {
    readonly type = LessonActionEnum.START_LESSON;
    constructor() { }

    static reduce(state: LessonState): LessonState {
        const result = new LessonResult();
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

export class ComparisonCorrect implements Action {
    readonly type = LessonActionEnum.COMPARISON_CORRECT;
    constructor() { }

    static reduce(state: LessonState): LessonState {
        return {
            ...state,
            comparisonResult: 'correct'
        };
    }
}

export class ComparisonWrong implements Action {
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

export class AnswerAccepted implements Action {
    readonly type = LessonActionEnum.ANSWER_ACCEPTED;
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
                accepted: state.result.accepted + 1
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

export class UpdateCardWrong implements Action {
    readonly type = LessonActionEnum.UPDATE_CARD_WRONG;
    constructor() { }

    static reduce(state: LessonState): LessonState {
        return {
            ...state
        };
    }
}

export class UpdateCardAccepted implements Action {
    readonly type = LessonActionEnum.UPDATE_CARD_ACCEPTED;
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

export class GetLessonOptions implements Action {
    readonly type = LessonActionEnum.GET_LESSON_OPTIONS;
    constructor() { }
}

export class GetLessonOptionsSuccess implements Action {
    readonly type = LessonActionEnum.GET_LESSON_OPTIONS_SUCCESS;
    constructor(public payload: { lessonOptions: any }) { }

    static reduce(state: LessonState, action: GetLessonOptionsSuccess): LessonState {
        return {
            ...state,
            lessonOptions: action.payload.lessonOptions
        };
    }
}

export class SetLessonType implements Action {
    readonly type = LessonActionEnum.SET_LESSON_TYPE;
    constructor(public payload: { lessonType: LessonType }) { }

    static reduce(state: LessonState, action: SetLessonType): LessonState {
        return {
            ...state,
            lessonSettings: {
                ...state.lessonSettings,
                lessonType: action.payload.lessonType
            }
        };
    }
}

export class SetLessonSource implements Action {
    readonly type = LessonActionEnum.SET_LESSON_SOURCE;
    constructor(public payload: { lessonSource: LessonSource }) { }

    static reduce(state: LessonState, action: SetLessonSource): LessonState {
        return {
            ...state,
            lessonSettings: {
                ...state.lessonSettings,
                lessonSource: action.payload.lessonSource
            }
        };
    }
}

export class SetLessonLanguage implements Action {
    readonly type = LessonActionEnum.SET_LESSON_LANGUAGE;
    constructor(public payload: { language: number }) { }

    static reduce(state: LessonState, action: SetLessonLanguage): LessonState {
        const langauges = [...state.lessonSettings.lessonLanguages, action.payload.language];
        return {
            ...state,
            lessonSettings: {
                ...state.lessonSettings,
                lessonLanguages: langauges
            }
        };
    }
}

export class UnsetLessonLanguage implements Action {
    readonly type = LessonActionEnum.UNSET_LESSON_LANGUAGE;
    constructor(public payload: { language: number }) { }

    static reduce(state: LessonState, action: UnsetLessonLanguage): LessonState {
        const index = state.lessonSettings.lessonLanguages.indexOf(action.payload.language);
        const langauges = [...state.lessonSettings.lessonLanguages];
        langauges.splice(index, 1);
        return {
            ...state,
            lessonSettings: {
                ...state.lessonSettings,
                lessonLanguages: langauges
            }
        };
    }
}

export class SetLessonAllLanguages implements Action {
    readonly type = LessonActionEnum.SET_LESSON_ALL_LANGUAGES;
    constructor() { }

    static reduce(state: LessonState): LessonState {
        return {
            ...state,
            lessonSettings: {
                ...state.lessonSettings,
                lessonLanguages: state.lessonOptions.languages
            }
        };
    }
}

export class SetLessonSize implements Action {
    readonly type = LessonActionEnum.SET_LESSON_SIZE;
    constructor(public payload: { lessonSize: number }) { }

    static reduce(state: LessonState, action: SetLessonSize): LessonState {
        return {
            ...state,
            lessonSettings: {
                ...state.lessonSettings,
                lessonSize: action.payload.lessonSize
            }
        };
    }
}

export class SubmitSettings implements Action {
    readonly type = LessonActionEnum.SUBMIT_SETTINGS;
}

export type LessonActionType =
    CreateNewLesson |
    CreateNewLessonSuccess |
    GetWords |
    GetWordsSuccess |
    StartLesson |
    Compare |
    ComparisonCorrect |
    ComparisonWrong |
    CheckCard |
    AnswerCorrect |
    AnswerWrong |
    AnswerAccepted |
    FinishLesson |
    PauseLesson |
    RestartLesson |
    UpdateCardCorrect |
    UpdateCardWrong |
    UpdateCardAccepted |
    Finish |
    GetLessonOptions |
    GetLessonOptionsSuccess |
    SetLessonType |
    SetLessonSource |
    SetLessonSize |
    SetLessonLanguage |
    UnsetLessonLanguage |
    SetLessonAllLanguages |
    SubmitSettings;
