import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CashEquivalentState } from './cash-equivalent.reducer'; 

export const selectDataState = createFeatureSelector<CashEquivalentState>('cashequivalent');

export const selectData = createSelector(
    selectDataState,
    (state: CashEquivalentState) => state.cashEquivalentList
);
export const selectDataLoading = createSelector(
    selectDataState,
    (state: CashEquivalentState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: CashEquivalentState) => state.error
);
