"use strict";
exports.__esModule = true;
exports.selectLessonId = exports.selectLessonResult = exports.selectLessonStep = exports.selectCurrentCard = exports.selectLessonState = void 0;
var store_1 = require("@ngrx/store");
exports.selectLessonState = store_1.createFeatureSelector('lessonState');
exports.selectCurrentCard = store_1.createSelector(exports.selectLessonState, function (state) { return state.words[0]; });
exports.selectLessonStep = store_1.createSelector(exports.selectLessonState, function (state) { return state.lessonStep; });
exports.selectLessonResult = store_1.createSelector(exports.selectLessonState, function (state) { return state.result; });
exports.selectLessonId = store_1.createSelector(exports.selectLessonState, function (state) { return state.lessonId; });
