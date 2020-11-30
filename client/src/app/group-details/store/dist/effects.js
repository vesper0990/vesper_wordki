"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupDetailsEffects = void 0;
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var actions = require("./actions");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var GroupDetailsEffects = /** @class */ (function () {
    function GroupDetailsEffects(actions$, groupDetailsProvider) {
        var _this = this;
        this.actions$ = actions$;
        this.groupDetailsProvider = groupDetailsProvider;
        this.getGroupDetailsEffect = this.actions$.pipe(effects_1.ofType(actions.GroupDetailsTypes.GetGroupDetails), operators_1.mergeMap(function (action) { return _this.groupDetailsProvider.getGroupDetails(action.payload.groupId); }), operators_1.map(function (groupDetails) { return new actions.GetGroupDetailsSuccess({ groupDetails: groupDetails }); }), operators_1.catchError(function (error) { return _this.handleError(error); }));
        this.getWordsEffect = this.actions$.pipe(effects_1.ofType(actions.GroupDetailsTypes.GetWords), operators_1.mergeMap(function (action) { return _this.groupDetailsProvider.getWords(action.payload.groupId); }), operators_1.map(function (words) { return new actions.GetWordsSuccess({ words: words }); }), operators_1.catchError(function (error) { return _this.handleError(error); }));
        this.updateWordEffect = this.actions$.pipe(effects_1.ofType(actions.GroupDetailsTypes.UpdateWord), operators_1.exhaustMap(function (action) { return rxjs_1.forkJoin([
            rxjs_1.of(action.payload.editword),
            _this.groupDetailsProvider.updateWord(action.payload.editword)
        ]); }), operators_1.concatMap(function (data) { return [
            new actions.UpdateWordSuccess({ editWord: data[0] }),
            new actions.HideDialog()
        ]; }), operators_1.catchError(function (error) { return _this.handleError(error); }));
        this.addWordEffect = this.actions$.pipe(effects_1.ofType(actions.GroupDetailsTypes.AddWord), operators_1.exhaustMap(function (action) { return rxjs_1.forkJoin([
            rxjs_1.of(action.payload.editword.groupId),
            _this.groupDetailsProvider.addWord(action.payload.editword)
        ]); }), operators_1.concatMap(function (data) { return [
            new actions.GetWords({ groupId: data[0] }),
            new actions.HideDialog()
        ]; }), operators_1.catchError(function (error) { return _this.handleError(error); }));
        this.removeWordEffect = this.actions$.pipe(effects_1.ofType(actions.GroupDetailsTypes.RemoveWord), operators_1.exhaustMap(function (action) { return rxjs_1.forkJoin([
            rxjs_1.of(action.payload.wordId),
            _this.groupDetailsProvider.removeWord(action.payload.groupId, action.payload.wordId)
        ]); }), operators_1.concatMap(function (data) { return [
            new actions.RemoveWordSuccess({ wordId: data[0] }),
            new actions.HideDialog()
        ]; }), operators_1.catchError(function (error) { return _this.handleError(error); }));
    }
    GroupDetailsEffects.prototype.handleError = function (error) {
        console.log(error);
        throw error;
    };
    __decorate([
        effects_1.Effect()
    ], GroupDetailsEffects.prototype, "getGroupDetailsEffect");
    __decorate([
        effects_1.Effect()
    ], GroupDetailsEffects.prototype, "getWordsEffect");
    __decorate([
        effects_1.Effect()
    ], GroupDetailsEffects.prototype, "updateWordEffect");
    __decorate([
        effects_1.Effect()
    ], GroupDetailsEffects.prototype, "addWordEffect");
    __decorate([
        effects_1.Effect()
    ], GroupDetailsEffects.prototype, "removeWordEffect");
    GroupDetailsEffects = __decorate([
        core_1.Injectable()
    ], GroupDetailsEffects);
    return GroupDetailsEffects;
}());
exports.GroupDetailsEffects = GroupDetailsEffects;
