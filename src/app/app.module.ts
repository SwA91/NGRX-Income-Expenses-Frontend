import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Ngrx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// Own Modules
import { AppRoutingModule } from './app-router.module';

import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './income-expenses/detail/detail.component';
import { IncomeExpensesComponent } from './income-expenses/income-expenses.component';
import { StatisticComponent } from './income-expenses/statistic/statistic.component';
import { ShortEntryPipe } from './pipes/short-entry.pipe';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IncomeExpensesComponent,
    StatisticComponent,
    DetailComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ShortEntryPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
