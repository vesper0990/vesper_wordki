import { LanguageType } from 'src/app/share/models/language-type.mode';

export class CardModel {
    groupName: string;
    language1: LanguageType;
    language2: LanguageType;
    heads: Word;
    tails: Word;
}

export class Word {
    value: string;
    example: string;
    state: State;
}

export class State {
    drawer: number;
}
