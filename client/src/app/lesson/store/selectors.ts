import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LessonState } from './state';

export const selectLessonState = createFeatureSelector<LessonState>('lessonState');

export const selectCurrentCard = createSelector(selectLessonState, (state: LessonState) => state.words[0]);
export const selectCardsCount = createSelector(selectLessonState, (state: LessonState) => state.words.length);
export const selectLessonStep = createSelector(selectLessonState, (state: LessonState) => state.lessonStep);
export const selectLessonResult = createSelector(selectLessonState, (state: LessonState) => state.result);
export const selectLessonId = createSelector(selectLessonState, (state: LessonState) => state.lessonId);
export const selectComparisonResult = createSelector(selectLessonState, (state: LessonState) => state.comparisonResult);

export const selectCorrect = createSelector(selectLessonState, (state: LessonState) => state.result?.correct ?? 0);
export const selectAccepted = createSelector(selectLessonState, (state: LessonState) => state.result?.accepted ?? 0);
export const selectWrong = createSelector(selectLessonState, (state: LessonState) => state.result?.wrong ?? 0);
