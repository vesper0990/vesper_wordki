import { RepeatWordDto } from '../../models/reapeat-word.dto';
import { RepeatWord } from '../../models/repeat-word.model';
import { Injectable } from '@angular/core';
import { LanguageType, LanguageTypeEnum } from 'src/app/share/models/language-type.mode';

@Injectable()
export class RepeatWordMapper {
    public map(dto: RepeatWordDto): RepeatWord {
        if (!dto) {
            return new RepeatWord(null,
                LanguageType.getLanguageType(LanguageTypeEnum.Undefined),
                LanguageType.getLanguageType(LanguageTypeEnum.Undefined),
                null,
                null,
                null,
                null,
                0,
                null,
                0,
                null);
        }
        return new RepeatWord(
            dto.groupName,
            LanguageType.getLanguageType(dto.groupLanguage1),
            LanguageType.getLanguageType(dto.groupLanguage2),
            dto.language1,
            dto.language2,
            dto.example1,
            dto.example2,
            dto.drawer,
            new Date(dto.creationDate),
            dto.repeatsCount,
            new Date(dto.lastRepeat));
    }
}
