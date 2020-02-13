export enum LessonStateEnum {
    BeforeStart = 0,
    WordDisplay,
    AnswerDisplay,
    AfterFinish,
}

export class LessonStep {

    private static readonly map = new Map<LessonStateEnum, LessonStep>()
        .set(LessonStateEnum.BeforeStart,
            new LessonStep(LessonStateEnum.BeforeStart, false, false, true, false, false))
        .set(LessonStateEnum.WordDisplay,
            new LessonStep(LessonStateEnum.WordDisplay, true, true, false, true, false))
        .set(LessonStateEnum.AnswerDisplay,
            new LessonStep(LessonStateEnum.AnswerDisplay, true, false, false, false, true))
        .set(LessonStateEnum.AfterFinish,
            new LessonStep(LessonStateEnum.AfterFinish, false, false, false, false, false));

    readonly step: LessonStateEnum;
    readonly questionVisibility: boolean;
    readonly answerIsEnable: boolean;
    readonly startVisibility: boolean;
    readonly checkVisibility: boolean;
    readonly answerVisibility: boolean;

    constructor(step: LessonStateEnum, questionVisibility: boolean, answerIsEnabled: boolean,
        startVisibility: boolean, checkVisiblity: boolean, answerVisibility: boolean) {
        this.step = step;
        this.questionVisibility = questionVisibility;
        this.answerIsEnable = answerIsEnabled;
        this.startVisibility = startVisibility;
        this.checkVisibility = checkVisiblity;
        this.answerVisibility = answerVisibility;
    }

    static getLessonStep(lessonStateEnum: LessonStateEnum): LessonStep {
        return this.map.get(lessonStateEnum);
    }

}
