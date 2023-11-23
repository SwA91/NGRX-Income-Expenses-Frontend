import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { TypeEntry, TypeStore } from 'src/app/enum/shared.enum';
import { EntryExit } from 'src/app/models/entry-exit.model';
import { EntryExitService } from 'src/app/services/entry-exit.service';
import Swal from 'sweetalert2';
import { AppStateWithIncomeExpenses } from '../income-expenses.reducer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [
  ]
})
export class DetailComponent implements OnInit, OnDestroy {

  public entryExit: EntryExit[] = [];
  public typeEntry = TypeEntry;
  private entrySubs!: Subscription;

  constructor(
    private entryExitServices: EntryExitService,
    private storeApp: Store<AppStateWithIncomeExpenses>
  ) { }

  ngOnInit(): void {
    this.entrySubs = this.storeApp.select(TypeStore.ENTRY_EXIT)
      .subscribe(({ items }) => {
        // avoid modify the store
        this.entryExit = [...items];
      });
  }

  ngOnDestroy(): void {
    this.entrySubs?.unsubscribe();
  }

  delete(uidItem?: string) {

    if (!uidItem) return;

    this.entryExitServices.deleteEntryExit(uidItem)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Detail deleted',
        })
      })
      .catch((err) => console.log('catch', err));
  }

}
