import { Injectable } from '@angular/core';
import { WordDto } from '../../models/word.dto';
import { Word } from '../../models/word.model';

@Injectable()
export class WordMapper {
    map(dto: WordDto): Word {
        const word = new Word(dto.id,
            dto.word1.value,
            dto.word2.value,
            dto.word1.example,
            dto.word2.example,
            dto.word1.drawer,
            true,
            new Date());
        return word;
    }
}
