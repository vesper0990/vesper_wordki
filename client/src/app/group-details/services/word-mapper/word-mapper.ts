import { Injectable } from '@angular/core';
import { WordDto } from '../../models/word.dto';
import { Word } from '../../models/word.model';

@Injectable()
export class WordMapper {
    map(wordDto: WordDto): Word {

        return new Word(wordDto.id,
            wordDto.language1,
            wordDto.language2,
            wordDto.drawer);
    }
}
