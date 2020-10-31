import { LanguageType } from 'src/app/share/models/language-type.mode';
import { Word } from './reapeat-word.dto';

export class RepeatWord {

    constructor(public groupName: string,
        public groupLanguage1: LanguageType,
        public groupLanguage2: LanguageType,
        public cardSide1: Word,
        public cardSide2: Word,
        public drawer: number,
        public creationDate: Date,
        public repeatsCount: number,
        public lastRepeat: Date) {
    }
}
