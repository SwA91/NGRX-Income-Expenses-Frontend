import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { TypeEntry, TypeStore } from 'src/app/enum/shared.enum';
import { EntryExit } from 'src/app/models/entry-exit.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [
  ]
})
export class DetailComponent implements OnInit, OnDestroy {

  entryExit: EntryExit[] = [];
  public typeEntry = TypeEntry;
  private entrySubs!: Subscription;

  constructor(
    private storeApp: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.entrySubs = this.storeApp.select(TypeStore.ENTRY_EXIT)
      .subscribe(({ items }) => {
        this.entryExit = items;
      });
  }

  ngOnDestroy(): void {
    this.entrySubs?.unsubscribe();
  }

  delete(uid: string | undefined) {
    console.log('Hey!!!', uid);
  }

}
