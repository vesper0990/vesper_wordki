import { TranslationDirectionEnum } from './TranslationDirectionEnum';
import { LessonTypeEnum } from './LessonTypeEnum';

export class Result {
  id: string;
  userId:string;
  groupId: string;
  correct = 0;
  accepted = 0;
  wrong = 0;
  invisible = 0;
  timeCount = 0;
  translationDirection = TranslationDirectionEnum.Default;
  lessonType = LessonTypeEnum.Fiszki;
  dateTime: Date = new Date();

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
