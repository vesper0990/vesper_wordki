import { LanguageType } from '../../models/language-type.mode';

export class CardModel {
    groupName: string;
    groupLanguage1: LanguageType;
    groupLanguage2: LanguageType;
    language1: string;
    language2: string;
    example1: string;
    example2: string;
    drawer: number;
    creationDate: Date;
    repeatsCount: number;
    lastRepeat: Date;
}
