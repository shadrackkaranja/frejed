import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { addexpensesList, addexpensesListSuccess, addexpensesListFailure, deleteexpensesList, deleteexpensesListSuccess, deleteexpensesListFailure, fetchexpensesList, fetchexpensesListFailure, fetchexpensesListSuccess, updateexpensesList, updateexpensesListSuccess, updateexpensesListFailure } from "./expenses.action";

@Injectable()

export class ExpensesEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchexpensesList),
            mergeMap(() =>
                this.CrudService.fetchData('/app/expensesList').pipe(
                    map((expensesList) => fetchexpensesListSuccess({ expensesList })),
                    catchError((error) =>
                        of(fetchexpensesListFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addexpensesList),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/expensesList', newData).pipe(
                    map(() => addexpensesListSuccess({ newData })),
                    catchError((error) => of(addexpensesListFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateexpensesList),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/expensesList', updatedData).pipe(
                    map(() => updateexpensesListSuccess({ updatedData })),
                    catchError((error) => of(updateexpensesListFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteexpensesList),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/expensesList').pipe(
                    map(() => deleteexpensesListSuccess({ id })),
                    catchError((error) => of(deleteexpensesListFailure({ error })))
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}