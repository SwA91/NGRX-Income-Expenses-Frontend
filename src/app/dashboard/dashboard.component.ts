import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { EntryExitService } from '../services/entry-exit.service';

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
    this.appStoreSub = this.appStore.select('user')
      .pipe(
        filter((auth => !!auth.user))
      )
      .subscribe((user) => {
        this.initEntryExitListener();
      });
  }

  ngOnDestroy(): void {
    this.appStoreSub.unsubscribe();
    this.entryExitServSubs.unsubscribe();
  }

  private initEntryExitListener() {
    this.entryExitServSubs = this.entryExitService.initEntryExitListener()
      .pipe(
        map((snapshot) =>
          snapshot.docs.map((doc) =>
            ({ ...doc.data(), uid: doc.id, })
          )
        )
      )
      .subscribe((resp) => {
        console.log('initEntryExitListener', resp);
      });
  }
}
