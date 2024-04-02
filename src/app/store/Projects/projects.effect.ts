import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { addprojectsList, addprojectsListSuccess, addprojectsListFailure, deleteprojectsList, deleteprojectsListSuccess, deleteprojectsListFailure, fetchprojectsList, fetchprojectsListFailure, fetchprojectsListSuccess, updateprojectsList, updateprojectsListSuccess, updateprojectsListFailure } from "./projects.action";

@Injectable()

export class ProjectsEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchprojectsList),
            mergeMap(() =>
                this.CrudService.fetchData('/app/projectsList').pipe(
                    map((projectsList) => fetchprojectsListSuccess({ projectsList })),
                    catchError((error) =>
                        of(fetchprojectsListFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addprojectsList),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/projectsList', newData).pipe(
                    map(() => addprojectsListSuccess({ newData })),
                    catchError((error) => of(addprojectsListFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateprojectsList),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/projectsList', updatedData).pipe(
                    map(() => updateprojectsListSuccess({ updatedData })),
                    catchError((error) => of(updateprojectsListFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteprojectsList),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/projectsList').pipe(
                    map(() => deleteprojectsListSuccess({ id })),
                    catchError((error) => of(deleteprojectsListFailure({ error })))
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}