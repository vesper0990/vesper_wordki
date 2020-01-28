export class LastWord {
    language1: string;
    langauge2: string;
    creationDate: Date;

    constructor(language1: string,
        language2: string,
        creationDate: string | Date) {
        this.language1 = language1;
        this.langauge2 = language2;
        creationDate = new Date(creationDate);
    }
}
