export interface RepeatWordDto {
    groupName: string;
    language1: number;
    language2: number;
    heads: Word;
    tails: Word;
    drawer: number;
    repeatsCount: number;
    creationDate: string;
    lastRepeat: string;
}

export interface Word {
    value: string;
    example: string;
    state: State;
}

export interface State{
    drawer: number;
}