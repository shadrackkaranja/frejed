import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExpensesState } from './expenses.reducer'; 

export const selectDataState = createFeatureSelector<ExpensesState>('expenses');

export const selectData = createSelector(
    selectDataState,
    (state: ExpensesState) => state.expensesList
);
export const selectDataLoading = createSelector(
    selectDataState,
    (state: ExpensesState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: ExpensesState) => state.error
);
