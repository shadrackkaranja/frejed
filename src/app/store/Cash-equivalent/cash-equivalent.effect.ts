import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { addcashEquivalentList, addcashEquivalentListSuccess, addcashEquivalentListFailure, deletecashEquivalentList, deletecashEquivalentListSuccess, deletecashEquivalentListFailure, fetchcashEquivalentList, fetchcashEquivalentListFailure, fetchcashEquivalentListSuccess, updatecashEquivalentList, updatecashEquivalentListSuccess, updatecashEquivalentListFailure } from "./cash-equivalent.action";

@Injectable()

export class CashEquivalentEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchcashEquivalentList),
            mergeMap(() =>
                this.CrudService.fetchData('/app/cashEquivalentList').pipe(
                    map((cashEquivalentList) => fetchcashEquivalentListSuccess({ cashEquivalentList })),
                    catchError((error) =>
                        of(fetchcashEquivalentListFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addcashEquivalentList),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/cashEquivalentList', newData).pipe(
                    map(() => addcashEquivalentListSuccess({ newData })),
                    catchError((error) => of(addcashEquivalentListFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updatecashEquivalentList),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/cashEquivalentList', updatedData).pipe(
                    map(() => updatecashEquivalentListSuccess({ updatedData })),
                    catchError((error) => of(updatecashEquivalentListFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deletecashEquivalentList),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/cashEquivalentList').pipe(
                    map(() => deletecashEquivalentListSuccess({ id })),
                    catchError((error) => of(deletecashEquivalentListFailure({ error })))
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}