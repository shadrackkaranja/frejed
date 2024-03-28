import { Action, createReducer, on } from '@ngrx/store';
import { addcashEquivalentListSuccess, deletecashEquivalentListSuccess, fetchcashEquivalentList, fetchcashEquivalentListFailure, fetchcashEquivalentListSuccess, updatecashEquivalentListSuccess } from './cash-equivalent.action';

export interface CashEquivalentState {
    cashEquivalentList: any[];
    loading: boolean;
    error: any;
}

export const initialState: CashEquivalentState = {
    cashEquivalentList: [],
    loading: false,
    error: null
};

export const CashEquivalentReducer = createReducer(
    initialState,
    on(fetchcashEquivalentList, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchcashEquivalentListSuccess, (state, { cashEquivalentList }) => {
        return { ...state, cashEquivalentList, loading: false };
    }),
    on(fetchcashEquivalentListFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(addcashEquivalentListSuccess, (state, { newData }) => {
        return { ...state, cashEquivalentList: [newData, ...state.cashEquivalentList], error: null };

    }),
    on(updatecashEquivalentListSuccess, (state, { updatedData }) => {
        return { ...state, cashEquivalentdata: state.cashEquivalentList.map((cashEquivalentList) => cashEquivalentList.id === updatedData.id ? updatedData : cashEquivalentList), error: null };
    }),

    on(deletecashEquivalentListSuccess, (state, { id }) => {
        const updatedlist = state.cashEquivalentList.filter((cashEquivalentList) => !id.includes(cashEquivalentList.id));
        return { ...state, cashEquivalentList: updatedlist, error: null };
    }),
)

// Selector
export function reducer(state: CashEquivalentState | undefined, action: Action) {
    return CashEquivalentReducer(state, action);
}