import { createAction, props } from '@ngrx/store';
import { employmentCostModel } from './employment-cost.model';

export const fetchemploymentCostList = createAction('[Data] Fetch Employment Cost List');
export const fetchemploymentCostListSuccess = createAction('[Data] Fetch Employment Cost List Success', props<{ employmentCostList: employmentCostModel[] }>());
export const fetchemploymentCostListFailure = createAction('[Data] Fetch Employment Cost List Failure', props<{ error: string }>());


// Add Data
export const addemploymentCostList = createAction(
    '[Data] Add employmentCostList',
    props<{ newData: employmentCostModel }>()
);
export const addemploymentCostListSuccess = createAction(
    '[Data] Add employmentCostList Success',
    props<{ newData: employmentCostModel }>()
);
export const addemploymentCostListFailure = createAction(
    '[Data] Add employmentCostList Failure',
    props<{ error: string }>()
);

// Update Data
export const updateemploymentCostList = createAction(
    '[Data] Update employmentCostList',
    props<{ updatedData: employmentCostModel }>()
);
export const updateemploymentCostListSuccess = createAction(
    '[Data] Update employmentCostList Success',
    props<{ updatedData: employmentCostModel }>()
);
export const updateemploymentCostListFailure = createAction(
    '[Data] Update employmentCostList Failure',
    props<{ error: string }>()
);

// Delete Data
export const deleteemploymentCostList = createAction(
    '[Data] Delete employmentCostList',
    props<{ id: string }>()
);
export const deleteemploymentCostListSuccess = createAction(
    '[Data] Delete employmentCostList Success',
    props<{ id: string }>()
);
export const deleteemploymentCostListFailure = createAction(
    '[Data] Delete employmentCostList Failure',
    props<{ error: string }>()
);