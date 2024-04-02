import { createAction, props } from '@ngrx/store';
import { projectsModel } from './projects.model';

export const fetchprojectsList = createAction('[Data] Fetch Projects List');
export const fetchprojectsListSuccess = createAction('[Data] Fetch Projects List Success', props<{ projectsList: projectsModel[] }>());
export const fetchprojectsListFailure = createAction('[Data] Fetch Projects List Failure', props<{ error: string }>());


// Add Data
export const addprojectsList = createAction(
    '[Data] Add projectsList',
    props<{ newData: projectsModel }>()
);
export const addprojectsListSuccess = createAction(
    '[Data] Add projectsList Success',
    props<{ newData: projectsModel }>()
);
export const addprojectsListFailure = createAction(
    '[Data] Add projectsList Failure',
    props<{ error: string }>()
);

// Update Data
export const updateprojectsList = createAction(
    '[Data] Update projectsList',
    props<{ updatedData: projectsModel }>()
);
export const updateprojectsListSuccess = createAction(
    '[Data] Update projectsList Success',
    props<{ updatedData: projectsModel }>()
);
export const updateprojectsListFailure = createAction(
    '[Data] Update projectsList Failure',
    props<{ error: string }>()
);

// Delete Data
export const deleteprojectsList = createAction(
    '[Data] Delete projectsList',
    props<{ id: string }>()
);
export const deleteprojectsListSuccess = createAction(
    '[Data] Delete projectsList Success',
    props<{ id: string }>()
);
export const deleteprojectsListFailure = createAction(
    '[Data] Delete projectsList Failure',
    props<{ error: string }>()
);