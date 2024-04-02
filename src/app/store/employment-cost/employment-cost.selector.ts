import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmploymentCostState } from './employment-cost.reducer'; 

export const selectDataState = createFeatureSelector<EmploymentCostState>('employmentcost');

export const selectData = createSelector(
    selectDataState,
    (state: EmploymentCostState) => state.employmentCostList
);
export const selectDataLoading = createSelector(
    selectDataState,
    (state: EmploymentCostState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: EmploymentCostState) => state.error
);
