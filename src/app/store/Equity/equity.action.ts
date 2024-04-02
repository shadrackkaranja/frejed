import { createAction, props } from '@ngrx/store';
import { equityModel } from './equity.model';

export const fetchequityList = createAction('[Data] Fetch Equity List');
export const fetchequityListSuccess = createAction('[Data] Fetch Equity List Success', props<{ equityList: equityModel[] }>());
export const fetchequityListFailure = createAction('[Data] Fetch Equity List Failure', props<{ error: string }>());


// Add Data
export const addequityList = createAction(
    '[Data] Add equityList',
    props<{ newData: equityModel }>()
);
export const addequityListSuccess = createAction(
    '[Data] Add equityList Success',
    props<{ newData: equityModel }>()
);
export const addequityListFailure = createAction(
    '[Data] Add equityList Failure',
    props<{ error: string }>()
);

// Update Data
export const updateequityList = createAction(
    '[Data] Update equityList',
    props<{ updatedData: equityModel }>()
);
export const updateequityListSuccess = createAction(
    '[Data] Update equityList Success',
    props<{ updatedData: equityModel }>()
);
export const updateequityListFailure = createAction(
    '[Data] Update equityList Failure',
    props<{ error: string }>()
);

// Delete Data
export const deleteequityList = createAction(
    '[Data] Delete equityList',
    props<{ id: string }>()
);
export const deleteequityListSuccess = createAction(
    '[Data] Delete equityList Success',
    props<{ id: string }>()
);
export const deleteequityListFailure = createAction(
    '[Data] Delete equityList Failure',
    props<{ error: string }>()
);