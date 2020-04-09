import { Injectable } from '@angular/core';
import { WordRepeat } from '../../models/word-repeat';
import { WordRepeatDto } from '../../models/word-repeat.dto';
import { LanguageType } from 'src/app/share/models/language-type.mode';

@Injectable()
export class WordMapper {
    map(dto: WordRepeatDto): WordRepeat {
        return {
            groupName: dto.groupName,
            groupLanguage1: LanguageType.getLanguageType(dto.groupLanguage1),
            groupLanguage2: LanguageType.getLanguageType(dto.groupLanguage2),
            id: dto.id,
            language1: dto.language1,
            language2: dto.language2,
            example1: dto.example1,
            example2: dto.example2,
            drawer: dto.drawer
        } as WordRepeat;
    }
}
