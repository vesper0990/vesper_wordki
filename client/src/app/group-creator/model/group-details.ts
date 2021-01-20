import { LanguageType } from "src/app/share/models/language-type.mode";

export class GroupDetails {

    constructor(public name: string,
        public frontLanguage: LanguageType,
        public backLanguage: LanguageType) { }

}
