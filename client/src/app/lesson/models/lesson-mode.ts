export enum LessonModeEnum {
    Undefined = 0,
    Repeat,
    Group,
    DailyRepeat
}

export class LessonMode {

    static dailyRepeat = new LessonMode(LessonModeEnum.DailyRepeat, false, true);
    static endlessRepeat = new LessonMode(LessonModeEnum.Repeat, true, false);

    private static map = new Map<LessonModeEnum, LessonMode>().set(LessonModeEnum.DailyRepeat, LessonMode.dailyRepeat)
        .set(LessonModeEnum.Repeat, LessonMode.endlessRepeat);

    constructor(readonly type: LessonModeEnum, readonly shouldDownloadNext: boolean, readonly shouldShuffle: boolean) {
    }

    static get(type: LessonModeEnum): LessonMode {
        return this.map.get(type);
    }
}
