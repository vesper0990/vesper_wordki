export interface RepeatWordDto {
    groupName: string;
    language1: number;
    language2: number;
    cardSide1: Word;
    cardSide2: Word;
    drawer: number;
    repeatsCount: number;
    creationDate: string;
    lastRepeat: string;
}

export interface Word {
    value: string;
    example: string;
}