import { LessonResult } from "../models/lesson-result";
import { LessonSettings } from "../models/lesson-settings";
import { LessonStep } from "../models/lesson-state";
import { WordRepeat } from "../models/word-repeat";

export interface LessonState {
    words: WordRepeat[];
    result: LessonResult;
    lessonSettings: LessonSettings;
    lessonStep: LessonStep;
    stepBeforePause: LessonStep;
}

export const initialLessonsState: LessonState = {
    words: [],
    result: null,
    lessonSettings: null,
    lessonStep: LessonStep.BEFORE_START,
    stepBeforePause: null,
};