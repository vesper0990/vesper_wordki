import { Injectable } from '@angular/core';
import { GroupDto } from '../../models/group-dto.model';
import { Group } from '../../models/group.model';

@Injectable()
export class GroupMapper {
    map(groupDto: GroupDto): Group {
        return new Group(groupDto.id,
            groupDto.name,
            groupDto.language1,
            groupDto.language2,
            groupDto.wordsCount);
    }
}
