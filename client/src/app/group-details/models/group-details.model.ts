import { LanguageType } from 'src/app/share/models/language-type.mode';

export class GroupDetails {
    constructor(
        public id: number,
        public name: string,
        public language1: LanguageType,
        public language2: LanguageType,
        public cardsCount: number,
        public repeatsCount: number,
        public creationDate: Date) {
    }
}
