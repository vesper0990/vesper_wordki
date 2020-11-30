import { LanguageType } from 'src/app/share/models/language-type.mode';

export class WordRepeat {
    id: number;
    groupName: string;
    groupLanguage1: LanguageType;
    groupLanguage2: LanguageType;
    language1: string;
    language2: string;
    example1: string;
    example2: string;
    drawer: number;
}
