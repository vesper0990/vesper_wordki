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
exports.GroupsListHttpMockService = exports.GroupsListHttpService = exports.GroupsListHttpServiceBase = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var mappers_1 = require("../mappers/mappers");
var GroupsListHttpServiceBase = /** @class */ (function () {
    function GroupsListHttpServiceBase() {
    }
    GroupsListHttpServiceBase = __decorate([
        core_1.Injectable()
    ], GroupsListHttpServiceBase);
    return GroupsListHttpServiceBase;
}());
exports.GroupsListHttpServiceBase = GroupsListHttpServiceBase;
var GroupsListHttpService = /** @class */ (function (_super) {
    __extends(GroupsListHttpService, _super);
    function GroupsListHttpService(client) {
        var _this = _super.call(this) || this;
        _this.client = client;
        return _this;
    }
    GroupsListHttpService.prototype.updateGroup = function (group) {
        return this.client.put(environment_1.environment.apiUrl + "/group/update", group);
    };
    GroupsListHttpService.prototype.addGroup = function (editGroup) {
        return this.client.post(environment_1.environment.apiUrl + "/group/add", editGroup);
    };
    GroupsListHttpService.prototype.getGroups = function () {
        return this.client.get(environment_1.environment.apiUrl + "/group/all").pipe(operators_1.map(function (dtos) {
            var result = [];
            dtos.forEach(function (dto) {
                result.push(mappers_1.mapToGroup(dto));
            });
            return result;
        }));
    };
    GroupsListHttpService.prototype.removeGroup = function (groupId) {
        return this.client["delete"](environment_1.environment.apiUrl + "/group/delete/" + groupId);
    };
    GroupsListHttpService = __decorate([
        core_1.Injectable()
    ], GroupsListHttpService);
    return GroupsListHttpService;
}(GroupsListHttpServiceBase));
exports.GroupsListHttpService = GroupsListHttpService;
var GroupsListHttpMockService = /** @class */ (function (_super) {
    __extends(GroupsListHttpMockService, _super);
    function GroupsListHttpMockService() {
        return _super.call(this) || this;
    }
    GroupsListHttpMockService.prototype.addGroup = function (editGroup) {
        return rxjs_1.of(1);
    };
    GroupsListHttpMockService.prototype.getGroups = function () {
        var groups = [];
        for (var i = 1; i < 100; i++) {
            groups.push({
                id: i,
                name: "group " + i,
                language1: 1,
                language2: 2,
                cardsCount: 30 % i,
                repeatsCount: 30 % i,
                visibleWordsCount: 30 % i,
                averageDrawer: 5 % i
            });
        }
        return rxjs_1.of(groups)
            .pipe(operators_1.map(function (dtos) {
            var result = [];
            dtos.forEach(function (dto) {
                result.push(mappers_1.mapToGroup(dto));
            });
            return result;
        })).pipe(operators_1.delay(500));
    };
    GroupsListHttpMockService.prototype.updateGroup = function (group) {
        return rxjs_1.of({});
    };
    GroupsListHttpMockService.prototype.removeGroup = function (groupId) {
        return rxjs_1.of({});
    };
    GroupsListHttpMockService = __decorate([
        core_1.Injectable()
    ], GroupsListHttpMockService);
    return GroupsListHttpMockService;
}(GroupsListHttpServiceBase));
exports.GroupsListHttpMockService = GroupsListHttpMockService;
