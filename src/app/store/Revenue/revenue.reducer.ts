import { Action, createReducer, on } from '@ngrx/store';
import { addrevenueListSuccess, deleterevenueListSuccess, fetchrevenueList, fetchrevenueListFailure, fetchrevenueListSuccess, updaterevenueListSuccess } from './revenue.action';

export interface RevenueState {
    revenueList: any[];
    loading: boolean;
    error: any;
}

export const initialState: RevenueState = {
    revenueList: [],
    loading: false,
    error: null
};

export const RevenueReducer = createReducer(
    initialState,
    on(fetchrevenueList, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchrevenueListSuccess, (state, { revenueList }) => {
        return { ...state, revenueList, loading: false };
    }),
    on(fetchrevenueListFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(addrevenueListSuccess, (state, { newData }) => {
        return { ...state, revenueList: [newData, ...state.revenueList], error: null };

    }),
    on(updaterevenueListSuccess, (state, { updatedData }) => {
        return { ...state, revenuedata: state.revenueList.map((revenueList) => revenueList.id === updatedData.id ? updatedData : revenueList), error: null };
    }),

    on(deleterevenueListSuccess, (state, { id }) => {
        const updatedlist = state.revenueList.filter((revenueList) => !id.includes(revenueList.id));
        return { ...state, revenueList: updatedlist, error: null };
    }),
)

// Selector
export function reducer(state: RevenueState | undefined, action: Action) {
    return RevenueReducer(state, action);
}