import { SideDetailsDto } from './side-details-dto';

export interface CardDetailsDto {
    id: number;
    front: SideDetailsDto;
    back: SideDetailsDto;
    creationDate: string;
}
