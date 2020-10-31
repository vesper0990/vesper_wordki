export enum LessonStateEnum {
    BEFORE_START = 0,
    QUESTION,
    ANSWARE,
    AFTER_FINISH,
    PAUSE
}

export class LessonStep {

    public static BEFORE_START = new LessonStep(LessonStateEnum.BEFORE_START, true, false, false, false, false, false, false, false);
    public static QUESTION = new LessonStep(LessonStateEnum.QUESTION, false, true, false, false, true, false, true, false);
    public static ANSWARE = new LessonStep(LessonStateEnum.ANSWARE, false, false, true, false, true, false, true, true);
    public static AFTER_FINISH = new LessonStep(LessonStateEnum.AFTER_FINISH, false, false, false, true, false, false, false, false);
    public static PAUSE = new LessonStep(LessonStateEnum.PAUSE, false, false, false, false, false, true, true, false);

    private static readonly map = new Map<LessonStateEnum, LessonStep>()
        .set(LessonStateEnum.BEFORE_START, LessonStep.BEFORE_START)
        .set(LessonStateEnum.QUESTION, LessonStep.QUESTION)
        .set(LessonStateEnum.ANSWARE, LessonStep.ANSWARE)
        .set(LessonStateEnum.AFTER_FINISH, LessonStep.AFTER_FINISH);

    constructor(
        public readonly step: LessonStateEnum,
        public readonly startBtn: boolean,
        public readonly checkBtn: boolean,
        public readonly answareBtn: boolean,
        public readonly finishBtn: boolean,
        public readonly pauseBtn: boolean,
        public readonly restartBtn: boolean,
        public readonly question: boolean,
        public answare: boolean) {
    }

    static getLessonStep(lessonStateEnum: LessonStateEnum): LessonStep {
        return this.map.get(lessonStateEnum);
    }
}
