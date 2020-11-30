"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LessonEffects = void 0;
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var acitons = require("./actions");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var shuffle_array_1 = require("src/app/share/utils/shuffle-array");
var selectors_1 = require("./selectors");
var LessonEffects = /** @class */ (function () {
    function LessonEffects(actions$, store$, wordProvider) {
        var _this = this;
        this.actions$ = actions$;
        this.store$ = store$;
        this.wordProvider = wordProvider;
        this.createLesson$ = this.actions$.pipe(effects_1.ofType(acitons.LessonActionEnum.CREATE_NEW_LESSON), operators_1.switchMap(function () { return _this.wordProvider.createLesson(); }), operators_1.map(function (value) { return new acitons.CreateNewLessonSuccess({ lessonId: value }); }), operators_1.catchError(function (error) { return rxjs_1.of(new acitons.GetWordsFailed({ error: error })); }));
        this.getCards$ = this.actions$.pipe(effects_1.ofType(acitons.LessonActionEnum.GET_WORDS), operators_1.exhaustMap(function () { return _this.wordProvider.getTodayWords(); }), operators_1.map(function (value) { return shuffle_array_1.shuffleArray(value); }), operators_1.map(function (value) { return new acitons.GetWordsSuccess({ cards: value }); }), operators_1.catchError(function (error) { return rxjs_1.of(new acitons.GetWordsFailed({ error: error })); }));
        this.answerCorrect$ = this.actions$.pipe(effects_1.ofType(acitons.LessonActionEnum.UPDATE_CARD_CORRECT), operators_1.withLatestFrom(this.store$.select(selectors_1.selectCurrentCard), this.store$.select(selectors_1.selectLessonId)), operators_1.concatMap(function (_a) {
            var action = _a[0], currentWord = _a[1], lessonId = _a[2];
            return _this.wordProvider.correct(currentWord.id, lessonId, '');
        }));
        this.answerWrong$ = this.actions$.pipe(effects_1.ofType(acitons.LessonActionEnum.UPDATE_CARD_WRONG), operators_1.withLatestFrom(this.store$.select(selectors_1.selectCurrentCard), this.store$.select(selectors_1.selectLessonId)), operators_1.concatMap(function (_a) {
            var action = _a[0], currentWord = _a[1], lessonId = _a[2];
            return _this.wordProvider.wrong(currentWord.id, lessonId, '');
        }));
        this.finishLesson$ = this.actions$.pipe(effects_1.ofType(acitons.LessonActionEnum.FINISH_LESSON), operators_1.withLatestFrom(this.store$.select(selectors_1.selectLessonId)), operators_1.concatMap(function (_a) {
            var action = _a[0], lessonId = _a[1];
            return _this.wordProvider.finish(lessonId);
        }));
    }
    __decorate([
        effects_1.Effect()
    ], LessonEffects.prototype, "createLesson$");
    __decorate([
        effects_1.Effect()
    ], LessonEffects.prototype, "getCards$");
    __decorate([
        effects_1.Effect({
            dispatch: false
        })
    ], LessonEffects.prototype, "answerCorrect$");
    __decorate([
        effects_1.Effect({
            dispatch: false
        })
    ], LessonEffects.prototype, "answerWrong$");
    __decorate([
        effects_1.Effect({
            dispatch: false
        })
    ], LessonEffects.prototype, "finishLesson$");
    LessonEffects = __decorate([
        core_1.Injectable()
    ], LessonEffects);
    return LessonEffects;
}());
exports.LessonEffects = LessonEffects;
