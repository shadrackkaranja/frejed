import { Action, createReducer, on } from '@ngrx/store';
import { addequityListSuccess, deleteequityListSuccess, fetchequityList, fetchequityListFailure, fetchequityListSuccess, updateequityListSuccess } from './equity.action';

export interface EquityState {
    equityList: any[];
    loading: boolean;
    error: any;
}

export const initialState: EquityState = {
    equityList: [],
    loading: false,
    error: null
};

export const EquityReducer = createReducer(
    initialState,
    on(fetchequityList, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchequityListSuccess, (state, { equityList }) => {
        return { ...state, equityList, loading: false };
    }),
    on(fetchequityListFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(addequityListSuccess, (state, { newData }) => {
        return { ...state, equityList: [newData, ...state.equityList], error: null };

    }),
    on(updateequityListSuccess, (state, { updatedData }) => {
        return { ...state, equitydata: state.equityList.map((equityList) => equityList.id === updatedData.id ? updatedData : equityList), error: null };
    }),

    on(deleteequityListSuccess, (state, { id }) => {
        const updatedlist = state.equityList.filter((equityList) => !id.includes(equityList.id));
        return { ...state, equityList: updatedlist, error: null };
    }),
)

// Selector
export function reducer(state: EquityState | undefined, action: Action) {
    return EquityReducer(state, action);
}