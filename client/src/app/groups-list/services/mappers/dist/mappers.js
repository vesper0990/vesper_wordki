"use strict";
exports.__esModule = true;
exports.mapToGroup = void 0;
var group_model_1 = require("../../models/group.model");
var language_type_mode_1 = require("src/app/share/models/language-type.mode");
function mapToGroup(dto) {
    return new group_model_1.Group(dto.id, dto.name, language_type_mode_1.LanguageType.getLanguageType(dto.language1), language_type_mode_1.LanguageType.getLanguageType(dto.language2), dto.cardsCount, dto.visibleWordsCount, dto.repeatsCount, dto.averageDrawer);
}
exports.mapToGroup = mapToGroup;
