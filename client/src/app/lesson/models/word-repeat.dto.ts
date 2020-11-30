export class WordRepeatDto {
    groupName: string;
    groupLanguage1: number;
    groupLanguage2: number;
    id: number;
    language1: string;
    language2: string;
    example1: string;
    example2: string;
    drawer: number;
}


export class LessonCardDto {
    id: number;
    groupName: string;
    question: SideDto;
    answer: SideDto;
}

export class SideDto {
    value: string;
    example: string;
    drawer: number;
    language: number;
}
