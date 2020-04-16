import {
    LessonActions,
    LessonActionTypes
} from './actions';
import { WordRepeat } from '../models/word-repeat';
import { LessonStateEnum, LessonStep } from '../models/lesson-state';
import { LessonResult } from '../models/lesson-result';
import { LessonSettings } from '../models/lesson-settings';

export interface LessonState {
    words: WordRepeat[];
    lastAnswer: boolean;
    lessonState: LessonStep;
    result: LessonResult;
    lessonSettings: LessonSettings;
}

const initialState: LessonState = {
    words: [],
    lastAnswer: false,
    lessonState: LessonStep.getLessonStep(LessonStateEnum.BeforeStart),
    result: null,
    lessonSettings: null
};

export function reducer(state = initialState, action: LessonActions): LessonState {
    switch (action.type) {
        case LessonActionTypes.SetLessonSettings: return { ...state, lessonSettings: action.payload.lessonSettings };
        case LessonActionTypes.SetWords: return handleSetWords(state, action.words);
        case LessonActionTypes.RemoveWord: return handleRemoveWord(state);
        case LessonActionTypes.SetLastAction: return { ...state, lastAnswer: action.payload.isCorrect };
        case LessonActionTypes.StartLesson: return handleStartLesson(state);
        case LessonActionTypes.CheckAnswer: return { ...state, lessonState: LessonStep.getLessonStep(LessonStateEnum.AnswerDisplay) };
        case LessonActionTypes.Answer: return handleAnswer(state, action.payload.result);
        case LessonActionTypes.FinishLesson: return handleFinishLesson(state);
        case LessonActionTypes.ResetStoreAction: return initialState;
        default: return state;
    }
}

function handleSetWords(state: LessonState, words: WordRepeat[]): LessonState {
    if (state.lessonSettings.mode.shouldShuffle) {
        shuffleArray(words);
    }
    const result = { ...state, words: [...state.words, ...words] };
    console.log(result.words);
    return result;
}

function handleRemoveWord(state: LessonState): LessonState {
    return { ...state, words: state.words.slice(1, state.words.length) };
}

function handleStartLesson(state: LessonState): LessonState {
    const result = new LessonResult();
    result.startTime = new Date();
    return {
        ...state,
        lessonState: LessonStep.getLessonStep(LessonStateEnum.WordDisplay),
        result: result
    };
}

function handleAnswer(state: LessonState, answer: number): LessonState {
    const result = state.result;
    const word = state.words[0];
    const words: WordRepeat[] = state.words.slice(1, state.words.length);
    if (answer > 0) {
        result.correct++;
    } else if (answer < 0) {
        result.wrong++;
        words.push(word);
    } else {
        result.accepted++;
    }
    return {
        ...state,
        words: words,
        lessonState: LessonStep.getLessonStep(LessonStateEnum.WordDisplay),
        result: result
    };
}

function handleFinishLesson(state: LessonState): LessonState {
    const result = state.result;
    const time = new Date().getTime() - result.startTime.getTime();
    result.wholeTime = time;
    return {
        ...state,
        lessonState: LessonStep.getLessonStep(LessonStateEnum.AfterFinish),
        result: result
    };
}

function shuffleArray<T>(arra1: T[]): T[] {
    let ctr = arra1.length;
    let temp: T;
    let index = 0;

    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
