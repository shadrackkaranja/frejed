import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { addpayablesList, addpayablesListSuccess, addpayablesListFailure, deletepayablesList, deletepayablesListSuccess, deletepayablesListFailure, fetchpayablesList, fetchpayablesListFailure, fetchpayablesListSuccess, updatepayablesList, updatepayablesListSuccess, updatepayablesListFailure } from "./payables.action";

@Injectable()

export class PayablesEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchpayablesList),
            mergeMap(() =>
                this.CrudService.fetchData('/app/payablesList').pipe(
                    map((payablesList) => fetchpayablesListSuccess({ payablesList })),
                    catchError((error) =>
                        of(fetchpayablesListFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addpayablesList),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/payablesList', newData).pipe(
                    map(() => addpayablesListSuccess({ newData })),
                    catchError((error) => of(addpayablesListFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updatepayablesList),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/payablesList', updatedData).pipe(
                    map(() => updatepayablesListSuccess({ updatedData })),
                    catchError((error) => of(updatepayablesListFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deletepayablesList),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/payablesList').pipe(
                    map(() => deletepayablesListSuccess({ id })),
                    catchError((error) => of(deletepayablesListFailure({ error })))
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}