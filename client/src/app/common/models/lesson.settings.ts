import { LessonTypeEnum } from './LessonTypeEnum';
import { TranslationDirectionEnum } from './TranslationDirectionEnum';
import { Group } from './Group';

export class LessonSettings {

  public lessonTypeEnum: LessonTypeEnum;
  public translationDirectionEnum: TranslationDirectionEnum;
  public allWords: boolean;
  public group: Group;

  constructor() {
    this.lessonTypeEnum = LessonTypeEnum.Fiszki;
    this.translationDirectionEnum = TranslationDirectionEnum.FromFirst;
    this.allWords = true;
  }
}
