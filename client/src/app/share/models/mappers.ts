import { CardDetails, CardRepeat, Drawer, ExtendedCardDetails, Group, GroupDetails, SideDetails, SideRepeat } from './card-details';
import { CardDetailsDto } from './dtos/card-details-dto';
import { CardRepeatDto } from './dtos/card-repeat-dto';
import { ExtendedCardDetailsDto } from './dtos/extended-card-details-dto';
import { GroupDetailsDto } from './dtos/group-details-dto';
import { GroupDto } from './dtos/group-dto';
import { LanguageType, LanguageTypeEnum } from './language-type.mode';

export function mapExtendedCardDetails(dto: ExtendedCardDetailsDto): ExtendedCardDetails {
    return new ExtendedCardDetails(
        dto.id,
        dto.groupName,
        new SideDetails(
            dto.front.value,
            dto.front.example,
            new Drawer(dto.front.drawer),
            LanguageType.getLanguageType(dto.front.language as LanguageTypeEnum),
            dto.front.repeatsCount,
            dto.front.isVisible,
            new Date(dto.front.nextRepeat)
        ),
        new SideDetails(
            dto.back.value,
            dto.back.example,
            new Drawer(dto.back.drawer),
            LanguageType.getLanguageType(dto.back.language as LanguageTypeEnum),
            dto.back.repeatsCount,
            dto.back.isVisible,
            new Date(dto.back.nextRepeat)
        ),
    );
}

export function mapCardDetails(dto: CardDetailsDto): CardDetails {
    return new CardDetails(
        dto.id,
        new SideDetails(
            dto.front.value,
            dto.front.example,
            new Drawer(dto.front.drawer),
            LanguageType.getLanguageType(dto.front.language as LanguageTypeEnum),
            dto.front.repeatsCount,
            dto.front.isVisible,
            new Date(dto.front.nextRepeat)
        ),
        new SideDetails(
            dto.back.value,
            dto.back.example,
            new Drawer(dto.back.drawer),
            LanguageType.getLanguageType(dto.back.language as LanguageTypeEnum),
            dto.back.repeatsCount,
            dto.back.isVisible,
            new Date(dto.back.nextRepeat)
        ),
    );
}

export function mapGroup(dto: GroupDto): Group {
    return new Group(dto.id,
        dto.name,
        LanguageType.getLanguageType(dto.languageFront),
        LanguageType.getLanguageType(dto.languageBack),
        dto.cardsCount,
        dto.repeatsCount);
}

export function mapGroupDetails(dto: GroupDetailsDto): GroupDetails {
    return new GroupDetails(
        dto.id,
        dto.name,
        LanguageType.getLanguageType(dto.languageFront),
        LanguageType.getLanguageType(dto.languageBack),
        dto.cardsCount,
        dto.repeatsCount,
        new Date(dto.creationDate)
    );
}

export function mapCardRepeat(dto: CardRepeatDto): CardRepeat {
    return new CardRepeat(
        dto.id,
        new SideRepeat(
            dto.question.value,
            dto.question.example,
            new Drawer(dto.question.drawer),
            LanguageType.getLanguageType(dto.question.language)
        ),
        new SideRepeat(
            dto.answer.value,
            dto.answer.example,
            new Drawer(dto.answer.drawer),
            LanguageType.getLanguageType(dto.answer.language)
        )
    );
}
