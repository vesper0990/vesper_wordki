import { Injectable } from '@angular/core';
import { GroupDto } from '../../models/group-dto.model';
import { Group } from '../../models/group.model';
import { LanguageType } from 'src/app/share/models/language-type.mode';

@Injectable()
export class GroupMapper {

    map(groupDto: GroupDto): Group {
        return new Group(groupDto.id,
            groupDto.name,
            LanguageType.getLanguageType(groupDto.language1),
            LanguageType.getLanguageType(groupDto.language2),
            groupDto.wordsCount);
    }
}
