"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FiszkaComponent = void 0;
var core_1 = require("@angular/core");
var fiszka_service_1 = require("./services/fiszka/fiszka.service");
var FiszkaComponent = /** @class */ (function () {
    function FiszkaComponent(service) {
        this.service = service;
        this.arrowLeft = 'ArrowLeft';
        this.arrowRight = 'ArrowRight';
        this.enter = 'Enter';
    }
    FiszkaComponent.prototype.ngOnInit = function () {
        this.service.loadWords();
        this.currentCard$ = this.service.getCurrentCard();
        this.lessonStep$ = this.service.getLessonStep();
        this.service.init();
    };
    FiszkaComponent.prototype.ngOnDestroy = function () {
        this.service.unsubsccribe();
    };
    FiszkaComponent.prototype.keyEvent = function (event) {
        switch (event.key) {
            case this.arrowRight:
                this.correct();
                break;
            case this.arrowLeft:
                this.wrong();
                break;
            case this.enter:
                this.check();
                break;
        }
    };
    FiszkaComponent.prototype.startLesson = function () {
        this.service.startLesson();
    };
    FiszkaComponent.prototype.check = function () {
        this.service.check();
    };
    FiszkaComponent.prototype.correct = function () {
        this.service.correct();
    };
    FiszkaComponent.prototype.wrong = function () {
        this.service.wrong();
    };
    FiszkaComponent.prototype.finishLesson = function () {
        this.service.finishLesson();
    };
    FiszkaComponent.prototype.pause = function () {
        this.service.pause();
    };
    FiszkaComponent.prototype.restart = function () {
        this.service.restart();
    };
    __decorate([
        core_1.HostListener('window:keyup', ['$event'])
    ], FiszkaComponent.prototype, "keyEvent");
    FiszkaComponent = __decorate([
        core_1.Component({
            templateUrl: './fiszka.component.html',
            styleUrls: ['./fiszka.component.scss'],
            providers: [fiszka_service_1.FiszkaService]
        })
    ], FiszkaComponent);
    return FiszkaComponent;
}());
exports.FiszkaComponent = FiszkaComponent;
