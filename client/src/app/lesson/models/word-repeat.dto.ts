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
