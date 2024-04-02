import { Action, createReducer, on } from '@ngrx/store';
import { addprojectsListSuccess, deleteprojectsListSuccess, fetchprojectsList, fetchprojectsListFailure, fetchprojectsListSuccess, updateprojectsListSuccess } from './projects.action';

export interface ProjectsState {
    projectsList: any[];
    loading: boolean;
    error: any;
}

export const initialState: ProjectsState = {
    projectsList: [],
    loading: false,
    error: null
};

export const ProjectsReducer = createReducer(
    initialState,
    on(fetchprojectsList, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchprojectsListSuccess, (state, { projectsList }) => {
        return { ...state, projectsList, loading: false };
    }),
    on(fetchprojectsListFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(addprojectsListSuccess, (state, { newData }) => {
        return { ...state, projectsList: [newData, ...state.projectsList], error: null };

    }),
    on(updateprojectsListSuccess, (state, { updatedData }) => {
        return { ...state, projectsdata: state.projectsList.map((projectsList) => projectsList.id === updatedData.id ? updatedData : projectsList), error: null };
    }),

    on(deleteprojectsListSuccess, (state, { id }) => {
        const updatedlist = state.projectsList.filter((projectsList) => !id.includes(projectsList.id));
        return { ...state, projectsList: updatedlist, error: null };
    }),
)

// Selector
export function reducer(state: ProjectsState | undefined, action: Action) {
    return ProjectsReducer(state, action);
}