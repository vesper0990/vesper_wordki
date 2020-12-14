export class EditWord {
    constructor(
        public id: number,
        public groupId: number,
        public language1: string,
        public language2: string,
        public example1: string,
        public example2: string,
        public isVisible: boolean) { }
}
