import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeEntry, TypeStore } from '../enum/shared.enum';
import { EntryExit } from '../models/entry-exit.model';
import { EntryExitService } from '../services/entry-exit.service';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription, delay } from 'rxjs';
import * as uiActions from "../shared/ui.action";

@Component({
  selector: 'app-income-expenses',
  templateUrl: './income-expenses.component.html',
  styles: [
  ]
})
export class IncomeExpensesComponent implements OnInit, OnDestroy {

  public entryExitForm!: FormGroup;
  public entry = true;
  loading: boolean = false;
  uiSubs!: Subscription;
  public entryExitServiceSubs!: Subscription;

  constructor(
    private store: Store<AppState>,
    private entryExitService: EntryExitService
  ) {
    this.entryExitForm = new FormGroup({
      description: new FormControl('Des-X', Validators.required),
      mount: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.uiSubs = this.store.select(TypeStore.UI).subscribe(ui => this.loading = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.uiSubs?.unsubscribe();
    this.entryExitServiceSubs?.unsubscribe();
  }

  save() {

    if (this.entryExitForm.invalid) return;


    const { description, mount } = this.entryExitForm.value;
    const entryExit = new EntryExit(description, mount, this.entry ? TypeEntry.ENTRY : TypeEntry.EXIT, '');
    this.store.dispatch(uiActions.isLoading())

    this.entryExitServiceSubs = this.entryExitService.addEntryExit(entryExit)
      .pipe(
        delay(1500)
      )
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Register created',
            text: description,
          })
          this.entryExitForm.reset();
        },
        error: (err) => {
          console.log('error', err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,
          })
        },
        complete: () => this.store.dispatch(uiActions.stopLoading())
      });
  }

}
