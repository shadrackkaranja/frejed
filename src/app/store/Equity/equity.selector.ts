import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EquityState } from './equity.reducer'; 

export const selectDataState = createFeatureSelector<EquityState>('equity');

export const selectData = createSelector(
    selectDataState,
    (state: EquityState) => state.equityList
);
export const selectDataLoading = createSelector(
    selectDataState,
    (state: EquityState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: EquityState) => state.error
);
