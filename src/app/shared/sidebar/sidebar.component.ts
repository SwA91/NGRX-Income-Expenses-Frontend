import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { TypeStore } from 'src/app/enum/shared.enum';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  public name: string = '';
  private userSubs!: Subscription;

  constructor(
    private storeApp: Store<AppState>,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userSubs = this.storeApp.select(TypeStore.USER)
      .pipe(filter(({ user }) => !!user))
      .subscribe(({ user }) => {
        this.name = user?.name!;
      });
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      });
  }
}
