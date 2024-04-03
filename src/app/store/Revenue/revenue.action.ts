import { createAction, props } from '@ngrx/store';
import { revenueModel } from './revenue.model';

export const fetchrevenueList = createAction('[Data] Fetch Revenue List');
export const fetchrevenueListSuccess = createAction('[Data] Fetch Revenue List Success', props<{ revenueList: revenueModel[] }>());
export const fetchrevenueListFailure = createAction('[Data] Fetch Revenue List Failure', props<{ error: string }>());


// Add Data
export const addrevenueList = createAction(
    '[Data] Add revenueList',
    props<{ newData: revenueModel }>()
);
export const addrevenueListSuccess = createAction(
    '[Data] Add revenueList Success',
    props<{ newData: revenueModel }>()
);
export const addrevenueListFailure = createAction(
    '[Data] Add revenueList Failure',
    props<{ error: string }>()
);

// Update Data
export const updaterevenueList = createAction(
    '[Data] Update revenueList',
    props<{ updatedData: revenueModel }>()
);
export const updaterevenueListSuccess = createAction(
    '[Data] Update revenueList Success',
    props<{ updatedData: revenueModel }>()
);
export const updaterevenueListFailure = createAction(
    '[Data] Update revenueList Failure',
    props<{ error: string }>()
);

// Delete Data
export const deleterevenueList = createAction(
    '[Data] Delete revenueList',
    props<{ id: string }>()
);
export const deleterevenueListSuccess = createAction(
    '[Data] Delete revenueList Success',
    props<{ id: string }>()
);
export const deleterevenueListFailure = createAction(
    '[Data] Delete revenueList Failure',
    props<{ error: string }>()
);