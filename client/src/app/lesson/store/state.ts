import { CardRepeat } from 'src/app/share/models/card-details';
import { LessonOptions } from '../models/lesson-options';
import { LessonResult } from '../models/lesson-result';
import { LessonSettings } from '../models/lesson-settings';
import { LessonStep } from '../models/lesson-state';

export interface LessonState {
    words: CardRepeat[];
    result: LessonResult;
    lessonSettings: LessonSettings;
    lessonOptions: LessonOptions;
    lessonStep: LessonStep;
    stepBeforePause: LessonStep;
    lessonId: number;
    comparisonResult: 'wrong' | 'correct' | 'none';
}

export const initialLessonsState: LessonState = {
    words: [],
    result: null,
    lessonOptions: new LessonOptions(),
    lessonSettings: new LessonSettings(),
    lessonStep: LessonStep.BEFORE_START,
    stepBeforePause: null,
    lessonId: 0,
    comparisonResult: 'none'
};
