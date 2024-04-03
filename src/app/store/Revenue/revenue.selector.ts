import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RevenueState } from './revenue.reducer'; 

export const selectDataState = createFeatureSelector<RevenueState>('revenue');

export const selectData = createSelector(
    selectDataState,
    (state: RevenueState) => state.revenueList
);
export const selectDataLoading = createSelector(
    selectDataState,
    (state: RevenueState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: RevenueState) => state.error
);
