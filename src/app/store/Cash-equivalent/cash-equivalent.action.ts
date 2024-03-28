import { createAction, props } from '@ngrx/store';
import { cashEquivalentModel } from './cash-equivalent.model';

export const fetchcashEquivalentList = createAction('[Data] Fetch Cash Equivalent List');
export const fetchcashEquivalentListSuccess = createAction('[Data] Fetch Cash Equivalent List Success', props<{ cashEquivalentList: cashEquivalentModel[] }>());
export const fetchcashEquivalentListFailure = createAction('[Data] Fetch Cash Equivalent List Failure', props<{ error: string }>());


// Add Data
export const addcashEquivalentList = createAction(
    '[Data] Add cashEquivalentList',
    props<{ newData: cashEquivalentModel }>()
);
export const addcashEquivalentListSuccess = createAction(
    '[Data] Add cashEquivalentList Success',
    props<{ newData: cashEquivalentModel }>()
);
export const addcashEquivalentListFailure = createAction(
    '[Data] Add cashEquivalentList Failure',
    props<{ error: string }>()
);

// Update Data
export const updatecashEquivalentList = createAction(
    '[Data] Update cashEquivalentList',
    props<{ updatedData: cashEquivalentModel }>()
);
export const updatecashEquivalentListSuccess = createAction(
    '[Data] Update cashEquivalentList Success',
    props<{ updatedData: cashEquivalentModel }>()
);
export const updatecashEquivalentListFailure = createAction(
    '[Data] Update cashEquivalentList Failure',
    props<{ error: string }>()
);

// Delete Data
export const deletecashEquivalentList = createAction(
    '[Data] Delete cashEquivalentList',
    props<{ id: string }>()
);
export const deletecashEquivalentListSuccess = createAction(
    '[Data] Delete cashEquivalentList Success',
    props<{ id: string }>()
);
export const deletecashEquivalentListFailure = createAction(
    '[Data] Delete cashEquivalentList Failure',
    props<{ error: string }>()
);