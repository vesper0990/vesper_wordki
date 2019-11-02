import { Language } from '@app/common/models/model';

export interface GroupRowModel {
    id: string;
    name: string;
    language1: Language;
    language2: Language;
    wordsCount: number;
    resultsCount: number;
    creationDate: Date;
    lastLessonDate: Date;
}
