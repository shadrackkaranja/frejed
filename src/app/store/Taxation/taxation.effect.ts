import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { addtaxationList, addtaxationListSuccess, addtaxationListFailure, deletetaxationList, deletetaxationListSuccess, deletetaxationListFailure, fetchtaxationList, fetchtaxationListFailure, fetchtaxationListSuccess, updatetaxationList, updatetaxationListSuccess, updatetaxationListFailure } from "./taxation.action";

@Injectable()

export class TaxationEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchtaxationList),
            mergeMap(() =>
                this.CrudService.fetchData('/app/taxationList').pipe(
                    map((taxationList) => fetchtaxationListSuccess({ taxationList })),
                    catchError((error) =>
                        of(fetchtaxationListFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addtaxationList),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/taxationList', newData).pipe(
                    map(() => addtaxationListSuccess({ newData })),
                    catchError((error) => of(addtaxationListFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updatetaxationList),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/taxationList', updatedData).pipe(
                    map(() => updatetaxationListSuccess({ updatedData })),
                    catchError((error) => of(updatetaxationListFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deletetaxationList),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/taxationList').pipe(
                    map(() => deletetaxationListSuccess({ id })),
                    catchError((error) => of(deletetaxationListFailure({ error })))
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}