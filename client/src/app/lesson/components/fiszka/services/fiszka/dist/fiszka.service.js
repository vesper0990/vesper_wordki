"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FiszkaService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var lesson_state_1 = require("src/app/lesson/models/lesson-state");
var actions = require("src/app/lesson/store/actions");
var selectors_1 = require("src/app/lesson/store/selectors");
var FiszkaService = /** @class */ (function () {
    function FiszkaService(store, router, stoper) {
        this.store = store;
        this.router = router;
        this.stoper = stoper;
    }
    FiszkaService.prototype.init = function () {
        var _this = this;
        this.lessonStepSub = this.store.select(selectors_1.selectLessonStep).pipe(operators_1.tap(function (value) { return _this.lessonStep = value; })).subscribe();
    };
    FiszkaService.prototype.unsubsccribe = function () {
        this.lessonStepSub.unsubscribe();
    };
    FiszkaService.prototype.getCurrentCard = function () {
        return this.store.select(selectors_1.selectCurrentCard);
    };
    FiszkaService.prototype.getLessonStep = function () {
        return this.store.select(selectors_1.selectLessonStep);
    };
    FiszkaService.prototype.startLesson = function () {
        this.stoper.start();
        this.store.dispatch(new actions.StartLesson());
    };
    FiszkaService.prototype.finishLesson = function () {
        this.stoper.stop();
        var totalTime = this.stoper.getTime();
        this.store.dispatch(new actions.FinishLesson({ totalTime: totalTime }));
        this.router.navigate(['/lesson/summary']);
    };
    FiszkaService.prototype.correct = function () {
        if (this.lessonStep !== lesson_state_1.LessonStep.ANSWARE) {
            return;
        }
        this.store.dispatch(new actions.UpdateCardCorrect());
        this.store.dispatch(new actions.AnswerCorrect());
    };
    FiszkaService.prototype.wrong = function () {
        if (this.lessonStep !== lesson_state_1.LessonStep.ANSWARE) {
            return;
        }
        this.store.dispatch(new actions.UpdateCardWrong());
        this.store.dispatch(new actions.AnswerWrong());
    };
    FiszkaService.prototype.check = function () {
        if (this.lessonStep !== lesson_state_1.LessonStep.QUESTION) {
            return;
        }
        this.store.dispatch(new actions.CheckCard());
    };
    FiszkaService.prototype.loadWords = function () {
        this.store.dispatch(new actions.CreateNewLesson());
        this.store.dispatch(new actions.GetWords());
    };
    FiszkaService.prototype.pause = function () {
        this.stoper.stop();
        this.store.dispatch(new actions.PauseLesson());
    };
    FiszkaService.prototype.restart = function () {
        this.stoper.start();
        this.store.dispatch(new actions.RestartLesson());
    };
    FiszkaService = __decorate([
        core_1.Injectable()
    ], FiszkaService);
    return FiszkaService;
}());
exports.FiszkaService = FiszkaService;
