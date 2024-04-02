import { createAction, props } from '@ngrx/store';
import { payablesModel } from './payables.model';

export const fetchpayablesList = createAction('[Data] Fetch Payables List');
export const fetchpayablesListSuccess = createAction('[Data] Fetch Payables List Success', props<{ payablesList: payablesModel[] }>());
export const fetchpayablesListFailure = createAction('[Data] Fetch Payables List Failure', props<{ error: string }>());


// Add Data
export const addpayablesList = createAction(
    '[Data] Add payablesList',
    props<{ newData: payablesModel }>()
);
export const addpayablesListSuccess = createAction(
    '[Data] Add payablesList Success',
    props<{ newData: payablesModel }>()
);
export const addpayablesListFailure = createAction(
    '[Data] Add payablesList Failure',
    props<{ error: string }>()
);

// Update Data
export const updatepayablesList = createAction(
    '[Data] Update payablesList',
    props<{ updatedData: payablesModel }>()
);
export const updatepayablesListSuccess = createAction(
    '[Data] Update payablesList Success',
    props<{ updatedData: payablesModel }>()
);
export const updatepayablesListFailure = createAction(
    '[Data] Update payablesList Failure',
    props<{ error: string }>()
);

// Delete Data
export const deletepayablesList = createAction(
    '[Data] Delete payablesList',
    props<{ id: string }>()
);
export const deletepayablesListSuccess = createAction(
    '[Data] Delete payablesList Success',
    props<{ id: string }>()
);
export const deletepayablesListFailure = createAction(
    '[Data] Delete payablesList Failure',
    props<{ error: string }>()
);