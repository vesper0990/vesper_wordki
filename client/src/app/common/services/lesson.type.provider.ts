import { LessonType, LessonTypeEnum } from '../models/model';

export class LessonTypeProvider {

  static lessonTypes: LessonType[] = [
    new LessonType(LessonTypeEnum.Fiszki, 'Fiszki'),
    new LessonType(LessonTypeEnum.Typing, 'Wpisywanie'),
  ];
}
