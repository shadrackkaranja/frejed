import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { addassetsList, addassetsListSuccess, addassetsListFailure, deleteassetsList, deleteassetsListSuccess, deleteassetsListFailure, fetchassetsList, fetchassetsListFailure, fetchassetsListSuccess, updateassetsList, updateassetsListSuccess, updateassetsListFailure } from "./asset.action";

@Injectable()

export class AssetEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchassetsList),
            mergeMap(() =>
                this.CrudService.fetchData('/app/assetList').pipe(
                    map((assetList) => fetchassetsListSuccess({ assetList })),

                    catchError((error) =>
                        of(fetchassetsListFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addassetsList),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/assetList', newData).pipe(
                    map(() => addassetsListSuccess({ newData })),
                    catchError((error) => of(addassetsListFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateassetsList),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/assetList', updatedData).pipe(
                    map(() => updateassetsListSuccess({ updatedData })),
                    catchError((error) => of(updateassetsListFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteassetsList),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/assetList').pipe(
                    map(() => deleteassetsListSuccess({ id })),
                    catchError((error) => of(deleteassetsListFailure({ error })))
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}