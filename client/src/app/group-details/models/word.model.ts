import { GroupDetails } from './group-details.model';
import { Repeat } from './repeat.model';

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
    repeats: Repeat[];

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
        this.repeats = [];
    }

    public toggle(): void {
        this.isExpanded = !this.isExpanded;
    }

    public addRepeat(repeat: Repeat): void {
        this.repeats.push(repeat);
    }
}
