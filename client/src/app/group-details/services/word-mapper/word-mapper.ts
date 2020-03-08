import { Injectable } from '@angular/core';
import { WordDto } from '../../models/word.dto';
import { Word } from '../../models/word.model';

@Injectable()
export class WordMapper {
    map(dto: WordDto): Word {
        return new Word(dto.wordId,
            dto.language1,
            dto.language2,
            dto.drawer,
            dto.isVisible);
    }
}
