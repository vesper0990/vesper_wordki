export enum LessonSourceType {
    Default,
    Repetition,
    NewWords
}

export class LessonSource {

    static DEFAULT = new LessonSource(LessonSourceType.Default, '');
    static REPETITION = new LessonSource(LessonSourceType.Repetition, 'Repetition');
    static NEW = new LessonSource(LessonSourceType.NewWords, 'New words');

    private static all = [
        LessonSource.REPETITION,
        LessonSource.NEW
    ];

    constructor(public readonly type: LessonSourceType, public readonly label: string) { }

    static getAll(): LessonSource[] {
        return LessonSource.all;
    }
}
