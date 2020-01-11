import { Action } from '@ngrx/store';
import { WordRepeat } from '../models/word-repeat';

export enum LessonActionTypes {
    GetWords = '[LESSON_STATE] GET_WORDS',
    SetWords = '[LESSON_STATE] SET_WORDS',
    RemoveWord = '[LESSON_STATE] REMOVE_WORD',

    StartLesson = '[LESSON_STATE] START_LESSON',
    CheckAnswer = '[LESSON_STATE] CHECK_ANSWER',
    Answer = '[LESSON_STATE] ANSWER',
    FinishLesson = '[LESSON_STATE] FINISH_LESSON'
}

export class GetWordsAction implements Action {
    readonly type = LessonActionTypes.GetWords;
    constructor(public payload: { count: number }) { }
}

export class SetWordsAction implements Action {
    readonly type = LessonActionTypes.SetWords;
    constructor(public words: WordRepeat[]) { }
}

export class RemoveWordAction implements Action {
    readonly type = LessonActionTypes.RemoveWord;
    constructor() { }
}

export class StartLessonAction implements Action {
    readonly type = LessonActionTypes.StartLesson;
    constructor() { }
}

export class CheckAnswerAction implements Action {
    readonly type = LessonActionTypes.CheckAnswer;
    constructor() { }
}

export class AnswerAction implements Action {
    readonly type = LessonActionTypes.Answer;
    constructor() { }
}

export class FinishLessonAction implements Action {
    readonly type = LessonActionTypes.FinishLesson;
    constructor() { }
}

export type LessonActions = GetWordsAction
    | SetWordsAction
    | RemoveWordAction
    | StartLessonAction
    | CheckAnswerAction
    | AnswerAction
    | FinishLessonAction;
