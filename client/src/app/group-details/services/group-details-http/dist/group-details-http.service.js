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
exports.GroupDetailsHttpMock = exports.GroupDetailsHttp = exports.GroupDetailsHttpBase = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var GroupDetailsHttpBase = /** @class */ (function () {
    function GroupDetailsHttpBase() {
    }
    GroupDetailsHttpBase = __decorate([
        core_1.Injectable()
    ], GroupDetailsHttpBase);
    return GroupDetailsHttpBase;
}());
exports.GroupDetailsHttpBase = GroupDetailsHttpBase;
var GroupDetailsHttp = /** @class */ (function (_super) {
    __extends(GroupDetailsHttp, _super);
    function GroupDetailsHttp(http, groupMapper, wordMapper) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.groupMapper = groupMapper;
        _this.wordMapper = wordMapper;
        return _this;
    }
    GroupDetailsHttp.prototype.getGroupDetails = function (groupId) {
        var _this = this;
        return this.http.get(environment_1.environment.apiUrl + "/group/details/" + groupId).pipe(operators_1.map(function (dto) { return _this.groupMapper.map(dto); }));
    };
    GroupDetailsHttp.prototype.getWords = function (groupId) {
        var _this = this;
        return this.http.get(environment_1.environment.apiUrl + "/card/all/" + groupId).pipe(operators_1.map(function (dtos) {
            var arr = [];
            dtos.forEach(function (dto) { return arr.push(_this.wordMapper.map(dto)); });
            return arr;
        }));
    };
    GroupDetailsHttp.prototype.updateWord = function (editWord) {
        var body = {
            id: editWord.wordId,
            groupId: editWord.groupId,
            heads: {
                value: editWord.language1,
                example: editWord.example1
            },
            tails: {
                value: editWord.language2,
                example: editWord.example2
            },
            comment: editWord.comment,
            isVisible: editWord.isVisible
        };
        return this.http.put(environment_1.environment.apiUrl + "/card/update", body);
    };
    GroupDetailsHttp.prototype.addWord = function (editword) {
        var body = {
            groupId: editword.groupId,
            heads: {
                value: editword.language1,
                example: editword.example1
            },
            tails: {
                value: editword.language2,
                example: editword.example2
            },
            comment: editword.comment,
            isVisible: editword.isVisible
        };
        console.log(editword, body);
        return this.http.post(environment_1.environment.apiUrl + "/card/add", body);
    };
    GroupDetailsHttp.prototype.removeWord = function (groupId, wordId) {
        return this.http["delete"](environment_1.environment.apiUrl + "/card/delete/" + wordId);
    };
    GroupDetailsHttp.prototype.addGroup = function (group) {
        return this.http.post(environment_1.environment.apiUrl + "/group/add", group);
    };
    GroupDetailsHttp.prototype.changeGroupVisibility = function (groupId) {
        var request = {
            id: groupId,
            isAddedToLessons: true
        };
        return this.http.put(environment_1.environment.apiUrl + "/changeGroupVisibility", request);
    };
    GroupDetailsHttp = __decorate([
        core_1.Injectable()
    ], GroupDetailsHttp);
    return GroupDetailsHttp;
}(GroupDetailsHttpBase));
exports.GroupDetailsHttp = GroupDetailsHttp;
var GroupDetailsHttpMock = /** @class */ (function (_super) {
    __extends(GroupDetailsHttpMock, _super);
    function GroupDetailsHttpMock(groupMapper, wordMapper) {
        var _this = _super.call(this) || this;
        _this.groupMapper = groupMapper;
        _this.wordMapper = wordMapper;
        return _this;
    }
    GroupDetailsHttpMock.prototype.getGroupDetails = function (groupId) {
        var _this = this;
        var groupDetailsDto = {
            id: groupId,
            name: "group " + groupId,
            language1: 1,
            language2: 2
        };
        return rxjs_1.of(groupDetailsDto).pipe(operators_1.map(function (dto) { return _this.groupMapper.map(dto); }), operators_1.delay(500));
    };
    GroupDetailsHttpMock.prototype.getWords = function (groupId) {
        var _this = this;
        var arr = [];
        for (var i = 1; i < 10; i++) {
            var repeats = [];
            for (var j = 0; j < 5; j++) {
                var now = new Date();
                now.setDate(now.getDate() - 3);
                repeats.push({
                    result: 1,
                    date: now.toString()
                });
            }
            // arr.push({
            //     id: i,
            //     language1: `word ${i}`,
            //     language2: `słowo ${i}`,
            //     example1: 'to ejst jakis przyklad ktory ma byc poprawnie wyswietlony na stronie',
            //     example2: 'to ejst jakis przyklad ktory ma byc poprawnie wyswietlony na stronie',
            //     drawer: 5 % i,
            //     isVisible: true,
            //     nextRepeat: new Date().toString(),
            //     repeats: repeats
            // });
        }
        return rxjs_1.of(arr).pipe(operators_1.map(function (dtos) {
            var arr2 = [];
            dtos.forEach(function (dto) { return arr2.push(_this.wordMapper.map(dto)); });
            return arr2;
        }), operators_1.delay(500));
    };
    GroupDetailsHttpMock.prototype.updateWord = function (word) {
        return rxjs_1.of({});
    };
    GroupDetailsHttpMock.prototype.addWord = function (editword) {
        console.log('mock');
        return rxjs_1.of({});
    };
    GroupDetailsHttpMock.prototype.removeWord = function (groupId, wordId) {
        return rxjs_1.of({});
    };
    GroupDetailsHttpMock.prototype.addGroup = function (group) {
        return rxjs_1.of({});
    };
    GroupDetailsHttpMock.prototype.changeGroupVisibility = function (groupId) {
        return rxjs_1.of({});
    };
    GroupDetailsHttpMock = __decorate([
        core_1.Injectable()
    ], GroupDetailsHttpMock);
    return GroupDetailsHttpMock;
}(GroupDetailsHttpBase));
exports.GroupDetailsHttpMock = GroupDetailsHttpMock;
