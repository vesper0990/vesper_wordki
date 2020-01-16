import {
    LessonActions,
    LessonActionTypes
} from './actions';
import { WordRepeat } from '../models/word-repeat';
import { LessonStateEnum, LessonStep } from '../models/lesson-state';
import { LessonModeType } from '../models/lesson-mode';

export interface LessonState {
    words: WordRepeat[];
    lessonState: LessonStep;
    lessonMode: LessonModeType;
}

const initialState: LessonState = {
    words: [],
    lessonState: LessonStep.getLessonStep(LessonStateEnum.BeforeStart),
    lessonMode: LessonModeType.Unknown
};

export function reducer(state = initialState, action: LessonActions): LessonState {
    switch (action.type) {
        case LessonActionTypes.SetWords: return { ...state, words: [...state.words, ...action.words] };
        case LessonActionTypes.RemoveWord: return handleRemoveWord(state);
        case LessonActionTypes.SetLessonMode: return { ...state, lessonMode: action.payload.mode };
        case LessonActionTypes.StartLesson: return { ...state, lessonState: LessonStep.getLessonStep(LessonStateEnum.WordDisplay) };
        case LessonActionTypes.CheckAnswer: return { ...state, lessonState: LessonStep.getLessonStep(LessonStateEnum.AnswerDisplay) };
        case LessonActionTypes.Answer: return { ...state, lessonState: LessonStep.getLessonStep(LessonStateEnum.WordDisplay) };
        case LessonActionTypes.FinishLesson: return { ...state, lessonState: LessonStep.getLessonStep(LessonStateEnum.AfterFinish) };
        case LessonActionTypes.ResetStoreAction: return initialState;
        default: return state;
    }
}

export function handleRemoveWord(state: LessonState): LessonState {
    return { ...state, words: state.words.slice(1, state.words.length) };
}
