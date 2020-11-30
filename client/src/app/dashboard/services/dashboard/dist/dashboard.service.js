"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var action = require("../../store/actions");
var selector = require("../../store/selectors");
var DashboardService = /** @class */ (function () {
    function DashboardService(store, router) {
        this.store = store;
        this.router = router;
    }
    DashboardService.prototype.init = function () {
        this.store.dispatch(new action.GetNextRepeat());
        this.store.dispatch(new action.GetNewstCard());
        this.store.dispatch(new action.GetLastFailed());
        this.store.dispatch(new action.GetTodayCardsCount());
        this.store.dispatch(new action.GetLastLessonDate());
        this.store.dispatch(new action.GetGroupsCount());
        this.store.dispatch(new action.GetCardsCount());
    };
    DashboardService.prototype.getLastFailed = function () {
        return this.store.select(selector.selectLastFailed);
    };
    DashboardService.prototype.getNextRepeat = function () {
        return this.store.select(selector.selectNextRepeat);
    };
    DashboardService.prototype.getNewestCard = function () {
        return this.store.select(selector.selectNewestCard);
    };
    DashboardService.prototype.getCardToRepeat = function () {
        return this.store.select(selector.selectCardToRepeat);
    };
    DashboardService.prototype.getLastRepeat = function () {
        return this.store.select(selector.selectLastRepeat);
    };
    DashboardService.prototype.getGroupsCount = function () {
        return this.store.select(selector.selectGroupsCount);
    };
    DashboardService.prototype.isGroupsCountReady = function () {
        return this.store.select(selector.selectGroupsCount).pipe(operators_1.map(function (value) { return value !== null; }));
    };
    DashboardService.prototype.getCardsCount = function () {
        return this.store.select(selector.selectCardsCount);
    };
    DashboardService.prototype.lesson = function () {
        this.router.navigate(['/lesson/fiszki']);
    };
    DashboardService.prototype.cards = function () {
        this.router.navigate(['/cards']);
    };
    DashboardService.prototype.groups = function () {
        this.router.navigate(['/groups']);
    };
    DashboardService.prototype.history = function () {
        this.router.navigate(['/history']);
    };
    DashboardService = __decorate([
        core_1.Injectable()
    ], DashboardService);
    return DashboardService;
}());
exports.DashboardService = DashboardService;
