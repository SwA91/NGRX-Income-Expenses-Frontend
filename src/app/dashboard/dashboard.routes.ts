import { Routes } from '@angular/router';
import { StatisticComponent } from '../income-expenses/statistic/statistic.component';
import { IncomeExpensesComponent } from '../income-expenses/income-expenses.component';
import { DetailComponent } from '../income-expenses/detail/detail.component';

export const dashboardRoutes: Routes = [
    { path: '', component: StatisticComponent },
    { path: 'income-expenses', component: IncomeExpensesComponent },
    { path: 'detail', component: DetailComponent },
]