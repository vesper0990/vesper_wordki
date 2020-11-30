"use strict";
exports.__esModule = true;
exports.Group = void 0;
var Group = /** @class */ (function () {
    function Group(id, name, language1, language2, cardsCount, visibleWordsCount, repeatsCount, averageDrawer) {
        this.id = id;
        this.name = name;
        this.language1 = language1;
        this.language2 = language2;
        this.cardsCount = cardsCount;
        this.visibleWordsCount = visibleWordsCount;
        this.repeatsCount = repeatsCount;
        this.averageDrawer = averageDrawer;
    }
    return Group;
}());
exports.Group = Group;
