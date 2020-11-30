"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GroupRowComponent = void 0;
var core_1 = require("@angular/core");
var GroupRowComponent = /** @class */ (function () {
    function GroupRowComponent(router) {
        this.router = router;
        this.lessonStart = new core_1.EventEmitter();
        this.edit = new core_1.EventEmitter();
    }
    GroupRowComponent.prototype.ngOnInit = function () {
        this.wordsValue = this.group.visibleWordsCount + '/' + this.group.cardsCount;
    };
    GroupRowComponent.prototype.startLesson = function (group) {
        this.lessonStart.emit(group);
        this.router.navigate(['lesson/group', group.id]);
    };
    GroupRowComponent.prototype.editGroup = function (group) {
        this.edit.emit(group);
    };
    GroupRowComponent.prototype.openGroup = function (group) {
        this.router.navigate(['details', group.id]);
    };
    __decorate([
        core_1.Input()
    ], GroupRowComponent.prototype, "group");
    __decorate([
        core_1.Output()
    ], GroupRowComponent.prototype, "lessonStart");
    __decorate([
        core_1.Output()
    ], GroupRowComponent.prototype, "edit");
    GroupRowComponent = __decorate([
        core_1.Component({
            selector: 'app-group-row',
            templateUrl: './group-row.component.html',
            styleUrls: ['./group-row.component.scss']
        })
    ], GroupRowComponent);
    return GroupRowComponent;
}());
exports.GroupRowComponent = GroupRowComponent;
