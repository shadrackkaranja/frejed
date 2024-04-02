import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectsState } from './projects.reducer'; 

export const selectDataState = createFeatureSelector<ProjectsState>('projects');

export const selectData = createSelector(
    selectDataState,
    (state: ProjectsState) => state.projectsList
);
export const selectDataLoading = createSelector(
    selectDataState,
    (state: ProjectsState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: ProjectsState) => state.error
);
