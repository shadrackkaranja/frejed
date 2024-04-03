import { createAction, props } from '@ngrx/store';
import { RecievablesModel } from './recievables.model';


// fetch Recievables data
export const fetchRecievablesdata = createAction('[Data] Fetch Recievables Table Data');
export const fetchRecievablesSuccess = createAction('[Data] Fetch Recievables Data Success', props<{ Recievablesdata: RecievablesModel[] }>());
export const fetchRecievablesFailure = createAction('[Data] Fetch Recievables Data Failure', props<{ error: string }>());


// Add Data
export const addRecievablesData = createAction(
    '[Data] Add RecievablesData',
    props<{ newData: RecievablesModel }>()
);
export const addRecievablesDataSuccess = createAction(
    '[Data] Add RecievablesData Success',
    props<{ newData: RecievablesModel }>()
);
export const addRecievablesDataFailure = createAction(
    '[Data] Add RecievablesData Failure',
    props<{ error: string }>()
);


// Update Data
export const updateRecievablesData = createAction(
    '[Data] Update RecievablesData',
    props<{ updatedData: RecievablesModel }>()
);
export const updateRecievablesDataSuccess = createAction(
    '[Data] Update RecievablesData Success',
    props<{ updatedData: RecievablesModel }>()
);
export const updateRecievablesDataFailure = createAction(
    '[Data] Update RecievablesData Failure',
    props<{ error: string }>()
);

// Delete Data
export const deleteRecievablesData = createAction(
    '[Data] Delete RecievablesData',
    props<{ id: string }>()
);
export const deleteRecievablesSuccess = createAction(
    '[Data] Delete RecievablesData Success',
    props<{ id: string }>()
);
export const deleteRecievablesFailure = createAction(
    '[Data] Delete RecievablesData Failure',
    props<{ error: string }>()
);