"use strict";
exports.__esModule = true;
exports.initialLessonsState = void 0;
var lesson_state_1 = require("../models/lesson-state");
exports.initialLessonsState = {
    words: [],
    result: null,
    lessonSettings: null,
    lessonStep: lesson_state_1.LessonStep.BEFORE_START,
    stepBeforePause: null,
    lessonId: 0
};
