import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

export const canMatchAuth: CanMatchFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuth()
    .pipe(
      tap(status => {
        if (!status) router.navigate(['/login']);
      }),
      take(1)
    );
};

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuth()
    .pipe(
      tap(status => {
        if (!status) router.navigate(['/login']);
      })
    );
};
