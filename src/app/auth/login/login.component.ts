import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import * as uiActions from "../../shared/ui.action";
import { Subscription } from 'rxjs';

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
      email: ['user.X@user.com', [Validators.required, Validators.email]],
      password: ['567890', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
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
      .then(resp => {
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
