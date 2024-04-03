import { Action, createReducer, on } from '@ngrx/store';
import { fetchorderData, fetchorderFailure, fetchorderSuccess } from '../Ecommerce/ecommerce.actions';
import { addRecievablesDataSuccess, deleteRecievablesSuccess, fetchRecievablesSuccess, updateRecievablesDataSuccess } from './recievables.action';

export interface RecievablesState {
    Recievablesdata: any[];
    loading: boolean;
    error: any;
}

export const initialState: RecievablesState = {
    Recievablesdata: [],
    loading: false,
    error: null
};

export const RecievablesReducer = createReducer(

    initialState,
    on(fetchorderData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchRecievablesSuccess, (state, { Recievablesdata }) => {
        return { ...state, Recievablesdata, loading: false };
    }),
    on(fetchorderFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),
    on(addRecievablesDataSuccess, (state, { newData }) => {
        return { ...state, Recievablesdata: [newData, ...state.Recievablesdata], error: null };
    }),
    on(updateRecievablesDataSuccess, (state, { updatedData }) => {
        return { ...state, Recievablesdata: state.Recievablesdata.map((Recievablesdata) => Recievablesdata.id === updatedData.id ? updatedData : Recievablesdata), error: null };
    }),

    on(deleteRecievablesSuccess, (state, { id }) => {
        const updatedlist = state.Recievablesdata.filter((Recievablesdata) => !id.includes(Recievablesdata.id));
        return { ...state, Recievablesdata: updatedlist, error: null };
    }),

)

// Selector
export function reducer(state: RecievablesState | undefined, action: Action) {
    return RecievablesReducer(state, action);
}