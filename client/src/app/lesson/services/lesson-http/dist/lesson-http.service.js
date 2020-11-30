"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LessonHttpMockService = exports.LessonHttpService = exports.LessonHttpBaseService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var environment_1 = require("src/environments/environment");
var operators_1 = require("rxjs/operators");
var LessonHttpBaseService = /** @class */ (function () {
    function LessonHttpBaseService() {
    }
    LessonHttpBaseService = __decorate([
        core_1.Injectable()
    ], LessonHttpBaseService);
    return LessonHttpBaseService;
}());
exports.LessonHttpBaseService = LessonHttpBaseService;
var LessonHttpService = /** @class */ (function (_super) {
    __extends(LessonHttpService, _super);
    function LessonHttpService(http, mapper) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.mapper = mapper;
        return _this;
    }
    LessonHttpService.prototype.createLesson = function () {
        console.log('createLesson');
        return this.http.post(environment_1.environment.apiUrl + "/lesson/start", null);
    };
    LessonHttpService.prototype.correct = function (cardId, lessonId, questionSide) {
        var body = {
            lessonId: lessonId,
            cardId: cardId,
            questionSide: 'Heads',
            repeatReuslt: 'Correct'
        };
        return this.http.post(environment_1.environment.apiUrl + "/lesson/answer", body);
    };
    LessonHttpService.prototype.wrong = function (cardId, lessonId, questionSide) {
        var body = {
            lessonId: lessonId,
            cardId: cardId,
            questionSide: 'Heads',
            repeatReuslt: 'Wrong'
        };
        return this.http.post(environment_1.environment.apiUrl + "/lesson/answer", body);
    };
    LessonHttpService.prototype.getWordsFromGroup = function (groupId) {
        throw new Error('Method not implemented.');
    };
    LessonHttpService.prototype.sendWord = function (wordId, result) {
        var body = {
            wordid: wordId,
            result: result
        };
        return this.http.post(environment_1.environment.apiUrl + "/AddRepeat", body);
    };
    LessonHttpService.prototype.getNextWord = function (count, offset) {
        var _this = this;
        return this.http.get(environment_1.environment.apiUrl + "/GetNextWords/" + count + "/" + offset).pipe(operators_1.map(function (dtos) {
            var arr = [];
            dtos.forEach(function (dto) { return arr.push(_this.mapper.map(dto)); });
            return arr;
        }));
    };
    LessonHttpService.prototype.getWordForLesson = function (count, offset, question, answer) {
        var _this = this;
        return this.http.get(environment_1.environment.apiUrl + "/GetNextWords/" + count + "/" + offset + "/" + question + "/" + answer).pipe(operators_1.map(function (dtos) {
            var arr = [];
            dtos.forEach(function (dto) { return arr.push(_this.mapper.map(dto)); });
            return arr;
        }));
    };
    LessonHttpService.prototype.getTodayWords = function () {
        return this.http.get(environment_1.environment.apiUrl + "/card/allRepeats");
    };
    LessonHttpService.prototype.finish = function (lessonId) {
        var body = {
            lessonId: lessonId
        };
        return this.http.put(environment_1.environment.apiUrl + "/lesson/finish", body);
    };
    LessonHttpService = __decorate([
        core_1.Injectable()
    ], LessonHttpService);
    return LessonHttpService;
}(LessonHttpBaseService));
exports.LessonHttpService = LessonHttpService;
var LessonHttpMockService = /** @class */ (function (_super) {
    __extends(LessonHttpMockService, _super);
    function LessonHttpMockService(mapper) {
        var _this = _super.call(this) || this;
        _this.mapper = mapper;
        return _this;
    }
    LessonHttpMockService_1 = LessonHttpMockService;
    LessonHttpMockService.prototype.finish = function (lessonId) {
        return rxjs_1.of({});
    };
    LessonHttpMockService.prototype.createLesson = function () {
        return rxjs_1.of(1);
    };
    LessonHttpMockService.prototype.correct = function (cardId) {
        return rxjs_1.of({}).pipe(operators_1.delay(2000), operators_1.tap(function () { return console.log('http correct ' + cardId); }));
    };
    LessonHttpMockService.prototype.wrong = function (cardId) {
        return rxjs_1.of({}).pipe(operators_1.delay(2000), operators_1.tap(function () { return console.log('http wrong ' + cardId); }));
    };
    LessonHttpMockService.prototype.getNextWord = function (count, offset) {
        var _this = this;
        var result = [];
        while (result.length < count) {
            var i = LessonHttpMockService_1.index;
            result.push({
                id: i,
                language1: "word " + i,
                language2: "s\u0142owo " + i,
                drawer: 1
            });
            LessonHttpMockService_1.index++;
        }
        return rxjs_1.of(result).pipe(operators_1.map(function (dtos) {
            var arr = [];
            dtos.forEach(function (dto) { return arr.push(_this.mapper.map(dto)); });
            return arr;
        }));
    };
    LessonHttpMockService.prototype.getWordForLesson = function (count, offset, question, answer) {
        var _this = this;
        var result = [];
        while (result.length < count) {
            var i = LessonHttpMockService_1.index;
            result.push({
                id: i,
                language1: "word " + i,
                language2: "s\u0142owo " + i,
                drawer: 1
            });
            LessonHttpMockService_1.index++;
        }
        return rxjs_1.of(result).pipe(operators_1.map(function (dtos) {
            var arr = [];
            dtos.forEach(function (dto) { return arr.push(_this.mapper.map(dto)); });
            return arr;
        }));
    };
    LessonHttpMockService.prototype.getTodayWords = function () {
        return rxjs_1.of([]);
    };
    LessonHttpMockService.prototype.getWordsFromGroup = function (groupId) {
        var result = [];
        while (result.length < 3) {
            var i = LessonHttpMockService_1.index;
            result.push({
                id: i,
                language1: "word " + i,
                language2: "s\u0142owo " + i,
                drawer: 1
            });
            LessonHttpMockService_1.index++;
        }
        return rxjs_1.of(result);
    };
    LessonHttpMockService.prototype.sendWord = function (wordId, result) {
        return rxjs_1.of({});
    };
    var LessonHttpMockService_1;
    LessonHttpMockService.index = 1;
    LessonHttpMockService = LessonHttpMockService_1 = __decorate([
        core_1.Injectable()
    ], LessonHttpMockService);
    return LessonHttpMockService;
}(LessonHttpBaseService));
exports.LessonHttpMockService = LessonHttpMockService;
