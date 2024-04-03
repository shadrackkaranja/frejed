import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecievablesState } from './recievables.reducer';

export const selectDataState = createFeatureSelector<RecievablesState>('Recievableslist');

export const selectData = createSelector(
    selectDataState,
    (state: RecievablesState) => state.Recievablesdata
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: RecievablesState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: RecievablesState) => state.error
);

