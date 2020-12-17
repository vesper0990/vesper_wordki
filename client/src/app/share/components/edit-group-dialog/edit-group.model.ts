import { LanguageType } from '../../models/language-type.mode';

export class EditGroup {
    constructor(
        public id: number,
        public name: string,
        public languageFront: LanguageType,
        public languageBack: LanguageType
    ) { }
}
