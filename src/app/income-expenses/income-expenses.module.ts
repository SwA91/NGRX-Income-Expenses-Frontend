import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { NgChartsModule } from 'ng2-charts';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TypeStore } from '../enum/shared.enum';
import { ShortEntryPipe } from '../pipes/short-entry.pipe';
import { SharedModule } from '../shared/shared.module';
import { DetailComponent } from './detail/detail.component';
import { IncomeExpensesComponent } from './income-expenses.component';
import { StatisticComponent } from './statistic/statistic.component';
import { incomeExpensesReducer } from './income-expenses.reducer';

@NgModule({
  declarations: [
    DetailComponent,
    StatisticComponent,
    IncomeExpensesComponent,
    DashboardComponent,
    ShortEntryPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    RouterModule,
    DashboardRoutesModule,
    // lazy load for this reducer
    StoreModule.forFeature(
      TypeStore.ENTRY_EXIT,
      incomeExpensesReducer
    )
  ]
})
export class IncomeExpensesModule { }
