import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaxationState } from './taxation.reducer'; 

export const selectDataState = createFeatureSelector<TaxationState>('taxation');

export const selectData = createSelector(
    selectDataState,
    (state: TaxationState) => state.taxationList
);
export const selectDataLoading = createSelector(
    selectDataState,
    (state: TaxationState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: TaxationState) => state.error
);
