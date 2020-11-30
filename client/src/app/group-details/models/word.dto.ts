export class WordDto {
    id: number;
    comment: string;
    word1: SideDto;
    word2: SideDto;
}

export class SideDto {
    value: string;
    example: string;
    drawer: number;
}
