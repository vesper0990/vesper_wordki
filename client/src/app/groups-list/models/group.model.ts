import { LanguageType } from 'src/app/share/models/language-type.mode';

export class Group {
    constructor(public id: number,
        public name: string,
        public language1: LanguageType,
        public language2: LanguageType,
        public wordsCount: number,
        public repeatsCount: number,
        public averageDrawer: number) {
    }
}
