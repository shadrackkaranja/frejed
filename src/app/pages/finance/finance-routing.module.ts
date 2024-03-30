import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { AssetsComponent } from './assets/assets.component';
import { CashCashEquivalentComponent } from './cash-cash-equivalent/cash-cash-equivalent.component';
import { EmploymentCostComponent } from './employment-cost/employment-cost.component';
import { EquityComponent } from './equity/equity.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { FinancialReportsComponent } from './financial-reports/financial-reports.component';
import { ManagementAccountsComponent } from './management-accounts/management-accounts.component';
import { PayablesComponent } from './payables/payables.component';
import { ProjectsComponent } from './projects/projects.component';
import { RecievablesComponent } from './recievables/recievables.component';
import { RevenueComponent } from './revenue/revenue.component';
import { TaxationComponent } from './taxation/taxation.component';

const routes: Routes = [
  {
    path: "assets",
    component: AssetsComponent
  },
  {
    path: "cash-equivalent",
    component: CashCashEquivalentComponent
  },
  {
    path: "employment-cost",
    component: EmploymentCostComponent
  },
  {
    path: "equity",
    component: EquityComponent
  },
  {
    path: "expenses",
    component: ExpensesComponent
  },
  {
    path: "financial-reports",
    component: FinancialReportsComponent
  },
  {
    path: "management-accounts",
    component: ManagementAccountsComponent
  },
  {
    path: "payables",
    component: PayablesComponent
  },
  {
    path: "projects",
    component: ProjectsComponent
  },
  {
    path: "recievables",
    component: RecievablesComponent
  },
  {
    path: "revenue",
    component: RevenueComponent
  },
  {
    path: "taxation",
    component: TaxationComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
