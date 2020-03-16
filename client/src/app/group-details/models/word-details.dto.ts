import { RepeatDto } from './repeat.dto';

export class WordDetailsDto {
    wordId: number;
    language1: string;
    language2: string;
    example1: string;
    example2: string;
    isVisible: boolean;
    repeats: RepeatDto[];
}
