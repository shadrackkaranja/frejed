import { createAction, props } from '@ngrx/store';
import { assetModel } from './asset.model';

export const fetchassetsList = createAction('[Data] Fetch Assets List');
export const fetchassetsListSuccess = createAction('[Data] Fetch Assets List Success', props<{ assetList: assetModel[] }>());
export const fetchassetsListFailure = createAction('[Data] Fetch Assets List Failure', props<{ error: string }>());


// Add Data
export const addassetsList = createAction(
    '[Data] Add assetsList',
    props<{ newData: assetModel }>()
);
export const addassetsListSuccess = createAction(
    '[Data] Add assetsList Success',
    props<{ newData: assetModel }>()
);
export const addassetsListFailure = createAction(
    '[Data] Add assetsList Failure',
    props<{ error: string }>()
);

// Update Data
export const updateassetsList = createAction(
    '[Data] Update assetsList',
    props<{ updatedData: assetModel }>()
);
export const updateassetsListSuccess = createAction(
    '[Data] Update assetsList Success',
    props<{ updatedData: assetModel }>()
);
export const updateassetsListFailure = createAction(
    '[Data] Update assetsList Failure',
    props<{ error: string }>()
);

// Delete Data
export const deleteassetsList = createAction(
    '[Data] Delete assetsList',
    props<{ id: string }>()
);
export const deleteassetsListSuccess = createAction(
    '[Data] Delete assetsList Success',
    props<{ id: string }>()
);
export const deleteassetsListFailure = createAction(
    '[Data] Delete assetsList Failure',
    props<{ error: string }>()
);