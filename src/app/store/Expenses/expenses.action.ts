import { createAction, props } from '@ngrx/store';
import { expensesModel } from './expenses.model';

export const fetchexpensesList = createAction('[Data] Fetch Expenses List');
export const fetchexpensesListSuccess = createAction('[Data] Fetch Expenses List Success', props<{ expensesList: expensesModel[] }>());
export const fetchexpensesListFailure = createAction('[Data] Fetch Expenses List Failure', props<{ error: string }>());


// Add Data
export const addexpensesList = createAction(
    '[Data] Add expensesList',
    props<{ newData: expensesModel }>()
);
export const addexpensesListSuccess = createAction(
    '[Data] Add expensesList Success',
    props<{ newData: expensesModel }>()
);
export const addexpensesListFailure = createAction(
    '[Data] Add expensesList Failure',
    props<{ error: string }>()
);

// Update Data
export const updateexpensesList = createAction(
    '[Data] Update expensesList',
    props<{ updatedData: expensesModel }>()
);
export const updateexpensesListSuccess = createAction(
    '[Data] Update expensesList Success',
    props<{ updatedData: expensesModel }>()
);
export const updateexpensesListFailure = createAction(
    '[Data] Update expensesList Failure',
    props<{ error: string }>()
);

// Delete Data
export const deleteexpensesList = createAction(
    '[Data] Delete expensesList',
    props<{ id: string }>()
);
export const deleteexpensesListSuccess = createAction(
    '[Data] Delete expensesList Success',
    props<{ id: string }>()
);
export const deleteexpensesListFailure = createAction(
    '[Data] Delete expensesList Failure',
    props<{ error: string }>()
);