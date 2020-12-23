import { LanguageType } from "./language-type.mode";

export class CardDetails {
    constructor(
        public id: number,
        public front: SideDetails,
        public back: SideDetails
    ) { }
}

export class SideDetails {
    constructor(
        public value: string,
        public example: string,
        public drawer: Drawer,
        public language: LanguageType,
        public repeatsCount: number,
        public isVisible: boolean,
        public nextRepeat: Date
    ) { }
}

export class ExtendedCardDetails extends CardDetails {
    constructor(
        public id: number,
        public groupName: string,
        public front: SideDetails,
        public back: SideDetails) {
        super(id, front, back);
    }
}

export class CardRepeat {
    constructor(
        public id: number,
        public question: SideRepeat,
        public answer: SideRepeat
    ) { }
}

export class SideRepeat {
    constructor(
        public value: string,
        public example: string,
        public drawer: Drawer,
        public language: LanguageType
    ) { }
}

export class Group {
    constructor(
        public id: number,
        public name: string,
        public languageFront: LanguageType,
        public languageBack: LanguageType,
        public cardsCount: number,
        public repeatsCount: number
    ) { }
}

export class GroupDetails {
    constructor(
        public id: number,
        public name: string,
        public languageFront: LanguageType,
        public languageBack: LanguageType,
        public cardsCount: number,
        public repeatsCount: number,
        public creationDate: Date
    ) { }
}

export class Drawer {
    constructor(public value: number) { }
}