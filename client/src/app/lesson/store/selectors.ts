import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LessonType } from 'src/app/share/models/card-details';
import { LessonSource, LessonSourceType } from '../models/lesson-source';
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

export const selectLessonSettings = createSelector(selectLessonState, (state: LessonState) => state.lessonSettings);
export const selectSettingsSubmitDisabled = createSelector(selectLessonState, (state: LessonState) =>
    state.lessonSettings.lessonSize < 1 ||
    state.lessonSettings.lessonSize > 100 ||
    state.lessonSettings.lessonSource === LessonSource.DEFAULT ||
    state.lessonSettings.lessonType === LessonType.DEFAULT ||
    state.lessonSettings.lessonLanguages.length === 0
);

export const selectMaxCardsCount = createSelector(selectLessonState, (state: LessonState) => {
    switch (state.lessonSettings.lessonSource.type) {
        case LessonSourceType.Default: return 0;
        case LessonSourceType.NewWords: return state.lessonOptions.newCardsCount;
        case LessonSourceType.Repetition: return state.lessonOptions.repetitionsCount;
        default: return 0;
    }
});

export const selectLanguages = createSelector(selectLessonState, (state: LessonState) => state.lessonOptions.languages);
export const selectSelectedLanguages = createSelector(selectLessonState, (state: LessonState) => state.lessonSettings.lessonLanguages);
