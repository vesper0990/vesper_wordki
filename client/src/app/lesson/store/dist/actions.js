"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Finish = exports.UpdateCardWrongFailed = exports.UpdateCardWrongSuccess = exports.UpdateCardWrong = exports.UpdateCardCorrectFailed = exports.UpdateCardCorrectSuccess = exports.UpdateCardCorrect = exports.RestartLesson = exports.PauseLesson = exports.FinishLesson = exports.AnswerWrong = exports.AnswerCorrect = exports.CheckCard = exports.StartLesson = exports.GetWordsFailed = exports.GetWordsSuccess = exports.GetWords = exports.CreateNewLessonSuccess = exports.CreateNewLesson = exports.LessonActionEnum = void 0;
var lesson_result_1 = require("../models/lesson-result");
var lesson_state_1 = require("../models/lesson-state");
var state_1 = require("./state");
var LessonActionEnum;
(function (LessonActionEnum) {
    LessonActionEnum["CREATE_NEW_LESSON"] = "[LESSON_STATE] CREATE_NEW_LESSON";
    LessonActionEnum["CREATE_NEW_LESSON_SUCCESS"] = "[LESSON_STATE] CREATE_NEW_LESSON_SUCCESS";
    LessonActionEnum["GET_WORDS"] = "[LESSON_STATE] GET_WORDS";
    LessonActionEnum["GET_WORDS_SUCCESS"] = "[LESSON_STATE] GET_WORDS_SUCCESS";
    LessonActionEnum["GET_WORDS_FAILES"] = "[LESSON_STATE] GET_WORDS_FAILED";
    LessonActionEnum["UPDATE_CARD_CORRECT"] = "[LESSON_STATE] UPDATE_CARD_CORRECT";
    LessonActionEnum["UPDATE_CARD_CORRECT_SUCCESS"] = "[LESSON_STATE] UPDATE_CARD_CORRECT_SUCCESS";
    LessonActionEnum["UPDATE_CARD_CORRECT_FAILED"] = "[LESSON_STATE] UPDATE_CARD_CORRECT_FAILED";
    LessonActionEnum["UPDATE_CARD_WRONG"] = "[LESSON_STATE] UPDATE_CARD_WRONG";
    LessonActionEnum["UPDATE_CARD_WRONG_SUCCESS"] = "[LESSON_STATE] UPDATE_CARD_WRONG_SUCCESS";
    LessonActionEnum["UPDATE_CARD_WRONG_FAILED"] = "[LESSON_STATE] UPDATE_CARD_WRONG_FAILED";
    LessonActionEnum["START_LESSON"] = "[LESSON_STATE] START_LESSON";
    LessonActionEnum["CHECK_CARD"] = "[LESSON_STATE] CHECK_CARD";
    LessonActionEnum["ANWSER_CORRECT"] = "[LESSON_STATE] ANSWER_CORRECT";
    LessonActionEnum["ANSWER_WRONG"] = "[LESSON_STATE] ANSWER_WRONG";
    LessonActionEnum["FINISH_LESSON"] = "[LESSON_STATE] FINISH_LESSON";
    LessonActionEnum["PAUSE_LESSON"] = "[LESSON_STATE] PAUSE_LESSON";
    LessonActionEnum["RESTART_LESSON"] = "[LESSON_STATE] RESTART_LESSON";
    LessonActionEnum["FINISH"] = "[LESSON_STATE] FINISH";
})(LessonActionEnum = exports.LessonActionEnum || (exports.LessonActionEnum = {}));
var CreateNewLesson = /** @class */ (function () {
    function CreateNewLesson() {
        this.type = LessonActionEnum.CREATE_NEW_LESSON;
    }
    CreateNewLesson.reduce = function (state) {
        return __assign({}, state);
    };
    return CreateNewLesson;
}());
exports.CreateNewLesson = CreateNewLesson;
var CreateNewLessonSuccess = /** @class */ (function () {
    function CreateNewLessonSuccess(payload) {
        this.payload = payload;
        this.type = LessonActionEnum.CREATE_NEW_LESSON_SUCCESS;
    }
    CreateNewLessonSuccess.reduce = function (state, action) {
        return __assign(__assign({}, state), { lessonId: action.payload.lessonId });
    };
    return CreateNewLessonSuccess;
}());
exports.CreateNewLessonSuccess = CreateNewLessonSuccess;
var GetWords = /** @class */ (function () {
    function GetWords() {
        this.type = LessonActionEnum.GET_WORDS;
    }
    GetWords.reduce = function (state) {
        return state_1.initialLessonsState;
    };
    return GetWords;
}());
exports.GetWords = GetWords;
var GetWordsSuccess = /** @class */ (function () {
    function GetWordsSuccess(payload) {
        this.payload = payload;
        this.type = LessonActionEnum.GET_WORDS_SUCCESS;
    }
    GetWordsSuccess.reduce = function (state, action) {
        return __assign(__assign({}, state), { words: action.payload.cards, lessonStep: lesson_state_1.LessonStep.BEFORE_START });
    };
    return GetWordsSuccess;
}());
exports.GetWordsSuccess = GetWordsSuccess;
var GetWordsFailed = /** @class */ (function () {
    function GetWordsFailed(payload) {
        this.payload = payload;
        this.type = LessonActionEnum.GET_WORDS_FAILES;
    }
    GetWordsFailed.reduce = function (state) {
        return __assign({}, state);
    };
    return GetWordsFailed;
}());
exports.GetWordsFailed = GetWordsFailed;
var StartLesson = /** @class */ (function () {
    function StartLesson() {
        this.type = LessonActionEnum.START_LESSON;
    }
    StartLesson.reduce = function (state) {
        var result = new lesson_result_1.LessonResult();
        result.startTime = new Date();
        return __assign(__assign({}, state), { result: result, lessonStep: lesson_state_1.LessonStep.QUESTION });
    };
    return StartLesson;
}());
exports.StartLesson = StartLesson;
var CheckCard = /** @class */ (function () {
    function CheckCard() {
        this.type = LessonActionEnum.CHECK_CARD;
    }
    CheckCard.reduce = function (state) {
        return __assign(__assign({}, state), { lessonStep: lesson_state_1.LessonStep.ANSWARE });
    };
    return CheckCard;
}());
exports.CheckCard = CheckCard;
var AnswerCorrect = /** @class */ (function () {
    function AnswerCorrect() {
        this.type = LessonActionEnum.ANWSER_CORRECT;
    }
    AnswerCorrect.reduce = function (state) {
        var cards = state.words.slice(1, state.words.length);
        var step = cards.length !== 0 ? lesson_state_1.LessonStep.QUESTION : lesson_state_1.LessonStep.AFTER_FINISH;
        return __assign(__assign({}, state), { lessonStep: step, words: cards, result: __assign(__assign({}, state.result), { correct: state.result.correct + 1 }) });
    };
    return AnswerCorrect;
}());
exports.AnswerCorrect = AnswerCorrect;
var AnswerWrong = /** @class */ (function () {
    function AnswerWrong() {
        this.type = LessonActionEnum.ANSWER_WRONG;
    }
    AnswerWrong.reduce = function (state) {
        var currentCard = state.words[0];
        var cards = state.words.slice(1, state.words.length);
        cards.push(currentCard);
        var step = cards.length !== 0 ? lesson_state_1.LessonStep.QUESTION : lesson_state_1.LessonStep.AFTER_FINISH;
        return __assign(__assign({}, state), { lessonStep: step, words: cards, result: __assign(__assign({}, state.result), { wrong: state.result.wrong + 1 }) });
    };
    return AnswerWrong;
}());
exports.AnswerWrong = AnswerWrong;
var FinishLesson = /** @class */ (function () {
    function FinishLesson(payload) {
        this.payload = payload;
        this.type = LessonActionEnum.FINISH_LESSON;
    }
    FinishLesson.reduce = function (state, action) {
        return __assign(__assign({}, state), { result: __assign(__assign({}, state.result), { totalTime: action.payload.totalTime }) });
    };
    return FinishLesson;
}());
exports.FinishLesson = FinishLesson;
var PauseLesson = /** @class */ (function () {
    function PauseLesson() {
        this.type = LessonActionEnum.PAUSE_LESSON;
    }
    PauseLesson.reduce = function (state) {
        var stepBeforePause = state.lessonStep;
        var step = lesson_state_1.LessonStep.PAUSE;
        step.answare = stepBeforePause.answare;
        return __assign(__assign({}, state), { lessonStep: lesson_state_1.LessonStep.PAUSE, stepBeforePause: stepBeforePause });
    };
    return PauseLesson;
}());
exports.PauseLesson = PauseLesson;
var RestartLesson = /** @class */ (function () {
    function RestartLesson() {
        this.type = LessonActionEnum.RESTART_LESSON;
    }
    RestartLesson.reduce = function (state) {
        return __assign(__assign({}, state), { lessonStep: state.stepBeforePause, stepBeforePause: null });
    };
    return RestartLesson;
}());
exports.RestartLesson = RestartLesson;
var UpdateCardCorrect = /** @class */ (function () {
    function UpdateCardCorrect() {
        this.type = LessonActionEnum.UPDATE_CARD_CORRECT;
    }
    UpdateCardCorrect.reduce = function (state) {
        return __assign({}, state);
    };
    return UpdateCardCorrect;
}());
exports.UpdateCardCorrect = UpdateCardCorrect;
var UpdateCardCorrectSuccess = /** @class */ (function () {
    function UpdateCardCorrectSuccess() {
        this.type = LessonActionEnum.UPDATE_CARD_CORRECT_SUCCESS;
    }
    UpdateCardCorrectSuccess.reduce = function (state) {
        return __assign({}, state);
    };
    return UpdateCardCorrectSuccess;
}());
exports.UpdateCardCorrectSuccess = UpdateCardCorrectSuccess;
var UpdateCardCorrectFailed = /** @class */ (function () {
    function UpdateCardCorrectFailed() {
        this.type = LessonActionEnum.UPDATE_CARD_CORRECT_FAILED;
    }
    UpdateCardCorrectFailed.reduce = function (state) {
        return __assign({}, state);
    };
    return UpdateCardCorrectFailed;
}());
exports.UpdateCardCorrectFailed = UpdateCardCorrectFailed;
var UpdateCardWrong = /** @class */ (function () {
    function UpdateCardWrong() {
        this.type = LessonActionEnum.UPDATE_CARD_WRONG;
    }
    UpdateCardWrong.reduce = function (state) {
        return __assign({}, state);
    };
    return UpdateCardWrong;
}());
exports.UpdateCardWrong = UpdateCardWrong;
var UpdateCardWrongSuccess = /** @class */ (function () {
    function UpdateCardWrongSuccess() {
        this.type = LessonActionEnum.UPDATE_CARD_WRONG_SUCCESS;
    }
    UpdateCardWrongSuccess.reduce = function (state) {
        return __assign({}, state);
    };
    return UpdateCardWrongSuccess;
}());
exports.UpdateCardWrongSuccess = UpdateCardWrongSuccess;
var UpdateCardWrongFailed = /** @class */ (function () {
    function UpdateCardWrongFailed() {
        this.type = LessonActionEnum.UPDATE_CARD_WRONG_FAILED;
    }
    UpdateCardWrongFailed.reduce = function (state) {
        return __assign({}, state);
    };
    return UpdateCardWrongFailed;
}());
exports.UpdateCardWrongFailed = UpdateCardWrongFailed;
var Finish = /** @class */ (function () {
    function Finish() {
        this.type = LessonActionEnum.FINISH;
    }
    Finish.reduce = function () {
        return state_1.initialLessonsState;
    };
    return Finish;
}());
exports.Finish = Finish;
