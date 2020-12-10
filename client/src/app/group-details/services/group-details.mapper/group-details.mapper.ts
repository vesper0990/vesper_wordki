import { Injectable } from '@angular/core';
import { GroupDetailsDto } from '../../models/group-details.dto';
import { GroupDetails } from '../../models/group-details.model';
import { LanguageType } from 'src/app/share/models/language-type.mode';

@Injectable()
export class GroupDetailsMapper {
    map(groupDetailsDto: GroupDetailsDto): GroupDetails {
        const groupDetails = new GroupDetails(groupDetailsDto.id,
            groupDetailsDto.name,
            LanguageType.getLanguageType(groupDetailsDto.language1),
            LanguageType.getLanguageType(groupDetailsDto.language2),
            groupDetailsDto.cardsCount,
            groupDetailsDto.repeatsCount,
            new Date(groupDetailsDto.creationDate));
        return groupDetails;
    }
}
