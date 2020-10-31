import { LanguageType } from "src/app/share/models/language-type.mode";

export class CardModel {
    groupName: string;
    groupLanguage1: LanguageType;
    groupLanguage2: LanguageType;
    cardSide1: Word;
    cardSide2: Word;
    drawer: number;
    repeatsCount: number;
    creationDate: Date;
    lastRepeat: string;
}

export class Word {
    value: string;
    example: string;
}