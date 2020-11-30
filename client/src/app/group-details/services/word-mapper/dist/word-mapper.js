"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WordMapper = void 0;
var core_1 = require("@angular/core");
var word_model_1 = require("../../models/word.model");
var WordMapper = /** @class */ (function () {
    function WordMapper() {
    }
    WordMapper.prototype.map = function (dto) {
        var word = new word_model_1.Word(dto.id, dto.word1.value, dto.word2.value, dto.word1.example, dto.word2.example, dto.word1.drawer, true, new Date());
        return word;
    };
    WordMapper = __decorate([
        core_1.Injectable()
    ], WordMapper);
    return WordMapper;
}());
exports.WordMapper = WordMapper;
