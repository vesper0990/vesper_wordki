import { LanguageType } from 'src/app/share/models/language-type.mode';
import { LessonMode } from './lesson-mode';

export class LessonSettings {
    questionLanguage: LanguageType;
    answerLanguage: LanguageType;
    mode: LessonMode;
    allWords: boolean;
}
