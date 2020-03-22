import { RepeatWordDto } from '../../models/reapeat-word.dto';
import { RepeatWord } from '../../models/repeat-word.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RepeatWordMapper {
    public map(dto: RepeatWordDto): RepeatWord {
        if (!dto) {
            return new RepeatWord(null, null, 0);
        }
        return new RepeatWord(dto.language1, dto.language2, dto.drawer);
    }
}
