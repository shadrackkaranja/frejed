import { Action, createReducer, on } from '@ngrx/store';
import { addtaxationListSuccess, deletetaxationListSuccess, fetchtaxationList, fetchtaxationListFailure, fetchtaxationListSuccess, updatetaxationListSuccess } from './taxation.action';

export interface TaxationState {
    taxationList: any[];
    loading: boolean;
    error: any;
}

export const initialState: TaxationState = {
    taxationList: [],
    loading: false,
    error: null
};

export const TaxationReducer = createReducer(
    initialState,
    on(fetchtaxationList, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchtaxationListSuccess, (state, { taxationList }) => {
        return { ...state, taxationList, loading: false };
    }),
    on(fetchtaxationListFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(addtaxationListSuccess, (state, { newData }) => {
        return { ...state, taxationList: [newData, ...state.taxationList], error: null };

    }),
    on(updatetaxationListSuccess, (state, { updatedData }) => {
        return { ...state, taxationdata: state.taxationList.map((taxationList) => taxationList.id === updatedData.id ? updatedData : taxationList), error: null };
    }),

    on(deletetaxationListSuccess, (state, { id }) => {
        const updatedlist = state.taxationList.filter((taxationList) => !id.includes(taxationList.id));
        return { ...state, taxationList: updatedlist, error: null };
    }),
)

// Selector
export function reducer(state: TaxationState | undefined, action: Action) {
    return TaxationReducer(state, action);
}