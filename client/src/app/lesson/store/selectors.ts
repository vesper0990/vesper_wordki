import { setTestabilityGetter } from '@angular/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LessonState } from './state';

export const selectLessonState = createFeatureSelector<LessonState>('lessonState');

export const selectCurrentCard = createSelector(selectLessonState, (state: LessonState) => state.words[0]);
export const selectLessonStep = createSelector(selectLessonState, (state: LessonState) => state.lessonStep);
export const selectLessonResult = createSelector(selectLessonState, (state: LessonState) => state.result);
export const selectLessonId = createSelector(selectLessonState, (state: LessonState) => state.lessonId);
