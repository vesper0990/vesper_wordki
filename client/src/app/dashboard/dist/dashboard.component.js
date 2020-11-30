"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardComponent = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var dashboard_service_1 = require("./services/dashboard/dashboard.service");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(service) {
        this.service = service;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.service.init();
        this.lastFailed$ = this.service.getLastFailed();
        this.newestCard$ = this.service.getNewestCard();
        this.nextRepeat$ = this.service.getNextRepeat();
        this.cardToRepeat$ = this.service.getCardToRepeat();
        this.lastRepeat$ = this.service.getLastRepeat();
        this.isCardToRepeatReady$ = this.service.getLastRepeat().pipe(operators_1.map(function (value) { return value !== null; }));
        this.groupsCount$ = this.service.getGroupsCount();
        this.isGroupsCountReady$ = this.service.isGroupsCountReady();
        this.cardsCount$ = this.service.getCardsCount();
        this.isCardsCountReady$ = this.service.getCardsCount().pipe(operators_1.map(function (value) { return value !== null; }));
    };
    DashboardComponent.prototype.startLesson = function () {
        this.service.lesson();
    };
    DashboardComponent.prototype.history = function () {
        this.service.history();
    };
    DashboardComponent.prototype.groups = function () {
        this.service.groups();
    };
    DashboardComponent.prototype.cards = function () {
        this.service.cards();
    };
    DashboardComponent = __decorate([
        core_1.Component({
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.scss'],
            providers: [dashboard_service_1.DashboardService]
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
