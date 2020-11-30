"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupListEffects = void 0;
var effects_1 = require("@ngrx/effects");
var actions = require("./actions");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var GroupListEffects = /** @class */ (function () {
    function GroupListEffects(actions$, store, groupProvider) {
        var _this = this;
        this.actions$ = actions$;
        this.store = store;
        this.groupProvider = groupProvider;
        this.getGroupListEffect = this.actions$.pipe(effects_1.ofType(actions.GroupListTypes.GET_GROUPS), operators_1.exhaustMap(function () { return _this.groupProvider.getGroups(); }), operators_1.map(function (groups) { return new actions.GetGroupsSuccess({ groups: groups }); }), operators_1.catchError(function (error) { return _this.handleError(error); }));
        this.updateGroupInListEffect = this.actions$.pipe(effects_1.ofType(actions.GroupListTypes.UPDATE_GROUP), operators_1.tap(function (action) { return _this.groupProvider.updateGroup(action.payload.group); }), operators_1.concatMap(function (action) { return [
            new actions.UpdateGroupSuccess({ group: action.payload.group }),
            new actions.HideDialog(),
        ]; }), operators_1.catchError(function (error) { return _this.handleError(error); }));
        this.addGroupToListEffect = this.actions$.pipe(effects_1.ofType(actions.GroupListTypes.ADD_GROUP), operators_1.exhaustMap(function (action) { return rxjs_1.forkJoin([
            rxjs_1.of(action.payload.group),
            _this.groupProvider.addGroup(action.payload.group)
        ]); }), operators_1.concatMap(function (data) { return [
            new actions.AddGroupSuccess({ group: data[0], groupId: data[1] }),
            new actions.HideDialog()
        ]; }), operators_1.catchError(function (error) { return _this.handleError(error); }));
        this.removeGroupEffect = this.actions$.pipe(effects_1.ofType(actions.GroupListTypes.REMOVE_GROUP), operators_1.tap(function (action) { return _this.groupProvider.removeGroup(action.payload.groupId); }), operators_1.concatMap(function (action) { return [
            new actions.RemoveGroupSuccess({ groupId: action.payload.groupId }),
            new actions.HideDialog()
        ]; }), operators_1.catchError(function (error) { return _this.handleError(error); }));
    }
    GroupListEffects.prototype.handleError = function (error) {
        console.log(error);
        throw error;
    };
    __decorate([
        effects_1.Effect()
    ], GroupListEffects.prototype, "getGroupListEffect");
    __decorate([
        effects_1.Effect()
    ], GroupListEffects.prototype, "updateGroupInListEffect");
    __decorate([
        effects_1.Effect()
    ], GroupListEffects.prototype, "addGroupToListEffect");
    __decorate([
        effects_1.Effect()
    ], GroupListEffects.prototype, "removeGroupEffect");
    GroupListEffects = __decorate([
        core_1.Injectable()
    ], GroupListEffects);
    return GroupListEffects;
}());
exports.GroupListEffects = GroupListEffects;
