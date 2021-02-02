import { LessonType } from 'src/app/share/models/card-details';
import { LessonSource } from './lesson-source';

export class LessonSettings {
    lessonType: LessonType = LessonType.DEFAULT;
    lessonSource: LessonSource = LessonSource.DEFAULT;
    lessonSize = 0;
    lessonLanguages: number[] = [];
}
