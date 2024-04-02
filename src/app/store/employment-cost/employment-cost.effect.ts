import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { addemploymentCostList, addemploymentCostListSuccess, addemploymentCostListFailure, deleteemploymentCostList, deleteemploymentCostListSuccess, deleteemploymentCostListFailure, fetchemploymentCostList, fetchemploymentCostListFailure, fetchemploymentCostListSuccess, updateemploymentCostList, updateemploymentCostListSuccess, updateemploymentCostListFailure } from "./employment-cost.action";

@Injectable()

export class EmploymentCostEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchemploymentCostList),
            mergeMap(() =>
                this.CrudService.fetchData('/app/employmentCostList').pipe(
                    map((employmentCostList) => fetchemploymentCostListSuccess({ employmentCostList })),
                    catchError((error) =>
                        of(fetchemploymentCostListFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addemploymentCostList),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/employmentCostList', newData).pipe(
                    map(() => addemploymentCostListSuccess({ newData })),
                    catchError((error) => of(addemploymentCostListFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateemploymentCostList),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/employmentCostList', updatedData).pipe(
                    map(() => updateemploymentCostListSuccess({ updatedData })),
                    catchError((error) => of(updateemploymentCostListFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteemploymentCostList),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/employmentCostList').pipe(
                    map(() => deleteemploymentCostListSuccess({ id })),
                    catchError((error) => of(deleteemploymentCostListFailure({ error })))
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}