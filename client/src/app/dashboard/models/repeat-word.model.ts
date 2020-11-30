import { LanguageType } from 'src/app/share/models/language-type.mode';
import { Word } from './reapeat-word.dto';

export class RepeatWord {

    constructor(public groupName: string,
        public language1: LanguageType,
        public language2: LanguageType,
        public heads: Word,
        public tails: Word) {
    }
}
