import {
    LessonActions,
    LessonActionTypes
} from './actions';
import { WordRepeat } from '../models/word-repeat';
import { LessonStateEnum } from '../models/lesson-state';

export interface LessonState {
    words: WordRepeat[];
    lessonState: LessonStateEnum;
}

const initialState: LessonState = {
    words: [],
    lessonState: LessonStateEnum.BeforeStart,
};

export function reducer(state = initialState, action: LessonActions): LessonState {
    console.log(action.type);
    switch (action.type) {
        case LessonActionTypes.SetWords: return { ...state, words: [...state.words, ...action.words] };
        case LessonActionTypes.RemoveWord: return handleRemoveWord(state);
        case LessonActionTypes.StartLesson: return { ...state, lessonState: LessonStateEnum.WordDisplay };
        case LessonActionTypes.CheckAnswer: return { ...state, lessonState: LessonStateEnum.AnswerDisplay };
        case LessonActionTypes.Answer: return { ...state, lessonState: LessonStateEnum.WordDisplay };
        case LessonActionTypes.FinishLesson: return { ...state, lessonState: LessonStateEnum.AfterFinish };
        default: return state;
    }
}

export function handleRemoveWord(state: LessonState): LessonState {
    return { ...state, words: state.words.slice(1, state.words.length) };
}
