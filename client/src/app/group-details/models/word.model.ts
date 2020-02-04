import { GroupDetails } from './group-details.model';

export class Word {

    id: number;
    language1: string;
    language2: string;
    drawer: number;
    group: GroupDetails;
    isVisible: boolean;

    constructor(id: number,
        language1: string,
        language2: string,
        drawer: number) {
        this.id = id;
        this.language1 = language1;
        this.language2 = language2;
        this.drawer = drawer;
    }
}
