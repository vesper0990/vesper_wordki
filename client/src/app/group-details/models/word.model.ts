import { GroupDetails } from './group-details.model';

export class Word {

    id: number;
    language1: string;
    language2: string;
    example1: string;
    example2: string;
    drawer: number;
    group: GroupDetails;
    isVisible: boolean;
    nextRepeat: Date;

    isExpanded: boolean;

    constructor(id: number,
        language1: string,
        language2: string,
        example1: string,
        example2: string,
        drawer: number,
        isVisible: boolean,
        nextRepeat: Date) {
        this.id = id;
        this.language1 = language1;
        this.language2 = language2;
        this.example1 = example1,
        this.example2 = example2,
        this.drawer = drawer;
        this.isVisible = isVisible;
        this.nextRepeat = nextRepeat;
        this.isExpanded = false;
    }

    public toggle(): void {
        this.isExpanded = !this.isExpanded;
    }
}
