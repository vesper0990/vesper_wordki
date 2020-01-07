import { Word } from './word.model';

export class GroupDetails {
    id: number;
    name: string;
    language1: number;
    language2: number;
    words: Word[];

    constructor(id: number,
        name: string,
        language1: number,
        language2: number) {
        this.id = id;
        this.name = name;
        this.language1 = language1;
        this.language2 = language2;
        this.words = [];
    }

    addWord(word: Word): void {
        this.words.push(word);
        word.group = this;
    }
}
