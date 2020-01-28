import { Injectable } from '@angular/core';
import { LastWordDto } from '../../models/last-word.dto';
import { LastWord } from '../../models/last-word.model';

@Injectable()
export class LastWordMapper {
    map(dto: LastWordDto): LastWord {
        return new LastWord(dto.language1, dto.language2, dto.creationDate);
    }
}
