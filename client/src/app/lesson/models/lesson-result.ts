export class LessonResult {

    constructor(public correct = 0,
        public accepted = 0,
        public wrong = 0,
        public startTime = new Date(),
        public totalTime = 0) { }
}
