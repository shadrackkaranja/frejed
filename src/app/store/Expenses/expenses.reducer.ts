import { Action, createReducer, on } from '@ngrx/store';
import { addexpensesListSuccess, deleteexpensesListSuccess, fetchexpensesList, fetchexpensesListFailure, fetchexpensesListSuccess, updateexpensesListSuccess } from './expenses.action';

export interface ExpensesState {
    expensesList: any[];
    loading: boolean;
    error: any;
}

export const initialState: ExpensesState = {
    expensesList: [],
    loading: false,
    error: null
};

export const ExpensesReducer = createReducer(
    initialState,
    on(fetchexpensesList, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchexpensesListSuccess, (state, { expensesList }) => {
        return { ...state, expensesList, loading: false };
    }),
    on(fetchexpensesListFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(addexpensesListSuccess, (state, { newData }) => {
        return { ...state, expensesList: [newData, ...state.expensesList], error: null };

    }),
    on(updateexpensesListSuccess, (state, { updatedData }) => {
        return { ...state, expensesdata: state.expensesList.map((expensesList) => expensesList.id === updatedData.id ? updatedData : expensesList), error: null };
    }),

    on(deleteexpensesListSuccess, (state, { id }) => {
        const updatedlist = state.expensesList.filter((expensesList) => !id.includes(expensesList.id));
        return { ...state, expensesList: updatedlist, error: null };
    }),
)

// Selector
export function reducer(state: ExpensesState | undefined, action: Action) {
    return ExpensesReducer(state, action);
}