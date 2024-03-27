import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { AssetsComponent } from './assets/assets.component';
import { CashCashEquivalentComponent } from './cash-cash-equivalent/cash-cash-equivalent.component';

const routes: Routes = [
  {
    path: "Assets",
    component: AssetsComponent
  },
  {
    path: "Cash & Cash Equivalent",
    component: CashCashEquivalentComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
