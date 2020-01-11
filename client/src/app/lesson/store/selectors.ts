import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LessonState } from './reducer';

export const getLessonState = createFeatureSelector<LessonState>('lessonStore');

export const getFirstWord = createSelector(getLessonState, (state: LessonState) => state.words[0]);

export const getLessonStateEnum = createSelector(getLessonState, (state: LessonState) => state.lessonState);
