import { Injectable } from '@angular/core';
import { GroupDetailsDto } from '../../models/group-details.dto';
import { GroupDetails } from '../../models/group-details.model';
import { WordDto } from '../../models/word.dto';
import { Word } from '../../models/word.model';

@Injectable()
export class GroupDetailsMapper {
    map(groupDetailsDto: GroupDetailsDto): GroupDetails {
        const groupDetails = new GroupDetails(groupDetailsDto.id,
            groupDetailsDto.name,
            groupDetailsDto.language1,
            groupDetailsDto.language2);

        groupDetailsDto.words.forEach((wordDto: WordDto) => {
            groupDetails.addWord(new Word(wordDto.id,
                wordDto.language1,
                wordDto.language2,
                wordDto.drawer));
        });

        return groupDetails;
    }
}
