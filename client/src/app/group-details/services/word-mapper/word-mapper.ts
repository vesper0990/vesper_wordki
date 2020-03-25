import { Injectable } from '@angular/core';
import { WordDto } from '../../models/word.dto';
import { Word } from '../../models/word.model';
import { RepeatDto } from '../../models/repeat.dto';

@Injectable()
export class WordMapper {
    map(dto: WordDto): Word {
        const word = new Word(dto.wordId,
            dto.language1,
            dto.language2,
            dto.example1,
            dto.example2,
            dto.drawer,
            dto.isVisible,
            new Date(dto.nextRepeat));
        if (dto.repeats) {
            dto.repeats.forEach((repeatDto: RepeatDto) => word.repeats.push({
                result: repeatDto.result,
                date: new Date(repeatDto.date),
                word: word
            }));

        }
        return word;
    }
}
