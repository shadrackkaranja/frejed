import { createAction, props } from '@ngrx/store';
import { taxationModel } from './taxation.model';

export const fetchtaxationList = createAction('[Data] Fetch Taxation List');
export const fetchtaxationListSuccess = createAction('[Data] Fetch Taxation List Success', props<{ taxationList: taxationModel[] }>());
export const fetchtaxationListFailure = createAction('[Data] Fetch Taxation List Failure', props<{ error: string }>());


// Add Data
export const addtaxationList = createAction(
    '[Data] Add taxationList',
    props<{ newData: taxationModel }>()
);
export const addtaxationListSuccess = createAction(
    '[Data] Add taxationList Success',
    props<{ newData: taxationModel }>()
);
export const addtaxationListFailure = createAction(
    '[Data] Add taxationList Failure',
    props<{ error: string }>()
);

// Update Data
export const updatetaxationList = createAction(
    '[Data] Update taxationList',
    props<{ updatedData: taxationModel }>()
);
export const updatetaxationListSuccess = createAction(
    '[Data] Update taxationList Success',
    props<{ updatedData: taxationModel }>()
);
export const updatetaxationListFailure = createAction(
    '[Data] Update taxationList Failure',
    props<{ error: string }>()
);

// Delete Data
export const deletetaxationList = createAction(
    '[Data] Delete taxationList',
    props<{ id: string }>()
);
export const deletetaxationListSuccess = createAction(
    '[Data] Delete taxationList Success',
    props<{ id: string }>()
);
export const deletetaxationListFailure = createAction(
    '[Data] Delete taxationList Failure',
    props<{ error: string }>()
);