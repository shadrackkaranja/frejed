import { Action, createReducer, on } from '@ngrx/store';
import { addassetsListSuccess, deleteassetsListSuccess, fetchassetsList, fetchassetsListFailure, fetchassetsListSuccess, updateassetsListSuccess } from './asset.action';

export interface AssetState {
    assetList: any[];
    loading: boolean;
    error: any;
}

export const initialState: AssetState = {
    assetList: [],
    loading: false,
    error: null
};

export const AssetReducer = createReducer(
    initialState,
    on(fetchassetsList, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchassetsListSuccess, (state, { assetList }) => {
        return { ...state, assetList, loading: false };
    }),
    on(fetchassetsListFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(addassetsListSuccess, (state, { newData }) => {
        return { ...state, assetList: [newData, ...state.assetList], error: null };

    }),
    on(updateassetsListSuccess, (state, { updatedData }) => {
        return { ...state, assetsdata: state.assetList.map((assetList) => assetList.id === updatedData.id ? updatedData : assetList), error: null };
    }),

    on(deleteassetsListSuccess, (state, { id }) => {
        const updatedlist = state.assetList.filter((assetList) => !id.includes(assetList.id));
        return { ...state, assetList: updatedlist, error: null };
    }),
)

// Selector
export function reducer(state: AssetState | undefined, action: Action) {
    return AssetReducer(state, action);
}