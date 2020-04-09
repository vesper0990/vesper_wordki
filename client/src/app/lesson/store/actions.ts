import { Action } from '@ngrx/store';
import { WordRepeat } from '../models/word-repeat';
import { LessonModeType } from '../models/lesson-mode';
import { LessonSettings } from '../models/lesson-settings';

export enum LessonActionTypes {
    GetWords = '[LESSON_STATE] GET_WORDS',
    GetWordsFromGroup = '[LESSON_STATE] GET_WORDS_FROM_GROUP',
    SetWords = '[LESSON_STATE] SET_WORDS',
    RemoveWord = '[LESSON_STATE] REMOVE_WORD',
    SetLessonMode = '[LESSON_STATE] SET_LESSON_MODE',
    SetLastAction = '[LESSON_STATE] SET_LAST_ACTION',

    StartLesson = '[LESSON_STATE] START_LESSON',
    CheckAnswer = '[LESSON_STATE] CHECK_ANSWER',
    Answer = '[LESSON_STATE] ANSWER',
    FinishLesson = '[LESSON_STATE] FINISH_LESSON',

    ResetStoreAction = '[LESSON_STATE] RESET_STORE',

    SetLessonSettings = '[LESSON_STATE] SET_LESSON_SETTINGS'
}

export class GetWordsAction implements Action {
    readonly type = LessonActionTypes.GetWords;
    constructor(public payload: { count: number, offset: number }) { }
}

export class GetWordsFromGroupAction implements Action {
    readonly type = LessonActionTypes.GetWordsFromGroup;
    constructor(public payload: { groupId: number }) { }
}

export class SetWordsAction implements Action {
    readonly type = LessonActionTypes.SetWords;
    constructor(public words: WordRepeat[]) { }
}

export class SetLessonMode implements Action {
    readonly type = LessonActionTypes.SetLessonMode;
    constructor(public payload: { mode: LessonModeType }) { }
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
    constructor(public payload: { wordId: number, result: number }) { }
}

export class FinishLessonAction implements Action {
    readonly type = LessonActionTypes.FinishLesson;
    constructor() { }
}

export class ResetStoreAction implements Action {
    readonly type = LessonActionTypes.ResetStoreAction;
    constructor() { }
}

export class SetLastAnswerAction implements Action {
    readonly type = LessonActionTypes.SetLastAction;
    constructor(public payload: { isCorrect: boolean }) { }
}

export class SetLessonSettingsAction implements Action {
    readonly type = LessonActionTypes.SetLessonSettings;
    constructor(public payload: { lessonSettings: LessonSettings }) { }
}

export type LessonActions = GetWordsAction
    | GetWordsFromGroupAction
    | SetWordsAction
    | RemoveWordAction
    | SetLessonMode
    | SetLastAnswerAction
    | StartLessonAction
    | CheckAnswerAction
    | AnswerAction
    | FinishLessonAction
    | ResetStoreAction
    | SetLessonSettingsAction;
