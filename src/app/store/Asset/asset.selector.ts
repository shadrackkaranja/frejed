import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AssetState } from './asset.reducer'; 

export const selectDataState = createFeatureSelector<AssetState>('asset');

export const selectData = createSelector(
    selectDataState,
    (state: AssetState) => state.assetList
);
export const selectDataLoading = createSelector(
    selectDataState,
    (state: AssetState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: AssetState) => state.error
);
