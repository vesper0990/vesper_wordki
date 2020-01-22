import { Word } from './word.model';
import { LanguageType } from 'src/app/share/models/language-type.mode';

export class GroupDetails {
    constructor(
        public id: number,
        public name: string,
        public language1: LanguageType,
        public language2: LanguageType,
        public words: Word[] = []) {
    }

    addWord(word: Word): void {
        this.words.push(word);
        word.group = this;
    }
}
