import { LanguageType } from 'src/app/share/models/language-type.mode';

export class LessonSettings {
    questionLanguage: LanguageType;
    answerLanguage: LanguageType;
    mode: number;
    allWords: boolean;
}
