import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PayablesState } from './payables.reducer'; 

export const selectDataState = createFeatureSelector<PayablesState>('payables');

export const selectData = createSelector(
    selectDataState,
    (state: PayablesState) => state.payablesList
);
export const selectDataLoading = createSelector(
    selectDataState,
    (state: PayablesState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: PayablesState) => state.error
);
