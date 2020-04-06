import { LanguageType } from 'src/app/share/models/language-type.mode';

export class RepeatWord {
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

    constructor(groupName: string,
        groupLanguage1: LanguageType,
        groupLanguage2: LanguageType,
        language1: string,
        language2: string,
        example1: string,
        example2: string,
        drawer: number,
        creationDate: Date,
        repeatsCount: number,
        lastRepeat: Date) {
        this.groupName = groupName;
        this.groupLanguage1 = groupLanguage1;
        this.groupLanguage2 = groupLanguage2;
        this.language1 = language1;
        this.language2 = language2;
        this.example1 = example1;
        this.example2 = example2;
        this.drawer = drawer;
        this.creationDate = creationDate;
        this.repeatsCount = repeatsCount;
        this.lastRepeat = lastRepeat;
    }
}
