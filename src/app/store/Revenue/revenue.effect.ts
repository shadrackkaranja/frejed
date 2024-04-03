import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { addrevenueList, addrevenueListSuccess, addrevenueListFailure, deleterevenueList, deleterevenueListSuccess, deleterevenueListFailure, fetchrevenueList, fetchrevenueListFailure, fetchrevenueListSuccess, updaterevenueList, updaterevenueListSuccess, updaterevenueListFailure } from "./revenue.action";

@Injectable()

export class RevenueEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchrevenueList),
            mergeMap(() =>
                this.CrudService.fetchData('/app/revenueList').pipe(
                    map((revenueList) => fetchrevenueListSuccess({ revenueList })),
                    catchError((error) =>
                        of(fetchrevenueListFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addrevenueList),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/revenueList', newData).pipe(
                    map(() => addrevenueListSuccess({ newData })),
                    catchError((error) => of(addrevenueListFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updaterevenueList),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/revenueList', updatedData).pipe(
                    map(() => updaterevenueListSuccess({ updatedData })),
                    catchError((error) => of(updaterevenueListFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleterevenueList),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/revenueList').pipe(
                    map(() => deleterevenueListSuccess({ id })),
                    catchError((error) => of(deleterevenueListFailure({ error })))
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}