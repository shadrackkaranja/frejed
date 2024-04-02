import { Action, createReducer, on } from '@ngrx/store';
import { addpayablesListSuccess, deletepayablesListSuccess, fetchpayablesList, fetchpayablesListFailure, fetchpayablesListSuccess, updatepayablesListSuccess } from './payables.action';

export interface PayablesState {
    payablesList: any[];
    loading: boolean;
    error: any;
}

export const initialState: PayablesState = {
    payablesList: [],
    loading: false,
    error: null
};

export const PayablesReducer = createReducer(
    initialState,
    on(fetchpayablesList, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchpayablesListSuccess, (state, { payablesList }) => {
        return { ...state, payablesList, loading: false };
    }),
    on(fetchpayablesListFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(addpayablesListSuccess, (state, { newData }) => {
        return { ...state, payablesList: [newData, ...state.payablesList], error: null };

    }),
    on(updatepayablesListSuccess, (state, { updatedData }) => {
        return { ...state, payablesdata: state.payablesList.map((payablesList) => payablesList.id === updatedData.id ? updatedData : payablesList), error: null };
    }),

    on(deletepayablesListSuccess, (state, { id }) => {
        const updatedlist = state.payablesList.filter((payablesList) => !id.includes(payablesList.id));
        return { ...state, payablesList: updatedlist, error: null };
    }),
)

// Selector
export function reducer(state: PayablesState | undefined, action: Action) {
    return PayablesReducer(state, action);
}