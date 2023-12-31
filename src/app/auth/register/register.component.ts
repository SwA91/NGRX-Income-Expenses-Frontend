import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import * as ui from "../../shared/ui.action";
import { TypeStore } from 'src/app/enum/shared.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup;
  cargando: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private authService: AuthService) {

  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.uiSubscription = this.store.select(TypeStore.UI).subscribe(ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  createUser() {
    if (this.registerForm.invalid) return;

    this.store.dispatch(ui.isLoading())

    // lunch loading
    // Swal.fire({
    //   title: 'Hold on...',
    //   didOpen: () => {
    //     Swal.showLoading()
    //   },
    // });

    const { name, email, password } = this.registerForm.value;

    this.authService.createUser(name, email, password)
      .then(() => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading())
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.store.dispatch(ui.stopLoading())
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      });
  }
}
