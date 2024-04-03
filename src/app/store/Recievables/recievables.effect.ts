import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { addRecievablesData, addRecievablesDataFailure, addRecievablesDataSuccess, deleteRecievablesData, deleteRecievablesFailure, deleteRecievablesSuccess, fetchRecievablesFailure, fetchRecievablesSuccess, fetchRecievablesdata, updateRecievablesData, updateRecievablesDataFailure, updateRecievablesDataSuccess } from "./recievables.action";

@Injectable()

export class RecievablessEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchRecievablesdata),
            mergeMap(() =>
                this.CrudService.fetchData('/app/recievablesList').pipe(
                    map((Recievablesdata) => fetchRecievablesSuccess({ Recievablesdata })),

                    catchError((error) =>
                        of(fetchRecievablesFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addRecievablesData),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/recievablesList', newData).pipe(
                    map(() => addRecievablesDataSuccess({ newData })),
                    catchError((error) => of(addRecievablesDataFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateRecievablesData),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/recievablesList', updatedData).pipe(
                    map(() => updateRecievablesDataSuccess({ updatedData })),
                    catchError((error) => of(updateRecievablesDataFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteRecievablesData),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/recievablesList').pipe(
                    map(() => deleteRecievablesSuccess({ id })),
                    catchError((error) => of(deleteRecievablesFailure({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}