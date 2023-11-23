import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { TypeStore } from 'src/app/enum/shared.enum';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import * as uiActions from "../../shared/ui.action";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  loading: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select(TypeStore.UI).subscribe(ui => this.loading = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  loginUser() {

    if (this.loginForm.invalid) return;

    this.store.dispatch(uiActions.isLoading())

    // lunch loading
    // Swal.fire({
    //   title: 'Hold on...',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   },
    // });

    const { email, password } = this.loginForm.value;
    this.authService.loginUser(email, password)
      .then(() => {
        // Swal.close();
        this.router.navigate(['/']);
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      })
      .finally(() => this.store.dispatch(uiActions.stopLoading()));
  }
}
