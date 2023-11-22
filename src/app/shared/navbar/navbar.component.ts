import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { TypeStore } from 'src/app/enum/shared.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  public name: string = '';
  private userSubs!: Subscription;

  constructor(
    private storeApp: Store<AppState>,
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
}
