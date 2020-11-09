import { RepeatWordDto } from '../../models/reapeat-word.dto';
import { RepeatWord } from '../../models/repeat-word.model';
import { LanguageType, LanguageTypeEnum } from 'src/app/share/models/language-type.mode';

export function mapToRepeatWord(dto: RepeatWordDto): RepeatWord {
    if (!dto) {
        return new RepeatWord(null,
            LanguageType.getLanguageType(LanguageTypeEnum.Undefined),
            LanguageType.getLanguageType(LanguageTypeEnum.Undefined),
            null,
            null);
    }
    return new RepeatWord(
        dto.groupName,
        LanguageType.getLanguageType(dto.language1),
        LanguageType.getLanguageType(dto.language2),
        dto.heads,
        dto.tails);
}
