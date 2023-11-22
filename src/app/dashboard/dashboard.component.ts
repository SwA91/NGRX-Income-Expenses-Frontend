import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import * as EntryExitActions from '../income-expenses/income-expenses.actions';
import { EntryExitService } from '../services/entry-exit.service';
import { TypeStore } from '../enum/shared.enum';
import { SubscriptionCleaner } from '../shared/subscription/cleaner.subscription';
import { EntryExit } from '../models/entry-exit.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent extends SubscriptionCleaner implements OnInit, OnDestroy {

  constructor(
    private entryExitService: EntryExitService,
    private appStore: Store<AppState>
  ) { super(); }

  ngOnInit(): void {
    this.appStore.select(TypeStore.USER)
      .pipe(
        filter((auth => !!auth.user)),
        takeUntil(this.componentIsDestroyed$)
      )
      .subscribe(() => {
        this.entryExitService.initEntryExitListener()
          .pipe(takeUntil(this.componentIsDestroyed$))
          .subscribe((resp: any[]) => {
            this.appStore.dispatch(EntryExitActions.setItems({ items: resp }));
          });
      });
  }

}
