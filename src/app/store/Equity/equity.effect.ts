import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { addequityList, addequityListSuccess, addequityListFailure, deleteequityList, deleteequityListSuccess, deleteequityListFailure, fetchequityList, fetchequityListFailure, fetchequityListSuccess, updateequityList, updateequityListSuccess, updateequityListFailure } from "./equity.action";

@Injectable()

export class EquityEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchequityList),
            mergeMap(() =>
                this.CrudService.fetchData('/app/equityList').pipe(
                    map((equityList) => fetchequityListSuccess({ equityList })),
                    catchError((error) =>
                        of(fetchequityListFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addequityList),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/equityList', newData).pipe(
                    map(() => addequityListSuccess({ newData })),
                    catchError((error) => of(addequityListFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateequityList),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/equityList', updatedData).pipe(
                    map(() => updateequityListSuccess({ updatedData })),
                    catchError((error) => of(updateequityListFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteequityList),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/equityList').pipe(
                    map(() => deleteequityListSuccess({ id })),
                    catchError((error) => of(deleteequityListFailure({ error })))
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}