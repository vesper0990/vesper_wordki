import { GroupDto } from '../../models/group-dto.model';
import { Group } from '../../models/group.model';
import { LanguageType } from 'src/app/share/models/language-type.mode';

export function mapToGroup(dto: GroupDto): Group {
    return new Group(dto.id,
        dto.name,
        LanguageType.getLanguageType(dto.language1),
        LanguageType.getLanguageType(dto.language2),
        dto.wordsCount,
        dto.visibleWordsCount,
        dto.repeatsCount,
        dto.averageDrawer);
}
