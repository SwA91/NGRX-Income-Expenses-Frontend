import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import * as EntryExitActions from '../income-expenses/income-expenses.actions';
import { EntryExitService } from '../services/entry-exit.service';
import { TypeStore } from '../enum/shared.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  private appStoreSub!: Subscription;
  private entryExitServSubs!: Subscription;

  constructor(
    private entryExitService: EntryExitService,
    private appStore: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.appStoreSub = this.appStore.select(TypeStore.USER)
      .pipe(
        filter((auth => !!auth.user))
      )
      .subscribe(() => {
        this.entryExitServSubs = this.entryExitService.initEntryExitListener()
          .subscribe((resp) => {
            this.appStore.dispatch(EntryExitActions.setItems({ items: resp }));
          });
      });
  }

  ngOnDestroy(): void {
    this.appStoreSub.unsubscribe();
    this.entryExitServSubs.unsubscribe();
  }
}
