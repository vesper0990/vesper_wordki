"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupsListService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var actions_1 = require("../../store/actions");
var selectors_1 = require("../../store/selectors");
var GroupsListService = /** @class */ (function () {
    function GroupsListService(store, router) {
        this.store = store;
        this.router = router;
    }
    GroupsListService.prototype.loadGroups = function () {
        this.store.dispatch(new actions_1.GetGroups());
    };
    GroupsListService.prototype.openGroup = function (groupId) {
        this.router.navigate(['lesson/group', groupId]);
    };
    GroupsListService.prototype.getList = function () {
        return this.store.select(selectors_1.getGroupsList);
    };
    GroupsListService.prototype.isLoading = function () {
        return this.store.select(selectors_1.getIsLoading);
    };
    GroupsListService.prototype.isDialogVisible = function () {
        return this.store.select(selectors_1.selectDialogVisibility);
    };
    GroupsListService.prototype.getDialogMode = function () {
        return this.store.select(selectors_1.selectDialogMode);
    };
    GroupsListService.prototype.getDialogGroup = function () {
        return this.store.select(selectors_1.selectDialogGroup).pipe(operators_1.map(function (group) {
            return group === null || group === undefined ?
                {} :
                {
                    name: group.name,
                    id: group.id,
                    language1: group.language1,
                    language2: group.language2
                };
        }));
    };
    GroupsListService.prototype.openDialogToAdd = function () {
        this.store.dispatch(new actions_1.ShowDialog({ mode: 'add' }));
    };
    GroupsListService.prototype.openDialogToEdit = function (group) {
        this.store.dispatch(new actions_1.ShowDialog({ mode: 'edit', group: group }));
    };
    GroupsListService.prototype.dialogSave = function (group) {
        if (group.id !== 0) {
            this.store.dispatch(new actions_1.UpdateGroup({ group: group }));
        }
        else {
            this.store.dispatch(new actions_1.AddGroup({ group: group }));
        }
    };
    GroupsListService.prototype.dialogCancel = function () {
        this.store.dispatch(new actions_1.HideDialog());
    };
    GroupsListService.prototype.dialogRemove = function (groupId) {
        this.store.dispatch(new actions_1.RemoveGroup({ groupId: groupId }));
    };
    GroupsListService = __decorate([
        core_1.Injectable()
    ], GroupsListService);
    return GroupsListService;
}());
exports.GroupsListService = GroupsListService;
