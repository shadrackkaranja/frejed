import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
  },
  {
    path: 'finance', loadChildren: () => import('./finance/finance.module').then(m => m.FinanceModule)
  },
  {
    path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
