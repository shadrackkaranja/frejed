import { Action, createReducer, on } from '@ngrx/store';
import { addemploymentCostListSuccess, deleteemploymentCostListSuccess, fetchemploymentCostList, fetchemploymentCostListFailure, fetchemploymentCostListSuccess, updateemploymentCostListSuccess } from './employment-cost.action';

export interface EmploymentCostState {
    employmentCostList: any[];
    loading: boolean;
    error: any;
}

export const initialState: EmploymentCostState = {
    employmentCostList: [],
    loading: false,
    error: null
};

export const EmploymentCostReducer = createReducer(
    initialState,
    on(fetchemploymentCostList, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchemploymentCostListSuccess, (state, { employmentCostList }) => {
        return { ...state, employmentCostList, loading: false };
    }),
    on(fetchemploymentCostListFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(addemploymentCostListSuccess, (state, { newData }) => {
        return { ...state, employmentCostList: [newData, ...state.employmentCostList], error: null };

    }),
    on(updateemploymentCostListSuccess, (state, { updatedData }) => {
        return { ...state, emplymentCostdata: state.employmentCostList.map((employmentCostList) => employmentCostList.id === updatedData.id ? updatedData : employmentCostList), error: null };
    }),

    on(deleteemploymentCostListSuccess, (state, { id }) => {
        const updatedlist = state.employmentCostList.filter((employmentCostList) => !id.includes(employmentCostList.id));
        return { ...state, employmentCostList: updatedlist, error: null };
    }),
)

// Selector
export function reducer(state: EmploymentCostState | undefined, action: Action) {
    return EmploymentCostReducer(state, action);
}